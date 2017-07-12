import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';

import Post from './Post';

export default function PostsList({ posts }) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post key={item.name} post={item} />}
    />
  );
}
