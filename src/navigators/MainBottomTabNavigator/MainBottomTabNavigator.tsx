import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import NewsStackNavigator from '../../navigators/NewsStackNavigator';
import Home from '../../screens/Home';
import Map from '../../screens/Map';
import User from '../../screens/User';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = (props: DrawerScreenProps<{}>) => (
  <Tab.Navigator initialRouteName={props.route.name}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="News" component={NewsStackNavigator} />
    <Tab.Screen name="Map" component={Map} />
    <Tab.Screen name="User" component={User} />
  </Tab.Navigator>
);

export default MainBottomTabNavigator;
