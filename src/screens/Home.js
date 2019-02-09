import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native';

import {
  AddIcon,
  RightArrowIcon,
  BucketList,
  AppButton,
  StyleConstants,
  Loading,
  Header
} from '../components';

import { Right, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Item, Form, Input, Label } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';

import deviceStorage from '../services/deviceStorage';

import * as api from '../api';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      modalVisible: false,
      loading: true,
      inputs: {
        buckets: [],
        bucket_name: '',
        descrption: '',
        type: ''
      }
    };

    this.onMenuPress = this.onMenuPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddBucket = this.handleAddBucket.bind(this);
    this.openAddBucketModal = this.openAddBucketModal.bind(this);
  }

  componentDidMount() {
    api
      .getPrimaryBuckets()
      .then(response => {
        this.setState({
          inputs: {
            buckets: response.data.buckets
          },
          loading: false
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

  onMenuPress(bucket) {
    if (bucket.type === 'parent') {
      this.props.navigation.navigate('Buckets', {
        bucket: bucket
      });
    } else {
      this.props.navigation.navigate('Posts', {
        bucket: bucket
      });
    }
  }

  handleLogout() {
    deviceStorage.deleteJWT();
  }

  openAddBucketModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  onSelect = (index, value, selectedOption) => {
    let option = '';
    if (value === 'Create buckets inside this bucket') {
      option = 'parent';
    } else {
      option = 'child';
    }
    this.setState({
      inputs: Object.assign({}, this.state.inputs, { [selectedOption]: option })
    });
  };

  handleAddBucket() {
    this.setState({
      loading: true
    });
    const payload = {
      bucket_name: this.state.inputs.bucket_name,
      description: this.state.inputs.description,
      type: this.state.inputs.type
    };
    api
      .addBucket(payload)
      .then(response => {
        this.setState({ loading: false, modalVisible: false });
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        //failure callback
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
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>
                  Select Template
                </Text>
                <View style={{ marginTop: 10 }}>
                  <ModalDropdown
                    animated={false}
                    options={[
                      'Create posts inside Bucket',
                      'Create buckets inside this bucket'
                    ]}
                    style={styles.button}
                    textStyle={{ fontSize: 17 }}
                    dropdownTextStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdown}
                    onSelect={(index, value) =>
                      this.onSelect(index, value, 'type')
                    }
                  />
                </View>

                <Divider />

                <Item stackedLabel floatingLabel>
                  <Label>Bucket Name</Label>

                  <Input
                    onChangeText={text =>
                      this.handleInputChange(text, 'bucket_name')
                    }
                  />
                </Item>

                <Item stackedLabel floatingLabel>
                  <Label>Bucket Description</Label>
                  <Input
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

  render() {
    const { buckets } = this.state.inputs;
    return (
      <View style={styles.container}>
        <Header headingText={'Buckets'} />

        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <BucketList data={buckets} onItemPress={this.onMenuPress} />
          </View>
        </ScrollView>

        <View style={styles.addButton}>
          <AddIcon handleIconClick={this.openAddBucketModal} />
        </View>
        {this.showModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  addButton: {
    height: 0.07 * Dimensions.get('window').height
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    color: 'black'
  },
  textBox: {
    width: 0.9 * Dimensions.get('window').width,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: StyleConstants.pallete.black,
    padding: 10
  },
  dropdown: {
    width: 300,
    fontSize: 17,
    backgroundColor: StyleConstants.pallete.grey
  },
  dropdownText: {
    fontSize: 17,
    backgroundColor: StyleConstants.pallete.white,
    color: StyleConstants.pallete.black
  },
  rightcorner: {
    alignSelf: 'flex-end',
    color: 'red',
    backgroundColor: 'yellow'
  }
});
