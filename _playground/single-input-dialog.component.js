import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

const ManageInputDialog = ({ visible, hideDialog, title, onDone }) => {
  const [input, setInput] = useState('');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput value={input} onChangeText={setInput} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDone.bind(input)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ManageInputDialog;
