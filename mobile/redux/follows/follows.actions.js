import FollowsActionTypes from './follows.types';

// FOLLOW EMPLOYER
export const followEmployerStart = (employerId, callback) => ({
  type: FollowsActionTypes.FOLLOW_EMPLOYER_START,
  payload: employerId,
  callback
});

export const followEmployerSuccess = employeeFollows => ({
  type: FollowsActionTypes.FOLLOW_EMPLOYER_SUCCESS,
  payload: employeeFollows
});

export const followEmployerFailure = errorMessage => ({
  type: FollowsActionTypes.FOLLOW_EMPLOYER_FAILURE,
  payload: errorMessage
});

// UNFOLLOW EMPLOYER
export const unfollowEmployerStart = (followId, callback) => ({
  type: FollowsActionTypes.UNFOLLOW_EMPLOYER_START,
  payload: followId,
  callback
});

export const unfollowEmployerSuccess = employeeFollows => ({
  type: FollowsActionTypes.UNFOLLOW_EMPLOYER_SUCCESS,
  payload: employeeFollows
});

export const unfollowEmployerFailure = errorMessage => ({
  type: FollowsActionTypes.UNFOLLOW_EMPLOYER_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYEE FOLLOWS
export const getAllEmployeeFollowsStart = callback => ({
  type: FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_START,
  callback
});

export const getAllEmployeeFollowsSuccess = employeeFollows => ({
  type: FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_SUCCESS,
  payload: employeeFollows
});

export const getAllEmployeeFollowsFailure = errorMessage => ({
  type: FollowsActionTypes.GET_ALL_EMPLOYEE_FOLLOWS_FAILURE,
  payload: errorMessage
});
