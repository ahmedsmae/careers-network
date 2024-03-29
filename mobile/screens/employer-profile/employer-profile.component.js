import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Divider, Paragraph, Title, Headline } from 'react-native-paper';

import { ImagePreview } from '../../components';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';

import SocialProfiles from './social-profiles.component';

import styles from './employer-profile.styles';

const EmployerProfile = ({
  currentUser,
  employer: {
    _id,
    name,
    kind,
    size,
    speciality,
    location_id,
    contact_numbers,
    bio,
    social_profiles
  },
  getCityNameById,
  randomDate
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <ScrollView style={styles.screen}>
      <Image
        source={{ uri: `${URLS.SERVE_EMPLOYER_COVER}/${_id}?r=${randomDate}` }}
        style={{ height: 150, width: '100%' }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
          width: 100,
          height: 100,
          marginRight: 16,
          marginTop: 25,
          borderRadius: 5,
          elevation: 5,
          borderWidth: 1,
          borderColor: 'white'
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowImage(true)}>
          <Image
            style={{ height: '100%', borderRadius: 5, width: '100%' }}
            source={{
              uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${_id}?r=${randomDate}`
            }}
          />
        </TouchableWithoutFeedback>
      </View>

      <ImagePreview
        visible={showImage}
        onDismiss={() => setShowImage(false)}
        source={`${URLS.SERVE_EMPLOYER_AVATAR}/${_id}?r=${randomDate}`}
      />

      <View style={{ marginHorizontal: 10 }}>
        <View style={{ display: name ? 'flex' : 'none' }}>
          <Paragraph>Name</Paragraph>
          <Headline>{name}</Headline>
        </View>

        <View style={{ display: kind ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Kind</Paragraph>
          <Title>{kind}</Title>
        </View>

        <View style={{ display: size ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Size</Paragraph>
          <Title>{size}</Title>
        </View>

        <View style={{ display: speciality ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Speciality</Paragraph>
          <Title>{speciality}</Title>
        </View>

        <View
          style={{
            display: currentUser && currentUser.email ? 'flex' : 'none'
          }}
        >
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Email</Paragraph>
          <Title>{currentUser && currentUser.email}</Title>
        </View>

        <View
          style={{
            display: contact_numbers && contact_numbers.length ? 'flex' : 'none'
          }}
        >
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Contact Numbers</Paragraph>
          {contact_numbers.map(({ title, contact_number }, index) => (
            <Title key={index}>{`${title} - ${contact_number}`}</Title>
          ))}
        </View>

        <View style={{ display: location_id ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Location</Paragraph>
          <Title>{getCityNameById(location_id)}</Title>
        </View>

        <View style={{ display: bio ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Bio</Paragraph>
          <Title>{bio}</Title>
        </View>

        {!!social_profiles && (
          <SocialProfiles socialProfiles={social_profiles} />
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(EmployerProfile);
