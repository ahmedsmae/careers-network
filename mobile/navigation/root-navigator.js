import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from '../screens/search/search.component';
import SignInScreen from '../screens/sign-in/sign-in.component';
import SignUpScreen from '../screens/sign-up/sign-up.component';
import SearchResultsScreen from '../screens/search-results/search-results.component';
import EmployeeProfileScreen from '../screens/employee-profile/employee-profile.component';
import HomeScreen from '../screens/home/home.component';
import FollowingScreen from '../screens/following/following.component';
import ApplicationsScreen from '../screens/applications/applications.component';
import BookmarkJobsScreen from '../screens/bookmark-jobs/bookmark-jobs.component';
import ShowJobScreen from '../screens/show-job/show-job.component';
import EmployerScreen from '../screens/employer/employer.component';
import EmployerProfileScreen from '../screens/employer-profile/employer-profile.component';
import AddEditApplicationScreen from '../screens/add-edit-application/add-edit-application.component';
import AboutScreen from '../screens/about/about.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';
import MyJobsScreen from '../screens/my-jobs/my-jobs.component';
import NavigationAnchor from '../components/navigation-anchor/navigation-anchor.component';
import EditEmployeeInfoScreen from '../screens/edit-employee-info/edit-employee-info.component';
import EditEducationScreen from '../screens/edit-education/edit-education.component';
import EditExperienceScreen from '../screens/edit-experience/edit-experience.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import drawerNavOptions from './drawer-nav-options';

const noAuthSearchNavigator = createStackNavigator(
  {
    NoAuthSearch: SearchScreen,
    NoAuthSearchResults: SearchResultsScreen,
    NoAuthShowJob: ShowJobScreen,
    NoAuthemployer: EmployerScreen
  },
  hideHeaderNavOptions
);

const noAuthNavigator = createStackNavigator(
  {
    NavigationAnchor: {
      screen: NavigationAnchor,
      navigationOptions: { drawerLabel: () => null }
    },
    NoAuthSearch: noAuthSearchNavigator,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    About: AboutScreen,
    ContactUs: ContactUsScreen
  },
  hideHeaderNavOptions
);

const searchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    SearchResults: SearchResultsScreen,
    ShowJob: ShowJobScreen,
    employer: EmployerScreen,
    AddEditApplication: AddEditApplicationScreen
  },
  hideHeaderNavOptions
);

const employeeProfileNavigator = createStackNavigator(
  {
    EmployeeProfile: EmployeeProfileScreen,
    EditInfo: EditEmployeeInfoScreen,
    EditEducation: EditEducationScreen,
    EditExperience: EditExperienceScreen
  },
  hideHeaderNavOptions
);

const employeeDrawerNavigator = createDrawerNavigator(
  {
    NavigationAnchor: {
      screen: NavigationAnchor,
      navigationOptions: { drawerLabel: () => null }
    },
    EmployeeProfile: {
      screen: employeeProfileNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
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

const employerDrawerNavigator = createDrawerNavigator(
  {
    NavigationAnchor: {
      screen: NavigationAnchor,
      navigationOptions: { drawerLabel: () => null }
    },
    EmployerProfile: {
      screen: EmployerProfileScreen,
      navigationOptions: { drawerLabel: () => null }
    },
    MyJobs: MyJobsScreen,
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

const switchNavigator = createSwitchNavigator({
  noAuth: noAuthNavigator,
  Employee: employeeDrawerNavigator,
  Employer: employerDrawerNavigator
});

export default createAppContainer(switchNavigator);
