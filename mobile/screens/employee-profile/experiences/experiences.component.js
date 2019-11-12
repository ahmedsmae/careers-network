import React from 'react';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';

import URLS from '../../../redux/utils/urls';

const Experiences = ({
  employee: { _id, experiences },
  onExperiencePress,
  onExperienceLongPress,
  getCityNameById
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
                    uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${_id}/${exp._id}` //! change to serve experience image
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

export default Experiences;
