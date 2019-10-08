import React from 'react';
import { Image } from 'react-native';

import DefaultUserImage from '../../assets/user.png';

import styles from './user-image.styles';

const UserImage = ({ source }) => {
  return (
    <Image
      style={styles.img}
      source={source ? { uri: source } : DefaultUserImage}
    />
  );
};

export default UserImage;
