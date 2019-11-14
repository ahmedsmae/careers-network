import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';

import { selectCityNameById } from '../../redux/constants/constants.selectors';

import UserImage from '../../components/user-image/user-image.component';

import URLS from '../../redux/utils/urls';

const JobCard = ({
  job: {
    owner: { _id, name },
    position,
    location_id
  },
  getCityName,
  onPress
}) => {
  return (
    <Card style={{ margin: 10 }} onPress={onPress}>
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <UserImage
          medium
          source={`${URLS.SERVE_EMPLOYER_AVATAR}/${_id}`}
          style={{ marginRight: 10 }}
        />

        <View>
          <Title>{position}</Title>
          <Paragraph>{name}</Paragraph>
          <Caption>{getCityName(location_id)}</Caption>
        </View>
      </View>
    </Card>
  );
};

const mapStateToProps = state => ({
  getCityName: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(JobCard);
