import { all, call } from 'redux-saga/effects';

// import all sagas
import userSignSagas from './current-user/user-sign.sagas';
import editEmployeeSagas from './current-user/edit-employee.sagas';
import editEmployerSagas from './current-user/edit-employer.sagas';
import jobsSagas from './jobs/jobs.sagas';
import applicationsSagas from './applications/applications.sagas';
import savedSagas from './saved/saved.sagas';
import followsSagas from './follows/follows.sagas';
import adminCreate from './admin/create.sagas';
import adminGet from './admin/get.sagas';
import adminUpdate from './admin/update.sagas';
import adminDelete from './admin/delete.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(userSignSagas),
    call(editEmployeeSagas),
    call(editEmployerSagas),
    call(jobsSagas),
    call(applicationsSagas),
    call(savedSagas),
    call(followsSagas),
    call(adminCreate),
    call(adminGet),
    call(adminUpdate),
    call(adminDelete)
  ]);
}
