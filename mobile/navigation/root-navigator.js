import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import noAuthNavigator from './no-auth-router';
import employeeDrawerNavigator from './employee-router';
import employerDrawerNavigator from './employer-router';
import adminDrawerNavigator from './admin-router';

export const createRootNavigator = currentUser => {
  let initialRouteName;
  if (!!currentUser && currentUser.kind === 'KIND_EMPLOYEE') {
    initialRouteName = 'Employee';
  } else if (!!currentUser && currentUser.kind === 'KIND_EMPLOYER') {
    initialRouteName = 'Employer';
  } else if (!!currentUser && currentUser.kind === 'KIND_ADMIN') {
    initialRouteName = 'Admin';
  } else {
    initialRouteName = 'noAuth';
  }

  const switchNavigator = createSwitchNavigator(
    {
      noAuth: noAuthNavigator,
      Employee: employeeDrawerNavigator,
      Employer: employerDrawerNavigator,
      Admin: adminDrawerNavigator
    },
    {
      initialRouteName
    }
  );

  return createAppContainer(switchNavigator);
};
