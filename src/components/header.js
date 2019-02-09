import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StyleConstants } from '../components';

export const Header = props => {
  return (
    <View style={styles.heading}>
      <Text style={styles.text}> {props.headingText} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.06 * Dimensions.get('window').height,
    width: 1 * Dimensions.get('window').width,
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black'
  }
});
