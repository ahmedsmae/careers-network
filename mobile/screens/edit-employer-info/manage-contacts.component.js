import React, { useState } from 'react';
import { View } from 'react-native';
import {
  TextInput,
  IconButton,
  Colors,
  Paragraph,
  Divider
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

const ManageContacts = ({ contacts, onAddContact, onRemoveContact }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContact, setNewContact] = useState('');

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          marginBottom: 0,
          alignItems: 'center'
        }}
      >
        <TextInput
          mode='outlined'
          label='Title'
          style={{ flex: 1, marginRight: 5 }}
          placeholder='Office'
          value={newTitle}
          onChangeText={text => setNewTitle(text)}
        />
        <TextInput
          mode='outlined'
          label='Contact Number'
          style={{ flex: 1 }}
          placeholder='971 50 213 8893'
          keyboardType='phone-pad'
          value={newContact}
          onChangeText={text => setNewContact(text)}
          render={props => (
            <TextInputMask
              {...props}
              type={'cel-phone'}
              options={{
                withDDD: true,
                dddMask: '00 (999) 99 999 9999'
              }}
            />
          )}
        />
        {!!newContact.length && (
          <IconButton
            icon='check'
            color={Colors.green500}
            size={25}
            onPress={() => {
              onAddContact({ title: newTitle, contact_number: newContact });
              setNewContact('');
              setNewTitle('');
            }}
          />
        )}
      </View>

      {contacts &&
        !!contacts.length &&
        contacts.map(({ title, contact_number }, index) => (
          <View key={index}>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Paragraph
                style={{ padding: 10, flex: 1, fontSize: 16 }}
              >{`${title} - ${contact_number}`}</Paragraph>
              <IconButton
                icon='close'
                color={Colors.red500}
                size={25}
                onPress={onRemoveContact.bind(this, index)}
              />
            </View>
            <Divider style={{ marginHorizontal: 10 }} />
          </View>
        ))}

      <View style={{ marginBottom: 10 }} />
    </>
  );
};

export default ManageContacts;
