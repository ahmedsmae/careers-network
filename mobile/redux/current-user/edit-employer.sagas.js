import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
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

function* editEmployerInfoAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYER_INFO,
      data: payload
    });

    yield put(editEmployerInfoSuccess(response.data.employer));
    Toast.show('Your info updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      Toast.show(err.response.data.errors.map(err => err.msg).toString(), {
        backgroundColor: 'red',
        duration: Toast.durations.LONG
      });
    }
    yield put(editEmployerInfoFailure(err.message));
  }
}

function* editEmployerAvatarAsync({ payload }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('avatar', payload);
    const response = yield call(axios.post, URLS.EDIT_EMPLOYER_AVATAR, fd);

    yield put(editEmployerAvatarSuccess(response.data.employer));
    Toast.show('Avatar updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      Toast.show(err.response.data.error, {
        backgroundColor: 'red',
        duration: Toast.durations.LONG
      });
    } else {
      Toast.show('Something went wrong...', {
        backgroundColor: 'red',
        duration: Toast.durations.LONG
      });
    }
    yield put(editEmployerAvatarFailure(err.message));
  }
}

function* editEmployerCoverAsync({ payload }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('cover', payload);
    const response = yield call(axios.post, URLS.EDIT_EMPLOYER_COVER, fd);

    yield put(editEmployerCoverSuccess(response.data.employer));
    Toast.show('Cover updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      Toast.show(err.response.data.error, {
        backgroundColor: 'red',
        duration: Toast.durations.LONG
      });
    } else {
      Toast.show('Something went wrong...', {
        backgroundColor: 'red',
        duration: Toast.durations.LONG
      });
    }
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
