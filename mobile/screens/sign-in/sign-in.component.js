import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { H2, OutlinedInput, Link } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signInUserStart } from '../../redux/current-user/current-user.actions';

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
      <H2 style={{ marginBottom: 50 }}>Sign In</H2>
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

      <Button
        style={styles.button}
        icon="search"
        mode="contained"
        size={25}
        onPress={handleSignIn}
      >
        Sign In
      </Button>

      <Link
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account!
      </Link>

      <Link onPress={() => navigation.navigate('ForgetPassword')}>
        Forget password ?
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
