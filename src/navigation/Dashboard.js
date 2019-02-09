import React, { Component } from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Screens from "../screens";

export const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Screens.Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" style={{ color: tintColor }} size={30} />
        )
      }
    },
    Add: {
      screen: Screens.Add,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="plus-circle" style={{ color: tintColor }} size={35} />
        )
      }
    },
    Reminder: {
      screen: Screens.Reminder,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" style={{ color: tintColor }} size={30} />
        )
      }
    },
    Setting: {
      screen: Screens.Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="cog" style={{ color: tintColor }} size={30} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);
