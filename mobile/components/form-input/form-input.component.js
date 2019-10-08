import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Caption, Text } from 'react-native-paper';

import styles from './form-input.styles';
/**
 *
 * @param {name} - text > firstname
 * @param {value} - var > firstname
 * @param {onChange} - function({name, value}) >
 * @param {label} - text > 'Firstname'
 * @param {placeholder} - text > 'enter firstname'
 * @param {required} - text > 'you missed your firstname'
 * @param {style} - object > {margin:10}
 * @param {outlined} - boolean
 * @param {done} - boolean
 * @param {capWords} - boolean
 * @param {capSentence} - boolean
 * @param {keyboardType} - text > 'numeric', 'decimal-pad', 'phone-pad', 'email-address'
 * @param {clear} - boolean
 * @param {secureTextEntry} - boolean
 */
const FormInput = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required,
  style,
  outlined,
  done,
  capWords,
  capSentence,
  keyboardType,
  multiline,
  clear
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = value => {
    setInputValue(value);
    onChange({ name, value });
  };

  const handleClear = () => {
    setInputValue('');
    onChange({ name, value: '' });
  };

  const handleBlur = () => {
    if (!inputValue) {
      setInputValue(null);
    }
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={label && label}
          placeholder={placeholder && placeholder}
          mode={outlined ? 'outlined' : 'flat'}
          returnKeyType={done ? 'done' : 'next'}
          autoCapitalize={
            capWords ? 'words' : capSentence ? 'sentences' : 'none'
          }
          keyboardType={keyboardType ? keyboardType : 'default'}
          value={inputValue}
          onChangeText={handleChange}
          onBlur={handleBlur}
          multiline={multiline ? true : false}
          secureTextEntry
        />
        {!!clear && !!inputValue && !!inputValue.length && (
          <Text style={styles.clear} onPress={handleClear}>
            &times;
          </Text>
        )}
      </View>
      {required && inputValue === null && (
        <Caption style={styles.caption}>{required}</Caption>
      )}
    </View>
  );
};

export default FormInput;
