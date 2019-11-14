import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { Appbar, Paragraph } from "react-native-paper";
import { OutlinedInput, PopupAlert } from "../../components";

import { selectCurrentEmployee } from "../../redux/current-user/current-user.selectors";

import { editEmployeeSocialProfilesStart } from "../../redux/current-user/current-user.actions";

import { SOCIAL_MEDIA_BASE_URLS } from "../../redux/utils/urls";

const EditSocialProfiles = ({
  navigation,
  currentEmployee: { social_profiles },
  editEmployeeSocialProfilesStart
}) => {
  const [socialProfiles, setSocialProfiles] = useState(
    social_profiles || {
      website: "",
      linkedin: "",
      twitter: "",
      github: "",
      stackoverflow: "",
      facebook: "",
      instagram: "",
      youtube: ""
    }
  );

  const [disabled, setDisabled] = useState(false);
  const [
    {
      popupShow,
      popupMsg,
      popupWidth,
      popupDuration,
      popupType,
      onPopupComplete
    },
    setPopup
  ] = useState({
    popupShow: false,
    popupMsg: "",
    popupWidth: 150,
    popupDuration: 1000,
    popupType: "success",
    onPopupComplete: () => setPopup(prev => ({ ...prev, popupShow: false }))
  });

  const {
    website,
    linkedin,
    twitter,
    github,
    stackoverflow,
    facebook,
    instagram,
    youtube
  } = socialProfiles;

  const _handleChange = ({ name, value }) => {
    setSocialProfiles(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    setDisabled(true);
    editEmployeeSocialProfilesStart(socialProfiles, err => {
      if (err) {
        setPopup({
          popupType: "danger",
          popupMsg:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : "Please check your connection",
          popupShow: true,
          popupWidth: 300,
          popupDuration: 1000,
          onPopupComplete: () => {
            setDisabled(false);
            setPopup(prev => ({ ...prev, popupShow: false }));
          }
        });
        setDisabled(false);
        return console.log(err);
      }

      setPopup({
        popupType: "success",
        popupMsg: "Social profiles edited successfully",
        popupShow: true,
        popupWidth: 300,
        popupDuration: 600,
        onPopupComplete: () => {
          navigation.goBack();
          setDisabled(false);
          setPopup(prev => ({ ...prev, popupShow: false }));
        }
      });
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Edit Your Social Profiles" />
        <Appbar.Action
          icon="save"
          disabled={disabled}
          onPress={_handleSubmit}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView>
          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="none"
            keyboardType="url"
            label="Website"
            value={website}
            name="website"
            onChange={_handleChange}
          />

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.linkedin}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={linkedin}
              name="linkedin"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.twitter}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={twitter}
              name="twitter"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.github}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={github}
              name="github"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.stackoverflow}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={stackoverflow}
              name="stackoverflow"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.facebook}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={facebook}
              name="facebook"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.instagram}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={instagram}
              name="instagram"
              onChange={_handleChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: "grey" }}>
              {SOCIAL_MEDIA_BASE_URLS.youtube}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={youtube}
              name="youtube"
              onChange={_handleChange}
            />
          </View>
        </ScrollView>
        {popupShow && (
          <PopupAlert
            MESSAGE_TEXT={popupMsg}
            MESSAGE_WIDTH={popupWidth}
            MESSAGE_TYPE={popupType}
            MESSAGE_DURATION={popupDuration}
            onDisplayComplete={onPopupComplete}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    height: 60,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10
  }
});

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({
  editEmployeeSocialProfilesStart: (socialProfilesData, callback) =>
    dispatch(editEmployeeSocialProfilesStart(socialProfilesData, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSocialProfiles);
