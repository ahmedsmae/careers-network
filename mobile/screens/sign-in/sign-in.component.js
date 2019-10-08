import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { Headline, Button, Paragraph } from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signInUserStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';

import styles from './sign-in.styles';

const SignIn = ({ currentUser, navigation, signInUserStart }) => {
  useEffect(() => {
    currentUser && navigation.navigate('Search');
  }, [currentUser]);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  const handleSignIn = () => {
    signInUserStart(email.trim(), password);
  };

  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>Sign In</Headline>
      <FormInput
        style={styles.textInput}
        label='Email'
        name='email'
        value={email}
        keyboardType='email-address'
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
      />
      <FormInput
        style={styles.textInput}
        label='Password'
        value={password}
        name='password'
        secureTextEntry
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
      />

      <Button style={styles.button} mode='contained' onPress={handleSignIn}>
        Sign In
      </Button>

      <Paragraph
        style={styles.signUp}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account!
      </Paragraph>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signInUserStart: (email, password) =>
    dispatch(signInUserStart(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
