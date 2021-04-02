import * as React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, NativeEventEmitter} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GeolocationModule from './modules/Geolocation';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const App = () => {
  const [location, setLocation] = React.useState({});
  const [isLocationInit, setIsLocationInit] = React.useState(false);

  React.useEffect(() => {
    const requestPermissions = async () => {
      try {
        await GeolocationModule.requestPermissions();
        const locationConstants = await GeolocationModule.getLocationConstants();
        GeolocationModule.setConfiguration({
          // android
          interval: 10000,
          fastestInterval: 5000,
          priority: locationConstants.PRIORITY_HIGH_ACCURACY,
          // iOS
          activityType: locationConstants.FITNESS,
          desiredAccuracy: locationConstants.BEST,
          // distanceFilter: 1,
          allowsBackgroundLocationUpdates: false,
          pausesLocationUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: false,
        });
        setLocation(await GeolocationModule.getLastKnownLocation());
        setIsLocationInit(true);
      } catch (err) {
        if (__DEV__) {
          console.error('App requestPermissions error code:', err.code);
          console.error('App requestPermissions error message:', err.message);
        }
      }
    };

    requestPermissions();
  }, []);

  React.useEffect(() => {
    let eventListener = null;
    if (isLocationInit) {
      const watchLocation = async () => {
        try {
          const eventEmitter = new NativeEventEmitter(GeolocationModule.nativeModule);
          const {REQUEST_LOCATION_UPDATES_JS_EVENT_NAME} = GeolocationModule.commonConstants;
          await GeolocationModule.watchLocation();
          eventListener = eventEmitter.addListener(REQUEST_LOCATION_UPDATES_JS_EVENT_NAME, (event) => {
            setLocation(event);
          });
        } catch (err) {
          if (__DEV__) {
            console.error('App watchLocation error code:', err.code);
            console.error('App watchLocation error message:', err.message);
          }
        }
      };
      watchLocation();
    }

    return () => {
      if (isLocationInit && eventListener) {
        GeolocationModule.stopWatchLocation()
          .then(() => {
            eventListener.remove();
          })
          .catch((err) => {
            if (__DEV__) {
              console.error('App stopWatchLocation error code:', err.code);
              console.error('App stopWatchLocation error message:', err.message);
            }
          });
      }
    };
  }, [isLocationInit]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this screen and then come back to see your
                edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
