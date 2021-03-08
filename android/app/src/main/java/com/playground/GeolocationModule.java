package com.playground;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Build;
import android.os.Looper;
// import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.permissions.PermissionsModule;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

// https://www.youtube.com/playlist?list=PLhPyEFL5u-i0vMDegCPbfD3ZNz69sf46I
// https://developer.android.com/guide/topics/permissions/overview
// https://developer.android.com/training/location/change-location-settings#location-request
// https://nicedoc.io/petterh/react-native-android-activity
// https://stackoverflow.com/a/38555008
// https://stackoverflow.com/a/33709182
// https://stackoverflow.com/a/54349976
// https://stackoverflow.com/a/32291415

public class GeolocationModule extends ReactContextBaseJavaModule {
    private FusedLocationProviderClient fusedLocationProviderClient;
    private LocationRequest locationRequest;
    private final String REQUEST_LOCATION_UPDATES_JS_EVENT_NAME = "REQUEST_LOCATION_UPDATES";

    GeolocationModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() { return "GeolocationModule"; }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private WritableMap getLocationData(Location location, Context context) {
        Geocoder geocoder = new Geocoder(context);
        WritableMap values = new WritableNativeMap();

        if (location != null) {
            try {
                List<Address> address = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
                values.putString("address", address.get(0).getCountryName()); // has many useful data
            } catch (Exception e) {
                values.putNull("address");
            }

            values.putDouble("latitude", location.getLatitude());
            values.putDouble("longitude", location.getLongitude());
            if (location.hasAltitude()) {
                values.putDouble("altitude", location.getAltitude());
            } else {
                values.putNull("altitude");
            }
            if (location.hasAccuracy()) {
                values.putDouble("accuracy", location.getAccuracy());
            } else {
                values.putNull("accuracy");
            }
            if (location.hasSpeed()) {
                values.putDouble("speed", location.getSpeed());
            } else {
                values.putNull("speed");
            }
        } else {
            values.putNull("latitude");
            values.putNull("longitude");
            values.putNull("altitude");
            values.putNull("accuracy");
            values.putNull("speed");
            values.putNull("address");
        }

        return values;
    }

    @ReactMethod
    public void getAndroidRequestLocationUpdatesJSEventName(final Promise promise) {
        if (REQUEST_LOCATION_UPDATES_JS_EVENT_NAME != null) {
            promise.resolve(REQUEST_LOCATION_UPDATES_JS_EVENT_NAME);
        } else {
            promise.reject("PROPERTY_NULL", "Cannot get property REQUEST_LOCATION_UPDATES_JS_EVENT_NAME");
        }
    }

    @ReactMethod
    public void requestAndroidPermissions(final Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            final PermissionsModule permissionsModule = getReactApplicationContext().getNativeModule(PermissionsModule.class);

            final Callback onPermissionCheckFailed = args -> {
                promise.reject("PERMISSION_DENIED", "Failed to check location permission");
            };
            final Callback onPermissionChecked = args -> {
                boolean hasPermission = (boolean) args[0];
                if (hasPermission) {
                    promise.resolve("PERMISSION_GRANTED");
                } else {
                    final Callback onPermissionGranted = args2 -> {
                        String result = (String) args2[0];
                        if (result.equals("granted")) {
                            promise.resolve("PERMISSION_GRANTED");
                        } else {
                            promise.reject("PERMISSION_DENIED", "Location permission was not granted");
                        }
                    };
                    final Callback onPermissionDenied = args2 -> {
                        promise.reject("PERMISSION_DENIED", "Failed to request location permission");
                    };

                    permissionsModule.requestPermission(Manifest.permission.ACCESS_FINE_LOCATION, new PromiseImpl(onPermissionGranted, onPermissionDenied));
                }
            };

            permissionsModule.checkPermission(Manifest.permission.ACCESS_FINE_LOCATION, new PromiseImpl(onPermissionChecked, onPermissionCheckFailed));
        } else {
            promise.resolve("PERMISSION_GRANTED");
        }
    }

    @ReactMethod
    public void setAndroidConfiguration(final ReadableMap map) {
        locationRequest = LocationRequest.create();
        locationRequest.setInterval(map.getInt("interval"));
        locationRequest.setFastestInterval(map.getInt("fastestInterval"));
        locationRequest.setPriority(map.getInt("priority"));
    }

    @ReactMethod
    public void getAndroidLocationRequestValues(final Promise promise) {
        try {
            WritableMap values = new WritableNativeMap();
            values.putInt("PRIORITY_BALANCED_POWER_ACCURACY", LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
            values.putInt("PRIORITY_HIGH_ACCURACY", LocationRequest.PRIORITY_HIGH_ACCURACY);
            values.putInt("PRIORITY_LOW_POWER", LocationRequest.PRIORITY_LOW_POWER);
            values.putInt("PRIORITY_NO_POWER", LocationRequest.PRIORITY_NO_POWER);
            promise.resolve(values);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getCurrentLocation(final Promise promise) {
        Activity activity = getCurrentActivity();
        try {
            fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(activity);

            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                fusedLocationProviderClient.getLastLocation().addOnSuccessListener(activity, location -> {
                    promise.resolve(getLocationData(location, activity));
                });
            } else {
                promise.reject("PERMISSION_DENIED", "Location permission was not granted");
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void stopWatchLocation(final Promise promise) {
        try {
            fusedLocationProviderClient.removeLocationUpdates(new LocationCallback() {
                @Override
                public void onLocationResult(@NonNull LocationResult locationResult) {
                super.onLocationResult(locationResult);
                promise.resolve("STOP_WATCH_LOCATION");
                }
            });
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void watchLocation(final Promise promise) {
        ReactApplicationContext context = getReactApplicationContext();
        try {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                fusedLocationProviderClient.requestLocationUpdates(locationRequest, new LocationCallback() {
                    @Override
                    public void onLocationResult(@NonNull LocationResult locationResult) {
                    super.onLocationResult(locationResult);
                    sendEvent(context, REQUEST_LOCATION_UPDATES_JS_EVENT_NAME, getLocationData(locationResult.getLastLocation(), context));
                    promise.resolve("WATCH_LOCATION_START");
                    }
                }, Looper.getMainLooper());
            } else {
                promise.reject("PERMISSION_DENIED", "Location permission was not granted");
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
