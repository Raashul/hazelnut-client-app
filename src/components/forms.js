import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import { StyleConstants } from '../components';

export const Input = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}> {props.label} </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCorrect={false}
          secureTextEntry={props.secureTextEntry}
          placeholder={props.placeholder}
          style={styles.transparentInput}
          secureTextEntry={props.secureTextEntry}
          placeholderTextColor={StyleConstants.pallete.theme}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    height: 50,
    borderColor: 'grey',
    borderRadius: 25,
    marginTop: 10
  },
  transparentInput: {
    backgroundColor: '#ffffff',
    height: 40,
    width: 1 * Dimensions.get('window').width - 60,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 25
  },
  label: {
    fontSize: 18
  }
});
