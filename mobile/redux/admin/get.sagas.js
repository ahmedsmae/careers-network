import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import AdminActionTypes from './admin.types';
import {
  getAllEmployersSuccess,
  getAllEmployersFailure,
  getAllEmployeesSuccess,
  getAllEmployeesFailure,
  getAllAdminsSuccess,
  getAllAdminsFailure,
  getAllEmployerJobsSuccess,
  getAllEmployerJobsFailure,
  getAllEmployeeApplicationsSuccess,
  getAllEmployeeApplicationsFailure
} from './admin.actions';

function* getAllEmployersAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.ADMIN_GET_ALL_EMPLOYERS
    });

    yield put(getAllEmployersSuccess(response.data.allEmployers));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployersFailure(err.message));
  }
}

function* getAllEmployeesAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.ADMIN_GET_ALL_EMPLOYEES
    });

    yield put(getAllEmployeesSuccess(response.data.allEmployees));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployeesFailure(err.message));
  }
}

function* getAllAdminsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.ADMIN_GET_ALL_ADMINS
    });

    yield put(getAllAdminsSuccess(response.data.allAdmins));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllAdminsFailure(err.message));
  }
}

function* getAllEmployerJobsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.ADMIN_GET_ALL_EMPLOYER_JOBS}/${payload}`
    });

    yield put(getAllEmployerJobsSuccess(response.data.allEmployerJobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployerJobsFailure(err.message));
  }
}

function* getAllEmployeeApplicationsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.ADMIN_GET_ALL_EMPLOYEE_APPLICATIONS}/${payload}`
    });

    yield put(
      getAllEmployeeApplicationsSuccess(response.data.allEmployeeApplications)
    );
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployeeApplicationsFailure(err.message));
  }
}

function* getAllEmployersStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_EMPLOYERS_START,
    getAllEmployersAsync
  );
}

function* getAllEmployeesStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_EMPLOYEES_START,
    getAllEmployeesAsync
  );
}

function* getAllAdminsStart() {
  yield takeLatest(AdminActionTypes.GET_ALL_EMPLOYEES_START, getAllAdminsAsync);
}

function* getAllEmployerJobsStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_EMPLOYER_JOBS_START,
    getAllEmployerJobsAsync
  );
}

function* getAllEmployeeApplicationsStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START,
    getAllEmployeeApplicationsAsync
  );
}

export default function* adminGetSagas() {
  yield all([
    call(getAllEmployersStart),
    call(getAllEmployeesStart),
    call(getAllAdminsStart),
    call(getAllEmployerJobsStart),
    call(getAllEmployeeApplicationsStart)
  ]);
}
