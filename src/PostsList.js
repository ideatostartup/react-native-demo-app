import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';

import Post from './Post';
import EmptyScreen from './EmptyScreen';

export default function PostsList({ posts }) {
  if (posts.length === 0) {
    return <EmptyScreen />;
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post key={item.name} post={item} />}
    />
  );
}
