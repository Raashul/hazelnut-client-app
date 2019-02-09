import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';

import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import { StyleConstants, RightArrowIcon } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';

export const BucketListPicker = props => {
  return (
    <ScrollView>
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>A</Text>
          </ListItem>
          <ListItem>
            <Text>Aaron Bennet</Text>
          </ListItem>
          <ListItem>
            <Text>Ali Connors</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>B</Text>
          </ListItem>
          <ListItem>
            <Text>Bradley Horowitz</Text>
          </ListItem>
        </List>
      </Content>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
