import React, {memo} from 'react';
import {ScrollView, Text, useColorScheme, View} from 'react-native';
import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import useOrientation from '../../hooks/useOrientation';
import ScreenWithStatusBar from '../../сomponents/ScreenWithStatusBar';
import {styles, responsiveStyles, colorStyles} from './Home.style';

const Section: React.FC<{title: string}> = memo(({children, title}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={responsiveStyles.getSectionContainerSizes()}>
      <Text
        style={[
          styles.sectionTitle,
          responsiveStyles.getSectionTitleSizes(),
          colorStyles.getSectionContainerColors(colorScheme),
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          responsiveStyles.getSectionDescriptionSizes(),
          colorStyles.getSectionDescriptionColors(colorScheme),
        ]}>
        {children}
      </Text>
    </View>
  );
});

const Home = () => {
  useOrientation();

  const colorScheme = useColorScheme();

  return (
    <ScreenWithStatusBar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={colorStyles.getScrollViewColors(colorScheme)}>
        <Header />
        <View style={colorStyles.getViewColors(colorScheme)}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </ScreenWithStatusBar>
  );
};

export default Home;
