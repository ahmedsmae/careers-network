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

// CHANGE PASSWORD
export const changePasswordStart = (oldPassword, newPassword) => ({
  type: CurrentUserActionTypes.CHANGE_PASSWORD_START,
  payload: { oldPassword, newPassword }
});

export const changePasswordSuccess = results => ({
  type: CurrentUserActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: results
});

export const changePasswordFailure = errorMessage => ({
  type: CurrentUserActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: errorMessage
});

// FORGET PASSWORD
export const forgetPasswordStart = email => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_START,
  payload: email
});

export const forgetPasswordSuccess = () => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_SUCCESS
});

export const forgetPasswordFailure = errorMessage => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_FAILURE,
  payload: errorMessage
});

// CONTACT US
export const contactUsStart = contactData => ({
  type: CurrentUserActionTypes.CONTACT_US_START,
  payload: contactData
});

export const contactUsSuccess = () => ({
  type: CurrentUserActionTypes.CONTACT_US_SUCCESS
});

export const contactUsFailure = errorMessage => ({
  type: CurrentUserActionTypes.CONTACT_US_FAILURE,
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

// DELETE USER
export const deleteUserStart = deleteData => ({
  type: CurrentUserActionTypes.DELETE_USER_START,
  payload: deleteData
});

export const deleteUserSuccess = () => ({
  type: CurrentUserActionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_USER_FAILURE,
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

// EDIT EMPLOYER INFO
export const editEmployerInfoStart = info => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_INFO_START,
  payload: info
});

export const editEmployerInfoSuccess = employer => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_INFO_SUCCESS,
  payload: employer
});

export const editEmployerInfoFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_INFO_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYER AVATAR
export const editEmployerAvatarStart = avatar => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_START,
  payload: avatar
});

export const editEmployerAvatarSuccess = employer => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_SUCCESS,
  payload: employer
});

export const editEmployerAvatarFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYER COVER
export const editEmployerCoverStart = cover => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_START,
  payload: cover
});

export const editEmployerCoverSuccess = employer => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_SUCCESS,
  payload: employer
});

export const editEmployerCoverFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_FAILURE,
  payload: errorMessage
});
