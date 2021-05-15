import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import NewsStackNavigator from '../../navigators/NewsStackNavigator';
import {
  FONT_FAMILY_PRIMARY,
  FONT_WEIGHT_REGULAR,
} from '../../constants/typography';
import adaptSize from '../../utils/adaptSize';
import * as ROUTES from '../routes';
import Home from '../../screens/Home';
import Map from '../../screens/Map';
import User from '../../screens/User';
import Icon from '../../сomponents/Icon';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = (props: DrawerScreenProps<{}>) => (
  <Tab.Navigator
    initialRouteName={props.route.name}
    screenOptions={({route}) => ({
      tabBarIcon: ({color}) => {
        const size = adaptSize(25);
        switch (route.name) {
          case ROUTES.HOME:
            return (
              <Icon name="home" width={size} height={size} color={color} />
            );
          case ROUTES.NEWS:
            return (
              <Icon name="newspaper" width={size} height={size} color={color} />
            );
          case ROUTES.MAP:
            return (
              <Icon name="location" width={size} height={size} color={color} />
            );
          case ROUTES.USER:
            return (
              <Icon name="user" width={size} height={size} color={color} />
            );
        }
      },
    })}
    // https://www.refactoringui.com/previews/building-your-color-palette
    tabBarOptions={{
      activeTintColor: '#ed553b',
      inactiveTintColor: '#000000',
      style: {
        height: adaptSize(95),
      },
      labelStyle: {
        fontFamily: FONT_FAMILY_PRIMARY,
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: 12,
      },
    }}>
    <Tab.Screen name={ROUTES.HOME} component={Home} />
    <Tab.Screen name={ROUTES.NEWS} component={NewsStackNavigator} />
    <Tab.Screen name={ROUTES.MAP} component={Map} />
    <Tab.Screen name={ROUTES.USER} component={User} />
  </Tab.Navigator>
);

export default MainBottomTabNavigator;
