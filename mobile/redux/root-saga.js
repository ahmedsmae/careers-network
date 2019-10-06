import { all, call } from 'redux-saga/effects';

// import all sagas
import currentUserSagas from './current-user/current-user.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(currentUserSagas)
  ]);
}
