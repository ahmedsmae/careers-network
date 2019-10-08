import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectCurrentEmployer
} from '../../redux/current-user/current-user.selectors';

const NavigationAnchor = ({
  navigation,
  currentUser,
  currentEmployee,
  currentEmployer
}) => {
  const { routeName } = navigation.state;
  console.log('routename', routeName);
  console.log('currentUser', currentUser);
  console.log('currentEmployee', currentEmployee);
  console.log('currentEmployer', currentEmployer);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate('NoAuthSearch');
    } else if (currentUser && currentEmployee) {
      navigation.navigate('Search');
    } else if (currentUser && currentEmployer) {
      navigation.navigate('MyJobs');
    }
  }, [currentUser, currentEmployee, currentEmployer]);

  return null;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentEmployee: selectCurrentEmployee,
  currentEmployer: selectCurrentEmployer
});

export default connect(mapStateToProps)(NavigationAnchor);
