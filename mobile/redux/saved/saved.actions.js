import SavedActionTypes from './saved.types';

// SAVE JOB
export const saveJobStart = (jobId, callback) => ({
  type: SavedActionTypes.SAVE_JOB_START,
  payload: jobId,
  callback
});

export const saveJobSuccess = employeeSavedJobs => ({
  type: SavedActionTypes.SAVE_JOB_SUCCESS,
  payload: employeeSavedJobs
});

export const saveJobFailure = errorMessage => ({
  type: SavedActionTypes.SAVE_JOB_FAILURE,
  payload: errorMessage
});

// UNSAVE JOB
export const unsaveJobStart = (savedId, callback) => ({
  type: SavedActionTypes.UNSAVE_JOB_START,
  payload: savedId,
  callback
});

export const unsaveJobSuccess = employeeSavedJobs => ({
  type: SavedActionTypes.UNSAVE_JOB_SUCCESS,
  payload: employeeSavedJobs
});

export const unsaveJobFailure = errorMessage => ({
  type: SavedActionTypes.UNSAVE_JOB_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYEE SAVED JOBS
export const getAllEmployeeSavedJobsStart = callback => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_START,
  callback
});

export const getAllEmployeeSavedJobsSuccess = employeeSavedJobs => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_SUCCESS,
  payload: employeeSavedJobs
});

export const getAllEmployeeSavedJobsFailure = errorMessage => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_FAILURE,
  payload: errorMessage
});
