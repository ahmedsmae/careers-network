import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

export const H1 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h1, style]} {...props}>
      {children}
    </Title>
  );
};

export const H2 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h2, style]} {...props}>
      {children}
    </Title>
  );
};

export const H3 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h3, style]} {...props}>
      {children}
    </Title>
  );
};

export const H4 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h4, style]} {...props}>
      {children}
    </Title>
  );
};

export const H5 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h5, style]} {...props}>
      {children}
    </Title>
  );
};

export const H6 = ({ style, children, ...props }) => {
  return (
    <Title style={[styles.h6, style]} {...props}>
      {children}
    </Title>
  );
};

export const Body1 = ({ style, children, ...props }) => {
  return (
    <Paragraph style={[styles.body1, style]} {...props}>
      {children}
    </Paragraph>
  );
};

export const Body2 = ({ style, children, ...props }) => {
  return (
    <Paragraph style={[styles.body2, style]} {...props}>
      {children}
    </Paragraph>
  );
};

export const Link = ({ style, children, ...props }) => {
  return (
    <Paragraph style={[styles.link, style]} {...props}>
      {children}
    </Paragraph>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 30
  },
  h2: {
    fontSize: 26
  },
  h3: {
    fontSize: 22
  },
  h4: {
    fontSize: 18
  },
  h5: {
    fontSize: 14
  },
  h5: {
    fontSize: 10
  },
  body1: {
    fontSize: 16
  },
  body2: {
    fontSize: 14
  },
  link: {
    fontSize: 16,
    padding: 10,
    color: 'blue'
  }
});
