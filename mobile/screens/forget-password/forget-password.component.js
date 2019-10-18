import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ScrollView } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

import {
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import { forgetPasswordStart } from '../../redux/current-user/current-user.actions';

const ForgetPassword = ({
  navigation,
  forgetPasswordStart,
  loading,
  errorMessage
}) => {
  const [email, setEmail] = useState('');

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Forget Password' />
      </Appbar.Header>

      <ScrollView>
        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          label='Email'
          value={email}
          onChangeText={setEmail}
        />
        <Text>
          New random generated password will be sent to this email after
          checking the email existance
        </Text>

        <Button
          onPress={() => {
            forgetPasswordStart(email.toLowerCase().trim());
            if (!loading && errorMessage.length === 0) {
              setEmail('');
              navigation.goBack();
            }
          }}
        >
          Send new password
        </Button>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  forgetPasswordStart: email => dispatch(forgetPasswordStart(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPassword);
