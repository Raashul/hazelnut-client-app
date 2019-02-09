import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';
import { StyleConstants } from '../components';

import Icon from 'react-native-vector-icons/FontAwesome';

export const AppButton = props => {
  const type = props.type;
  return (
    <Button dark onPress={props.handleOnPress}>
      <Text style={styles.buttonTextStyle}>{props.title}</Text>
    </Button>
  );
};

export const FullButton = props => {
  return (
    <Button onPress={props.handleOnPress} full>
      <Text style={styles.buttonTextStyle}>{props.title}</Text>
    </Button>
  );
};

export const Atag = props => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <Text style={styles.atag}> {props.text}</Text>
    </TouchableOpacity>
  );
};

export const LoginButton = props => {
  return (
    <TouchableOpacity onPress={props.handleOnPress} style={styles.button}>
      <Text style={styles.buttonTextStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export const SelectDayButton = props => {
  return (
    <Button onPress={props.handleOnPress} full iconRight>
      <Text style={styles.buttonTextStyle}>{props.title}</Text>
      <Icon
        name="calendar"
        size={25}
        style={{ color: StyleConstants.pallete.white }}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 25,
    marginTop: 20,
    width: 0.5 * Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  atag: {
    color: 'blue',
    marginTop: 10
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
