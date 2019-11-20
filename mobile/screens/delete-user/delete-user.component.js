import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import { Appbar, Button, Divider } from 'react-native-paper';
import { CB_Title, C_Paragraph, OutlinedInput } from '../../components';

import { selectDeleteUserReasons } from '../../redux/constants/constants.selectors';
import { deleteUserStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

const DeleteUser = ({
  navigation,
  deleteUserReasons,
  deleteUserStart,
  showPopupApi
}) => {
  const [deleteData, setDeleteData] = useState({
    reason: deleteUserReasons[0],
    details: '',
    email: '',
    password: ''
  });
  const { reason, details, email, password } = deleteData;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setDeleteData(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    setDisabled(true);
    deleteUserStart(
      { ...deleteData, email: email.toLowerCase().trim() },
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
          message: 'User deleted successfully',
          duration: 600
        });
        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Delete User" />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView>
          <CB_Title style={{ marginLeft: 10 }}>
            We are sorry to see you here :(
          </CB_Title>
          <C_Paragraph style={{ marginLeft: 10 }}>
            It will be great if you can tell us why you consider leaving out
            service
          </C_Paragraph>

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={reason}
              onValueChange={_handleChange.bind(this, 'reason')}
            >
              {deleteUserReasons.map((reason, index) => (
                <Picker.Item key={index} label={reason} value={reason} />
              ))}
            </Picker>
          </View>

          <OutlinedInput
            style={{ margin: 10 }}
            multiline
            numberOfLines={3}
            label="Details"
            value={details}
            name="details"
            onChange={_handleChange}
          />

          <Divider />
          <CB_Title style={{ marginLeft: 10 }}>Sign in</CB_Title>
          <C_Paragraph style={{ marginLeft: 10 }}>
            Signing in is required to delete user
          </C_Paragraph>

          <OutlinedInput
            style={{ margin: 10 }}
            label="Email"
            value={email}
            name="email"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            label="Password"
            secureTextEntry
            value={password}
            name="password"
            onChange={_handleChange}
          />

          <Button
            style={{ marginHorizontal: 20, marginTop: 50 }}
            mode="contained"
            disabled={disabled}
            onPress={_handleSubmit}
          >
            DELETE USER
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  deleteUserReasons: selectDeleteUserReasons
});

const mapDiapatchToProps = dispatch => ({
  deleteUserStart: (deleteData, callback) =>
    dispatch(deleteUserStart(deleteData, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDiapatchToProps)(DeleteUser);
