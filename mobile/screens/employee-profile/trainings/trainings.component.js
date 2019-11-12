import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Card,
  Title,
  Caption,
  Paragraph,
  Portal,
  Dialog
} from 'react-native-paper';
import moment from 'moment';

import URLS from '../../../redux/utils/urls';

const Trainings = ({
  employee: { _id, trainings_certifications },
  onEducationPress,
  onEducationLongPress,
  getCityNameById
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      {!!trainings_certifications &&
        !!trainings_certifications.length &&
        trainings_certifications.map(edu => {
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
                  <TouchableOpacity
                    onPress={() => setShowImage(true)}
                    style={{ flex: 2, margin: 10, marginRight: 0 }}
                  >
                    <Card.Cover
                      style={{ borderRadius: 5, height: 120 }}
                      source={{
                        uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${_id}/${edu._id}`
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Card.Content style={{ flex: 5 }}>
                  {!!kind && !!kind.length && <Title>{kind}</Title>}
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
              <Portal>
                <Dialog
                  style={{ maxHeight: 400 }}
                  visible={showImage}
                  onDismiss={() => setShowImage(false)}
                >
                  <Card.Cover
                    style={{ borderRadius: 5, height: '100%', maxHeight: 400 }}
                    source={{
                      uri: `${URLS.SERVE_EDUCATION_CERTIFICATE}/${_id}/${edu._id}`
                    }}
                  />
                </Dialog>
              </Portal>
            </Card>
          );
        })}
    </>
  );
};

export default Trainings;
