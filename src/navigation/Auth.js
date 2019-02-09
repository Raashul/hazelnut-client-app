import React, { Component } from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import * as Screens from "../screens";


export const AuthenticationStack = createStackNavigator({
  Signup: {
    screen: Screens.Signup
  },
  Login: {
    screen: Screens.Login
  }
}, {
  initialRouteName: 'Login'
});


