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

import MyApplications from '../screens/my-applications/my-applications.component';
import EditApplicationScreen from '../screens/edit-application/edit-application.component';

import HomeScreen from '../screens/home/home.component';
import FollowingScreen from '../screens/following/following.component';
import MySavedJobsScreen from '../screens/my-saved-jobs/my-saved-jobs.component';
import EditEmployeeInfoScreen from '../screens/edit-employee-info/edit-employee-info.component';
import EditEducationScreen from '../screens/edit-education/edit-education.component';
import EditExperienceScreen from '../screens/edit-experience/edit-experience.component';

import AboutScreen from '../screens/about/about.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import drawerNavOptions from './drawer-nav-options';

const employeeProfileNavigator = createStackNavigator(
  {
    EmployeeProfile: EmployeeEmployeeProfileContainer,
    EditInfo: EditEmployeeInfoScreen,
    EditEducation: EditEducationScreen,
    EditExperience: EditExperienceScreen
  },
  hideHeaderNavOptions
);

const searchNavigator = createStackNavigator(
  {
    AuthSearch: AuthSearchContainer,
    AuthSearchResults: AuthSearchResultsContainer,
    EmployeeShowJob: EmployeeShowJobContainer,
    EmployerProfile: EmployeeEmployerProfileContainer,
    EditApplication: EditApplicationScreen
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
    Following: {
      screen: FollowingScreen,
      navigationOptions: {
        drawerLabel: 'Following Employers',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
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
    About: {
      screen: AboutScreen,
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
