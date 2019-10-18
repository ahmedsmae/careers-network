import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import {
  selectCurrentUser,
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import { contactUsStart } from '../../redux/current-user/current-user.actions';

const ContactUs = ({
  navigation,
  currentUser,
  contactUsStart,
  loading,
  errorMessage
}) => {
  const INITIAL_STATE = {
    email: currentUser ? currentUser.email : '',
    subject: '',
    message: ''
  };
  const [contactData, setContactData] = useState(INITIAL_STATE);
  const { email, subject, message } = contactData;

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
    contactUsStart({ ...contactData, email: email.toLowerCase().trim() });
    if (!loading && errorMessage.length === 0) {
      setContactData(INITIAL_STATE);
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        {currentUser && (
          <Appbar.Action
            icon='menu'
            onPress={() => navigation.toggleDrawer()}
          />
        )}
        <Appbar.Content title='Contact US' />
      </Appbar.Header>

      <ScrollView>
        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          keyboardType='email-address'
          disabled={!!currentUser}
          label='Email'
          value={email}
          onChangeText={_handleChange.bind(this, 'email')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='sentences'
          label='Subject'
          value={subject}
          onChangeText={_handleChange.bind(this, 'subject')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='sentences'
          multiline
          numberOfLines={3}
          label='Message'
          value={message}
          onChangeText={_handleChange.bind(this, 'message')}
        />

        <Button onPress={_handleSubmit}>Sent Email</Button>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  contactUsStart: contactData => dispatch(contactUsStart(contactData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
