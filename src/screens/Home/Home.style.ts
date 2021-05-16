import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY_PRIMARY,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_BOLD,
} from '../../constants/typography';
import {
  HEADING_COLOR_PRIMARY,
  HEADING_COLOR_SECONDARY,
  TEXT_COLOR_PRIMARY,
  TEXT_COLOR_SECONDARY,
  BACKGROUND_COLOR_PRIMARY,
  BACKGROUND_COLOR_SECONDARY,
  BACKGROUND_COLOR_TERTIARY,
  BACKGROUND_COLOR_QUATERNARY,
} from '../../constants/colors';
import adaptSize from '../../utils/adaptSize';
import setColor, {ColorSchemes} from '../../utils/setColor';

export const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_MEDIUM,
  },
  sectionDescription: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_REGULAR,
  },
  highlight: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeight: FONT_WEIGHT_BOLD,
  },
});

export const responsiveStyles = {
  getSectionContainerSizes: () => ({
    marginTop: adaptSize(32),
    paddingHorizontal: adaptSize(24),
  }),
  getSectionTitleSizes: () => ({
    fontSize: adaptSize(24, true),
  }),
  getSectionDescriptionSizes: () => ({
    marginTop: adaptSize(8),
    fontSize: adaptSize(18, true),
  }),
};

export const colorStyles = {
  getSectionContainerColors: (colorScheme: ColorSchemes) => ({
    color: setColor(
      colorScheme,
      HEADING_COLOR_SECONDARY,
      HEADING_COLOR_PRIMARY,
    ),
  }),
  getSectionDescriptionColors: (colorScheme: ColorSchemes) => ({
    color: setColor(colorScheme, TEXT_COLOR_SECONDARY, TEXT_COLOR_PRIMARY),
  }),
  getScrollViewColors: (colorScheme: ColorSchemes) => ({
    backgroundColor: setColor(
      colorScheme,
      BACKGROUND_COLOR_PRIMARY,
      BACKGROUND_COLOR_SECONDARY,
    ),
  }),
  getViewColors: (colorScheme: ColorSchemes) => ({
    backgroundColor: setColor(
      colorScheme,
      BACKGROUND_COLOR_TERTIARY,
      BACKGROUND_COLOR_QUATERNARY,
    ),
  }),
};
