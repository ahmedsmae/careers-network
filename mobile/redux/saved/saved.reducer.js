import SavedActionTypes from './saved.types';

const ININTIAL_STATE = {
  savedJobs: [],
  loading: false,
  errorMessage: ''
};

const savedReducer = (state = ININTIAL_STATE, { type, payload }) => {
  switch (type) {
    case SavedActionTypes.SAVE_JOB_START:
    case SavedActionTypes.UNSAVE_JOB_START:
    case SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case SavedActionTypes.SAVE_JOB_SUCCESS:
    case SavedActionTypes.UNSAVE_JOB_SUCCESS:
    case SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_SUCCESS:
      return {
        ...state,
        savedJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case SavedActionTypes.SAVE_JOB_FAILURE:
    case SavedActionTypes.UNSAVE_JOB_FAILURE:
    case SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_FAILURE:
      return {
        ...state,
        savedJobs: [],
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default savedReducer;
