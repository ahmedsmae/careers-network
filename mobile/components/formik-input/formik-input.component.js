import React from 'react';
import { View } from 'react-native';
import { TextInput, Caption } from 'react-native-paper';

const FormikInput = ({
  label,
  formikProps: { handleChange, handleBlur, touched, errors },
  formikKey,
  ...rest
}) => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <TextInput
        onChangeText={handleChange(formikKey)}
        onBlur={handleBlur(formikKey)}
        label={label}
        mode='outlined'
        {...rest}
      />
      <Caption style={{ color: 'red' }}>
        {touched[formikKey] && errors[formikKey]}
      </Caption>
    </View>
  );
};

export default FormikInput;
