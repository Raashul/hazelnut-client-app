import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import * as api from '../api';
import deviceStorage from '../services/deviceStorage';
import {
  Header,
  Input,
  Container,
  LoginButton,
  Loading,
  Errors,
  Atag
} from '../components';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        password: '',
        email: ''
      },
      loading: false,
      error: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.gotoSignup = this.gotoSignup.bind(this);
  }

  handleInputChange(text, input) {
    this.setState({
      inputs: Object.assign({}, this.state.inputs, { [input]: text })
    });
  }

  gotoSignup() {
    this.props.navigation.navigate('Signup');
  }

  handleLogin() {
    this.setState({
      loading: true,
      error: false
    });

    const payload = {
      email: this.state.inputs.email,
      password: this.state.inputs.password
    };

    api
      .localLogin(payload)
      .then(response => {
        deviceStorage.saveItem('jwt', response.data.token);
        this.setState({
          loading: false
        });
        this.props.navigation.navigate('App');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    return (
      <View>
        <Header headingText="Hazelnut App" />
        <Loading load={this.state.loading} />
        <Container>
          {this.state.error && (
            <Errors
              errorMessage={
                'Opps! Your email or password is invalid. \nTry Again'
              }
            />
          )}
          <Input
            label={'Email: '}
            placeholder={'Email'}
            onChangeText={text => this.handleInputChange(text, 'email')}
          />
          <Input
            label={'Password: '}
            secureTextEntry={true}
            placeholder={'Password'}
            onChangeText={text => this.handleInputChange(text, 'password')}
          />
          <LoginButton title={'Login'} handleOnPress={this.handleLogin} />
          <Atag
            text={"Don't have an account yet!"}
            handleClick={this.gotoSignup}
          />
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
