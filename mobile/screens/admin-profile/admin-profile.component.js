import React from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

const AdminProfile = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Admin Profile' />
      </Appbar.Header>
    </>
  );
};

export default AdminProfile;
