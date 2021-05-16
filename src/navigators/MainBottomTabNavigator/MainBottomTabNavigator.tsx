import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import NewsStackNavigator from '../../navigators/NewsStackNavigator';
import {
  FONT_FAMILY_PRIMARY,
  FONT_WEIGHT_REGULAR,
} from '../../constants/typography';
import {TINT_COLOR_PRIMARY, TINT_COLOR_SECONDARY} from '../../constants/colors';
import adaptSize from '../../utils/adaptSize';
import setColor from '../../utils/setColor';
import * as ROUTES from '../routes';
import Home from '../../screens/Home';
import Map from '../../screens/Map';
import User from '../../screens/User';
import Icon from '../../сomponents/Icon';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = (props: DrawerScreenProps<{}>) => {
  const colorScheme = useColorScheme();

  return (
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
                <Icon
                  name="newspaper"
                  width={size}
                  height={size}
                  color={color}
                />
              );
            case ROUTES.MAP:
              return (
                <Icon
                  name="location"
                  width={size}
                  height={size}
                  color={color}
                />
              );
            case ROUTES.USER:
              return (
                <Icon name="user" width={size} height={size} color={color} />
              );
          }
        },
      })}
      tabBarOptions={{
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
        style: {
          height: adaptSize(95),
        },
        labelPosition: 'below-icon',
        labelStyle: {
          fontFamily: FONT_FAMILY_PRIMARY,
          fontWeight: FONT_WEIGHT_REGULAR,
          fontSize: adaptSize(12, true),
        },
      }}>
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.NEWS} component={NewsStackNavigator} />
      <Tab.Screen name={ROUTES.MAP} component={Map} />
      <Tab.Screen name={ROUTES.USER} component={User} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
