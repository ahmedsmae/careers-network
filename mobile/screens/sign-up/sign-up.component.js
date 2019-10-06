import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { View } from 'react-native';
import { Headline, TextInput, Button, Paragraph } from 'react-native-paper';

import styles from './sign-up.styles';

const SignUp = ({ currentUser, navigation }) => {
  useEffect(() => {
    currentUser && navigation.navigate('Search');
  }, [currentUser]);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword
  });
  const { email, password, confirmPassword } = credentials;

  const handleSignUp = () => {
    // run signup action
  };

  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>Sign Up</Headline>
      <TextInput
        style={styles.textInput}
        label='Email'
        value={email}
        onChangeText={text => setCredentials({ ...credentials, email: text })}
      />
      <TextInput
        style={styles.textInput}
        label='Password'
        value={password}
        onChangeText={text =>
          setCredentials({ ...credentials, password: text })
        }
      />
      <TextInput
        style={styles.textInput}
        label='Confirm Password'
        value={confirmPassword}
        onChangeText={text =>
          setCredentials({ ...credentials, confirmPassword: text })
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
      </Paragraph>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
