import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottomTabNavigator from '../MainBottomTabNavigator';
import Contacts from '../../screens/Contacts';
import * as ROUTES from '../routes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName={ROUTES.HOME}>
    <Drawer.Screen name={ROUTES.HOME} component={MainBottomTabNavigator} />
    <Drawer.Screen name={ROUTES.NEWS} component={MainBottomTabNavigator} />
    <Drawer.Screen name={ROUTES.MAP} component={MainBottomTabNavigator} />
    <Drawer.Screen name={ROUTES.USER} component={MainBottomTabNavigator} />
    <Drawer.Screen name={ROUTES.CONTACTS} component={Contacts} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
