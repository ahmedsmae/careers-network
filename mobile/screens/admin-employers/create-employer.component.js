import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Appbar, TextInput, Button, Paragraph } from 'react-native-paper';

import { createEmployerStart } from '../../redux/admin/admin.actions';

const CreateEmployer = ({ navigation, createEmployerStart }) => {
  const [email, setEmail] = useState('');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Create Employer' />
      </Appbar.Header>

      <TextInput
        style={{ margin: 10 }}
        mode='outlined'
        label='Employer Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <Paragraph style={{ margin: 10 }}>
        If email is not in use. account will be created and randomly generated
        password will be sent to this email, and the user can change it later
        from the account settings after login
      </Paragraph>

      <Button
        style={{ margin: 10, marginTop: 30 }}
        mode='outlined'
        onPress={() => {
          createEmployerStart(email);
          setEmail('');
        }}
      >
        Create Employer
      </Button>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  createEmployerStart: email => dispatch(createEmployerStart(email))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEmployer);
