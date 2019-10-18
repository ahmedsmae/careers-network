import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
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

function* followEmployerAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: `${URLS.FOLLOW_EMPLOYER}/${payload}`
    });

    yield put(followEmployerSuccess(response.data.employeeFollows));
    Toast.show('Successfully started following this employer', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(followEmployerFailure(err.message));
  }
}

function* unfollowEmployerAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.UNFOLLOW_EMPLOYER}/${payload}`
    });

    yield put(unfollowEmployerSuccess(response.data.employeeFollows));
    Toast.show('Successfully unfllowed this employer', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(unfollowEmployerFailure(err.message));
  }
}

function* getAllEmployeeFollowsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.GET_ALL_EMPLOYEE_FOLLOWS
    });

    yield put(getAllEmployeeFollowsSuccess(response.data.employeeFollows));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
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
