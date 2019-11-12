import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { OutlinedInput } from '../../components';

const EditReference = ({ navigation }) => {
  const ref = navigation.getParam('reference');

  const [currentRef, setCurrentRef] = useState(
    ref
      ? ref
      : { name: '', position: '', company: '', email: '', contact_number: '' }
  );

  const { name, position, company, email, contact_number } = currentRef;

  const _handleChange = ({ name, value }) => {
    setCurrentRef(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    // action
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={!!ref ? 'Edit Reference' : 'Add Reference'} />
        <Appbar.Action icon='save' onPress={_handleSubmit} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
        keyboardVerticalOffset={5}
      >
        <ScrollView>
          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='Reference Name'
            value={name}
            name='name'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='Position'
            value={position}
            name='position'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='Company'
            value={company}
            name='company'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='none'
            keyboardType='email-address'
            label='Email'
            value={email}
            name='email'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='none'
            keyboardType='number-pad'
            label='Contact Number'
            value={contact_number}
            name='contact_number'
            onChange={_handleChange}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(EditReference);
