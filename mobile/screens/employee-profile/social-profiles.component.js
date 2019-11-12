import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Divider, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'expo';

const SocialProfiles = ({ employee: { social_profiles } }) => {
  return (
    <View
      style={{
        display:
          social_profiles &&
          (social_profiles.website ||
            social_profiles.linkedin ||
            social_profiles.twitter ||
            social_profiles.github ||
            social_profiles.stackoverflow ||
            social_profiles.facebook ||
            social_profiles.instagram ||
            social_profiles.youtube)
            ? 'flex'
            : 'none'
      }}
    >
      <Divider style={{ marginTop: 10 }} />
      <Paragraph>Social Profiles</Paragraph>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.website ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.website)}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-globe' : 'ios-globe'}
            color='lightgrey'
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.linkedin ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.linkedin)}
        >
          <Ionicons name='logo-linkedin' color='lightgrey' size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.twitter ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.twitter)}
        >
          <Ionicons name='logo-twitter' color='lightgrey' size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            display: social_profiles && social_profiles.github ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.github)}
        >
          <Ionicons name='logo-github' color='lightgrey' size={24} />
        </TouchableOpacity>

        {/* <TouchableOpacity
        style={{
          padding: 10,
          display:
            social_profiles && social_profiles.stackoverflow ? 'flex' : 'none'
        }}
        onPress={() => Linking.openURL(social_profiles.stackoverflow)}
      >
        <Ionicons name='logo-stackoverflow' color='lightgrey' size={24} />
      </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.facebook ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.facebook)}
        >
          <Ionicons name='logo-facebook' color='lightgrey' size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.instagram ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.instagram)}
        >
          <Ionicons name='logo-instagram' color='lightgrey' size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            display:
              social_profiles && social_profiles.youtube ? 'flex' : 'none'
          }}
          onPress={() => Linking.openURL(social_profiles.youtube)}
        >
          <Ionicons name='logo-youtube' color='lightgrey' size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialProfiles;
