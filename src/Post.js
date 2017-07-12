import React, { PropTypes } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  post: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
});

export default function Post({ post }) {
  const { name, title, thumbnail, thumbnail_height, thumbnail_width } = post;
  return (
    <View style={styles.post} key={name}>
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
}
