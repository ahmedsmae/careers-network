import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import noAuthNavigator from './no-auth-router';
import employeeDrawerNavigator from './employee-router';
import employerDrawerNavigator from './employer-router';

export const createRootNavigator = currentUser => {
  let initialRouteName;
  if (!!currentUser && currentUser.kind === 'KIND_EMPLOYEE') {
    initialRouteName = 'Employee';
  } else if (!!currentUser && currentUser.kind === 'KIND_EMPLOYER') {
    initialRouteName = 'Employer';
  } else {
    initialRouteName = 'noAuth';
  }

  const switchNavigator = createSwitchNavigator(
    {
      noAuth: noAuthNavigator,
      Employee: employeeDrawerNavigator,
      Employer: employerDrawerNavigator
    },
    {
      initialRouteName
    }
  );

  return createAppContainer(switchNavigator);
};
