import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text
} from 'native-base';
import { StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import * as api from '../api';
import deviceStorage from '../services/deviceStorage';

export default class Signup extends Component {
  static navigationOptions  = {
    title: 'Signup',
  }
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        confirm_password: ''
      },
      loading: false
    };
    this._handleSignUp = this._handleSignUp.bind(this);
  }

  componentDidMount() {
    // console.log('this.props', this.props.navigation.navigate('Login'));
  }

  _handleSignUp() {
    const payload = {
      first_name: this.state.inputs.first_name,
      last_name: this.state.inputs.last_name,
      email: this.state.inputs.email,
      password: this.state.inputs.password,
      confirm_password: this.state.inputs.confirm_password,
      username: this.state.inputs.username
    };
    api
      .localSignup(payload)
      .then(response => {
        deviceStorage.saveItem('jwt', response.data.token);
        this.props.newJWT(response.data.token);
        this.props.navigation.navigate('Home');
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

  render() {
    return (
      <Container style={{ marginTop: 40 }}>
        {/* <Header /> */}
        <Content>
          <Form>
            <Item stackedLabel>
              <Input
                placeholder="First Name"
                onChangeText={text =>
                  this.handleInputChange(text, 'first_name')
                }
              />
            </Item>

            <Item stackedLabel>
              <Input
                placeholder="Last Name"
                onChangeText={text => this.handleInputChange(text, 'last_name')}
              />
            </Item>

            <Item stackedLabel>
              <Input
                placeholder="Username"
                onChangeText={text => this.handleInputChange(text, 'username')}
              />
            </Item>

            <Item stackedLabel>
              <Input
                placeholder="Email"
                onChangeText={text => this.handleInputChange(text, 'email')}
              />
            </Item>

            <Item stackedLabel>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => this.handleInputChange(text, 'password')}
              />
            </Item>

            <Item stackedLabel>
              <Input
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={text =>
                  this.handleInputChange(text, 'confirm_password')
                }
              />
            </Item>

            <TouchableOpacity
              style={styles.button}
              onPress={this._handleSignUp}
            >
              <Text> Sign up </Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 25
  }
});
