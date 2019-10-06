import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import CurrentUserActionTypes from './current-user.types';
import { signUpUserSuccess, signUpUserFailure } from './current-user.actions';

function* signUpUserAsync() {
  try {
    yield put(signUpUserSuccess(response.data.user));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(signUpUserFailure(err.message));
  }
}

function* signUpUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_UP_USER_START, signUpUserAsync);
}

export default function* publicItemsSagas() {
  yield all([call(signUpUserStart)]);
}
