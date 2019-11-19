import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
  Card,
  Title,
  Caption,
  Paragraph,
  Portal,
  Dialog
} from 'react-native-paper';
import { ImagePreview } from '../../../components';
import moment from 'moment';

import { selectRandomDate } from '../../../redux/api-utilities/api-utilities.selectors';

import URLS from '../../../redux/utils/urls';

const Educations = ({
  educations,
  employeeId,
  onEducationPress,
  onEducationLongPress,
  getCityNameById,
  randomDate
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      {!!educations &&
        !!educations.length &&
        educations.map(edu => {
          const {
            subject,
            institute,
            location_id,
            description,
            from,
            current,
            to,
            hasCertificate
          } = edu;

          return (
            <Card
              key={edu._id}
              style={{ margin: 5 }}
              onPress={onEducationPress && onEducationPress.bind(this, edu)}
              onLongPress={
                onEducationLongPress && onEducationLongPress.bind(this, edu)
              }
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {hasCertificate && (
                  <TouchableWithoutFeedback
                    onPress={() => setShowImage(true)}
                    style={{ flex: 2, margin: 10, marginRight: 0 }}
                  >
                    <Card.Cover
                      style={{ borderRadius: 5, height: 120 }}
                      source={{
                        uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${employeeId}/${edu._id}?t=${randomDate}`
                      }}
                    />
                  </TouchableWithoutFeedback>
                )}

                <Card.Content style={{ flex: 5 }}>
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
              <ImagePreview
                visible={showImage}
                onDismiss={() => setShowImage(false)}
                source={`${URLS.SERVE_EDUCATION_CERTIFICATE}/${employeeId}/${edu._id}?t=${randomDate}`}
              />
            </Card>
          );
        })}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(Educations);
