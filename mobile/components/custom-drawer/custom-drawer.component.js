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
  Platform
} from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Toast from 'react-native-root-toast';

import URLS from '../../redux/utils/urls';
import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectCurrentEmployer
} from '../../redux/current-user/current-user.selectors';

import UserImage from '../user-image/user-image.component';

import styles from './custom-drawer.styles';

const CustomDrawer = ({
  currentUser,
  currentEmployee,
  currentEmployer,
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
                ? `${URLS.SERVE_EMPLOYER_AVATAR}/${currentEmployer._id}`
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
          <TouchableOpacity onPress={() => navigate('Settings')}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name={
                    Platform.OS === 'android' ? 'md-settings' : 'ios-settings'
                  }
                  size={23}
                  color='grey'
                />
              </View>
              <Text style={styles.label}>Settings</Text>
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
  currentEmployer: selectCurrentEmployer
});

export default connect(mapStateToProps)(CustomDrawer);
