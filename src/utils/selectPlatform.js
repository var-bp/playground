import {Platform} from 'react-native';

const selectPlatform = (ios, android, fallback) =>
  Platform.select({
    ios,
    android,
    default: fallback,
  });

export default selectPlatform;
