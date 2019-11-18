import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';

import { signoutUserStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

const Settings = ({ navigation, signoutUserStart, showPopupApi }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <ScrollView>
        <List.Item
          title="User Agreement"
          description="Read the user agreement"
          left={props => <List.Icon {...props} icon="verified-user" />}
          onPress={() => navigation.navigate('UserAgreement')}
        />

        <Divider />

        <List.Item
          disabled={disabled}
          title="Signout"
          description="Exit session"
          left={props => <List.Icon {...props} icon="exit-to-app" />}
          onPress={() =>
            signoutUserStart(err => {
              if (err) {
                showPopupApi({
                  type: 'danger',
                  message:
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                      ? err.response.data.errors.map(err => err.msg).toString()
                      : 'Please check your connection'
                });
                setDisabled(false);
                return console.log(err);
              }

              setDisabled(false);
            })
          }
        />

        <Divider />

        <List.Item
          title="Change Password"
          description="Change Your user password"
          left={props => <List.Icon {...props} icon="find-replace" />}
          onPress={() => navigation.navigate('ChangePassword')}
        />

        <Divider />

        <List.Item
          title="Delete User"
          description="Delete you profile"
          left={props => <List.Icon {...props} icon="delete" />}
          onPress={() => navigation.navigate('DeleteUser')}
        />
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  signoutUserStart: callback => dispatch(signoutUserStart(callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(null, mapDispatchToProps)(Settings);
