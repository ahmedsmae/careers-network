const CurrentUserActionTypes = {
  SIGN_UP_USER_START: 'SIGN_UP_USER_START',
  SIGN_UP_USER_SUCCESS: 'SIGN_UP_USER_SUCCESS',
  SIGN_UP_USER_FAILURE: 'SIGN_UP_USER_FAILURE',

  SIGN_IN_USER_START: 'SIGN_IN_USER_START',
  SIGN_IN_USER_SUCCESS: 'SIGN_IN_USER_SUCCESS',
  SIGN_IN_USER_FAILURE: 'SIGN_IN_USER_FAILURE',

  LOADING_USER_START: 'LOADING_USER_START',
  LOADING_USER_SUCCESS: 'LOADING_USER_SUCCESS',
  LOADING_USER_FAILURE: 'LOADING_USER_FAILURE',

  CHANGE_PASSWORD_START: 'CHANGE_PASSWORD_START',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',

  FORGET_PASSWORD_START: 'FORGET_PASSWORD_START',
  FORGET_PASSWORD_SUCCESS: 'FORGET_PASSWORD_SUCCESS',
  FORGET_PASSWORD_FAILURE: 'FORGET_PASSWORD_FAILURE',

  CONTACT_US_START: 'CONTACT_US_START',
  CONTACT_US_SUCCESS: 'CONTACT_US_SUCCESS',
  CONTACT_US_FAILURE: 'CONTACT_US_FAILURE',

  SIGN_OUT_USER_START: 'SIGN_OUT_USER_START',
  SIGN_OUT_USER_SUCCESS: 'SIGN_OUT_USER_SUCCESS',
  SIGN_OUT_USER_FAILURE: 'SIGN_OUT_USER_FAILURE',

  DELETE_USER_START: 'DELETE_USER_START',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',

  EDIT_EMPLOYEE_INFO_START: 'EDIT_EMPLOYEE_INFO_START',
  EDIT_EMPLOYEE_INFO_SUCCESS: 'EDIT_EMPLOYEE_INFO_SUCCESS',
  EDIT_EMPLOYEE_INFO_FAILURE: 'EDIT_EMPLOYEE_INFO_FAILURE',

  ADD_EMPLOYEE_LANGUAGE_START: 'ADD_EMPLOYEE_LANGUAGE_START',
  ADD_EMPLOYEE_LANGUAGE_SUCCESS: 'ADD_EMPLOYEE_LANGUAGE_SUCCESS',
  ADD_EMPLOYEE_LANGUAGE_FAILURE: 'ADD_EMPLOYEE_LANGUAGE_FAILURE',

  DELETE_EMPLOYEE_LANGUAGE_START: 'DELETE_EMPLOYEE_LANGUAGE_START',
  DELETE_EMPLOYEE_LANGUAGE_SUCCESS: 'DELETE_EMPLOYEE_LANGUAGE_SUCCESS',
  DELETE_EMPLOYEE_LANGUAGE_FAILURE: 'DELETE_EMPLOYEE_LANGUAGE_FAILURE',

  ADD_EMPLOYEE_SKILL_START: 'ADD_EMPLOYEE_SKILL_START',
  ADD_EMPLOYEE_SKILL_SUCCESS: 'ADD_EMPLOYEE_SKILL_SUCCESS',
  ADD_EMPLOYEE_SKILL_FAILURE: 'ADD_EMPLOYEE_SKILL_FAILURE',

  DELETE_EMPLOYEE_SKILL_START: 'DELETE_EMPLOYEE_SKILL_START',
  DELETE_EMPLOYEE_SKILL_SUCCESS: 'DELETE_EMPLOYEE_SKILL_SUCCESS',
  DELETE_EMPLOYEE_SKILL_FAILURE: 'DELETE_EMPLOYEE_SKILL_FAILURE',

  ADD_EMPLOYEE_INTEREST_START: 'ADD_EMPLOYEE_INTEREST_START',
  ADD_EMPLOYEE_INTEREST_SUCCESS: 'ADD_EMPLOYEE_INTEREST_SUCCESS',
  ADD_EMPLOYEE_INTEREST_FAILURE: 'ADD_EMPLOYEE_INTEREST_FAILURE',

  DELETE_EMPLOYEE_INTEREST_START: 'DELETE_EMPLOYEE_INTEREST_START',
  DELETE_EMPLOYEE_INTEREST_SUCCESS: 'DELETE_EMPLOYEE_INTEREST_SUCCESS',
  DELETE_EMPLOYEE_INTEREST_FAILURE: 'DELETE_EMPLOYEE_INTEREST_FAILURE',

  ADD_EDIT_EMPLOYEE_REFERENCE_START: 'ADD_EDIT_EMPLOYEE_REFERENCE_START',
  ADD_EDIT_EMPLOYEE_REFERENCE_SUCCESS: 'ADD_EDIT_EMPLOYEE_REFERENCE_SUCCESS',
  ADD_EDIT_EMPLOYEE_REFERENCE_FAILURE: 'ADD_EDIT_EMPLOYEE_REFERENCE_FAILURE',

  DELETE_EMPLOYEE_REFERENCE_START: 'DELETE_EMPLOYEE_REFERENCE_START',
  DELETE_EMPLOYEE_REFERENCE_SUCCESS: 'DELETE_EMPLOYEE_REFERENCE_SUCCESS',
  DELETE_EMPLOYEE_REFERENCE_FAILURE: 'DELETE_EMPLOYEE_REFERENCE_FAILURE',

  EDIT_EMPLOYEE_SOCIAL_PROFILES_START: 'EDIT_EMPLOYEE_SOCIAL_PROFILES_START',
  EDIT_EMPLOYEE_SOCIAL_PROFILES_SUCCESS:
    'EDIT_EMPLOYEE_SOCIAL_PROFILES_SUCCESS',
  EDIT_EMPLOYEE_SOCIAL_PROFILES_FAILURE:
    'EDIT_EMPLOYEE_SOCIAL_PROFILES_FAILURE',

  EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_START:
    'EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_START',
  EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_SUCCESS:
    'EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_SUCCESS',
  EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_FAILURE:
    'EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS_FAILURE',

  EDIT_EMPLOYEE_AVATAR_START: 'EDIT_EMPLOYEE_AVATAR_START',
  EDIT_EMPLOYEE_AVATAR_SUCCESS: 'EDIT_EMPLOYEE_AVATAR_SUCCESS',
  EDIT_EMPLOYEE_AVATAR_FAILURE: 'EDIT_EMPLOYEE_AVATAR_FAILURE',

  EDIT_EMPLOYEE_EDUCATION_START: 'EDIT_EMPLOYEE_EDUCATION_START',
  EDIT_EMPLOYEE_EDUCATION_SUCCESS: 'EDIT_EMPLOYEE_EDUCATION_SUCCESS',
  EDIT_EMPLOYEE_EDUCATION_FAILURE: 'EDIT_EMPLOYEE_EDUCATION_FAILURE',

  DELETE_EMPLOYEE_EDUCATION_START: 'DELETE_EMPLOYEE_EDUCATION_START',
  DELETE_EMPLOYEE_EDUCATION_SUCCESS: 'DELETE_EMPLOYEE_EDUCATION_SUCCESS',
  DELETE_EMPLOYEE_EDUCATION_FAILURE: 'DELETE_EMPLOYEE_EDUCATION_FAILURE',

  EDIT_EMPLOYEE_EXPERIENCE_START: 'EDIT_EMPLOYEE_EXPERIENCE_START',
  EDIT_EMPLOYEE_EXPERIENCE_SUCCESS: 'EDIT_EMPLOYEE_EXPERIENCE_SUCCESS',
  EDIT_EMPLOYEE_EXPERIENCE_FAILURE: 'EDIT_EMPLOYEE_EXPERIENCE_FAILURE',

  DELETE_EMPLOYEE_EXPERIENCE_START: 'DELETE_EMPLOYEE_EXPERIENCE_START',
  DELETE_EMPLOYEE_EXPERIENCE_SUCCESS: 'DELETE_EMPLOYEE_EXPERIENCE_SUCCESS',
  DELETE_EMPLOYEE_EXPERIENCE_FAILURE: 'DELETE_EMPLOYEE_EXPERIENCE_FAILURE',

  EDIT_EMPLOYEE_TRAINING_START: 'EDIT_EMPLOYEE_TRAINING_START',
  EDIT_EMPLOYEE_TRAINING_SUCCESS: 'EDIT_EMPLOYEE_TRAINING_SUCCESS',
  EDIT_EMPLOYEE_TRAINING_FAILURE: 'EDIT_EMPLOYEE_TRAINING_FAILURE',

  DELETE_EMPLOYEE_TRAINING_START: 'DELETE_EMPLOYEE_TRAINING_START',
  DELETE_EMPLOYEE_TRAINING_SUCCESS: 'DELETE_EMPLOYEE_TRAINING_SUCCESS',
  DELETE_EMPLOYEE_TRAINING_FAILURE: 'DELETE_EMPLOYEE_TRAINING_FAILURE',

  EDIT_EMPLOYER_INFO_START: 'EDIT_EMPLOYER_INFO_START',
  EDIT_EMPLOYER_INFO_SUCCESS: 'EDIT_EMPLOYER_INFO_SUCCESS',
  EDIT_EMPLOYER_INFO_FAILURE: 'EDIT_EMPLOYER_INFO_FAILURE',

  EDIT_EMPLOYER_AVATAR_START: 'EDIT_EMPLOYER_AVATAR_START',
  EDIT_EMPLOYER_AVATAR_SUCCESS: 'EDIT_EMPLOYER_AVATAR_SUCCESS',
  EDIT_EMPLOYER_AVATAR_FAILURE: 'EDIT_EMPLOYER_AVATAR_FAILURE',

  EDIT_EMPLOYER_COVER_START: 'EDIT_EMPLOYER_COVER_START',
  EDIT_EMPLOYER_COVER_SUCCESS: 'EDIT_EMPLOYER_COVER_SUCCESS',
  EDIT_EMPLOYER_COVER_FAILURE: 'EDIT_EMPLOYER_COVER_FAILURE'
};

export default CurrentUserActionTypes;
