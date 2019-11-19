import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Title, Paragraph, Caption, Text } from 'react-native-paper';

export const C_Headline = ({ style, children, ...props }) => (
  <Headline style={[styles.font, style]} {...props}>
    {children}
  </Headline>
);

export const CM_Headline = ({ style, children, ...props }) => (
  <Headline style={[styles.medium, style]} {...props}>
    {children}
  </Headline>
);

export const CB_Headline = ({ style, children, ...props }) => (
  <Headline style={[styles.bold, style]} {...props}>
    {children}
  </Headline>
);

export const C_Title = ({ style, children, ...props }) => (
  <Title style={[styles.font, style]} {...props}>
    {children}
  </Title>
);

export const CM_Title = ({ style, children, ...props }) => (
  <Title style={[styles.medium, style]} {...props}>
    {children}
  </Title>
);

export const CB_Title = ({ style, children, ...props }) => (
  <Title style={[styles.bold, style]} {...props}>
    {children}
  </Title>
);

export const C_Paragraph = ({ style, children, ...props }) => (
  <Paragraph style={[styles.font, style]} {...props}>
    {children}
  </Paragraph>
);

export const CM_Paragraph = ({ style, children, ...props }) => (
  <Paragraph style={[styles.medium, style]} {...props}>
    {children}
  </Paragraph>
);

export const CB_Paragraph = ({ style, children, ...props }) => (
  <Paragraph style={[styles.bold, style]} {...props}>
    {children}
  </Paragraph>
);

export const C_Caption = ({ style, children, ...props }) => (
  <Caption style={[styles.font, style]} {...props}>
    {children}
  </Caption>
);

export const CM_Caption = ({ style, children, ...props }) => (
  <Caption style={[styles.medium, style]} {...props}>
    {children}
  </Caption>
);

export const CB_Caption = ({ style, children, ...props }) => (
  <Caption style={[styles.bold, style]} {...props}>
    {children}
  </Caption>
);

export const C_Text = ({ style, children, ...props }) => (
  <Text style={[styles.font, style]} {...props}>
    {children}
  </Text>
);

export const CM_Text = ({ style, children, ...props }) => (
  <Text style={[styles.medium, style]} {...props}>
    {children}
  </Text>
);

export const CB_Text = ({ style, children, ...props }) => (
  <Text style={[styles.bold, style]} {...props}>
    {children}
  </Text>
);

export const LogoText = ({ style, children, ...props }) => (
  <CB_Headline style={[style, { fontSize: 30 }]} {...props}>
    {children}
  </CB_Headline>
);

const styles = StyleSheet.create({
  font: {
    fontFamily: 'roboto-regular'
  },
  bold: {
    fontFamily: 'roboto-bold'
  },
  medium: {
    fontFamily: 'roboto-medium'
  }
});
