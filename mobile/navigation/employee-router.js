import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AuthSearchContainer } from '../screens/search/search.containers';
import { AuthSearchResultsContainer } from '../screens/search-results/search-results.containers';
import { EmployeeShowJobContainer } from '../screens/show-job/show-job.containers';
import { EmployeeEmployerProfileContainer } from '../screens/employer-profile/employer-profile.containers';
import { EmployeeEmployeeProfileContainer } from '../screens/employee-profile/employee-profile-containers';
import SelectedEmployerJobsScreen from '../screens/selected-employer-jobs/selected-employer-jobs.component';

import MyApplications from '../screens/my-applications/my-applications.component';
import EditApplicationScreen from '../screens/edit-application/edit-application.component';

import HomeScreen from '../screens/home/home.component';
import FollowedEmployersScreen from '../screens/followed-employers/followed-employers.component';
import MySavedJobsScreen from '../screens/my-saved-jobs/my-saved-jobs.component';
import EditEmployeeInfoScreen from '../screens/edit-employee-info/edit-employee-info.component';
import EditEducationScreen from '../screens/edit-education/edit-education.component';
import EditExperienceScreen from '../screens/edit-experience/edit-experience.component';

import ContactUsScreen from '../screens/contact-us/contact-us.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import settingsNavigator from './settings-navigator';
import drawerNavOptions from './drawer-nav-options';
import aboutNavigator from './about-navigator';

const employeeProfileNavigator = createStackNavigator(
  {
    EmployeeProfile: EmployeeEmployeeProfileContainer,
    EditInfo: EditEmployeeInfoScreen,
    EditEducation: EditEducationScreen,
    EditExperience: EditExperienceScreen
  },
  hideHeaderNavOptions
);

const exploreEmployerNavigator = createStackNavigator(
  {
    EmployerProfile: EmployeeEmployerProfileContainer,
    SelectedEmployerJobs: SelectedEmployerJobsScreen,
    EmployeeShowJob: EmployeeShowJobContainer
  },
  hideHeaderNavOptions
);

const searchNavigator = createStackNavigator(
  {
    AuthSearch: AuthSearchContainer,
    AuthSearchResults: AuthSearchResultsContainer,
    EmployeeShowJob: EmployeeShowJobContainer,
    EditApplication: EditApplicationScreen,
    EmployerProfile: exploreEmployerNavigator
  },
  hideHeaderNavOptions
);

const employeeDrawerNavigator = createDrawerNavigator(
  {
    Search: {
      screen: searchNavigator,
      navigationOptions: {
        drawerLabel: 'Search Jobs',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    EmployeeProfile: {
      screen: employeeProfileNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    FOllowedEmployers: {
      screen: FollowedEmployersScreen,
      navigationOptions: {
        drawerLabel: 'Followed Employers',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-bookmark' : 'ios-bookmark'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    MyApplications: {
      screen: MyApplications,
      navigationOptions: {
        drawerLabel: 'My Applications',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-copy' : 'ios-copy'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    MySavedJobs: {
      screen: MySavedJobsScreen,
      navigationOptions: {
        drawerLabel: 'My Saved Jobs',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
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

export default employeeDrawerNavigator;
