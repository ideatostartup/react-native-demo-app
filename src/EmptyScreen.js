import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import commonStyles from './commonStyles';

export default function EmptyScreen() {
  return (
    <View style={commonStyles.container}>
      <Text>Oh No....Its all empty....Please visit later</Text>
    </View>
  );
}
