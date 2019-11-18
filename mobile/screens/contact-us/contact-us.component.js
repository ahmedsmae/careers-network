import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { contactUsStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

const ContactUs = ({
  navigation,
  currentUser,
  contactUsStart,
  showPopupApi
}) => {
  const INITIAL_STATE = {
    email: currentUser ? currentUser.email : '',
    subject: '',
    message: ''
  };
  const [contactData, setContactData] = useState(INITIAL_STATE);
  const { email, subject, message } = contactData;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = (name, value) => {
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    // valid email
    if (email.length === 0) {
      return Alert.alert(
        'Missing Info',
        'You should include your email address',
        [{ text: 'OK' }]
      );
    }
    contactUsStart(
      { ...contactData, email: email.toLowerCase().trim() },
      err => {
        if (err) {
          showPopupApi({
            type: 'danger',
            message:
              err.response && err.response.data && err.response.data.errors
                ? err.response.data.errors.map(err => err.msg).toString()
                : 'Please check your connection'
          });
          setDisabled(false);
          return console.log(err);
        }

        showPopupApi({
          message: 'Email sent successfully',
          duration: 600
        });
        setContactData(INITIAL_STATE);
        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        {currentUser && (
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
        )}
        <Appbar.Content title="Contact US" />
      </Appbar.Header>

      <ScrollView>
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          keyboardType="email-address"
          disabled={!!currentUser}
          label="Email"
          value={email}
          onChangeText={_handleChange.bind(this, 'email')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          autoCapitalize="sentences"
          label="Subject"
          value={subject}
          onChangeText={_handleChange.bind(this, 'subject')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          label="Message"
          value={message}
          onChangeText={_handleChange.bind(this, 'message')}
        />

        <Button mode="contained" disabled={disabled} onPress={_handleSubmit}>
          Send Email
        </Button>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  contactUsStart: (contactData, callback) =>
    dispatch(contactUsStart(contactData, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
