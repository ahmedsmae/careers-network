import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import URLS from '../utils/urls';
import setAuthToken from '../utils/setAuthToken';
import { createImageFormData } from './current-user.utils';

import CurrentUserActionTypes from './current-user.types';
import {
  editEmployeeInfoSuccess,
  editEmployeeInfoFailure,
  addEmployeeLanguageSuccess,
  addEmployeeLanguageFailure,
  deleteEmployeeLanguageSuccess,
  deleteEmployeeLanguageFailure,
  addEmployeeSkillSuccess,
  addEmployeeSkillFailure,
  deleteEmployeeSkillSuccess,
  deleteEmployeeSkillFailure,
  addEmployeeInterestSuccess,
  addEmployeeInterestFailure,
  deleteEmployeeInterestSuccess,
  deleteEmployeeInterestFailure,
  addEditEmployeeReferenceSuccess,
  addEditEmployeeReferenceFailure,
  deleteEmployeeReferenceSuccess,
  deleteEmployeeReferenceFailure,
  editEmployeeSocialProfilesSuccess,
  editEmployeeSocialProfilesFailure,
  editEmployeeAvatarSuccess,
  editEmployeeAvatarFailure,
  editEmployeeEducationSuccess,
  editEmployeeEducationFailure,
  deleteEmployeeEducationSuccess,
  deleteEmployeeEducationFailure,
  editEmployeePreferedJobsSettingsSuccess,
  editEmployeePreferedJobsSettingsFailure
} from './current-user.actions';

function* editEmployeeInfoAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYEE_INFO,
      data: payload
    });

    yield call(callback);
    yield put(editEmployeeInfoSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployeeInfoFailure(err.message));
  }
}

function* addEmployeeLanguageAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.ADD_EMPLOYEE_LANGUAGE,
      timeout: 8000,
      data: payload
    });

    yield call(callback);
    yield put(addEmployeeLanguageSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(addEmployeeLanguageFailure(err.message));
  }
}

function* deleteEmployeeLanguageAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_LANGUAGE}/${payload}`
    });

    yield call(callback);
    yield put(deleteEmployeeLanguageSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteEmployeeLanguageFailure(err.message));
  }
}

function* addEmployeeSkillAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.ADD_EMPLOYEE_SKILL,
      data: payload
    });

    yield call(callback);
    yield put(addEmployeeSkillSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(addEmployeeSkillFailure(err.message));
  }
}

function* deleteEmployeeSkillAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_SKILL}/${payload}`
    });

    yield call(callback);
    yield put(deleteEmployeeSkillSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteEmployeeSkillFailure(err.message));
  }
}

function* addEmployeeInterestAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.ADD_EMPLOYEE_INTEREST,
      data: payload
    });

    yield call(callback);
    yield put(addEmployeeInterestSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(addEmployeeInterestFailure(err.message));
  }
}

function* deleteEmployeeInterestAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_INTEREST}/${payload}`
    });

    yield call(callback);
    yield put(deleteEmployeeInterestSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteEmployeeInterestFailure(err.message));
  }
}

function* addEditEmployeeReferenceAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.ADD_EDIT_EMPLOYEE_REFERENCE,
      data: payload
    });

    yield call(callback);
    yield put(addEditEmployeeReferenceSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(addEditEmployeeReferenceFailure(err.message));
  }
}

function* deleteEmployeeReferenceAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_REFERENCE}/${payload}`
    });

    yield call(callback);
    yield put(deleteEmployeeReferenceSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteEmployeeReferenceFailure(err.message));
  }
}

function* editEmployeeSocialProfilesAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYEE_SOCIAL_PROFILES,
      data: payload
    });

    yield call(callback);
    yield put(editEmployeeSocialProfilesSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployeeSocialProfilesFailure(err.message));
  }
}

function* editEmployeePreferedJobsSettingsAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: URLS.EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS,
      data: payload
    });

    yield call(callback);
    yield put(editEmployeePreferedJobsSettingsSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployeePreferedJobsSettingsFailure(err.message));
  }
}

function* editEmployeeAvatarAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const fd = yield createImageFormData('avatar', payload);

    const response = yield call(axios.post, URLS.EDIT_EMPLOYEE_AVATAR, fd);

    yield call(callback);
    yield put(editEmployeeAvatarSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployeeAvatarFailure(err.message));
  }
}

function* editEmployeeEducationAsync({ payload, callback }) {
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

    yield call(callback);
    yield put(editEmployeeEducationSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(editEmployeeEducationFailure(err.message));
  }
}

function* deleteEmployeeEducationAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `${URLS.DELETE_EMPLOYEE_EDUCATION}/${payload}`
    });

    yield call(callback);
    yield put(deleteEmployeeEducationSuccess(response.data.employee));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteEmployeeEducationFailure(err.message));
  }
}

function* editEmployeeInfoStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START,
    editEmployeeInfoAsync
  );
}

function* addEmployeeLanguageStart() {
  yield takeLatest(
    CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_START,
    addEmployeeLanguageAsync
  );
}

function* deleteEmployeeLanguageStart() {
  yield takeLatest(
    CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_START,
    deleteEmployeeLanguageAsync
  );
}

function* addEmployeeSkillStart() {
  yield takeLatest(
    CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_START,
    addEmployeeSkillAsync
  );
}

function* deleteEmployeeSkillStart() {
  yield takeLatest(
    CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_START,
    deleteEmployeeSkillAsync
  );
}

function* addEmployeeInterestStart() {
  yield takeLatest(
    CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_START,
    addEmployeeInterestAsync
  );
}

function* deleteEmployeeInterestStart() {
  yield takeLatest(
    CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_START,
    deleteEmployeeInterestAsync
  );
}

function* addEditEmployeeReferenceStart() {
  yield takeLatest(
    CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_START,
    addEditEmployeeReferenceAsync
  );
}

function* deleteEmployeeReferenceStart() {
  yield takeLatest(
    CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_START,
    deleteEmployeeReferenceAsync
  );
}

function* editEmployeeSocialProfilesStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_START,
    editEmployeeSocialProfilesAsync
  );
}

function* editEmployeePreferedJobsSettingsStart() {
  yield takeLatest(
    CurrentUserActionTypes.EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_START,
    editEmployeePreferedJobsSettingsAsync
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
    call(deleteEmployeeEducationStart),
    call(addEmployeeLanguageStart),
    call(deleteEmployeeLanguageStart),
    call(addEmployeeSkillStart),
    call(deleteEmployeeSkillStart),
    call(addEmployeeInterestStart),
    call(deleteEmployeeInterestStart),
    call(addEditEmployeeReferenceStart),
    call(deleteEmployeeReferenceStart),
    call(editEmployeeSocialProfilesStart),
    call(editEmployeePreferedJobsSettingsStart)
  ]);
}
