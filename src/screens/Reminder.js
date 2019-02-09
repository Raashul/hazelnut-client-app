import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Right, Header, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AddIcon, RightArrowIcon, ReminderList } from '../components';

import * as api from '../api';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        reminders: []
      }
    }
    this.handleAddReminder = this.handleAddReminder.bind(this);
  }

  componentDidMount() {
    api.getAllReminders()
      .then(response => {
        this.setState({
          inputs: {reminders: response.data.reminders}
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleAddReminder() {
    this.props.navigation.navigate('AddReminder');
  }

  render() {
    const { reminders } = this.state.inputs;
    return (
      <View style={{ flex: 1 }}>
        <ReminderList data={ reminders }/>
        <AddIcon handleIconClick={this.handleAddReminder} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    paddingLeft: 5,
    marginTop: 10
  },
  listHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666666',
    paddingLeft: 10
  },
  listDescription: {
    paddingLeft: 10,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
    color: '#909581'
  }
});
