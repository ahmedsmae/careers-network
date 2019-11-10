import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ContainedButton = ({
  bgColor,
  color,
  icon,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor || 'black' }, style]}
      {...props}
    >
      <Ionicons name={icon} color={color || 'white'} size={24} />
      <Text style={[styles.text, { color: color || 'white' }]}>{children}</Text>
    </TouchableOpacity>
  );
};

export const OutlinedButton = ({ color, icon, children, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderWidth: 1, borderColor: color || 'black' },
        style
      ]}
      {...props}
    >
      <Ionicons name={icon} color={color || 'black'} size={24} />
      <Text style={[styles.text, { color: color || 'black' }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  text: {
    margin: 0,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginHorizontal: 5
  }
});
