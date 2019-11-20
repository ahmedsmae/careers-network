import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { H2, OutlinedInput, Link } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signInUserStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import styles from './sign-in.styles';

const SignIn = ({ currentUser, navigation, signInUserStart, showPopupApi }) => {
  useEffect(() => {
    currentUser && navigation.navigate('Search');
  }, [currentUser]);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;
  const [disabled, setDisabled] = useState(false);

  const handleSignIn = () => {
    setDisabled(true);
    signInUserStart(email.trim(), password, err => {
      if (err) {
        showPopupApi({
          type: 'danger',
          message:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : 'Please check your connection'
        });
        setDisabled(false);
        return console.log(err);
      }

      setDisabled(false);
    });
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
        disabled={disabled}
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
  signInUserStart: (email, password, callback) =>
    dispatch(signInUserStart(email, password, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
