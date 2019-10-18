import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NoAuthSearchContainer } from '../screens/search/search.containers';
import { NoAuthSearchResultsContainer } from '../screens/search-results/search-results.containers';
import { NoAuthShowJobContainer } from '../screens/show-job/show-job.containers';
import { NoAuthEmployerProfileContainer } from '../screens/employer-profile/employer-profile.containers';
import SelectedEmployerJobsScreen from '../screens/selected-employer-jobs/selected-employer-jobs.component';

import SignInScreen from '../screens/sign-in/sign-in.component';
import SignUpScreen from '../screens/sign-up/sign-up.component';

import ContactUsScreen from '../screens/contact-us/contact-us.component';

import hideHeaderNavOptions from './hide-header-nav-options';
import aboutNavigator from './about-navigator';

const exploreEmployerNavigator = createStackNavigator(
  {
    NoAuthEmployer: NoAuthEmployerProfileContainer,
    EmployerProfile: NoAuthEmployerProfileContainer,
    SelectedEmployerJobs: SelectedEmployerJobsScreen,
    NoAuthShowJob: NoAuthShowJobContainer
  },
  hideHeaderNavOptions
);

const noAuthSearchNavigator = createStackNavigator(
  {
    NoAuthSearch: NoAuthSearchContainer,
    NoAuthSearchResults: NoAuthSearchResultsContainer,
    NoAuthShowJob: NoAuthShowJobContainer,
    NoAuthEmployer: exploreEmployerNavigator
  },
  hideHeaderNavOptions
);

const noAuthNavigator = createStackNavigator(
  {
    NoAuthSearch: noAuthSearchNavigator,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    About: aboutNavigator,
    ContactUs: ContactUsScreen
  },
  hideHeaderNavOptions
);

export default noAuthNavigator;
