import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Home from './Home';
import Login from './Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

export default class App extends Component {
  state = {
    loggedIn: false,
  };

  login = username => {
    this.setState({ loggedIn: true, username });
  };

  render() {
    const { username, loggedIn } = this.state;
    return (
      <View style={styles.container}>
        {loggedIn ? <Home username={username} /> : <Login login={this.login} />}
      </View>
    );
  }
}
