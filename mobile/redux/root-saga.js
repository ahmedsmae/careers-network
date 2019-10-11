import { all, call } from 'redux-saga/effects';

// import all sagas
import userSignSagas from './current-user/user-sign.sagas';
import editEmployeeSagas from './current-user/edit-employee.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(userSignSagas),
    call(editEmployeeSagas)
  ]);
}
