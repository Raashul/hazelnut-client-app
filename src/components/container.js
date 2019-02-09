import { View, StyleSheet, Dimensions, Text } from 'react-native';
import React from 'react';
import { StyleConstants } from '../components';

export const Container = props => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.7 * Dimensions.get('window').height
  }
});
