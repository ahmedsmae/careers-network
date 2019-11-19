import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';

import { selectRandomDate } from '../../../redux/api-utilities/api-utilities.selectors';

import URLS from '../../../redux/utils/urls';

const Experiences = ({
  experiences,
  employeeId,
  onExperiencePress,
  onExperienceLongPress,
  getCityNameById,
  randomDate
}) => {
  return (
    <>
      {!!experiences &&
        !!experiences.length &&
        experiences.map(exp => {
          const {
            position,
            organization,
            location_id,
            description,
            hasCertificate,
            from,
            current,
            to
          } = exp;

          return (
            <Card
              key={exp._id}
              style={{ margin: 5 }}
              onPress={onExperiencePress && onExperiencePress.bind(this, exp)}
              onLongPress={
                onExperienceLongPress && onExperienceLongPress.bind(this, exp)
              }
            >
              {hasCertificate && (
                <Card.Cover
                  source={{
                    //! change to serve experience image
                    uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${employeeId}/${exp._id}?t=${randomDate}`
                  }}
                />
              )}

              <Card.Content>
                {!!position && !!position.length && <Title>{position}</Title>}
                {!!organization && !!organization.length && (
                  <Paragraph>{organization}</Paragraph>
                )}
                {!!location_id && (
                  <Caption>{getCityNameById(location_id)}</Caption>
                )}
                {!!description && !!description.length && (
                  <Paragraph>{description}</Paragraph>
                )}
              </Card.Content>
            </Card>
          );
        })}
    </>
  );
};

export default connect(
  createStructuredSelector({ randomDate: selectRandomDate })
)(Experiences);
