import JobsActionTypes from './jobs.types';

// CREATE NEW JOB
export const createNewJobStart = jobData => ({
  type: JobsActionTypes.CREATE_NEW_JOB_START,
  payload: jobData
});

export const createNewJobSuccess = employerJobs => ({
  type: JobsActionTypes.CREATE_NEW_JOB_SUCCESS,
  payload: employerJobs
});

export const createNewJobFailure = errorMessage => ({
  type: JobsActionTypes.CREATE_NEW_JOB_FAILURE,
  payload: errorMessage
});

// UPDATE EXISTING JOB
export const updateExistingJobStart = jobData => ({
  type: JobsActionTypes.UPDATE_EXISTING_JOB_START,
  payload: jobData
});

export const updateExistingJobSuccess = employerJobs => ({
  type: JobsActionTypes.UPDATE_EXISTING_JOB_SUCCESS,
  payload: employerJobs
});

export const updateExistingJobFailure = errorMessage => ({
  type: JobsActionTypes.UPDATE_EXISTING_JOB_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYER JOBS
export const getAllEmployerJobsStart = employerId => ({
  type: JobsActionTypes.GET_ALL_EMPLOYER_JOBS_START,
  payload: employerId
});

export const getAllEmployerJobsSuccess = employerJobs => ({
  type: JobsActionTypes.GET_ALL_EMPLOYER_JOBS_SUCCESS,
  payload: employerJobs
});

export const getAllEmployerJobsFailure = errorMessage => ({
  type: JobsActionTypes.GET_ALL_EMPLOYER_JOBS_FAILURE,
  payload: errorMessage
});

// GET HOME JOBS
export const getHomeJobsStart = () => ({
  type: JobsActionTypes.GET_HOME_JOBS_START
});

export const getHomeJobsSuccess = homeJobs => ({
  type: JobsActionTypes.GET_HOME_JOBS_SUCCESS,
  payload: homeJobs
});

export const getHomeJobsFailure = errorMessage => ({
  type: JobsActionTypes.GET_HOME_JOBS_FAILURE,
  payload: errorMessage
});

// GET FOLLOWING JOBS
export const getFollowingJobsStart = employeeId => ({
  type: JobsActionTypes.GET_FOLLOWING_JOBS_START,
  payload: employeeId
});

export const getFollowingJobsSuccess = followingJobs => ({
  type: JobsActionTypes.GET_FOLLOWING_JOBS_SUCCESS,
  payload: followingJobs
});

export const getFollowingJobsFailure = errorMessage => ({
  type: JobsActionTypes.GET_FOLLOWING_JOBS_FAILURE,
  payload: errorMessage
});

// SEARCH JOBS
export const searchJobsStart = searchData => ({
  type: JobsActionTypes.SEARCH_JOBS_START,
  payload: searchData
});

export const searchJobsSuccess = followingJobs => ({
  type: JobsActionTypes.SEARCH_JOBS_SUCCESS,
  payload: followingJobs
});

export const searchJobsFailure = errorMessage => ({
  type: JobsActionTypes.SEARCH_JOBS_FAILURE,
  payload: errorMessage
});

// PUBLIC GET EMPLOYER JOBS
export const publicGetEmployerJobsStart = employerId => ({
  type: JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_START,
  payload: employerId
});

export const publicGetEmployerJobsSuccess = employerJobs => ({
  type: JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_SUCCESS,
  payload: employerJobs
});

export const publicGetEmployerJobsFailure = errorMessage => ({
  type: JobsActionTypes.PUBLIC_GET_EMPLOYER_JOBS_FAILURE,
  payload: errorMessage
});
