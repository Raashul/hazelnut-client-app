import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import deviceStorage from './src/services/deviceStorage';
import { AppStackNavigator, DashboardTabNavigator, AuthenticationStack } from './src/navigation';
import AuthLoadingScreen from "./src/screens/AuthLoading";

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStackNavigator,
  Auth: AuthenticationStack
}, {
  initialRouteName: 'AuthLoading'
}))

export default class App extends React.Component {
  // static navigationOptions = {
  //   headerRight: <Icon name="home" style={{ color: "red" }} size={30} />
  // };

  constructor() {
    super();
    this.state = {
      jwt: "",
      loading: true
    };
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: "jwt"
    });
  }

  render() {
    return <AppContainer jwt={this.state.jwt} deleteJWT={this.deleteJWT} />;
  }
}
