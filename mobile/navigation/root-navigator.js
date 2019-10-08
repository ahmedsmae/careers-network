import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import SearchScreen from '../screens/search/search.component';
import SignInScreen from '../screens/sign-in/sign-in.component';
import SignUpScreen from '../screens/sign-up/sign-up.component';
import SearchResultsScreen from '../screens/search-results/search-results.component';
import UserProfileScreen from '../screens/user-profile/user-profile.component';
import HomeScreen from '../screens/home/home.component';
import FollowingScreen from '../screens/following/following.component';
import ApplicationsScreen from '../screens/applications/applications.component';
import SavedJobsScreen from '../screens/saved-jobs/saved-jobs.component';
import ShowJobScreen from '../screens/show-job/show-job.component';
import EmployerScreen from '../screens/employer/employer.component';
import AddEditApplicationScreen from '../screens/add-edit-application/add-edit-application.component';
import AboutScreen from '../screens/about/about.component';
import ContactUsScreen from '../screens/contact-us/contact-us.component';

import CustomDrawer from '../components/custom-drawer/custom-drawer.component';
import Colors from '../constants/colors';
import hideHeaderNavOptions from './hide-header-nav-options';

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

const emploeeDrawerNavigator = createDrawerNavigator(
  {
    UserProfile: {
      screen: UserProfileScreen,
      // this to hide the labe of this route
      navigationOptions: { drawerLabel: () => null }
    },
    Search: searchNavigator,
    Home: HomeScreen,
    Following: FollowingScreen,
    Applications: ApplicationsScreen,
    SavedJobs: SavedJobsScreen,
    About: {
      screen: AboutScreen,
      navigationOptions: { drawerLabel: () => null }
    },
    ContactUs: {
      screen: ContactUsScreen,
      navigationOptions: { drawerLabel: () => null }
    }
  },
  {
    contentComponent: CustomDrawer,
    drawerWidth: Dimensions.get('window').width * 0.7,
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: Colors.ACCENT,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

const switchNavigator = createSwitchNavigator({
  noAuth: noAuthNavigator,
  Auth: emploeeDrawerNavigator
});

export default createAppContainer(switchNavigator);
