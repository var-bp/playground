//
//  RCTGeolocationModule.m
//  playground
//
//  Created by Bohdan Polataiko on 24.03.2021.
//

#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert.h>

#import "RCTGeolocationModule.h"

@interface RCTGeolocationModule() <CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) RCTPromiseResolveBlock locationPermissionResolver;
@property (nonatomic, strong) RCTPromiseRejectBlock locationPermissionRejecter;
@property (nonatomic, strong) RCTPromiseResolveBlock currentLocationResolver;
@property (nonatomic, strong) RCTPromiseRejectBlock currentLocationRejecter;
@property (nonatomic) BOOL isLocationAllowed;
@property (nonatomic) BOOL hasListeners;

@end

@implementation RCTGeolocationModule

 RCT_EXPORT_MODULE(GeolocationModule);

- (instancetype)init
{
  if (self = [super init]) {
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
  }
  return self;
}

- (void)dealloc
{
  self.locationManager = nil;
  self.locationPermissionResolver = nil;
  self.locationPermissionRejecter = nil;
  self.currentLocationResolver = nil;
  self.currentLocationRejecter = nil;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"REQUEST_LOCATION_UPDATES"]; // authorizationStatusDidChange
}

- (NSDictionary *)constantsToExport
{
  return @{ @"REQUEST_LOCATION_UPDATES_JS_EVENT_NAME": @"REQUEST_LOCATION_UPDATES" };
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;  // only do this if your module exports constants or calls UIKit
}

- (void)startObserving
{
  self.hasListeners = YES;
}

- (void)stopObserving
{
  self.hasListeners = NO;
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  if (status == kCLAuthorizationStatusDenied) {
    self.locationPermissionRejecter(@"PERMISSION_DENIED", @"Location permission was not granted", nil);
  } else if (status == kCLAuthorizationStatusAuthorizedAlways) {
    self.locationPermissionResolver(@"PERMISSION_GRANTED");
  } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    [self.locationManager requestAlwaysAuthorization];
  }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
  if (self.hasListeners) {
    CLGeocoder *geocoder = [[CLGeocoder alloc] init];
    [geocoder reverseGeocodeLocation:locations[0] completionHandler:^(NSArray *placemarks, NSError *error) {
      CLPlacemark *placemark = [placemarks objectAtIndex:0];
      NSMutableArray *results = [NSMutableArray arrayWithCapacity:[locations count]];
      [locations enumerateObjectsUsingBlock:^(CLLocation *location, NSUInteger idx, BOOL *stop) {
        [results addObject:@{
          @"latitude": @(location.coordinate.latitude),
          @"longitude": @(location.coordinate.longitude),
          @"altitude": @(location.altitude),
          @"horizontalAccuracy": @(location.horizontalAccuracy),
          @"verticalAccuracy": @(location.verticalAccuracy),
          @"speed": @(location.speed),
          @"address": error ? nil : placemark.country,
        }];
      }];
      [self sendEventWithName:@"REQUEST_LOCATION_UPDATES" body:results];
    }];
  }
}

RCT_REMAP_METHOD(requestPermissions, permissionsResolver:(RCTPromiseResolveBlock)resolve permissionsRejecter:(RCTPromiseRejectBlock)reject)
{
  // Starting on iOS 13.4.0, to get kCLAuthorizationStatusAuthorizedAlways permission, you need to
  // first ask for kCLAuthorizationStatusAuthorizedWhenInUse permission, then ask for Always permission to
  // get to a second system alert
  
  // NSLocationWhenInUseUsageDescription must be added if foreground location is requested.
  // Both NSLocationAlwaysAndWhenInUseUsageDescription and NSLocationWhenInUseUsageDescription must be added if app wants
  // to retrieve location information at background state.

  CLAuthorizationStatus status = [CLLocationManager authorizationStatus];

  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    resolve(@"PERMISSION_GRANTED");
  } else if (status == kCLAuthorizationStatusNotDetermined) {
    self.locationPermissionResolver = resolve;
    self.locationPermissionRejecter = reject;
    [self.locationManager requestAlwaysAuthorization];
    
    if (@available(iOS 13.4.0, *)) {
      [self.locationManager requestWhenInUseAuthorization];
    } else {
      [self.locationManager requestAlwaysAuthorization];
    }
  } else {
    reject(@"PERMISSION_DENIED", @"Location permission was not granted", nil);
  }
}

RCT_EXPORT_METHOD(setConfiguration:(NSDictionary *)options)
{
  NSNumber *activityType = [RCTConvert NSNumber:options[@"activityType"]];
  if (activityType != nil) {
    self.locationManager.activityType = [activityType intValue];
  }
  NSNumber *desiredAccuracy = [RCTConvert NSNumber:options[@"desiredAccuracy"]];
  if (desiredAccuracy != nil) {
    self.locationManager.desiredAccuracy = [desiredAccuracy intValue];
  }
  NSNumber *allowsBackgroundLocationUpdates = [RCTConvert NSNumber:options[@"allowsBackgroundLocationUpdates"]];
  if (allowsBackgroundLocationUpdates != nil) {
    self.locationManager.allowsBackgroundLocationUpdates = [allowsBackgroundLocationUpdates boolValue];
  }
  NSNumber *pausesLocationUpdatesAutomatically = [RCTConvert NSNumber:options[@"pausesLocationUpdatesAutomatically"]];
  if (pausesLocationUpdatesAutomatically != nil) {
    self.locationManager.pausesLocationUpdatesAutomatically = [pausesLocationUpdatesAutomatically boolValue];
  }
  if (@available(iOS 11.0, *)) {
    NSNumber *showsBackgroundLocationIndicator = [RCTConvert NSNumber:options[@"showsBackgroundLocationIndicator"]];
    if (showsBackgroundLocationIndicator != nil) {
      self.locationManager.showsBackgroundLocationIndicator = [showsBackgroundLocationIndicator boolValue];
    }
  }
}

RCT_REMAP_METHOD(
  getLocationConstants,
  locationConstantsResolver:(RCTPromiseResolveBlock)resolve locationConstantsRejecter:(RCTPromiseRejectBlock)reject
)
{
  @try {
    NSDictionary *dictionary = @{
      @"ACTIVITY_TYPE": @{
        @"OTHER": @(CLActivityTypeOtherNavigation),
        @"AUTOMOTIVE_NAVIGATION": @(CLActivityTypeAutomotiveNavigation),
        @"FITNESS": @(CLActivityTypeFitness),
      },
      @"DESIRED_ACCURACY": @{
        @"BEST_FOR_NAVIGATION": @(kCLLocationAccuracyBestForNavigation),
        @"BEST": @(kCLLocationAccuracyBest),
        @"NEAREST_TEN_METERS": @(kCLLocationAccuracyNearestTenMeters),
        @"HUNDRED_METERS": @(kCLLocationAccuracyHundredMeters),
        @"THREE_KILOMETERS": @(kCLLocationAccuracyThreeKilometers),
      }
    };
    if (@available(iOS 12.0, *)) {
      NSMutableDictionary *copiedDictionary = [dictionary mutableCopy];
      NSMutableDictionary *activityType = [copiedDictionary[@"ACTIVITY_TYPE"] mutableCopy];
      activityType[@"AIRBORNE"] = @(CLActivityTypeAirborne);
      copiedDictionary[@"ACTIVITY_TYPE"] = activityType;
      resolve(copiedDictionary);
    } else {
      resolve(dictionary);
    }
  }
  @catch (NSException *exception) {
    NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    [userInfo setValue:exception.name forKey:@"ExceptionName"];
    [userInfo setValue:exception.reason forKey:@"ExceptionReason"];
    [userInfo setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
    [userInfo setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
    [userInfo setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
    NSError *error = [NSError errorWithDomain:exception.name code:0 userInfo:userInfo];
    reject(exception.name, exception.reason, error);
  }
}

RCT_REMAP_METHOD(
  getLastKnownLocation,
  lastKnownLocationResolver:(RCTPromiseResolveBlock)resolve lastKnownLocationRejecter:(RCTPromiseRejectBlock)reject
)
{
  if ([CLLocationManager locationServicesEnabled]) {
    self.currentLocationResolver = resolve;
    self.currentLocationRejecter = reject;
    
    CLLocation *lastKnownLocation = [self.locationManager location];
    CLGeocoder *geocoder = [[CLGeocoder alloc] init];
    [geocoder reverseGeocodeLocation:lastKnownLocation completionHandler:^(NSArray *placemarks, NSError *error) {
      CLPlacemark *placemark = [placemarks objectAtIndex:0];
      NSDictionary *lastKnownLocationDictionary = @{
        @"latitude": @(lastKnownLocation.coordinate.latitude),
        @"longitude": @(lastKnownLocation.coordinate.longitude),
        @"altitude": @(lastKnownLocation.altitude),
        @"horizontalAccuracy": @(lastKnownLocation.horizontalAccuracy),
        @"verticalAccuracy": @(lastKnownLocation.verticalAccuracy),
        @"speed": @(lastKnownLocation.speed),
        @"address": error ? nil : placemark.country,
      };
      resolve(lastKnownLocationDictionary);
    }];
  } else {
    reject(@"PERMISSION_DENIED", @"Location permission was not granted", nil);
  }
}

RCT_REMAP_METHOD(
  watchLocation,
  watchLocationResolver:(RCTPromiseResolveBlock)resolve watchLocationRejecter:(RCTPromiseRejectBlock)reject
)
{
  @try {
    [self.locationManager startUpdatingLocation];
    resolve(@"WATCH_LOCATION_START");
  }
  @catch (NSException *exception) {
    NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    [userInfo setValue:exception.name forKey:@"ExceptionName"];
    [userInfo setValue:exception.reason forKey:@"ExceptionReason"];
    [userInfo setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
    [userInfo setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
    [userInfo setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
    NSError *error = [NSError errorWithDomain:exception.name code:0 userInfo:userInfo];
    reject(exception.name, exception.reason, error);
  }
}

RCT_REMAP_METHOD(
  stopWatchLocation,
  stopWatchLocationResolver:(RCTPromiseResolveBlock)resolve stopWatchLocationRejecter:(RCTPromiseRejectBlock)reject
)
{
  @try {
    [self.locationManager stopUpdatingLocation];
    resolve(@"STOP_WATCH_LOCATION");
  }
  @catch (NSException *exception) {
    NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    [userInfo setValue:exception.name forKey:@"ExceptionName"];
    [userInfo setValue:exception.reason forKey:@"ExceptionReason"];
    [userInfo setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
    [userInfo setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
    [userInfo setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
    NSError *error = [NSError errorWithDomain:exception.name code:0 userInfo:userInfo];
    reject(exception.name, exception.reason, error);
  }
}

@end
