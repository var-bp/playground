//
//  RCTGeolocationModule.m
//  playground
//
//  Created by Bohdan Polataiko on 24.03.2021.
//

#import <CoreLocation/CoreLocation.h>
#import <React/RCTLog.h>

#import "RCTGeolocationModule.h"

//#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v) \
//  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)

@interface RCTGeolocationModule() <CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) RCTPromiseResolveBlock locationPermissionResolver;
@property (nonatomic, strong) RCTPromiseRejectBlock whenInUsePermissionReject;
@property (nonatomic) BOOL isLocationAllowed;

@end

@implementation RCTGeolocationModule

 RCT_EXPORT_MODULE(GeolocationModule);

- (instancetype)init
{
  if (self = [super init]) {
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
//    self.locationManage.desiredAccuracy = kCLLocationAccuracyBest;
  }
  return self;
}

- (void)dealloc
{
  self.locationManager = nil;
  self.locationPermissionResolver = nil;
  self.whenInUsePermissionReject = nil;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"authorizationStatusDidChange"];
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

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  if (status == kCLAuthorizationStatusDenied) {
    self.whenInUsePermissionReject(@"PERMISSION_DENIED", @"Location permission was not granted", nil);
  } else if (status == kCLAuthorizationStatusAuthorizedAlways) {
    self.locationPermissionResolver(@"PERMISSION_GRANTED");
  } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    [self.locationManager requestAlwaysAuthorization];
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

//  NSLog(@"The code runs through here!");

  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    resolve(@"PERMISSION_GRANTED");
  } else if (status == kCLAuthorizationStatusNotDetermined) {
    self.locationPermissionResolver = resolve;
    self.whenInUsePermissionReject = reject;
    [self.locationManager requestAlwaysAuthorization];
    
    // SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"13.4.0")
    if (@available(iOS 13.4.0, *)) {
      [self.locationManager requestWhenInUseAuthorization];
    } else {
      [self.locationManager requestAlwaysAuthorization];
    }
  } else {
    reject(@"PERMISSION_DENIED", @"Location permission was not granted", nil);
  }
}

//RCT_EXPORT_METHOD(setConfiguration:(NSDictionary *)options)
//{
//
//}

RCT_REMAP_METHOD(getLocationConstants, settingsResolver:(RCTPromiseResolveBlock)resolve settingsRejecter:(RCTPromiseRejectBlock)reject)
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
    NSMutableDictionary *copiedDictionary = [dictionary mutableCopy];
//    if (@available(iOS 12.0, *)) {
//      copiedDictionary[@"ACTIVITY_TYPE"][@"AIRBORNE"]=@(CLActivityTypeAirborne);
//    }
    resolve(copiedDictionary);
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
