import { combineReducers } from 'redux';

// import all reducers
import currentUserReducer from './current-user/current-user.reducer';
import constantsReducer from './constants/constants.reducer';
import jobsReducer from './jobs/jobs.reducer';
import applicationsReducer from './applications/applications.reducer';
import savedReducer from './saved/saved.reducer';

const rootReducer = combineReducers({
  // add all reducers
  currentUser: currentUserReducer,
  constants: constantsReducer,
  jobs: jobsReducer,
  applications: applicationsReducer,
  saved: savedReducer
});

export default rootReducer;
