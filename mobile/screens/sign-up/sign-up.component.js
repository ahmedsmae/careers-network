import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { H2, OutlinedInput, Link } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signUpUserStart } from '../../redux/current-user/current-user.actions';

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
        label="Email"
        name="email"
        value={email}
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
        keyboardType="email-address"
      />

      <OutlinedInput
        style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
        label="Password"
        name="password"
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
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={({ name, value }) =>
          setCredentials({
            ...credentials,
            [name]: value
          })
        }
        secureTextEntry
      />

      <Button
        style={styles.button}
        icon="search"
        mode="contained"
        size={25}
        onPress={handleSignUp}
      >
        Sign Up
      </Button>

      <Link
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('SignIn')}
      >
        Already have an account!
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
