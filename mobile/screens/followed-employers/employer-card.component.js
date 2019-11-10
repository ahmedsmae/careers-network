import React from 'react';
import { View } from 'react-native';
import { List, Card, Avatar } from 'react-native-paper';

import URLS from '../../redux/utils/urls';

const EmployerCard = ({ employer: { _id, name, speciality }, onPress }) => {
  return (
    <List.Item
      title={name}
      description={speciality}
      left={props => (
        <Avatar.Image
          {...props}
          size={60}
          style={{ marginRight: 10 }}
          source={{ uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${_id}` }}
        />
      )}
      onPress={onPress}
    />
  );
};

export default EmployerCard;
