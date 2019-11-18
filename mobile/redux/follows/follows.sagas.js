import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';
import FollowsActionTypes from './follows.types';
import {
  followEmployerSuccess,
  followEmployerFailure,
  unfollowEmployerSuccess,
  unfollowEmployerFailure,
  getAllEmployeeFollowsSuccess,
  getAllEmployeeFollowsFailure
} from './follows.actions';

function* followEmployerAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: `${URLS.FOLLOW_EMPLOYER}/${payload}`
    });

    yield call(callback);
    yield put(followEmployerSuccess(response.data.employeeFollows));
  } catch (err) {
    yield call(callback, err);
    yield put(followEmployerFailure(err.message));
  }
}

function* unfollowEmployerAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.UNFOLLOW_EMPLOYER}/${payload}`
    });

    yield call(callback);
    yield put(unfollowEmployerSuccess(response.data.employeeFollows));
  } catch (err) {
    yield call(callback, err);
    yield put(unfollowEmployerFailure(err.message));
  }
}

function* getAllEmployeeFollowsAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_FOLLOWS
    });

    yield call(callback);
    yield put(getAllEmployeeFollowsSuccess(response.data.employeeFollows));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllEmployeeFollowsFailure(err.message));
  }
}

function* followEmployerStart() {
  yield takeLatest(
    FollowsActionTypes.FOLLOW_EMPLOYER_START,
    followEmployerAsync
  );
}
function* unfollowEmployerStart() {
  yield takeLatest(
    FollowsActionTypes.UNFOLLOW_EMPLOYER_START,
    unfollowEmployerAsync
  );
}
function* getAllEmployeeFollowsStart() {
  yield takeLatest(
    FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_START,
    getAllEmployeeFollowsAsync
  );
}

export default function* followsSagas() {
  yield all([
    call(followEmployerStart),
    call(unfollowEmployerStart),
    call(getAllEmployeeFollowsStart)
  ]);
}
