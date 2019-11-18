import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';
import SavedActionTypes from './saved.types';
import {
  saveJobSuccess,
  saveJobFailure,
  unsaveJobSuccess,
  unsaveJobFailure,
  getAllEmployeeSavedJobsSuccess,
  getAllEmployeeSavedJobsFailure
} from './saved.actions';

function* saveJobAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: `${URLS.SAVE_JOB}/${payload}`
    });

    yield call(callback);
    yield put(saveJobSuccess(response.data.employeeSavedJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(saveJobFailure(err.message));
  }
}

function* unsaveJobAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.UNSAVE_JOB}/${payload}`
    });

    yield call(callback);
    yield put(unsaveJobSuccess(response.data.employeeSavedJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(unsaveJobFailure(err.message));
  }
}

function* getAllEmployeeSavedJobsAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_SAVED_JOBS
    });

    yield call(callback);
    yield put(getAllEmployeeSavedJobsSuccess(response.data.employeeSavedJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllEmployeeSavedJobsFailure(err.message));
  }
}

function* saveJobStart() {
  yield takeLatest(SavedActionTypes.SAVE_JOB_START, saveJobAsync);
}

function* unsaveJobStart() {
  yield takeLatest(SavedActionTypes.UNSAVE_JOB_START, unsaveJobAsync);
}

function* getAllEmployeeSavedJobsStart() {
  yield takeLatest(
    SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_START,
    getAllEmployeeSavedJobsAsync
  );
}

export default function* savedSagas() {
  yield all([
    call(saveJobStart),
    call(unsaveJobStart),
    call(getAllEmployeeSavedJobsStart)
  ]);
}
