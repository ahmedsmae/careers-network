import FollowsActionTypes from './follows.types';

const ININTIAL_STATE = {
  followedEmployers: [],
  loading: false,
  errorMessage: ''
};

const followsReducer = (state = ININTIAL_STATE, { type, payload }) => {
  switch (type) {
    case FollowsActionTypes.FOLLOW_EMPLOYER_START:
    case FollowsActionTypes.UNFOLLOW_EMPLOYER_START:
    case FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case FollowsActionTypes.FOLLOW_EMPLOYER_SUCCESS:
    case FollowsActionTypes.UNFOLLOW_EMPLOYER_SUCCESS:
    case FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_SUCCESS:
      return {
        ...state,
        followedEmployers: payload,
        loading: false,
        errorMessage: ''
      };

    case FollowsActionTypes.FOLLOW_EMPLOYER_FAILURE:
    case FollowsActionTypes.UNFOLLOW_EMPLOYER_FAILURE:
    case FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_FAILURE:
      return {
        ...state,
        followedEmployers: [],
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default followsReducer;
