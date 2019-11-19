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
  deleteJobSuccess,
  deleteJobFailure,
  getAllEmployerJobsSuccess,
  getAllEmployerJobsFailure,
  getHomeJobsSuccess,
  getHomeJobsFailure,
  getFollowingJobsSuccess,
  getFollowingJobsFailure,
  searchJobsSuccess,
  searchJobsFailure,
  publicGetEmployerJobsSuccess,
  publicGetEmployerJobsFailure
} from './jobs.actions';

function* createNewJobAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.CREATE_NEW_JOB,
      data: payload
    });

    yield call(callback);
    yield put(createNewJobSuccess(response.data.employerJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(createNewJobFailure(err.message));
  }
}

function* updateExistingJobAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.UPDATE_EXISTING_JOB,
      data: payload
    });

    yield call(callback);
    yield put(updateExistingJobSuccess(response.data.employerJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(updateExistingJobFailure(err.message));
  }
}

function* deleteJobAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_JOB}/${payload}`
    });

    yield call(callback);
    yield put(deleteJobSuccess(response.data.employerJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteJobFailure(err.message));
  }
}

function* getAllEmployerJobsAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_ALL_EMPLOYER_JOBS}/${payload}`
    });

    yield call(callback);
    yield put(getAllEmployerJobsSuccess(response.data.employerJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllEmployerJobsFailure(err.message));
  }
}

function* getHomeJobsAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_EMPLOYEE_HOME_JOBS
    });

    yield call(callback);
    yield put(getHomeJobsSuccess(response.data.homeJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(getHomeJobsFailure(err.message));
  }
}

function* getFollowingJobsAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_FOLLOWING_EMPLOYERS_JOBS}/${payload}`
    });

    yield call(callback);
    yield put(getFollowingJobsSuccess(response.data.jobs));
  } catch (err) {
    yield call(callback, err);
    yield put(getFollowingJobsFailure(err.message));
  }
}

function* searchJobsAsync({ payload, callback }) {
  const { position, location_id } = payload;

  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.SEARCH_JOBS}/${position}/${location_id}`
    });

    yield call(callback);
    yield put(searchJobsSuccess(response.data.jobsResult));
  } catch (err) {
    yield call(callback, err);
    yield put(searchJobsFailure(err.message));
  }
}

function* publicGetEmployerJobsAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `${URLS.GET_ALL_EMPLOYER_JOBS}/${payload}`
    });

    yield call(callback);
    yield put(publicGetEmployerJobsSuccess(response.data.employerJobs));
  } catch (err) {
    yield call(callback, err);
    yield put(publicGetEmployerJobsFailure(err.message));
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

function* deleteJobStart() {
  yield takeLatest(JobsActionTypes.DELETE_JOB_START, deleteJobAsync);
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

function* publicGetEmployerJobsStart() {
  yield takeLatest(
    JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_START,
    publicGetEmployerJobsAsync
  );
}

export default function* jobsSagas() {
  yield all([
    call(createNewJobStart),
    call(updateExistingJobStart),
    call(deleteJobStart),
    call(getAllEmployerJobsStart),
    call(getHomeJobsStart),
    call(getFollowingJobsStart),
    call(searchJobsStart),
    call(publicGetEmployerJobsStart)
  ]);
}
