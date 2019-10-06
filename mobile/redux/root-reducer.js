import { combineReducers } from 'redux';

// import all reducers
import currentUserReducer from './current-user/current-user.reducer';

const rootReducer = combineReducers({
  // add all reducers
  currentUser: currentUserReducer
});

export default rootReducer;
