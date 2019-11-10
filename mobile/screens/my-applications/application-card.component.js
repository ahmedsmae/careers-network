import React from 'react';
import { View } from 'react-native';
import { Card, List, Avatar } from 'react-native-paper';

import URLS from '../../redux/utils/urls';

const ApplicationCard = ({ application, onPress }) => {
  const {
    job: { position, owner, employerName, questions }
  } = application;

  return (
    <List.Item
      // disabled={!questions || questions.length === 0 ? true : false}
      title={position}
      description={employerName}
      left={props => (
        <Avatar.Image
          {...props}
          size={60}
          style={{ marginRight: 10 }}
          source={{ uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${owner}` }}
        />
      )}
      onPress={onPress}
    />
  );
};

export default ApplicationCard;
