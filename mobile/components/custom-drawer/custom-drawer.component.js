import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Toast from 'react-native-root-toast';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signoutUserStart } from '../../redux/current-user/current-user.actions';

import DefaultUserImage from '../../assets/user.png';

import styles from './custom-drawer.styles';

const CustomDrawer = ({ currentUser, signoutUserStart, ...props }) => {
  const { navigate, toggleDrawer } = props.navigation;

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => navigate('UserProfile')}>
        <View style={styles.header}>
          <Image style={styles.image} source={DefaultUserImage} />
          <Text>{currentUser && currentUser.email}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <DrawerNavigatorItems {...props} />
      </ScrollView>
      <View style={styles.footer}>
        <Text
          style={styles.signout}
          onPress={() => {
            signoutUserStart();
            // search screen will discover absence of currentUser in state and will navigate to noAuthSearch (with no drawer)
            // we can listen for successful signout before navigation
            navigate('Search');
            toggleDrawer();
          }}
        >
          Sign out
        </Text>
        <View style={styles.info}>
          <Text style={styles.footerText}>Contacts App</Text>
          <Text style={styles.footerText} onPress={() => navigate('About')}>
            About
          </Text>
          <Text style={styles.footerText} onPress={() => navigate('ContactUs')}>
            Contact US
          </Text>
          <Button
            mode='outlined'
            color='orange'
            style={styles.footerButton}
            onPress={() => Toast.show('Welcome to Careers Network App')}
          >
            US
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
