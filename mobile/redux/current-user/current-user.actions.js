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
