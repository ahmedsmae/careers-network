import CurrentUserActionTypes from './current-user.types';

export const signUpUserStart = (email, password) => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_START,
  payload: { email, password }
});

export const signUpUserSuccess = user => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_SUCCESS,
  payload: user
});

export const signUpUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_FAILURE,
  payload: errorMessage
});
