import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Caption, IconButton } from 'react-native-paper';

export const OutlinedInput = ({
  name,
  value,
  style,
  onChange,
  required,
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <View style={style}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.input}
          {...props}
          value={value}
          onChangeText={value => {
            value.toString().trim() !== '' && setError(false);
            onChange({ name, value });
          }}
          onBlur={() =>
            required && value.toString().trim() === ''
              ? setError(true)
              : setError(false)
          }
        />
        {!!value && !!value.length && (
          <IconButton
            icon="close"
            size={30}
            color="lightgrey"
            style={styles.close}
            onPress={() => onChange({ name, value: '' })}
          />
        )}
      </View>
      {error && (
        <Caption style={{ color: 'red', marginLeft: 5 }}>{required}</Caption>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 20
  },
  close: {
    position: 'absolute',
    right: 0,
    height: 40,
    width: 40
  }
});
