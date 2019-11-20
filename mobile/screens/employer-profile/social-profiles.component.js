import React from 'react';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'expo';

import { CustomIcon, CB_Title } from '../../components';

import { SOCIAL_MEDIA_BASE_URLS } from '../../redux/utils/urls';

const SocialProfiles = ({
  socialProfiles: {
    website,
    linkedin,
    twitter,
    github,
    stackoverflow,
    facebook,
    instagram,
    youtube
  }
}) => {
  return (
    <>
      <Divider style={{ marginTop: 10 }} />
      <CB_Title>Social Profiles</CB_Title>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {website && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.website}${website}`)
            }
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-globe' : 'ios-globe'}
              color="lightgrey"
              size={38}
            />
          </TouchableWithoutFeedback>
        )}

        {linkedin && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.linkedin}${linkedin}`)
            }
          >
            <Ionicons name="logo-linkedin" color="lightgrey" size={38} />
          </TouchableWithoutFeedback>
        )}

        {twitter && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.twitter}${twitter}`)
            }
          >
            <Ionicons name="logo-twitter" color="lightgrey" size={40} />
          </TouchableWithoutFeedback>
        )}

        {github && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.github}${github}`)
            }
          >
            <Ionicons name="logo-github" color="lightgrey" size={38} />
          </TouchableWithoutFeedback>
        )}

        {stackoverflow && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(
                `${SOCIAL_MEDIA_BASE_URLS.stackoverflow}${stackoverflow}`
              )
            }
          >
            <CustomIcon name="stackoverflow" color="lightgrey" size={34} />
          </TouchableWithoutFeedback>
        )}

        {facebook && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.facebook}${facebook}`)
            }
          >
            <Ionicons name="logo-facebook" color="lightgrey" size={39} />
          </TouchableWithoutFeedback>
        )}

        {instagram && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.instagram}${instagram}`)
            }
          >
            <Ionicons name="logo-instagram" color="lightgrey" size={39} />
          </TouchableWithoutFeedback>
        )}

        {youtube && (
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.youtube}${youtube}`)
            }
          >
            <Ionicons name="logo-youtube" color="lightgrey" size={34} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

export default SocialProfiles;
