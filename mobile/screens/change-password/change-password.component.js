import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import { changePasswordStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

const ChangePassword = ({ navigation, changePasswordStart, showPopupApi }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { oldPassword, newPassword, confirmNewPassword } = passwords;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = (name, value) => {
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      return Alert.alert(
        'Input Error',
        '"New Password" and "Confirm New Password" should be same',
        [{ text: 'OK' }]
      );
    }

    changePasswordStart(oldPassword, newPassword, err => {
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
        message: 'Password changed successfully',
        duration: 600
      });
      setDisabled(false);
      navigation.goBack();
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>

      <ScrollView>
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={_handleChange.bind(this, 'oldPassword')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={_handleChange.bind(this, 'newPassword')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Confirm New Password"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={_handleChange.bind(this, 'confirmNewPassword')}
        />

        <Button mode="contained" disabled={disabled} onPress={_handleSubmit}>
          Change Password
        </Button>
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  changePasswordStart: (oldPassword, newPassword, callback) =>
    dispatch(changePasswordStart(oldPassword, newPassword, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(null, mapDispatchToProps)(ChangePassword);
