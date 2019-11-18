import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import ApplicationsActionTypes from './applications.types';
import {
  createNewApplicationSuccess,
  createNewApplicationFailure,
  updateExistingApplicationSuccess,
  updateExistingApplicationFailure,
  getAllEmployeeApplicationsSuccess,
  getAllEmployeeApplicationsFailure,
  getAllJobApplicationsSuccess,
  getAllJobApplicationsFailure,
  deleteApplicationSuccess,
  deleteApplicationFailure
} from './applications.actions';

function* createNewApplicationAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.CREATE_NEW_APPLICATION,
      data: payload
    });

    yield call(callback);
    yield put(createNewApplicationSuccess(response.data.employeeApplications));
  } catch (err) {
    yield call(callback, err);
    yield put(createNewApplicationFailure(err.message));
  }
}

function* updateExistingApplicationAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.UPDATE_EXISTING_APPLICATION,
      data: payload
    });

    yield call(callback);
    yield put(
      updateExistingApplicationSuccess(response.data.employeeApplications)
    );
  } catch (err) {
    yield call(callback, err);
    yield put(updateExistingApplicationFailure(err.message));
  }
}

function* deleteApplicationAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_APPLICATION}/${payload}`
    });

    yield call(callback);
    yield put(deleteApplicationSuccess(response.data.employeeApplications));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteApplicationFailure(err.message));
  }
}

function* getAllEmployeeApplicationsAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_APPLICATIONS
    });

    yield call(callback);
    yield put(
      getAllEmployeeApplicationsSuccess(response.data.employeeApplications)
    );
  } catch (err) {
    yield call(callback, err);
    yield put(getAllEmployeeApplicationsFailure(err.message));
  }
}

function* getAllJobApplicationsAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_ALL_JOB_APPLICATIONS}/${payload}`
    });

    yield call(callback);
    yield put(getAllJobApplicationsSuccess(response.data.jobApplications));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllJobApplicationsFailure(err.message));
  }
}

function* createNewApplicationStart() {
  yield takeLatest(
    ApplicationsActionTypes.CREATE_NEW_APPLICATION_START,
    createNewApplicationAsync
  );
}

function* updateExistingApplicationStart() {
  yield takeLatest(
    ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_START,
    updateExistingApplicationAsync
  );
}

function* deleteApplicationStart() {
  yield takeLatest(
    ApplicationsActionTypes.DELETE_APPLICATION_START,
    deleteApplicationAsync
  );
}

function* getAllEmployeeApplicationsStart() {
  yield takeLatest(
    ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START,
    getAllEmployeeApplicationsAsync
  );
}

function* getAllJobApplicationsStart() {
  yield takeLatest(
    ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_START,
    getAllJobApplicationsAsync
  );
}

export default function* applicationsSagas() {
  yield all([
    call(createNewApplicationStart),
    call(updateExistingApplicationStart),
    call(getAllEmployeeApplicationsStart),
    call(getAllJobApplicationsStart),
    call(deleteApplicationStart)
  ]);
}
