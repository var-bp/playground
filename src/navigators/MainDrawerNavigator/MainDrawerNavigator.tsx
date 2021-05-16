import React from 'react';
import {useColorScheme} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottomTabNavigator from '../MainBottomTabNavigator';
import {
  FONT_FAMILY_PRIMARY,
  FONT_WEIGHT_MEDIUM,
} from '../../constants/typography';
import {TINT_COLOR_PRIMARY, TINT_COLOR_SECONDARY} from '../../constants/colors';
import adaptSize from '../../utils/adaptSize';
import setColor from '../../utils/setColor';
import Contacts from '../../screens/Contacts';
import * as ROUTES from '../routes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.HOME}
      drawerContentOptions={{
        activeTintColor: setColor(
          colorScheme,
          TINT_COLOR_PRIMARY,
          undefined,
          TINT_COLOR_PRIMARY,
        ),
        inactiveTintColor: setColor(
          colorScheme,
          TINT_COLOR_SECONDARY,
          undefined,
          TINT_COLOR_SECONDARY,
        ),
        labelStyle: {
          fontFamily: FONT_FAMILY_PRIMARY,
          fontWeight: FONT_WEIGHT_MEDIUM,
          fontSize: adaptSize(14, true),
        },
      }}>
      <Drawer.Screen name={ROUTES.HOME} component={MainBottomTabNavigator} />
      <Drawer.Screen name={ROUTES.NEWS} component={MainBottomTabNavigator} />
      <Drawer.Screen name={ROUTES.MAP} component={MainBottomTabNavigator} />
      <Drawer.Screen name={ROUTES.USER} component={MainBottomTabNavigator} />
      <Drawer.Screen name={ROUTES.CONTACTS} component={Contacts} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
