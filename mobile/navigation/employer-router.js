import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EmployerShowJobContainer } from '../screens/show-job/show-job.containers';
import { EmployerEmployerProfileContainer } from '../screens/employer-profile/employer-profile.containers';

import EmployeeProfileScreen from '../screens/employee-profile/employee-profile.component';
import { EmployerEmployeeGeneralInfoContainer } from '../screens/employee-profile/general-info/employee-general-info.containers';
import { EmployerEmployeeEducationsContainer } from '../screens/employee-profile/educations/educations.containers';
import { EmployerEmployeeExperiencesContainer } from '../screens/employee-profile/experiences/experiences.containers';
import { EmployerEmployeeTrainingsContainer } from '../screens/employee-profile/trainings/trainings.containers';
import { EmployerEmployeeLanguagesContainer } from '../screens/employee-profile/languages/languages.containers';
import { EmployerEmployeeSkillsContainer } from '../screens/employee-profile/skills/skills.containers';
import { EmployerEmployeeInterestsContainer } from '../screens/employee-profile/interests/interests.containers';
import { EmployerEmployeeReferencesContainer } from '../screens/employee-profile/references/references.containers';
import { EmployerEmployeeSocialProfilesContainer } from '../screens/employee-profile/social-profiles/social-profiles.containers';

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
    EmployerEmployeeProfile: createStackNavigator(
      {
        EmployerEmployeeGeneralInfo: EmployerEmployeeGeneralInfoContainer,
        EmployeeProfile: EmployeeProfileScreen,
        EmployeeEducations: EmployerEmployeeEducationsContainer,
        EmployeeExperiences: EmployerEmployeeExperiencesContainer,
        EmployeeTrainings: EmployerEmployeeTrainingsContainer,
        EmployeeLanguages: EmployerEmployeeLanguagesContainer,
        EmployeeSkills: EmployerEmployeeSkillsContainer,
        EmployeeInterests: EmployerEmployeeInterestsContainer,
        EmployeeReferences: EmployerEmployeeReferencesContainer,
        EmployeeSocialProfiles: EmployerEmployeeSocialProfilesContainer
      },
      hideHeaderNavOptions
    )
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
