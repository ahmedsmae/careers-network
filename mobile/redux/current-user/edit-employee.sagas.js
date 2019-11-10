import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';
import { createImageFormData } from './current-user.utils';

import CurrentUserActionTypes from './current-user.types';
import {
  editEmployeeInfoSuccess,
  editEmployeeInfoFailure,
  editEmployeeAvatarSuccess,
  editEmployeeAvatarFailure,
  editEmployeeEducationSuccess,
  editEmployeeEducationFailure,
  deleteEmployeeEducationSuccess,
  deleteEmployeeEducationFailure
} from './current-user.actions';

function* editEmployeeInfoAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYEE_INFO,
      data: payload
    });

    yield put(editEmployeeInfoSuccess(response.data.employee));
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
    yield put(editEmployeeInfoFailure(err.message));
  }
}

function* editEmployeeAvatarAsync({ payload }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('avatar', payload);

    const response = yield call(axios.post, URLS.EDIT_EMPLOYEE_AVATAR, fd);

    yield put(editEmployeeAvatarSuccess(response.data.employee));
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
    yield put(editEmployeeAvatarFailure(err.message));
  }
}

function* editEmployeeEducationAsync({ payload }) {
  const { certificate_image, ...otherProps } = payload;
  try {
    yield setAuthToken();

    let response;
    response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EDUCATION_INFO,
      data: otherProps
    });

    if (!!certificate_image) {
      const fd = yield createImageFormData('certificate', certificate_image);

      response = yield call(
        axios.post,
        `${URLS.EDIT_EDUCATION_IMAGE}/${response.data.educationId}`,
        fd
      );
    }

    yield put(editEmployeeEducationSuccess(response.data.employee));
    Toast.show('Educations updated successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(editEmployeeEducationFailure(err.message));
  }
}

function* deleteEmployeeEducationAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_EDUCATION}/${payload}`
    });

    yield put(deleteEmployeeEducationSuccess(response.data.employee));
    Toast.show('Education deleted successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.SHORT
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(deleteEmployeeEducationFailure(err.message));
  }
}

function* editEmployeeInfoStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START,
    editEmployeeInfoAsync
  );
}

function* editEmployeeAvatarStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_START,
    editEmployeeAvatarAsync
  );
}

function* editEmployeeEducationStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_START,
    editEmployeeEducationAsync
  );
}

function* deleteEmployeeEducationStart() {
  yield takeLatest(
    CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_START,
    deleteEmployeeEducationAsync
  );
}

export default function* editEmployeeSagas() {
  yield all([
    call(editEmployeeInfoStart),
    call(editEmployeeAvatarStart),
    call(editEmployeeEducationStart),
    call(deleteEmployeeEducationStart)
  ]);
}
