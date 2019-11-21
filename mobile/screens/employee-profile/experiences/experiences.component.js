import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, TouchableOpacity } from 'react-native';
import { Card, Title, Caption, Paragraph } from 'react-native-paper';
import { ImagePreview } from '../../../components';
import moment from 'moment';

import { selectRandomDate } from '../../../redux/api-utilities/api-utilities.selectors';

import URLS from '../../../redux/utils/urls';

const Experiences = ({
  experiences,
  employeeId,
  onExperiencePress,
  onExperienceLongPress,
  getCityNameById,
  randomDate
}) => {
  const [showImage, setShowImage] = useState(false);
  const [imageSource, setImageSource] = useState('');

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
            salary,
            from,
            current,
            to,
            hasCertificate
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {hasCertificate && (
                  <TouchableOpacity
                    onPress={() => {
                      setImageSource(
                        `${URLS.SERVE_EXPERIENCE_CERTIFICATE}/${employeeId}/${exp._id}?t=${randomDate}`
                      );
                      setShowImage(true);
                    }}
                    style={{ flex: 2, margin: 10, marginRight: 0 }}
                  >
                    <Card.Cover
                      style={{ borderRadius: 5, height: 100 }}
                      source={{
                        uri: `${URLS.SERVE_EXPERIENCE_CERTIFICATE}/${employeeId}/${exp._id}?t=${randomDate}`
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Card.Content style={{ flex: 5 }}>
                  {!!position && !!position.length && <Title>{position}</Title>}
                  {!!organization && !!organization.length && (
                    <Paragraph>{organization}</Paragraph>
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

      {/* keep it outside the experience cards */}
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

export default connect(mapStateToProps)(Experiences);
