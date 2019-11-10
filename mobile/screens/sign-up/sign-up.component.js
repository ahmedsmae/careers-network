import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Alert } from 'react-native';
import { Headline, Button, Paragraph } from 'react-native-paper';
import { H2, ContainedButton, OutlinedInput, Link } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signUpUserStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';

import styles from './sign-up.styles';

const SignUp = ({ currentUser, navigation, signUpUserStart }) => {
  useEffect(() => {
    currentUser && navigation.navigate('Search');
  }, [currentUser]);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { email, password, confirmPassword } = credentials;

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      return Alert.alert(
        'Passwords Unmatch',
        'Password and Confirm Password should be matching',
        [{ text: 'OK' }]
      );
    }

    signUpUserStart(email.trim(), password);
  };

  return (
    <View style={styles.screen}>
      <H2 style={{ marginBottom: 50 }}>Sign Up</H2>

      <OutlinedInput
        style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
        label='Email'
        name='email'
        value={email}
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
        keyboardType='email-address'
      />

      <OutlinedInput
        style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
        label='Password'
        name='password'
        value={password}
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
        secureTextEntry
      />

      <OutlinedInput
        style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
        label='Confirm Password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
        secureTextEntry
      />

      <ContainedButton style={styles.button} onPress={handleSignUp}>
        Sign Up
      </ContainedButton>

      <Link
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('SignIn')}
      >
        Already have an account!
      </Link>

      {/* <Headline style={styles.headline}>Sign Up</Headline>
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
      <FormInput
        style={styles.textInput}
        label='Confirm Password'
        value={confirmPassword}
        name='confirmPassword'
        secureTextEntry
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
      />

      <Button style={styles.button} mode='contained' onPress={handleSignUp}>
        Sign Up
      </Button>

      <Paragraph
        style={styles.signIn}
        onPress={() => navigation.navigate('SignIn')}
      >
        Already have an account!
      </Paragraph> */}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signUpUserStart: (email, password) =>
    dispatch(signUpUserStart(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
