import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Post from './Post';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default class SwipeableList extends Component {
  renderNoMoreCards = () =>
    <View>
      <Text>Nothing more to see.</Text>
    </View>;

  handleOnClick = () => {
    Alert.alert('Swipe left to reject or swipe right to approve');
  };

  render() {
    const { loading, onApprove, onReject, posts } = this.props;
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <SwipeCards
        cards={posts}
        renderCard={post => <Post post={post} />}
        renderNoMoreCards={this.renderNoMoreCards}
        handleYup={onApprove}
        handleNope={onReject}
        yupText="Approved"
        nopeText="Rejected"
        onClickHandler={this.handleOnClick}
      />
    );
  }
}
