import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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

const hideHeaderNavOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
};

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
    SignUp: SignUpScreen
  },
  hideHeaderNavOptions
);

const authSearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    SearchResults: SearchResultsScreen,
    ShowJob: ShowJobScreen,
    employer: EmployerScreen,
    AddEditApplication: AddEditApplicationScreen
  },
  hideHeaderNavOptions
);

const emploeeDrawerNavigator = createDrawerNavigator({
  Search: authSearchNavigator,
  UserProfile: UserProfileScreen,
  Home: HomeScreen,
  Following: FollowingScreen,
  Applications: ApplicationsScreen,
  SavedJobs: SavedJobsScreen
});

const switchNavigator = createSwitchNavigator({
  noAuth: noAuthNavigator,
  Auth: emploeeDrawerNavigator
});

export default createAppContainer(switchNavigator);
