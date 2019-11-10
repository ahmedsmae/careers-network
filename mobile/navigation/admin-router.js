import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AdminProfileScreen from '../screens/admin-profile/admin-profile.component';
import CreateEmployerScreen from '../screens/admin-employers/create-employer.component';
import AllEmployersScreen from '../screens/admin-employers/all-employers.component';
import AllEmployeesScreen from '../screens/admin-employees/all-employees.component';
import ChangeEmployerEmailScreen from '../screens/admin-employers/change-employer-email.component';
import ChangeEmployeeEmailScreen from '../screens/admin-employees/change-employee-email.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';
import AllEmployerJobsScreen from '../screens/admin-employers/all-employer-jobs.component';
import AllEmployeeApplicationsScreen from '../screens/admin-employees/all-employee-applications.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import settingsNavigator from './settings-navigator';
import drawerNavOptions from './drawer-nav-options';
import aboutNavigator from './about-navigator';

const allEmployersNavigator = createStackNavigator(
  {
    AllEmployers: AllEmployersScreen,
    AllEmployerJobs: AllEmployerJobsScreen
  },
  hideHeaderNavOptions
);

const allEmployeesNavigator = createStackNavigator(
  {
    AllEmployees: AllEmployeesScreen,
    AllEmployeeApplications: AllEmployeeApplicationsScreen
  },
  hideHeaderNavOptions
);

const adminDrawerNavigator = createDrawerNavigator(
  {
    CreateEmployer: {
      screen: CreateEmployerScreen,
      navigationOptions: {
        drawerLabel: 'Create Employer',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={
              Platform.OS === 'android' ? 'md-person-add' : 'ios-person-add'
            }
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    AdminProfile: {
      screen: AdminProfileScreen,
      navigationOptions: { drawerLabel: () => null }
    },
    AllEmployers: {
      screen: allEmployersNavigator,
      navigationOptions: {
        drawerLabel: 'All Employers',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    AllEmployees: {
      screen: allEmployeesNavigator,
      navigationOptions: {
        drawerLabel: 'All Employees',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    ChangeEmployerEmail: {
      screen: ChangeEmployerEmailScreen,
      navigationOptions: {
        drawerLabel: 'Change Employer Email',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-swap' : 'ios-swap'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    ChangeEmployeeEmail: {
      screen: ChangeEmployeeEmailScreen,
      navigationOptions: {
        drawerLabel: 'Change Employee Email',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-swap' : 'ios-swap'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
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

export default adminDrawerNavigator;
