import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AuthSearchContainer } from '../screens/search/search.containers';
import { AuthSearchResultsContainer } from '../screens/search-results/search-results.containers';
import { EmployeeShowJobContainer } from '../screens/show-job/show-job.containers';
import { EmployeeEmployerProfileContainer } from '../screens/employer-profile/employer-profile.containers';

import EmployeeProfileScreen from '../screens/employee-profile/employee-profile.component';
import ApplicationsScreen from '../screens/applications/applications.component';
import EditApplicationScreen from '../screens/edit-application/edit-application.component';

import HomeScreen from '../screens/home/home.component';
import FollowingScreen from '../screens/following/following.component';
import BookmarkJobsScreen from '../screens/bookmark-jobs/bookmark-jobs.component';
import EditEmployeeInfoScreen from '../screens/edit-employee-info/edit-employee-info.component';
import EditEducationScreen from '../screens/edit-education/edit-education.component';
import EditExperienceScreen from '../screens/edit-experience/edit-experience.component';

import AboutScreen from '../screens/about/about.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import drawerNavOptions from './drawer-nav-options';

const employeeProfileNavigator = createStackNavigator(
  {
    EmployeeProfile: EmployeeProfileScreen,
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
    Applications: {
      screen: ApplicationsScreen,
      navigationOptions: {
        drawerLabel: 'My Applications',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    Bookmarks: {
      screen: BookmarkJobsScreen,
      navigationOptions: {
        drawerLabel: 'My Bookmarks',
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-bookmark' : 'ios-bookmark'}
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
