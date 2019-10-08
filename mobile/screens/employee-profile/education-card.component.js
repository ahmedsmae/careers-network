import React from 'react';
import { Card, Title, Caption, Paragraph, Text } from 'react-native-paper';

const EducationCard = ({
  education: {
    certificate_image,
    subject,
    institute,
    location_id,
    description,
    from,
    current,
    to
  }
}) => {
  return (
    <Card>
      {!!certificate_image && (
        <Card.Cover source={{ uri: certificate_image }} />
      )}
      <Card.Content>
        {!!subject && !!subject.length && <Title>{subject}</Title>}
        {!!institute && !!institute.length && <Caption>{institute}</Caption>}
        {!!location_id && <Caption>{getLocationName(location_id)}</Caption>}
        {!!description && !!description.length && (
          <Paragraph>{description}</Paragraph>
        )}
      </Card.Content>
    </Card>
  );
};

export default EducationCard;
