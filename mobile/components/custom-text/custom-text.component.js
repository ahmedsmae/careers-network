import React from 'react';
import { View } from 'react-native';
import { Caption, Title } from 'react-native-paper';

import styles from './custom-text.styles';

const CustomText = ({ label, children, placeholder }) => {
  return (
    <View style={styles.container}>
      <Caption style={styles.label}>{label}</Caption>
      <Title style={styles.title}>
        {children && children.toString().length > 0 ? children : placeholder}
      </Title>
    </View>
  );
};

export default CustomText;
