import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    padding: 10,
    margin: 10,
    height: 40,
    width: width * 0.8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  loginForm: {
    backgroundColor: '#fff',
    padding: 10,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Login extends Component {
  state = {
    password: '',
    showErrorMessage: false,
    username: '',
  };

  login = () => {
    const { username, password } = this.state;
    if (username && password === 'password') {
      this.props.login(username);
    } else {
      this.setState({ showErrorMessage: true });
      setTimeout(() => {
        this.setState({ showErrorMessage: false });
      }, 2000);
    }
  };

  render() {
    const { password, showErrorMessage, username } = this.state;
    return (
      <View style={styles.centered}>
        <View style={styles.loginForm}>
          <Text style={styles.welcome}>Welcome!</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={username}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={password}
          />
          <Button
            onPress={this.login}
            title="Login"
            color="#666"
            accessibilityLabel="Login"
          />
        </View>
        {showErrorMessage
          ? <Text>Please enter correct credentials</Text>
          : null}
      </View>
    );
  }
}
