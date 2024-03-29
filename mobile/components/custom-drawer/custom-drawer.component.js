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
  Platform,
  Image
} from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

import URLS from '../../redux/utils/urls';
import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectCurrentEmployer,
  selectCurrentAdmin
} from '../../redux/current-user/current-user.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';

import styles from './custom-drawer.styles';

const CustomDrawer = ({
  currentUser,
  currentEmployee,
  currentEmployer,
  currentAdmin,
  randomDate,
  ...props
}) => {
  const { navigate } = props.navigation;

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!!currentEmployee) {
            navigate('EmployeeProfile');
          } else if (!!currentEmployer) {
            navigate('EmployerProfile');
          } else if (!!currentAdmin) {
            navigate('AdminProfile');
          }
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 20
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 10
            }}
            // to refresh the image everytime
            source={{
              uri: !!currentEmployee
                ? `${URLS.SERVE_EMPLOYEE_AVATAR}/${currentEmployee._id}?r=${randomDate}`
                : !!currentEmployer
                ? `${URLS.SERVE_EMPLOYER_AVATAR}/${currentEmployer._id}?r=${randomDate}`
                : !!currentAdmin
                ? `${URLS.SERVE_EMPLOYER_AVATAR}/${currentAdmin._id}?r=${randomDate}` // ! serve admin avatar
                : null
            }}
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
                  color="grey"
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
                  color="grey"
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
                  color="grey"
                />
              </View>
              <Text style={styles.label}>About</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Divider />

      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/drawer-logo.jpg')}
          style={{ width: 100, height: '100%' }}
        />
        <View style={{ marginVertical: 10, marginLeft: 10 }}>
          <Text style={{ fontSize: 18 }}>Careers Network</Text>
          <Text style={{ fontSize: 14, color: 'grey' }}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentEmployee: selectCurrentEmployee,
  currentEmployer: selectCurrentEmployer,
  currentAdmin: selectCurrentAdmin,
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(CustomDrawer);
