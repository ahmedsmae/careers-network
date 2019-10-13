import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import JobsActionTypes from './jobs.types';
import {
  createNewJobSuccess,
  createNewJobFailure,
  updateExistingJobSuccess,
  updateExistingJobFailure,
  getAllEmployerJobsSuccess,
  getAllEmployerJobsFailure,
  getHomeJobsSuccess,
  getHomeJobsFailure,
  getFollowingJobsSuccess,
  getFollowingJobsFailure,
  searchJobsSuccess,
  searchJobsFailure
} from './jobs.actions';

function* createNewJobAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.CREATE_NEW_JOB,
      data: payload
    });

    yield put(createNewJobSuccess(response.data.employerJobs));
    Toast.show('Job created successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(createNewJobFailure(err.message));
  }
}

function* updateExistingJobAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.UPDATE_EXISTING_JOB,
      data: payload
    });

    yield put(updateExistingJobSuccess(response.data.employerJobs));
    Toast.show('Job updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(updateExistingJobFailure(err.message));
  }
}

function* getAllEmployerJobsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_ALL_EMPLOYER_JOBS}/${payload}`
    });

    yield put(getAllEmployerJobsSuccess(response.data.employerJobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getAllEmployerJobsFailure(err.message));
  }
}

function* getHomeJobsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      // url: URLS.GET_ALL_EMPLOYER_JOBS,
      data: payload
    });

    yield put(getHomeJobsSuccess(response.data.jobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getHomeJobsFailure(err.message));
  }
}

function* getFollowingJobsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_FOLLOWING_EMPLOYERS_JOBS}/${payload}`
    });

    yield put(getFollowingJobsSuccess(response.data.jobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(getFollowingJobsFailure(err.message));
  }
}

function* searchJobsAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.SEARCH_JOBS,
      data: payload
    });

    yield put(searchJobsSuccess(response.data.jobs));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(searchJobsFailure(err.message));
  }
}

function* createNewJobStart() {
  yield takeLatest(JobsActionTypes.CREATE_NEW_JOB_START, createNewJobAsync);
}

function* updateExistingJobStart() {
  yield takeLatest(
    JobsActionTypes.UPDATE_EXISTING_JOB_START,
    updateExistingJobAsync
  );
}

function* getAllEmployerJobsStart() {
  yield takeLatest(
    JobsActionTypes.GET_ALL_EMPLOYER_JOBS_START,
    getAllEmployerJobsAsync
  );
}

function* getHomeJobsStart() {
  yield takeLatest(JobsActionTypes.GET_HOME_JOBS_START, getHomeJobsAsync);
}

function* getFollowingJobsStart() {
  yield takeLatest(
    JobsActionTypes.GET_FOLLOWING_JOBS_START,
    getFollowingJobsAsync
  );
}

function* searchJobsStart() {
  yield takeLatest(JobsActionTypes.SEARCH_JOBS_START, searchJobsAsync);
}

export default function* jobsSagas() {
  yield all([
    call(createNewJobStart),
    call(updateExistingJobStart),
    call(getAllEmployerJobsStart),
    call(getHomeJobsStart),
    call(getFollowingJobsStart),
    call(searchJobsStart)
  ]);
}
