import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text } from 'react-native';
import { Appbar, Provider, Portal, FAB } from 'react-native-paper';

import { selectCurrentEmployee } from '../../../redux/current-user/current-user.selectors';

import SocialProfiles from './social-profiles.component';

import Colors from '../../../constants/colors';

const EmployeeEmployeeSocialProfiles = ({ navigation, currentEmployee }) => {
  const [showFabOptions, setShowFabOptions] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your Social Profiles' />
      </Appbar.Header>

      <Provider>
        <SocialProfiles social_profiles={currentEmployee.social_profiles} />

        <Portal>
          <FAB.Group
            open={showFabOptions}
            icon={'settings'}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color='white'
            actions={[
              {
                icon: 'edit',
                label: 'Edit Social Profiles',
                onPress: () => navigation.navigate('EditSocialProfiles')
              },
              {
                icon: 'list',
                label: 'Profile Sections',
                onPress: () => navigation.navigate('EmployeeProfile')
              }
            ]}
            onStateChange={({ open }) => setShowFabOptions(open)}
            onPress={() => {
              if (showFabOptions) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </>
  );
};

const EmployerEmployeeSocialProfiles = ({ navigation }) => {
  const employee = navigation.getParam('reference');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee Social Profiles' />
      </Appbar.Header>

      <SocialProfiles social_profiles={employee.social_profiles} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({});

export const EmployeeEmployeeSocialProfilesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeSocialProfiles);

export const EmployerEmployeeSocialProfilesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeSocialProfiles);
