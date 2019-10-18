import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import {
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import { changePasswordStart } from '../../redux/current-user/current-user.actions';

const ChangePassword = ({
  navigation,
  changePasswordStart,
  loading,
  errorMessage
}) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  const _handleChange = (name, value) => {
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert(
        'Input Error',
        '"New Password" and "Confirm New Password" should be same',
        [{ text: 'OK' }]
      );
      return;
    }

    changePasswordStart(oldPassword, newPassword);
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Change Password' />
      </Appbar.Header>

      <ScrollView>
        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          label='Old Password'
          secureTextEntry
          value={oldPassword}
          onChangeText={_handleChange.bind(this, 'oldPassword')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          label='New Password'
          secureTextEntry
          value={newPassword}
          onChangeText={_handleChange.bind(this, 'newPassword')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          label='Confirm New Password'
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={_handleChange.bind(this, 'confirmNewPassword')}
        />

        <Button onPress={_handleSubmit}>Change Password</Button>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  changePasswordStart: (oldPassword, newPassword) =>
    dispatch(changePasswordStart(oldPassword, newPassword))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
