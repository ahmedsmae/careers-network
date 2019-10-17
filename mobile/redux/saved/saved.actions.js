import SavedActionTypes from './saved.types';

// SAVE JOB
export const saveJobStart = jobId => ({
  type: SavedActionTypes.SAVE_JOB_START,
  payload: jobId
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
export const unsaveJobStart = savedId => ({
  type: SavedActionTypes.UNSAVE_JOB_START,
  payload: savedId
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
export const getAllEmployeeSavedJobsStart = () => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_START
});

export const getAllEmployeeSavedJobsSuccess = employeeSavedJobs => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_SUCCESS,
  payload: employeeSavedJobs
});

export const getAllEmployeeSavedJobsFailure = errorMessage => ({
  type: SavedActionTypes.GET_ALL_EMPLOYEE_SAVED_JOBS_FAILURE,
  payload: errorMessage
});
