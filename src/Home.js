import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Post from './Post';
import PostsList from './PostsList';
import SwipeableList from './SwipeableList';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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

export default class Home extends Component {
  state = {
    loading: true,
    posts: [],
    approvedPosts: [],
    rejectedPosts: [],
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

  onApprove = post => {
    const { posts, approvedPosts } = this.state;
    this.setState({
      approvedPosts: [...approvedPosts, post],
      posts: posts.filter(p => p.name !== post.name),
    });
  };

  onReject = post => {
    const { posts, rejectedPosts } = this.state;
    this.setState({
      rejectedPosts: [...rejectedPosts, post],
      posts: posts.filter(p => p.name !== post.name),
    });
  };

  render() {
    const { username } = this.props;
    const { loading, posts, approvedPosts, rejectedPosts } = this.state;
    return (
      <View>
        <View style={styles.navbar}>
          <Text style={styles.title}>
            Welcome {username}, to {subReddit.name}!
          </Text>
        </View>
        <ScrollableTabView locked>
          <SwipeableList
            onApprove={this.onApprove}
            onReject={this.onReject}
            loading={loading}
            posts={posts}
            tabLabel="All"
          />
          <PostsList posts={approvedPosts} tabLabel="Approved" />
          <PostsList posts={rejectedPosts} tabLabel="Rejected" />
        </ScrollableTabView>
      </View>
    );
  }
}
