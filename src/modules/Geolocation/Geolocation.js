import {NativeModules} from 'react-native';
import {selectPlatform} from '../../utils';

const Geolocation = {
  requestPermissions: selectPlatform(
    Promise.resolve(),
    NativeModules.GeolocationModule.requestAndroidPermissions,
    Promise.resolve(),
  ),
  getLocationRequestValues: selectPlatform(
    Promise.resolve({}),
    NativeModules.GeolocationModule.getAndroidLocationRequestValues,
    Promise.resolve({}),
  ),
  setConfiguration: selectPlatform(
    Promise.resolve(),
    NativeModules.GeolocationModule.setAndroidConfiguration,
    Promise.resolve(),
  ),
  getCurrentLocation: NativeModules.GeolocationModule.getCurrentLocation,
  getRequestLocationUpdatesJSEventName: selectPlatform(
    Promise.resolve('NO_EVENT_NAME'),
    NativeModules.GeolocationModule.getAndroidRequestLocationUpdatesJSEventName,
    Promise.resolve('NO_EVENT_NAME'),
  ),
  watchLocation: NativeModules.GeolocationModule.watchLocation,
  stopWatchLocation: NativeModules.GeolocationModule.stopWatchLocation,
};

export default Geolocation;
