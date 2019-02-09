import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginButton } from '../components';
import { Divider, Text } from 'react-native-elements';

import deviceStorage from '../services/deviceStorage';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
  }

  handleLogout() {
    deviceStorage.deleteJWT();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Text h3>Hi, Rashul </Text>
        </View>

        <View style={{ marginLeft: 5, marginTop: 30, marginBottom: 20 }}>
          <Text h4>Logout</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}
          >
            <LoginButton handleOnPress={this.handleLogout} title="logout" />
          </View>
        </View>
        <Divider />
      </View>
    );
  }
}
