import {
  BACKGROUND_COLOR_PRIMARY,
  BACKGROUND_COLOR_SECONDARY,
} from '../../constants/colors';
import setColor, {ColorSchemes} from '../../utils/setColor';

export const colorStyles = {
  getSafeAreaViewColors: (colorScheme: ColorSchemes) => ({
    backgroundColor: setColor(
      colorScheme,
      BACKGROUND_COLOR_PRIMARY,
      BACKGROUND_COLOR_SECONDARY,
    ),
  }),
};
