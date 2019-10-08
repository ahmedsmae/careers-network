import React from 'react';
import { View, Text } from 'react-native';
import { Paragraph } from 'react-native-paper';

import styles from './custom-header.styles';

const CustomHeader = ({ children }) => {
  return (
    <View style={styles.container}>
      <Paragraph style={styles.title}>{children}</Paragraph>
    </View>
  );
};

export default CustomHeader;
