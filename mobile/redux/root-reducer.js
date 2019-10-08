import { combineReducers } from 'redux';

// import all reducers
import currentUserReducer from './current-user/current-user.reducer';
import constantsReducer from './constants/constants.reducer';

const rootReducer = combineReducers({
  // add all reducers
  currentUser: currentUserReducer,
  constants: constantsReducer
});

export default rootReducer;
