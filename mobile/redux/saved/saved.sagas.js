import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
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

function* saveJobAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: `${URLS.SAVE_JOB}/${payload}`
    });

    yield put(saveJobSuccess(response.data.employeeSavedJobs));
    Toast.show('Job saved successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(saveJobFailure(err.message));
  }
}

function* unsaveJobAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.UNSAVE_JOB}/${payload}`
    });

    yield put(unsaveJobSuccess(response.data.employeeSavedJobs));
    Toast.show('Job unsaved successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(unsaveJobFailure(err.message));
  }
}

function* getAllEmployeeSavedJobsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_SAVED_JOBS
    });

    yield put(getAllEmployeeSavedJobsSuccess(response.data.employeeSavedJobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
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
