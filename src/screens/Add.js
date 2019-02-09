import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput } from 'react-native';

import { AppButton, StyleConstants, Errors, Loading } from '../components';
import { Divider } from 'react-native-elements';

import { Dimensions } from 'react-native';
import deviceStorage from '../services/deviceStorage';
import ModalDropdown from 'react-native-modal-dropdown';

import {
  Container,
  Header,
  Content,
  Textarea,
  Form,
  Picker,
  Button,
  Item,
  Text,
  Input,
  Icon
} from 'native-base';

import * as api from '../api';

// import CameraComponent  from '../components/camera';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        type: '',
        bucket_id: '',
        selectedBucket: '',
        availableBuckets: [],
        content: ''
      },
      errors: {
        visible: false,
        buckets: false,
        description: false,
        message: ''
      },
      displayTextModal: false,
      loading: true
    };

    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.findBucketId = this.findBucketId.bind(this);
    this.oncheckErrors = this.checkErrors.bind(this);

    this.loadJWT();
  }

  componentDidMount() {
    ///get list of available buckets
    api
      .getAllChildBuckets()
      .then(response => {
        this.setState({
          inputs: {
            availableBuckets: response.data.buckets,
            type: 'text'
          },
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange = (text, input) => {
    this.setState({
      inputs: Object.assign({}, this.state.inputs, { [input]: text })
    });
  };

  handleValueChange(value, input) {
    this.setState({
      inputs: Object.assign({}, this.state.inputs, { [input]: value })
    });
  }

  findBucketId(bucketName) {
    const { availableBuckets } = this.state.inputs;
    const bucket = availableBuckets.find(b => {
      return b.bucket_name === bucketName;
    });
    return bucket;
  }

  checkErrors = () => {
    if (!this.state.inputs.content && !this.state.inputs.selectedBucket) {
      this.setState({
        errors: {
          visible: true,
          description: true,
          buckets: true,
          message: 'Opps! Did Something Wrong'
        }
      });
    } else if (!this.state.inputs.content) {
      this.setState({
        errors: {
          visible: true,
          description: true,
          buckets: false,
          message: 'Opps! Did Something Wrong'
        }
      });
    } else if (!this.state.inputs.selectedBucket) {
      this.setState({
        errors: {
          visible: true,
          description: false,
          buckets: true,
          message: 'Opps! Did Something Wrong'
        }
      });
    } else {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    const bucket = this.findBucketId(this.state.inputs.selectedBucket);
    const payload = {
      bucket_id: bucket.bucket_id,
      type: 'text',
      content: this.state.inputs.content
    };

    api
      .postWithText(payload)
      .then(response => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log('Printing form here');
        console.log(err);
      });
  };

  render() {
    const { availableBuckets } = this.state.inputs;
    return (
      <View style={styles.container}>
        {this.state.errors.visible && (
          <Text style={{ color: 'red' }}> {this.state.errors.message} </Text>
        )}
        <Loading load={this.state.loading}> </Loading>
        <View style={{ flexDirection: 'row' }}>
          <Text h3 style={{ paddingTop: 10 }}>
            Select type of Post:
          </Text>
          <View style={{ marginLeft: 15 }}>
            <Picker
              mode="dropdown"
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select type of post"
              style={{ width: undefined }}
              textStyle={{ fontSize: 15, color: 'black' }}
              selectedValue={this.state.inputs.type}
              onValueChange={value => this.handleValueChange(value, 'type')}
            >
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Image" value="image" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'column' }}>
          <View>
            {this.state.errors.buckets && (
              <Errors text={'You need to select the available bucket'} />
            )}
          </View>
          <Text style={{ paddingTop: 10 }}>Select from available buckets:</Text>
          <View style={{ marginLeft: 15 }}>
            <Picker
              mode="dropdown"
              placeholder="Select"
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="arrow-down" />}
              textStyle={{ fontSize: 15, color: 'black' }}
              selectedValue={this.state.inputs.selectedBucket}
              onValueChange={value =>
                this.handleValueChange(value, 'selectedBucket')
              }
            >
              {availableBuckets.map((bucket, i) => {
                return (
                  <Picker.Item
                    label={bucket.bucket_name}
                    value={bucket.bucket_name}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        {this.state.inputs.type === 'text' ? (
          <Container>
            <Content padder>
              <Form>
                <View style={{ flexDirection: 'column' }}>
                  <View>
                    {this.state.errors.description && (
                      <Errors
                        text={'You need to specify what you want to store'}
                      />
                    )}
                  </View>
                  <Text style={styles.text}>Description: </Text>
                </View>
                <View>
                  <Textarea
                    rowSpan={5}
                    style={{
                      width: 300,
                      borderColor: 'black',
                      borderRadius: 5
                    }}
                    bordered
                    placeholder="Enter post description."
                    placeholderTextColor="black"
                    onChangeText={text =>
                      this.handleInputChange(text, 'content')
                    }
                  />
                </View>

                <View style={{ marginTop: 30, alignSelf: 'center' }}>
                  <AppButton
                    title="Add Post"
                    handleOnPress={this.checkErrors}
                    type="success"
                  />
                </View>
              </Form>
            </Content>
          </Container>
        ) : null
        // <CameraComponent />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 0.05 * Dimensions.get('window').width
  }
});
