import CurrentUserActionTypes from "./current-user.types";

const INITIAL_STATE = {
  currentUser: null,
  employee: null,
  employer: null,
  admin: null,
  loading: false,
  errorMessage: ""
};

const currentUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CurrentUserActionTypes.SIGN_UP_USER_START:
    case CurrentUserActionTypes.SIGN_IN_USER_START:
    case CurrentUserActionTypes.LOADING_USER_START:
    case CurrentUserActionTypes.CHANGE_PASSWORD_START:
    case CurrentUserActionTypes.FORGET_PASSWORD_START:
    case CurrentUserActionTypes.CONTACT_US_START:
    case CurrentUserActionTypes.SIGN_OUT_USER_START:
    case CurrentUserActionTypes.DELETE_USER_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_START:
    case CurrentUserActionTypes.EDIT_EMPLOYER_INFO_START:
    case CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_START:
    case CurrentUserActionTypes.EDIT_EMPLOYER_COVER_START:
    case CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_START:
    case CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_START:
    case CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_START:
    case CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_START:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_START:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_START:
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };

    case CurrentUserActionTypes.SIGN_UP_USER_SUCCESS:
    case CurrentUserActionTypes.SIGN_IN_USER_SUCCESS:
    case CurrentUserActionTypes.LOADING_USER_SUCCESS:
    case CurrentUserActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        currentUser: payload.user,
        employee: payload.employee,
        employer: payload.employer,
        admin: payload.admin,
        loading: false,
        errorMessage: ""
      };

    case CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS:
    case CurrentUserActionTypes.DELETE_USER_SUCCESS:
      return INITIAL_STATE;

    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_SUCCESS:
    case CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_SUCCESS:
    case CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_SUCCESS:
    case CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_SUCCESS:
    case CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_SUCCESS:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_SUCCESS:
      return {
        ...state,
        employee: payload,
        loading: false,
        errorMessage: ""
      };

    case CurrentUserActionTypes.EDIT_EMPLOYER_INFO_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_SUCCESS:
    case CurrentUserActionTypes.EDIT_EMPLOYER_COVER_SUCCESS:
      return {
        ...state,
        employer: payload,
        loading: false,
        errorMessage: ""
      };

    case CurrentUserActionTypes.SIGN_UP_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_IN_USER_FAILURE:
    case CurrentUserActionTypes.LOADING_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_OUT_USER_FAILURE:
    case CurrentUserActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        employee: null,
        employer: null,
        admin: null,
        loading: false,
        errorMessage: payload
      };

    case CurrentUserActionTypes.EDIT_EMPLOYEE_INFO_FAILURE:
    case CurrentUserActionTypes.ADD_EMPLOYEE_LANGUAGE_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_LANGUAGE_FAILURE:
    case CurrentUserActionTypes.ADD_EMPLOYEE_SKILL_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_SKILL_FAILURE:
    case CurrentUserActionTypes.ADD_EMPLOYEE_INTEREST_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_INTEREST_FAILURE:
    case CurrentUserActionTypes.ADD_EDIT_EMPLOYEE_REFERENCE_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_REFERENCE_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_SOCIAL_PROFILES_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_AVATAR_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYEE_EDUCATION_FAILURE:
    case CurrentUserActionTypes.DELETE_EMPLOYEE_EDUCATION_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYER_INFO_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYER_AVATAR_FAILURE:
    case CurrentUserActionTypes.EDIT_EMPLOYER_COVER_FAILURE:
    case CurrentUserActionTypes.CHANGE_PASSWORD_FAILURE:
    case CurrentUserActionTypes.FORGET_PASSWORD_FAILURE:
    case CurrentUserActionTypes.CONTACT_US_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    // case CurrentUserActionTypes.FORGET_PASSWORD_SUCCESS:
    // case CurrentUserActionTypes.CONTACT_US_SUCCESS:
    default:
      return state;
  }
};

export default currentUserReducer;
