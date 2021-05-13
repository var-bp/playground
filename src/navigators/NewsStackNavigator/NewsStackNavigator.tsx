import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import NewsList from '../../screens/NewsList';
import NewsDetail from '../../screens/NewsDetail';

enableScreens();

const Stack = createNativeStackNavigator();

const NewsStackNavigator = () => (
  <Stack.Navigator initialRouteName="NewsList">
    <Stack.Screen name="NewsList" component={NewsList} />
    <Stack.Screen name="NewsDetail" component={NewsDetail} />
  </Stack.Navigator>
);

export default NewsStackNavigator;
