import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import AdminActionTypes from './admin.types';
import {
  deleteEmployerSuccess,
  deleteEmployerFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  deleteJobSuccess,
  deleteJobFailure,
  deleteApplicationSuccess,
  deleteApplicationFailure
} from './admin.actions';

function* deleteEmployerAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.ADMIN_DELETE_EMPLOYER}/${payload}`
    });

    yield put(deleteEmployerSuccess(response.data.allEmployers));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteEmployerFailure(err.message));
  }
}

function* deleteEmployeeAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.ADMIN_DELETE_EMPLOYEE}/${payload}`
    });

    yield put(deleteEmployeeSuccess(response.data.allEmployees));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteEmployeeFailure(err.message));
  }
}

function* deleteJobAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.ADMIN_DELETE_JOB}/${payload}`
    });

    yield put(deleteJobSuccess(response.data.allEmployerJobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteJobFailure(err.message));
  }
}

function* deleteApplicationAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.ADMIN_DELETE_APPLICATION}/${payload}`
    });

    yield put(deleteApplicationSuccess(response.data.allEmployeeApplications));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteApplicationFailure(err.message));
  }
}

function* deleteEmployerStart() {
  yield takeLatest(AdminActionTypes.DELETE_EMPLOYER_START, deleteEmployerAsync);
}

function* deleteEmployeeStart() {
  yield takeLatest(AdminActionTypes.DELETE_EMPLOYEE_START, deleteEmployeeAsync);
}

function* deleteJobStart() {
  yield takeLatest(AdminActionTypes.DELETE_JOB_START, deleteJobAsync);
}

function* deleteApplicationStart() {
  yield takeLatest(
    AdminActionTypes.DELETE_APPLICATION_START,
    deleteApplicationAsync
  );
}

export default function* adminDeleteSagas() {
  yield all([
    call(deleteEmployerStart),
    call(deleteEmployeeStart),
    call(deleteJobStart),
    call(deleteApplicationStart)
  ]);
}
