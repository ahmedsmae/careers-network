import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';
import { createImageFormData } from './current-user.utils';

import CurrentUserActionTypes from './current-user.types';
import {
  editEmployerInfoSuccess,
  editEmployerInfoFailure,
  editEmployerAvatarSuccess,
  editEmployerAvatarFailure,
  editEmployerCoverSuccess,
  editEmployerCoverFailure
} from './current-user.actions';

function* editEmployerInfoAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYER_INFO,
      data: payload
    });

    yield call(callback);
    yield put(editEmployerInfoSuccess(response.data.employer));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployerInfoFailure(err.message));
  }
}

function* editEmployerAvatarAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('avatar', payload);
    const response = yield call(axios.post, URLS.EDIT_EMPLOYER_AVATAR, fd);

    yield call(callback);
    yield put(editEmployerAvatarSuccess(response.data.employer));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployerAvatarFailure(err.message));
  }
}

function* editEmployerCoverAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('cover', payload);
    const response = yield call(axios.post, URLS.EDIT_EMPLOYER_COVER, fd);

    yield call(callback);
    yield put(editEmployerCoverSuccess(response.data.employer));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployerCoverFailure(err.message));
  }
}

function* editEmployerInfoStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYER_INFO_START,
    editEmployerInfoAsync
  );
}

function* editEmployerAvatarStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_START,
    editEmployerAvatarAsync
  );
}

function* editEmployerCoverStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYER_COVER_START,
    editEmployerCoverAsync
  );
}

export default function* editEmployerSagas() {
  yield all([
    call(editEmployerInfoStart),
    call(editEmployerAvatarStart),
    call(editEmployerCoverStart)
  ]);
}
