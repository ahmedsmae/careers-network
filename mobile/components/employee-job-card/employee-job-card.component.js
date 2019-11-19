import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';

import { selectCityNameById } from '../../redux/constants/constants.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';

import URLS from '../../redux/utils/urls';

const EmployeeJobCard = ({
  job: {
    owner: { _id, name },
    position,
    location_id
  },
  getCityName,
  randomDate,
  onPress
}) => {
  return (
    <Card style={{ margin: 10 }} onPress={onPress}>
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <Image
          style={{ marginRight: 10, width: 80, height: 80, borderRadius: 5 }}
          source={{
            uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${_id}?r=${randomDate}`
          }}
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
  getCityName: id => selectCityNameById(id)(state),
  randomDate: selectRandomDate(state)
});

export default connect(mapStateToProps)(EmployeeJobCard);
