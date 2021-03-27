import {NativeModules} from 'react-native';

const iosGeolocation = {
  requestPermissions: () => NativeModules.GeolocationModule.requestPermissions(),
  getLocationRequestValues: () => NativeModules.GeolocationModule.getLocationConstants(),
  setConfiguration: () => Promise.resolve(),
  getCurrentLocation: () => Promise.resolve({}),
  getRequestLocationUpdatesJSEventName: () =>
    Promise.resolve(NativeModules.GeolocationModule.getConstants().REQUEST_LOCATION_UPDATES_JS_EVENT_NAME),
  watchLocation: () => Promise.resolve(),
  stopWatchLocation: () => Promise.resolve(),
};

export default iosGeolocation;
