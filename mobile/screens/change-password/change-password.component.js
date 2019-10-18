import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

const ChangePassword = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Change Password' />
      </Appbar.Header>

      <ScrollView></ScrollView>
    </>
  );
};

export default ChangePassword;
