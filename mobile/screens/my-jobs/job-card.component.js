import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';

import { selectCityNameById } from '../../redux/constants/constants.selectors';

const JobCard = ({
  job: {
    _id,
    owner,
    position,
    location_id,
    referance_number,
    status,
    applying_email,
    applying_link,
    responsibilities,
    requirements,
    min_salary,
    max_salary,
    currency,
    other_info,
    keywords,
    expiry,
    questions
  },
  getCityName,
  onPress
}) => {
  return (
    <Card style={{ margin: 10 }} onPress={onPress}>
      <Card.Content>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: status === 'AVAILABLE' ? 'green' : 'red',
              width: 5,
              borderRadius: 5,
              marginRight: 10
            }}
          />
          <View>
            <Title>{position}</Title>
            {!!location_id && <Paragraph>{getCityName(location_id)}</Paragraph>}
            {!!referance_number && (
              <Caption>{`Ref #: ${referance_number}`}</Caption>
            )}
            {!!min_salary && !!max_salary && (
              <Caption>{`Salary: ${min_salary} - ${max_salary}`}</Caption>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = state => ({
  getCityName: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(JobCard);
