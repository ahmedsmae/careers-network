import React from 'react';
import { Image } from 'react-native';

import DefaultUserImage from '../../assets/user.png';

import styles from './user-image.styles';

const UserImage = ({ source, small, medium, large, style }) => {
  let builtInStyle = small
    ? styles.small
    : medium
    ? styles.medium
    : large
    ? styles.large
    : {};

  return (
    <Image
      style={{ ...builtInStyle, ...style }}
      source={source ? { uri: source } : DefaultUserImage}
    />
  );
};

export default UserImage;
