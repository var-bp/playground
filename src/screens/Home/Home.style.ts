import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY_PRIMARY,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_BOLD,
} from '../../constants/typography';
import adaptSize from '../../utils/adaptSize';

export default StyleSheet.create({
  sectionContainer: {
    marginTop: adaptSize(32),
    paddingHorizontal: adaptSize(24),
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_MEDIUM,
    fontSize: 24,
  },
  sectionDescription: {
    marginTop: adaptSize(8),
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: 18,
  },
  highlight: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_BOLD,
  },
});
