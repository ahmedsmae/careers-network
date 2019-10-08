import CurrentUserActionTypes from './current-user.types';

const INITIAL_STATE = {
  currentUser: null,
  employee: null,
  employer: null,
  loading: false,
  errorMessage: ''
};

const currentUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CurrentUserActionTypes.SIGN_UP_USER_START:
    case CurrentUserActionTypes.SIGN_IN_USER_START:
    case CurrentUserActionTypes.LOADING_USER_START:
    case CurrentUserActionTypes.SIGN_OUT_USER_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case CurrentUserActionTypes.SIGN_UP_USER_SUCCESS:
    case CurrentUserActionTypes.SIGN_IN_USER_SUCCESS:
    case CurrentUserActionTypes.LOADING_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload.user,
        employee: payload.employee,
        employer: payload.employer,
        loading: false,
        errorMessage: ''
      };

    case CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS:
      return INITIAL_STATE;

    case CurrentUserActionTypes.SIGN_UP_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_IN_USER_FAILURE:
    case CurrentUserActionTypes.LOADING_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_OUT_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        employee: null,
        employer: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default currentUserReducer;
