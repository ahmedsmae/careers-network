import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';

import CurrentUserActionTypes from './current-user.types';
import {
  signUpUserSuccess,
  signUpUserFailure,
  signInUserSuccess,
  signInUserFailure,
  loadingUserSuccess,
  loadingUserFailure,
  signoutUserSuccess,
  signoutUserFailure
} from './current-user.actions';

function* signUpUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: URLS.SIGNUP,
      data: payload
    });

    yield AsyncStorage.setItem('token', response.data.token);

    yield put(signUpUserSuccess(response.data));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(signUpUserFailure(err.message));
  }
}

function* signInUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: URLS.SIGNIN,
      data: payload
    });

    yield AsyncStorage.setItem('token', response.data.token);

    yield put(signInUserSuccess(response.data));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(signInUserFailure(err.message));
  }
}

function* loadingUserAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: URLS.AUTH
    });

    yield put(loadingUserSuccess(response.data));
  } catch (err) {
    yield put(loadingUserFailure(err.message));
  }
}

function* signOutUserAsync() {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'post',
      url: URLS.SIGNOUT
    });

    yield AsyncStorage.removeItem('token');

    yield put(signoutUserSuccess());
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(signoutUserFailure(err.message));
  }
}

function* signUpUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_UP_USER_START, signUpUserAsync);
}

function* signInUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_IN_USER_START, signInUserAsync);
}

function* loadingUserStart() {
  yield takeLatest(CurrentUserActionTypes.LOADING_USER_START, loadingUserAsync);
}

function* signOutUserStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_OUT_USER_START,
    signOutUserAsync
  );
}

export default function* userSignSagas() {
  yield all([
    call(signUpUserStart),
    call(signInUserStart),
    call(loadingUserStart),
    call(signOutUserStart)
  ]);
}
