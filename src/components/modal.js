import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';

import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { AppButton, StyleConstants, RightArrowIcon } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AllBucketsModal = props => {
  const { parent_buckets, child_buckets } = props.data;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.isModalVisible}
      >
        <ScrollView style={{ marginTop: 80 }}>
          <Content>
            <List>
              <ListItem itemDivider>
                <Text style={styles.listHeader}>Parent Buckets</Text>
              </ListItem>

              {parent_buckets.map((bucket, i) => {
                return (
                  <ListItem onPress={() => props.handleOnPress(bucket)} key ={i}>
                    <Text>{bucket.bucket_name}</Text>
                  </ListItem>
                );
              })}

              <ListItem itemDivider>
                <Text style={styles.listHeader}>Child Buckets</Text>
              </ListItem>
              {child_buckets.map((bucket, i) => {
                return (
                  <ListItem onPress={() => props.handleOnPress(bucket)}>
                    <Text>{bucket.bucket_name}</Text>
                  </ListItem>
                );
              })}
            </List>
          </Content>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 50
            }}
          >
            <AppButton
              title="Submit"
              handleOnPress={props.onSubmit}
              type="warning"
            />

            <AppButton
              title="Cancel"
              handleOnPress={props.onCancel}
              type="danger"
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 18
  }
});
