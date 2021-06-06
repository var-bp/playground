import 'react-native-gesture-handler';
// Polyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
import 'intl';
import 'date-time-format-timezone';
import 'intl/locale-data/jsonp/en';
//
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
