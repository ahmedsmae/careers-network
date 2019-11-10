import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import AdminActionTypes from './admin.types';
import {
  changeEmployerEmailSuccess,
  changeEmployerEmailFailure,
  changeEmployeeEmailSuccess,
  changeEmployeeEmailFailure
} from './admin.actions';

function* changeEmployerEmailAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.ADMIN_CHANGE_EMPLOYER_EMAIL,
      data: payload
    });

    yield put(changeEmployerEmailSuccess(response.data.allEmployers));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(changeEmployerEmailFailure(err.message));
  }
}

function* changeEmployeeEmailAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'patch',
      url: URLS.ADMIN_CHANGE_EMPLOYEE_EMAIL,
      data: payload
    });

    yield put(changeEmployeeEmailSuccess(response.data.allEmployees));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(changeEmployeeEmailFailure(err.message));
  }
}

function* changeEmployerEmailStart() {
  yield takeLatest(
    AdminActionTypes.CHANGE_EMPLOYER_EMAIL_START,
    changeEmployerEmailAsync
  );
}

function* changeEmployeeEmailStart() {
  yield takeLatest(
    AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_START,
    changeEmployeeEmailAsync
  );
}

export default function* adminUpdateSagas() {
  yield all([call(changeEmployerEmailStart), call(changeEmployeeEmailStart)]);
}
