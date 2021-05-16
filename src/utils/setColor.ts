export type ColorSchemes = 'light' | 'dark' | null | undefined;

// https://reactnative.dev/docs/usecolorscheme

const setColor = (
  colorScheme: ColorSchemes,
  defaultColor: string,
  darkColor?: string,
  lightColor?: string,
): string | undefined => {
  const color = {
    default: defaultColor,
    dark: darkColor,
    light: lightColor,
  };
  return color[colorScheme || 'default'];
};

export default setColor;
