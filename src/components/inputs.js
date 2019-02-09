import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import { StyleConstants, RightArrowIcon } from '../components';
import { Divider } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

export const List = props => {
  return (
    <ScrollView>
      {props.data.map((l, i) => (
        <View style={styles.listStyle} key={i}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.listHeader}>{l.name}</Text>
              <Text style={styles.listDescription}>{l.description}</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end'
              }}
            >
              <RightArrowIcon />
            </View>
          </View>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};

export const ReminderList = props => {
  return (
    <ScrollView>
      {props.data.map((l, i) => (
        <View style={styles.listStyle} key={i}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.listHeader}>{l.bucket_name}</Text>
              <Text style={styles.listDescription}>
                {l.number_of_posts} post on {l.day}{' '}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end'
              }}
            >
              <RightArrowIcon />
            </View>
          </View>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};

export const BucketList = props => {
  return (
    <ScrollView>
      {props.data.map((bucket, i) => (
        <View style={styles.listStyle} key={i}>
          <TouchableHighlight onPress={() => props.onItemPress(bucket)}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.listHeader}>{bucket.bucket_name}</Text>
                <Text style={styles.listDescription}>{bucket.description}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end'
                }}
              >
                <RightArrowIcon />
              </View>
            </View>
          </TouchableHighlight>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};

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
