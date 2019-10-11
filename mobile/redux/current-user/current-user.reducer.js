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
    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_START:
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

    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_SUCCESS:
      return {
        ...state,
        employee: payload,
        loading: false,
        errorMessage: ''
      };

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

    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default currentUserReducer;
