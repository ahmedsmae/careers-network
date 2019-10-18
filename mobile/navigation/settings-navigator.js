import { createStackNavigator } from 'react-navigation-stack';

import SettingsScreen from '../screens/settings/settings.component';
import DeleteUserScreen from '../screens/delete-user/delete-user.component';
import ChangePasswordScreen from '../screens/change-password/change-password.component';
import UserAgreementScreen from '../screens/user-agreement/user-agreement.component';

import hideHeaderNavOptions from './hide-header-nav-options';

export default settingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    UserAgreement: UserAgreementScreen,
    ChangePassword: ChangePasswordScreen,
    DeleteUser: DeleteUserScreen
  },
  hideHeaderNavOptions
);
