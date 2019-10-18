import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EmployerShowJobContainer } from '../screens/show-job/show-job.containers';
import { EmployerEmployerProfileContainer } from '../screens/employer-profile/employer-profile.containers';
import { EmployerEmployeeProfileContainer } from '../screens/employee-profile/employee-profile-containers';

import JobApplicationsScreen from '../screens/job-applications/job-applications.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';
import MyJobsScreen from '../screens/my-jobs/my-jobs.component';
import EditEmployerInfoScreen from '../screens/edit-employer-info/edit-employer-info.component';
import EditJobScreen from '../screens/edit-job/edit-job.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import settingsNavigator from './settings-navigator';
import drawerNavOptions from './drawer-nav-options';
import aboutNavigator from './about-navigator';

const employerProfileNavigator = createStackNavigator(
  {
    EmployerProfile: EmployerEmployerProfileContainer,
    EditInfo: EditEmployerInfoScreen
  },
  hideHeaderNavOptions
);

const employerJobsNavigator = createStackNavigator(
  {
    MyJobs: MyJobsScreen,
    EditJob: EditJobScreen,
    EmployerJob: EmployerShowJobContainer,
    JobApplications: JobApplicationsScreen,
    EmployeeProfile: EmployerEmployeeProfileContainer
  },
  hideHeaderNavOptions
);

const employerDrawerNavigator = createDrawerNavigator(
  {
    MyJobs: {
      screen: employerJobsNavigator,
      navigationOptions: {
        drawerLabel: 'My Jobs',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-briefcase' : 'ios-briefcase'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    EmployerProfile: {
      screen: employerProfileNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
    Settings: {
      screen: settingsNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
    About: {
      screen: aboutNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
    ContactUs: {
      screen: ContactUsScreen,
      navigationOptions: { drawerLabel: () => null }
    }
  },
  drawerNavOptions
);

export default employerDrawerNavigator;
