import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StyleConstants } from '../components';

export const Errors = props => {
  return (
    <View>
      <Text style={styles.text}>{props.errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red'
  }
});
