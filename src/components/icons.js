import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

import { StyleConstants } from '../components';

import Icon from 'react-native-vector-icons/FontAwesome';

export const AddIcon = props => {
  return (
    <View style={styles.AddIconStyle}>
      <TouchableHighlight onPress={props.handleIconClick}>
        <Icon
          name="plus-circle"
          size={40}
          // style={{color: 'black', shadowOpacity: 0.4}}
        />
      </TouchableHighlight>
    </View>
  );
};

export const RightArrowIcon = props => {
  return (
    <View style={styles.RightArrowIcon}>
      <TouchableHighlight
      //onPress={props.handleIconClick}
      >
        <Icon
          name="arrow-right"
          size={17}
          style={{ color: StyleConstants.pallete.light_grey }}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  AddIconStyle: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 20
  },
  RightArrowIcon: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 20
  }
});
