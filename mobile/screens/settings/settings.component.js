import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, List, Avatar, Divider } from 'react-native-paper';

import { signoutUserStart } from '../../redux/current-user/current-user.actions';

const Settings = ({ navigation, signoutUserStart }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Settings' />
      </Appbar.Header>

      <ScrollView>
        <List.Item
          title='User Agreement'
          description='Read the user agreement'
          left={props => <List.Icon {...props} icon='verified-user' />}
          onPress={() => navigation.navigate('UserAgreement')}
        />

        <Divider />

        <List.Item
          title='Signout'
          description='Exit session'
          left={props => <List.Icon {...props} icon='exit-to-app' />}
          onPress={() => signoutUserStart()}
        />

        <Divider />

        <List.Item
          title='Change Password'
          description='Change Your user password'
          left={props => <List.Icon {...props} icon='find-replace' />}
          onPress={() => navigation.navigate('ChangePassword')}
        />

        <Divider />

        <List.Item
          title='Delete User'
          description='Delete you profile'
          left={props => <List.Icon {...props} icon='delete' />}
          onPress={() => navigation.navigate('DeleteUser')}
        />
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart())
});

export default connect(
  null,
  mapDispatchToProps
)(Settings);
