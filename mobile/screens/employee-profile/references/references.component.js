import React from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const References = ({ references, onReferencePress, onReferenceLongPress }) => {
  return (
    <>
      {references &&
        references.map(ref => {
          const { _id, name, position, company, email, contact_number } = ref;
          return (
            <Card
              key={_id}
              style={{ margin: 10 }}
              onPress={onReferencePress && onReferencePress.bind(this, ref)}
              onLongPress={
                onReferenceLongPress && onReferenceLongPress.bind(this, ref)
              }
            >
              <Card.Title title={name} subtitle={position} />} />
              <Card.Content>
                <Title>{company}</Title>
                <Paragraph>{email}</Paragraph>
                <Paragraph>{contact_number}</Paragraph>
              </Card.Content>
            </Card>
          );
        })}
    </>
  );
};

export default References;
