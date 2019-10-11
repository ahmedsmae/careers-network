import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Toast from 'react-native-root-toast';

import URLS from '../../redux/utils/urls';
import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectCurrentEmployer,
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import { signoutUserStart } from '../../redux/current-user/current-user.actions';

import UserImage from '../user-image/user-image.component';

import styles from './custom-drawer.styles';

const CustomDrawer = ({
  currentUser,
  currentEmployee,
  currentEmployer,
  signoutUserStart,
  loading,
  errorMessage,
  ...props
}) => {
  const { navigate, toggleDrawer } = props.navigation;

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!!currentEmployee) {
            navigate('EmployeeProfile');
          } else if (!!currentEmployer) {
            navigate('EmployerProfile');
          }
        }}
      >
        <View style={styles.header}>
          <UserImage
            medium
            style={styles.image}
            source={
              !!currentEmployee
                ? `${URLS.SERVE_EMPLOYEE_AVATAR}/${currentEmployee._id}`
                : !!currentEmployer
                ? `${URLS.SERVE_EMPLOYEE_AVATAR}/${currentEmployer._id}` //! change to SERVE_EMPLOYER_AVATAR
                : null
            }
          />

          <Text>{currentUser && currentUser.email}</Text>
        </View>
      </TouchableWithoutFeedback>

      <Divider />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}> */}
        <DrawerNavigatorItems {...props} />
        {/* </SafeAreaView> */}

        <View>
          <TouchableOpacity
            onPress={() => {
              signoutUserStart();
              if (!loading && !errorMessage.length) {
                navigate('NavigationAnchor');
                toggleDrawer();
              }
            }}
          >
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name={
                    Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'
                  }
                  size={23}
                  color='grey'
                />
              </View>
              <Text style={styles.label}>Sign Out</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('ContactUs')}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name={Platform.OS === 'android' ? 'md-send' : 'ios-send'}
                  size={23}
                  color='grey'
                />
              </View>
              <Text style={styles.label}>Contact Us</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('About')}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name={
                    Platform.OS === 'android'
                      ? 'md-information-circle-outline'
                      : 'ios-information-circle-outline'
                  }
                  size={23}
                  color='grey'
                />
              </View>
              <Text style={styles.label}>About</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Divider />

      <View style={styles.footer}>
        <View style={styles.info}>
          <Text
            style={styles.footerText}
            onPress={() => Toast.show('Welcome to Careers Network App')}
          >
            Careers Network
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentEmployee: selectCurrentEmployee,
  currentEmployer: selectCurrentEmployer,
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
