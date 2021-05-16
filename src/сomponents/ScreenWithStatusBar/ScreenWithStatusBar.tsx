import React, {memo, useMemo} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {colorStyles} from './ScreenWithStatusBar.style';

const ScreenWithStatusBar: React.FC = memo(({children}) => {
  const colorScheme = useColorScheme();

  const isDarkMode: boolean = useMemo(
    () => colorScheme === 'dark',
    [colorScheme],
  );

  const barStyle: 'light-content' | 'dark-content' = useMemo(
    () => (isDarkMode ? 'light-content' : 'dark-content'),
    [isDarkMode],
  );

  return (
    <SafeAreaView style={colorStyles.getSafeAreaViewColors(colorScheme)}>
      <StatusBar barStyle={barStyle} />
      {children}
    </SafeAreaView>
  );
});

export default ScreenWithStatusBar;
