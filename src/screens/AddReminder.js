import React, { Component } from 'react';
import _ from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Button, Modal, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body,
  Left,
  Right,
  Title,
  Subtitle
} from 'native-base';
import {
  AppButton,
  AllBucketsModal,
  SelectDayButton,
  FullButton,
  StyleConstants,
  BucketListPicker
} from '../components';

import * as api from '../api';
import { Divider } from 'react-native-elements';

export default class AddReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        buckets: {}
      },
      selected: {
        bucket: {},
        days: [],
        time: ''
      },
      checked: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
      },
      isDaysModalVisible: false,
      isBucketModalVisible: false,
      isTimeModalVisible: false
    };
    this.openModal = this.openModal.bind(this);
    this.showDaysModal = this.showDaysModal.bind(this);
    this.handleAddDaysButtonPress = this.handleAddDaysButtonPress.bind(this);
    this.handleBucketSelection = this.handleBucketSelection.bind(this);
    this.showSelectedBuckets = this.showSelectedBuckets.bind(this);
    this.showSelectedDays = this.showSelectedDays.bind(this);
    this.showSelectedTime = this.showSelectedTime.bind(this);
    this.handleReminderSubmit = this.handleReminderSubmit.bind(this);
  }

  componentDidMount() {
    console.log('this.props in add reminder', this.props);

    api
      .getAllBucketsByType()
      .then(response => {
        this.setState({
          inputs: { buckets: response.data }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAddDaysButtonPress() {
    this.openAddBucketModal();
    console.log('this.state checking', this.state.checked);
  }

  openModal(type) {
    this.setState({ [type]: !this.state[type] });
  }

  handleBucketSelection(bucket) {
    this.setState({
      selected: Object.assign({}, this.state.selected, { bucket: bucket })
    });
    this.openModal('isBucketModalVisible');
  }

  handleAddDaysButtonPress() {
    let selectedDays = [];
    const days = this.state.checked;
    for (day in days) {
      if (days[day] == true) {
        selectedDays.push(day);
      }
    }

    this.setState({
      selected: Object.assign({}, this.state.selected, { days: selectedDays })
    });
    this.openModal('isDaysModalVisible');
  }

  handleTimePick = timestamp => {
    this.setState({
      selected: Object.assign({}, this.state.selected, {
        time: `${timestamp.getHours()}:${timestamp.getMinutes()}`
      })
    });
    this.openModal('isTimeModalVisible');
  };

  showSelectedBuckets() {
    const { bucket } = this.state.selected;
    if (!_.isEmpty(bucket)) {
      return (
        <View style={styles.selectionViewStyle}>
          <Text style={styles.selectionTextStyle}>
            You selected {bucket.bucket_name}
          </Text>
        </View>
      );
    } else return null;
  }

  showSelectedDays() {
    let show = `You selected `;
    const days = this.state.checked;
    for (day in days) {
      if (days[day] == true) {
        show += `${day} `;
      }
    }
    if (show != 'You selected ') {
      return (
        <View style={styles.selectionViewStyle}>
          <Text style={styles.selectionTextStyle}>{show}</Text>
        </View>
      );
    } else return null;
  }

  showSelectedTime() {
    const { time } = this.state.selected;
    if (time.length > 0) {
      return (
        <View style={styles.selectionViewStyle}>
          <Text style={styles.selectionTextStyle}>You selected: {time}</Text>
        </View>
      );
    } else return null;
  }

  showDaysModal() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    if (this.state.isDaysModalVisible) {
      return (
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isDaysModalVisible}
            handleSubmit={this.handleAddDaysButtonPress}
          >
            <Container style={{ marginTop: 80 }}>
              {days.map((day, i) => {
                return (
                  <View key={i}>
                    <ListItem>
                      <CheckBox
                        color={StyleConstants.pallete.green}
                        onPress={() => {
                          this.setState({
                            checked: Object.assign({}, this.state.checked, {
                              [day]: !this.state.checked[day]
                            })
                          });
                        }}
                        checked={this.state.checked[day]}
                      />
                      <Body>
                        <Text>{day}</Text>
                      </Body>
                    </ListItem>
                  </View>
                );
              })}
              <View style={{ marginTop: 20, alignSelf: 'center' }}>
                <FullButton
                  title="Confirm Days"
                  type="success"
                  handleOnPress={this.handleAddDaysButtonPress}
                />
              </View>
            </Container>
          </Modal>
        </View>
      );
    } else {
      return null;
    }
  }

  handleReminderSubmit() {
    const { days, bucket, time } = this.state.selected;
    const payload = {
      type: 'weekly',
      bucket_id: bucket.bucket_id,
      bucket_name: bucket.bucket_name,
      time: time,
      days: days,
      number_of_posts: 1
    };
    api.addSpecificReminder(payload)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { isBucketModalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <View style={{ marginTop: 20 }}>
            <FullButton
              title="Select Bucket"
              color={StyleConstants.pallete.black}
              handleOnPress={() => this.openModal('isBucketModalVisible')}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <SelectDayButton
              title="Select Day"
              handleOnPress={() => this.openModal('isDaysModalVisible')}
            />
          </View>

          {isBucketModalVisible ? (
            <AllBucketsModal
              data={this.state.inputs.buckets}
              isModalVisible={this.state.isBucketModalVisible}
              handleOnPress={this.handleBucketSelection}
              // onSubmit = { this.handleSubmitDays }
              onCancel={() => this.openModal('isBucketModalVisible')}
            />
          ) : null}

          <View style={{ marginTop: 20 }}>
            <FullButton
              title="Select Time"
              color={StyleConstants.pallete.black}
              handleOnPress={() => this.openModal('isTimeModalVisible')}
            />
          </View>

          <DateTimePicker
            onConfirm={this.handleTimePick}
            onCancel={() => this.openModal('isTimeModalVisible')}
            isVisible={this.state.isTimeModalVisible}
            mode="time"
          />

          <Divider />

          <View style={{ marginTop: 100, paddingLeft: 10 }}>
            {this.showSelectedBuckets()}
            {this.showSelectedDays()}
            {this.showSelectedTime()}
            <View style={{ marginTop: 20, justifyContent: 'center' }}>
              <AppButton
                title="Submit"
                handleOnPress={this.handleReminderSubmit}
                type="success"
              />
            </View>
          </View>

          {/* Show Modal */}
          {this.showDaysModal()}
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectionTextStyle: {
    fontSize: 20
  },
  selectionViewStyle: {
    marginTop: 20
  }
});
