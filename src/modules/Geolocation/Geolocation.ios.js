import {NativeModules} from 'react-native';

const iosGeolocation = {
  requestPermissions: () => NativeModules.GeolocationModule.requestPermissions(),
  getLocationConstants: () => NativeModules.GeolocationModule.getLocationConstants(),
  setConfiguration: NativeModules.GeolocationModule.setConfiguration,
  getLastKnownLocation: () => NativeModules.GeolocationModule.getLastKnownLocation(),
  commonConstants: NativeModules.GeolocationModule.getConstants(),
  watchLocation: () => NativeModules.GeolocationModule.watchLocation(),
  stopWatchLocation: () => NativeModules.GeolocationModule.stopWatchLocation(),
  nativeModule: NativeModules.GeolocationModule,
};

export default iosGeolocation;
