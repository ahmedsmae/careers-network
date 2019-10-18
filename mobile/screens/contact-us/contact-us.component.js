import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

const ContactUs = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Contact US' />
      </Appbar.Header>

      <ScrollView></ScrollView>
    </>
  );
};

export default ContactUs;
