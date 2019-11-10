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
  signoutUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  changePasswordSuccess,
  changePasswordFailure,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  contactUsSuccess,
  contactUsFailure
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
    console.log('signUpUserAsync', err.response);
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
    console.log('signInUserAsync', err.response);
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
    console.log('loadingUserAsync', err.response);
    yield put(loadingUserFailure(err.message));
  }
}

function* changePasswordAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.CHANGE_PASSWORD,
      data: payload
    });

    yield put(changePasswordSuccess(response.data));
    Toast.show('Password changed successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    console.log('changePasswordAsync', err.response);
    yield put(changePasswordFailure(err.message));
  }
}

function* forgetPasswordAsync({ payload }) {
  try {
    yield call(axios, {
      method: 'post',
      url: URLS.FORGET_PASSWORD,
      data: { email: payload }
    });

    yield put(forgetPasswordSuccess());
    Toast.show(`Password sent to ${payload} successfully`, {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    console.log('forgetPasswordAsync', err.response);
    yield put(forgetPasswordFailure(err.message));
  }
}

function* contactUsAsync({ payload }) {
  try {
    yield call(axios, {
      method: 'post',
      url: URLS.CONTACT_US,
      data: payload
    });

    yield put(contactUsSuccess());
    Toast.show('Email sent successfully\nThanks', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    console.log('contactUsAsync', err.response);
    yield put(contactUsFailure(err.message));
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
    console.log('signOutUserAsync', err.response);
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(signoutUserFailure(err.message));
  }
}

function* deleteUserAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'delete',
      url: URLS.DELETE_USER,
      data: payload
    });

    yield AsyncStorage.removeItem('token');

    yield put(deleteUserSuccess());
    Toast.show('User deleted successfully', {
      backgroundColor: 'red',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    console.log('deleteUserAsync', err.response);
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteUserFailure(err.message));
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

function* changePasswordStart() {
  yield takeLatest(
    CurrentUserActionTypes.CHANGE_PASSWORD_START,
    changePasswordAsync
  );
}

function* forgetPasswordStart() {
  yield takeLatest(
    CurrentUserActionTypes.FORGET_PASSWORD_START,
    forgetPasswordAsync
  );
}

function* signOutUserStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_OUT_USER_START,
    signOutUserAsync
  );
}

function* deleteUserStart() {
  yield takeLatest(CurrentUserActionTypes.DELETE_USER_START, deleteUserAsync);
}

function* contactUsStart() {
  yield takeLatest(CurrentUserActionTypes.CONTACT_US_START, contactUsAsync);
}

export default function* userSignSagas() {
  yield all([
    call(signUpUserStart),
    call(signInUserStart),
    call(loadingUserStart),
    call(signOutUserStart),
    call(deleteUserStart),
    call(changePasswordStart),
    call(forgetPasswordStart),
    call(contactUsStart)
  ]);
}
