import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { TextInput, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
          mode='outlined'
          style={{ width: '100%', backgroundColor: 'white' }}
          {...props}
          value={value}
          onChangeText={value => onChange({ name, value })}
          onBlur={() =>
            required && value.toString().trim() === ''
              ? setError(true)
              : setError(false)
          }
        />
        <TouchableOpacity
          onPress={() => onChange({ name, value: '' })}
          style={{ position: 'absolute', right: 0, padding: 10, zIndex: 100 }}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
            color='lightgrey'
            size={24}
          />
        </TouchableOpacity>
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
  }
});
