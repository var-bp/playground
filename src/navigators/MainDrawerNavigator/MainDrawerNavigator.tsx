import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottomTabNavigator from '../MainBottomTabNavigator';
import Contacts from '../../screens/Contacts';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={MainBottomTabNavigator} />
    <Drawer.Screen name="News" component={MainBottomTabNavigator} />
    <Drawer.Screen name="Map" component={MainBottomTabNavigator} />
    <Drawer.Screen name="User" component={MainBottomTabNavigator} />
    <Drawer.Screen name="Contacts" component={Contacts} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
