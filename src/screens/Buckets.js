import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  SectionList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import { ListItem, Divider } from 'react-native-elements';
import { Button, Container, Item, Form, Input } from 'native-base';
import { AddIcon, RightArrowIcon, BucketList, AppButton } from '../components';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as api from '../api';

export default class Buckets extends React.Component {
  // static navigationOptions  = {
  //   title: 'Details',
  // }

  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        buckets: [],
        parent_bucket: {}
      },
      modalVisible: false
    };

    this.onMenuPress = this.onMenuPress.bind(this);
    this.handleAddBucket = this.handleAddBucket.bind(this);
    this.openAddBucketModal = this.openAddBucketModal.bind(this);
  }

  componentDidMount() {
    const parent_bucket = this.props.navigation.getParam('bucket', null);
    api
      .getSecondaryBuckets(parent_bucket.bucket_id)
      .then(res => {
        this.setState({
          inputs: {
            buckets: res.data.buckets,
            parent_bucket: parent_bucket,
            bucket_name: '',
            description: ''
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange(text, input) {
    this.setState({
      inputs: Object.assign({}, this.state.inputs, { [input]: text })
    });
  }

  showModal() {
    if (this.state.modalVisible) {
      return (
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            handler={() => {
              this.handleAddBucket();
            }}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <Container style={{ marginTop: 100 }}>
              <Form>
                <Item stackedLabel>
                  <Input
                    placeholder="Bucket Name"
                    onChangeText={text =>
                      this.handleInputChange(text, 'bucket_name')
                    }
                  />
                </Item>

                <Item stackedLabel>
                  <Input
                    placeholder="Bucket Description"
                    onChangeText={text =>
                      this.handleInputChange(text, 'description')
                    }
                  />
                </Item>

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
                    handleOnPress={this.handleAddBucket}
                    type="warning"
                  />
                  <AppButton
                    title="Cancel"
                    handleOnPress={this.openAddBucketModal}
                    type="danger"
                  />
                </View>
              </Form>
            </Container>
          </Modal>
        </View>
      );
    } else {
      return null;
    }
  }

  onMenuPress(item) {
    this.props.navigation.navigate('Posts');
  }

  openAddBucketModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  handleAddBucket() {
    const payload = {
      bucket_name: this.state.inputs.bucket_name,
      description: this.state.inputs.description,
      parent_bucket_id: this.state.inputs.parent_bucket.bucket_id,
      type: 'child'
    };
    api
      .addBucket(payload)
      .then(response => {
        this.setState({ loading: true, modalVisible: false });
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        //failure callback
      });
  }

  render() {
    const { buckets, parent_bucket } = this.state.inputs;
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 30, paddingLeft: 10 }}>
            Buckets in {parent_bucket.bucket_name}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <BucketList data={buckets} onItemPress={this.onMenuPress} />
          {/* Add Icon */}
          <AddIcon handleIconClick={this.openAddBucketModal} />
          {this.showModal()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
