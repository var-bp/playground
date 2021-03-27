import {NativeModules} from 'react-native';

const androidGeolocation = {
  requestPermissions: NativeModules.GeolocationModule.requestAndroidPermissions,
  getLocationRequestValues: NativeModules.GeolocationModule.getAndroidLocationRequestValues,
  setConfiguration: NativeModules.GeolocationModule.setAndroidConfiguration,
  getCurrentLocation: NativeModules.GeolocationModule.getCurrentLocation,
  getRequestLocationUpdatesJSEventName: NativeModules.GeolocationModule.getAndroidRequestLocationUpdatesJSEventName,
  watchLocation: NativeModules.GeolocationModule.watchLocation,
  stopWatchLocation: NativeModules.GeolocationModule.stopWatchLocation,
};

export default androidGeolocation;
