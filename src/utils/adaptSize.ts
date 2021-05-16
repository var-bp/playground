import {Dimensions, PixelRatio} from 'react-native';

// https://material.io/blog/device-metrics
// https://github.com/nirsky/react-native-scaling-example
// https://reactnative.dev/docs/pixelratio

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number =>
  (Dimensions.get('window').width / guidelineBaseWidth) * size;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const verticalScale = (size: number): number =>
  (Dimensions.get('window').height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

const adaptSize = (size: number, isFontSize = false): number => {
  const fontScale = isFontSize ? 1 : PixelRatio.getFontScale();
  const result = moderateScale(size) * fontScale;
  // check if a number has a decimal place/is a whole number
  return result % 1 !== 0 ? PixelRatio.roundToNearestPixel(result) : result;
};

export default adaptSize;
