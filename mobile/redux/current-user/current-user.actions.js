import CurrentUserActionTypes from './current-user.types';

// SIGN UP USER
export const signUpUserStart = (email, password) => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_START,
  payload: { email, password }
});

export const signUpUserSuccess = result => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_SUCCESS,
  payload: result
});

export const signUpUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_FAILURE,
  payload: errorMessage
});

// SIGN IN USER
export const signInUserStart = (email, password) => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_START,
  payload: { email, password }
});

export const signInUserSuccess = result => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_SUCCESS,
  payload: result
});

export const signInUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_FAILURE,
  payload: errorMessage
});

// LOADING USER
export const loadingUserStart = () => ({
  type: CurrentUserActionTypes.LOADING_USER_START
});

export const loadingUserSuccess = results => ({
  type: CurrentUserActionTypes.LOADING_USER_SUCCESS,
  payload: results
});

export const loadingUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.LOADING_USER_FAILURE,
  payload: errorMessage
});

// SIGNOUT USER
export const signoutUserStart = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_START
});

export const signoutUserSuccess = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS
});

export const signoutUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE INFO
export const editEmployeeInfoStart = info => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START,
  payload: info
});

export const editEmployeeInfoSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_SUCCESS,
  payload: employee
});

export const editEmployeeInfoFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE AVATAR
export const editEmployeeAvatarStart = avatar => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_START,
  payload: avatar
});

export const editEmployeeAvatarSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_SUCCESS,
  payload: employee
});

export const editEmployeeAvatarFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE EDUCATION
export const editEmployeeEducationStart = education => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_START,
  payload: education
});

export const editEmployeeEducationSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_SUCCESS,
  payload: employee
});

export const editEmployeeEducationFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE EDUCATION
export const deleteEmployeeEducationStart = educationId => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_START,
  payload: educationId
});

export const deleteEmployeeEducationSuccess = employee => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_SUCCESS,
  payload: employee
});

export const deleteEmployeeEducationFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_FAILURE,
  payload: errorMessage
});
