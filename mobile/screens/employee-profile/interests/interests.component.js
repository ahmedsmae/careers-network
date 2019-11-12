import React from 'react';
import { Paragraph, Card } from 'react-native-paper';

const Interests = ({ interests, onLongPress }) => {
  // const ints = [
  //   { _id: '0', interest: 'Web Development', award: 'Nothing' },
  //   { _id: '1', interest: 'Android', award: '1MAC' }
  // ];

  return (
    <>
      {interests.map(({ _id, interest, award }) => (
        <Card
          key={_id}
          style={{ margin: 10 }}
          onLongPress={onLongPress && onLongPress}
        >
          <Card.Title title={interest} />
          <Card.Content>
            <Paragraph>{award}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default Interests;
