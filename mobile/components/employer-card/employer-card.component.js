import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';

const EmployerCard = ({
  onPress,
  employer: { _id, name, speciality },
  randomDate
}) => {
  return (
    <Card style={{ margin: 10 }} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image
          style={{ marginRight: 10, width: 60, height: 60, borderRadius: 5 }}
          source={{
            uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${_id}?r=${randomDate}`
          }}
        />

        <View>
          <Title>{name}</Title>
          <Paragraph>{speciality}</Paragraph>
        </View>
      </View>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(EmployerCard);
