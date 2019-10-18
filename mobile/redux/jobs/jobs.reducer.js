import JobsActionTypes from './jobs.types';

const INITIAL_STATE = {
  myJobs: [],
  searchJobs: [],
  homeJobs: [],
  followingJobs: [],
  selectedEmployerJobs: [],
  loading: false,
  errorMessage: ''
};

const jobsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case JobsActionTypes.CREATE_NEW_JOB_START:
    case JobsActionTypes.UPDATE_EXISTING_JOB_START:
    case JobsActionTypes.DELETE_JOB_START:
    case JobsActionTypes.GET_ALL_EMPLOYER_JOBS_START:
    case JobsActionTypes.GET_HOME_JOBS_START:
    case JobsActionTypes.GET_FOLLOWING_JOBS_START:
    case JobsActionTypes.SEARCH_JOBS_START:
    case JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case JobsActionTypes.CREATE_NEW_JOB_SUCCESS:
    case JobsActionTypes.UPDATE_EXISTING_JOB_SUCCESS:
    case JobsActionTypes.DELETE_JOB_SUCCESS:
    case JobsActionTypes.GET_ALL_EMPLOYER_JOBS_SUCCESS:
      return {
        ...state,
        myJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case JobsActionTypes.GET_HOME_JOBS_SUCCESS:
      return {
        ...state,
        homeJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case JobsActionTypes.GET_FOLLOWING_JOBS_SUCCESS:
      return {
        ...state,
        followingJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case JobsActionTypes.SEARCH_JOBS_SUCCESS:
      return {
        ...state,
        searchJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_SUCCESS:
      return {
        ...state,
        selectedEmployerJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case JobsActionTypes.CREATE_NEW_JOB_FAILURE:
    case JobsActionTypes.UPDATE_EXISTING_JOB_FAILURE:
    case JobsActionTypes.DELETE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    case JobsActionTypes.GET_ALL_EMPLOYER_JOBS_FAILURE:
      return {
        ...state,
        myJobs: [],
        loading: false,
        errorMessage: payload
      };

    case JobsActionTypes.GET_HOME_JOBS_FAILURE:
      return {
        ...state,
        homeJobs: [],
        loading: false,
        errorMessage: payload
      };

    case JobsActionTypes.GET_FOLLOWING_JOBS_FAILURE:
      return {
        ...state,
        followingJobs: [],
        loading: false,
        errorMessage: payload
      };

    case JobsActionTypes.SEARCH_JOBS_FAILURE:
      return {
        ...state,
        searchJobs: [],
        loading: false,
        errorMessage: payload
      };

    case JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_FAILURE:
      return {
        ...state,
        selectedEmployerJobs: [],
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default jobsReducer;
