import CurrentUserActionTypes from './current-user.types';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  errorMessage: ''
};

const currentUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CurrentUserActionTypes.SIGN_UP_USER_START:
      return {
        ...stete,
        loading: true,
        errorMessage: ''
      };

    case CurrentUserActionTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        loading: false,
        errorMessage: ''
      };

    case CurrentUserActionTypes.SIGN_UP_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default currentUserReducer;
