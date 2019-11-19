import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Appbar, Text, Button } from 'react-native-paper';
import { OutlinedInput } from '../../components';

import { forgetPasswordStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

const ForgetPassword = ({ navigation, forgetPasswordStart, showPopupApi }) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const _handleSubmit = () => {
    forgetPasswordStart(email.toLowerCase().trim(), err => {
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
        message: 'New password sent successfully',
        duration: 600
      });
      setEmail('');
      setDisabled(false);
      navigation.goBack();
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Forget Password" />
      </Appbar.Header>

      <ScrollView>
        <OutlinedInput
          style={{ margin: 10 }}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text>
          New random generated password will be sent to this email after
          checking the email existance
        </Text>

        <Button
          style={{ marginHorizontal: 20, marginTop: 50 }}
          mode="contained"
          disabled={disabled}
          onPress={_handleSubmit}
        >
          Send new password
        </Button>
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  forgetPasswordStart: (email, callback) =>
    dispatch(forgetPasswordStart(email, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(null, mapDispatchToProps)(ForgetPassword);
