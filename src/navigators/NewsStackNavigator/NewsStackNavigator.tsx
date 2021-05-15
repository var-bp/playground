import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import NewsList from '../../screens/NewsList';
import NewsDetail from '../../screens/NewsDetail';
import * as ROUTES from '../routes';

enableScreens();

const Stack = createNativeStackNavigator();

const NewsStackNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.NEWS__NEWS_LIST}>
    <Stack.Screen name={ROUTES.NEWS__NEWS_LIST} component={NewsList} />
    <Stack.Screen
      name={ROUTES.NEWS__NEWS_LIST__NEWS_DETAIL}
      component={NewsDetail}
    />
  </Stack.Navigator>
);

export default NewsStackNavigator;
