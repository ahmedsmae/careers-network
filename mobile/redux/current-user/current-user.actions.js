import CurrentUserActionTypes from './current-user.types';

// SIGN UP USER
export const signUpUserStart = (email, password, callback) => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_START,
  payload: { email, password },
  callback
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
export const signInUserStart = (email, password, callback) => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_START,
  payload: { email, password },
  callback
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
export const loadingUserStart = callback => ({
  type: CurrentUserActionTypes.LOADING_USER_START,
  callback
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
export const changePasswordStart = (oldPassword, newPassword, callback) => ({
  type: CurrentUserActionTypes.CHANGE_PASSWORD_START,
  payload: { oldPassword, newPassword },
  callback
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
export const forgetPasswordStart = (email, callback) => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_START,
  payload: email,
  callback
});

export const forgetPasswordSuccess = () => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_SUCCESS
});

export const forgetPasswordFailure = errorMessage => ({
  type: CurrentUserActionTypes.FORGET_PASSWORD_FAILURE,
  payload: errorMessage
});

// CONTACT US
export const contactUsStart = (contactData, callback) => ({
  type: CurrentUserActionTypes.CONTACT_US_START,
  payload: contactData,
  callback
});

export const contactUsSuccess = () => ({
  type: CurrentUserActionTypes.CONTACT_US_SUCCESS
});

export const contactUsFailure = errorMessage => ({
  type: CurrentUserActionTypes.CONTACT_US_FAILURE,
  payload: errorMessage
});

// SIGNOUT USER
export const signoutUserStart = callback => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_START,
  callback
});

export const signoutUserSuccess = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS
});

export const signoutUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_FAILURE,
  payload: errorMessage
});

// DELETE USER
export const deleteUserStart = (deleteData, callback) => ({
  type: CurrentUserActionTypes.DELETE_USER_START,
  payload: deleteData,
  callback
});

export const deleteUserSuccess = () => ({
  type: CurrentUserActionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_USER_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE INFO
export const editEmployeeInfoStart = (info, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START,
  payload: info,
  callback
});

export const editEmployeeInfoSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_SUCCESS,
  payload: employee
});

export const editEmployeeInfoFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_FAILURE,
  payload: errorMessage
});

// ADD EMPLOYEE LANGUAGE
export const addEmployeeLanguageStart = (languageData, callback) => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_START,
  payload: languageData,
  callback
});

export const addEmployeeLanguageSuccess = employee => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_SUCCESS,
  payload: employee
});

export const addEmployeeLanguageFailure = errorMessage => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE LANGUAGE
export const deleteEmployeeLanguageStart = (languageId, callback) => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_START,
  payload: languageId,
  callback
});

export const deleteEmployeeLanguageSuccess = employee => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_SUCCESS,
  payload: employee
});

export const deleteEmployeeLanguageFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_FAILURE,
  payload: errorMessage
});

// ADD EMPLOYEE SKILL
export const addEmployeeSkillStart = (skillData, callback) => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_START,
  payload: skillData,
  callback
});

export const addEmployeeSkillSuccess = employee => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_SUCCESS,
  payload: employee
});

export const addEmployeeSkillFailure = errorMessage => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE SKILL
export const deleteEmployeeSkillStart = (skillid, callback) => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_START,
  payload: skillid,
  callback
});

export const deleteEmployeeSkillSuccess = employee => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_SUCCESS,
  payload: employee
});

export const deleteEmployeeSkillFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_FAILURE,
  payload: errorMessage
});

// ADD EMPLOYEE INTEREST
export const addEmployeeInterestStart = (interestData, callback) => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_START,
  payload: interestData,
  callback
});

export const addEmployeeInterestSuccess = employee => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_SUCCESS,
  payload: employee
});

export const addEmployeeInterestFailure = errorMessage => ({
  type: CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE INTEREST
export const deleteEmployeeInterestStart = (interestid, callback) => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_START,
  payload: interestid,
  callback
});

export const deleteEmployeeInterestSuccess = employee => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_SUCCESS,
  payload: employee
});

export const deleteEmployeeInterestFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_FAILURE,
  payload: errorMessage
});

// ADD/EDIT EMPLOYEE REFERENCE
export const addEditEmployeeReferenceStart = (referenceData, callback) => ({
  type: CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_START,
  payload: referenceData,
  callback
});

export const addEditEmployeeReferenceSuccess = employee => ({
  type: CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_SUCCESS,
  payload: employee
});

export const addEditEmployeeReferenceFailure = errorMessage => ({
  type: CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE REFERENCE
export const deleteEmployeeReferenceStart = (referenceid, callback) => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_START,
  payload: referenceid,
  callback
});

export const deleteEmployeeReferenceSuccess = employee => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_SUCCESS,
  payload: employee
});

export const deleteEmployeeReferenceFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE SOCIAL PROFILES
export const editEmployeeSocialProfilesStart = (
  socialProfilesData,
  callback
) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_START,
  payload: socialProfilesData,
  callback
});

export const editEmployeeSocialProfilesSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_SUCCESS,
  payload: employee
});

export const editEmployeeSocialProfilesFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE PREFERED JOBS SETTINGS
export const editEmployeePreferedJobsSettingsStart = (settings, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_START,
  payload: settings,
  callback
});

export const editEmployeePreferedJobsSettingsSuccess = employee => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_SUCCESS,
  payload: employee
});

export const editEmployeePreferedJobsSettingsFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_FAILURE,
  payload: errorMessage
});

// EDIT EMPLOYEE AVATAR
export const editEmployeeAvatarStart = (avatar, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_START,
  payload: avatar,
  callback
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
export const editEmployeeEducationStart = (education, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_START,
  payload: education,
  callback
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
export const deleteEmployeeEducationStart = (educationId, callback) => ({
  type: CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_START,
  payload: educationId,
  callback
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
export const editEmployerInfoStart = (info, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_INFO_START,
  payload: info,
  callback
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
export const editEmployerAvatarStart = (avatar, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_START,
  payload: avatar,
  callback
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
export const editEmployerCoverStart = (cover, callback) => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_START,
  payload: cover,
  callback
});

export const editEmployerCoverSuccess = employer => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_SUCCESS,
  payload: employer
});

export const editEmployerCoverFailure = errorMessage => ({
  type: CurrentUserActionTypes.EDIT_EMPLOYER_COVER_FAILURE,
  payload: errorMessage
});
