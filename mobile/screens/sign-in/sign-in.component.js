import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { View } from 'react-native';
import { Headline, TextInput, Button, Paragraph } from 'react-native-paper';

import styles from './sign-in.styles';

const SignIn = ({ currentUser, navigation }) => {
  useEffect(() => {
    currentUser && navigation.navigate('Search');
  }, [currentUser]);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  const handleSignIn = () => {
    // run signin action
  };

  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>Sign In</Headline>
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
