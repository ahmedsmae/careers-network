import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import { Appbar } from "react-native-paper";
import { OutlinedInput, PopupAlert } from "../../components";

import { addEditEmployeeReferenceStart } from "../../redux/current-user/current-user.actions";

const EditReference = ({ navigation, addEditEmployeeReferenceStart }) => {
  const ref = navigation.getParam("reference");

  const [currentRef, setCurrentRef] = useState(
    ref
      ? ref
      : { name: "", position: "", company: "", email: "", contact_number: "" }
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

  const { name, position, company, email, contact_number } = currentRef;

  const _handleChange = ({ name, value }) => {
    setCurrentRef(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    setDisabled(true);
    addEditEmployeeReferenceStart(currentRef, err => {
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
        popupMsg: "Reference added successfully",
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
        <Appbar.Content title={!!ref ? "Edit Reference" : "Add Reference"} />
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
            autoCapitalize="words"
            label="Reference Name"
            value={name}
            name="name"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Position"
            value={position}
            name="position"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Company"
            value={company}
            name="company"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            name="email"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="none"
            keyboardType="number-pad"
            label="Contact Number"
            value={contact_number}
            name="contact_number"
            onChange={_handleChange}
          />
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

const mapDispatchToProps = dispatch => ({
  addEditEmployeeReferenceStart: (referenceData, callback) =>
    dispatch(addEditEmployeeReferenceStart(referenceData, callback))
});

export default connect(null, mapDispatchToProps)(EditReference);
