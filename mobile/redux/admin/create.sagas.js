import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import AdminActionTypes from './admin.types';
import { createEmployerSuccess, createEmployerFailure } from './admin.actions';

function* createEmployerAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.ADMIN_CREATE_EMPLOYER,
      data: payload
    });

    yield put(createEmployerSuccess(response.data.allEmployers));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(createEmployerFailure(err.message));
  }
}

function* createEmployerStart() {
  yield takeLatest(AdminActionTypes.CREATE_EMPLOYER_START, createEmployerAsync);
}

export default function* adminCreateSagas() {
  yield all([call(createEmployerStart)]);
}
