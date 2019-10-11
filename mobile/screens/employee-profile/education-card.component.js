import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';

import { selectCityNameById } from '../../redux/constants/constants.selectors';

import URLS from '../../redux/utils/urls';

const EducationCard = ({
  employeeId,
  education: {
    _id,
    subject,
    institute,
    location_id,
    description,
    from,
    current,
    to,
    hasCertificate
  },
  getCityNameById,
  onPress,
  onLongPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Card style={{ margin: 10 }}>
        {hasCertificate && (
          <Card.Cover
            source={{
              uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${employeeId}/${_id}`
            }}
          />
        )}

        <Card.Content>
          {!!subject && !!subject.length && <Title>{subject}</Title>}
          {!!institute && !!institute.length && (
            <Paragraph>{institute}</Paragraph>
          )}
          {!!location_id && <Caption>{getCityNameById(location_id)}</Caption>}
          {!!description && !!description.length && (
            <Paragraph>{description}</Paragraph>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  getCityNameById: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(EducationCard);
