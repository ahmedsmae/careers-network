import React from 'react';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';

const ExperienceCard = ({
  experience: {
    certificate_image,
    position,
    organization,
    location_id,
    description,
    from,
    current,
    to
  }
}) => {
  return (
    <Card>
      {certificate_image && <Card.Cover source={{ uri: certificate_image }} />}
      <Card.Content>
        {position && position.length && <Title>{position}</Title>}
        {organization && organization.length && (
          <Caption>{organization}</Caption>
        )}
        {location_id && <Caption>{getLocationName(location_id)}</Caption>}
        {description && description.length && (
          <Paragraph>{description}</Paragraph>
        )}
      </Card.Content>
    </Card>
  );
};

export default ExperienceCard;
