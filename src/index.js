import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
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
  navbar: {
    backgroundColor: 'white',
    height: 40,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const subReddit = { slug: 'aww', name: 'Aww' };

export default class App extends Component {
  state = {
    loading: true,
    loggedIn: false,
    password: '',
    posts: [],
    approvedPosts: [],
    rejectedPosts: [],
    showErrorMessage: false,
    username: '',
  };

  async componentDidMount() {
    const posts = await this.getPostsFromApi();
    this.setState({ posts, loading: false });
  }

  getPostsFromApi = async () => {
    try {
      let response = await fetch(
        `https://www.reddit.com/r/${subReddit.slug}.json`,
      );
      let responseJson = await response.json();
      return responseJson.data.children.map(child => child.data);
    } catch (error) {
      console.error(error);
    }
  };

  login = () => {
    const { username, password } = this.state;
    if (username && password === 'password') {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ showErrorMessage: true });
      setTimeout(() => {
        this.setState({ showErrorMessage: false });
      }, 2000);
    }
  };

  handleYup = post => {
    const { posts, approvedPosts } = this.state;
    this.setState({
      approvedPosts: [...approvedPosts, post],
      posts: posts.filter(p => p.name !== post.name),
    });
  };

  handleNope = post => {
    const { posts, rejectedPosts } = this.state;
    this.setState({
      rejectedPosts: [...rejectedPosts, post],
      posts: posts.filter(p => p.name !== post.name),
    });
  };

  renderPost = post => {
    const { name, title, thumbnail, thumbnail_height, thumbnail_width } = post;
    return (
      <View
        style={[styles.centered, { margin: 10, backgroundColor: 'white' }]}
        key={name}
      >
        <Text>
          {title}
        </Text>
        <Image
          style={{
            height: thumbnail_height,
            width: thumbnail_width,
          }}
          source={{ uri: thumbnail }}
        />
      </View>
    );
  };

  renderNoMoreCards = () =>
    <View>
      <Text>Nothing more to see.</Text>
    </View>;

  render() {
    const {
      username,
      password,
      loading,
      loggedIn,
      posts,
      approvedPosts,
      rejectedPosts,
      showErrorMessage,
    } = this.state;

    const All = () =>
      loading
        ? <View style={[styles.centered, { flex: 1 }]}>
            <Text>Loading...</Text>
          </View>
        : <SwipeCards
            cards={posts}
            renderCard={post => this.renderPost(post)}
            renderNoMoreCards={() => this.renderNoMoreCards()}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
            yupText="Approved"
            nopeText="Rejected"
            onClickHandler={() => {
              Alert.alert('Swipe left to reject or swipe right to approve');
            }}
          />;

    const Approved = () =>
      <FlatList
        data={approvedPosts}
        renderItem={({ item }) => this.renderPost(item)}
      />;

    const Rejected = ({ data }) =>
      <FlatList
        data={rejectedPosts}
        renderItem={({ item }) => this.renderPost(item)}
      />;

    return (
      <View style={styles.container}>
        {loggedIn
          ? <View>
              <View style={styles.navbar}>
                <Text style={styles.title}>
                  Welcome, {username} to {subReddit.name}!
                </Text>
              </View>
              <ScrollableTabView
                style={{ marginTop: 20 }}
                renderTabBar={() => <DefaultTabBar />}
                locked
              >
                <All tabLabel="All" />
                <Approved tabLabel="Approved" />
                <Rejected tabLabel="Rejected" />
              </ScrollableTabView>
            </View>
          : <View style={styles.centered}>
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
            </View>}
      </View>
    );
  }
}
