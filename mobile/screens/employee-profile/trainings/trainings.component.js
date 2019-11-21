import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, TouchableOpacity } from 'react-native';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';
import { ImagePreview } from '../../../components';
import moment from 'moment';

import { selectRandomDate } from '../../../redux/api-utilities/api-utilities.selectors';

import URLS from '../../../redux/utils/urls';

const Trainings = ({
  employeeId,
  trainings_certifications,
  onTrainingPress,
  onTrainingLongPress,
  getCityNameById,
  randomDate
}) => {
  const [showImage, setShowImage] = useState(false);
  const [imageSource, setImageSource] = useState('');
  return (
    <>
      {!!trainings_certifications &&
        !!trainings_certifications.length &&
        trainings_certifications.map(train => {
          const {
            kind,
            subject,
            institute,
            location_id,
            description,
            from,
            current,
            to,
            hasCertificate
          } = train;

          return (
            <Card
              key={train._id}
              style={{ margin: 5 }}
              onPress={onTrainingPress && onTrainingPress.bind(this, train)}
              onLongPress={
                onTrainingLongPress && onTrainingLongPress.bind(this, train)
              }
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {hasCertificate && (
                  <TouchableOpacity
                    style={{ flex: 2, margin: 10, marginRight: 0 }}
                    onPress={() => {
                      setImageSource(
                        `${URLS.SERVE_TRAINING_CERTIFICATE}/${employeeId}/${train._id}?t=${randomDate}`
                      );
                      setShowImage(true);
                    }}
                  >
                    <Card.Cover
                      style={{ borderRadius: 5, height: 120 }}
                      source={{
                        uri: `${URLS.SERVE_TRAINING_CERTIFICATE}/${employeeId}/${train._id}?t=${randomDate}`
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Card.Content style={{ flex: 5 }}>
                  {!!kind && !!kind.length && <Caption>{kind}</Caption>}
                  {!!subject && !!subject.length && <Title>{subject}</Title>}
                  {!!institute && !!institute.length && (
                    <Paragraph>{institute}</Paragraph>
                  )}
                  {!!location_id && (
                    <Caption>{getCityNameById(location_id)}</Caption>
                  )}
                  {!!description && !!description.length && (
                    <Caption>{description}</Caption>
                  )}
                  {!!from && (
                    <Caption>{`from: ${moment(from).format('MMM Do')}  -  to: ${
                      current ? 'current' : `${moment(to).format('MMM Do')}`
                    }`}</Caption>
                  )}
                </Card.Content>
              </View>
            </Card>
          );
        })}
      {/* keep it outside the training cards */}
      <ImagePreview
        visible={showImage}
        onDismiss={() => setShowImage(false)}
        source={imageSource}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(Trainings);
