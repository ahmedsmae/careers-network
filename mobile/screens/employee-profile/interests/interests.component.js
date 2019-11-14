import React from "react";
import { Paragraph, Card } from "react-native-paper";

const Interests = ({ interests, onInterestLongPress }) => {
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
          onLongPress={
            onInterestLongPress && onInterestLongPress.bind(this, _id)
          }
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
