import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ScrollView, Picker } from 'react-native';
import {
  Appbar,
  Paragraph,
  TextInput,
  Button,
  Divider
} from 'react-native-paper';

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

  const _handleChange = (name, value) => {
    setDeleteData(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
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

      <ScrollView>
        <Paragraph>This is unfortunate</Paragraph>

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

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          multiline
          numberOfLines={3}
          label="Details"
          value={details}
          onChangeText={_handleChange.bind(this, 'details')}
        />

        <Divider />
        <Paragraph>Sign In Required</Paragraph>

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={_handleChange.bind(this, 'email')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Password"
          secureTextEntry
          value={password}
          sec
          onChangeText={_handleChange.bind(this, 'password')}
        />

        <Button mode="contained" disabled={disabled} onPress={_handleSubmit}>
          DELETE USER
        </Button>
      </ScrollView>
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
