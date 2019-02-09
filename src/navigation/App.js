import React, { Component } from "react";
import {
  createStackNavigator,
} from "react-navigation";

import { DashboardTabNavigator } from './Dashboard';

import * as Screens from "../screens";

export const AppStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  Buckets: {
    screen: Screens.Buckets
  },
  Posts: {
    screen: Screens.Posts
  },
  Setting: {
    screen: Screens.Settings
  },
  AddReminder: {
    screen: Screens.AddReminder
  }
});

