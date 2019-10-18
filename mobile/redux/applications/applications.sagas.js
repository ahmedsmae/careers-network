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

function* createNewApplicationAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.CREATE_NEW_APPLICATION,
      data: payload
    });

    yield put(createNewApplicationSuccess(response.data.employeeApplications));
    Toast.show('Application created successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(createNewApplicationFailure(err.message));
  }
}

function* updateExistingApplicationAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.UPDATE_EXISTING_APPLICATION,
      data: payload
    });

    yield put(
      updateExistingApplicationSuccess(response.data.employeeApplications)
    );
    Toast.show('Application updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(updateExistingApplicationFailure(err.message));
  }
}

function* deleteApplicationAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_APPLICATION}/${payload}`
    });

    yield put(deleteApplicationSuccess(response.data.employeeApplications));
    Toast.show('Application deleted successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteApplicationFailure(err.message));
  }
}

function* getAllEmployeeApplicationsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_APPLICATIONS
    });

    yield put(
      getAllEmployeeApplicationsSuccess(response.data.employeeApplications)
    );
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployeeApplicationsFailure(err.message));
  }
}

function* getAllJobApplicationsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_ALL_JOB_APPLICATIONS}/${payload}`
    });

    yield put(getAllJobApplicationsSuccess(response.data.jobApplications));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
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
