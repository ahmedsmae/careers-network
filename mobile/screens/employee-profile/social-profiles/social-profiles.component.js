import React from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import { Divider, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "expo";

import { SOCIAL_MEDIA_BASE_URLS } from "../../../redux/utils/urls";
import { CustomIcon } from "../../../components";

const References = ({ social_profiles }) => {
  if (!social_profiles)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>User didn't add any social profiles yet</Text>
      </View>
    );

  const {
    website,
    linkedin,
    twitter,
    github,
    stackoverflow,
    facebook,
    instagram,
    youtube
  } = social_profiles;

  // const website = "https://www.ahmed-smae.com";
  // const linkedin = "ahmed.same";
  // const twitter = "ahmed.same";
  // const github = "ahmed.same";
  // const stackoverflow = "ahmed.same";
  // const facebook = "ahmed.same";
  // const instagram = "ahmed.same";
  // const youtube = "ahmed.same";

  return (
    <ScrollView>
      {website && website.length && (
        <List.Item
          title="Website"
          description={website}
          left={props => (
            <Ionicons
              {...props}
              style={{ alignSelf: "center", margin: 10 }}
              name={Platform.OS === "android" ? "md-globe" : "ios-globe"}
              color="lightgrey"
              size={50}
            />
          )}
          onPress={() => Linking.openURL(website)}
        />
      )}

      {linkedin && linkedin.length && (
        <>
          <Divider />
          <List.Item
            title="Linkedin"
            description={`${SOCIAL_MEDIA_BASE_URLS.linkedin}${linkedin}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 12 }}
                name="logo-linkedin"
                color="lightgrey"
                size={50}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.linkedin}${linkedin}`)
            }
          />
        </>
      )}

      {twitter && twitter.length && (
        <>
          <Divider />
          <List.Item
            title="Twitter"
            description={`${SOCIAL_MEDIA_BASE_URLS.twitter}${twitter}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 10 }}
                name="logo-twitter"
                color="lightgrey"
                size={42}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.twitter}${twitter}`)
            }
          />
        </>
      )}

      {github && github.length && (
        <>
          <Divider />
          <List.Item
            title="Github"
            description={`${SOCIAL_MEDIA_BASE_URLS.github}${github}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 10 }}
                name="logo-github"
                color="lightgrey"
                size={46}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.github}${github}`)
            }
          />
        </>
      )}

      {stackoverflow && stackoverflow.length && (
        <>
          <Divider />
          <List.Item
            title="Stack-overflow"
            description={`${SOCIAL_MEDIA_BASE_URLS.stackoverflow}${stackoverflow}`}
            left={props => (
              <CustomIcon
                style={{ alignSelf: "center", margin: 8 }}
                {...props}
                name="stackoverflow"
                color="lightgrey"
                size={43}
              />
            )}
            onPress={() =>
              Linking.openURL(
                `${SOCIAL_MEDIA_BASE_URLS.stackoverflow}${stackoverflow}`
              )
            }
          />
        </>
      )}

      {facebook && facebook.length && (
        <>
          <Divider />
          <List.Item
            title="Facebook"
            description={`${SOCIAL_MEDIA_BASE_URLS.facebook}${facebook}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 10 }}
                name="logo-facebook"
                color="lightgrey"
                size={50}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.facebook}${facebook}`)
            }
          />
        </>
      )}

      {instagram && instagram.length && (
        <>
          <Divider />
          <List.Item
            title="Instagram"
            description={`${SOCIAL_MEDIA_BASE_URLS.instagram}${instagram}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 10 }}
                name="logo-instagram"
                color="lightgrey"
                size={50}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.instagram}${instagram}`)
            }
          />
        </>
      )}

      {youtube && youtube.length && (
        <>
          <Divider />
          <List.Item
            title="Youtube"
            description={`${SOCIAL_MEDIA_BASE_URLS.youtube}${youtube}`}
            left={props => (
              <Ionicons
                {...props}
                style={{ alignSelf: "center", margin: 10 }}
                name="logo-youtube"
                color="lightgrey"
                size={40}
              />
            )}
            onPress={() =>
              Linking.openURL(`${SOCIAL_MEDIA_BASE_URLS.youtube}${youtube}`)
            }
          />
        </>
      )}
    </ScrollView>
  );
};

export default References;
