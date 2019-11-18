import ApplicationsActionTypes from './applications.types';

// CREATE NEW APPLICATION
export const createNewApplicationStart = (appData, callback) => ({
  type: ApplicationsActionTypes.CREATE_NEW_APPLICATION_START,
  payload: appData,
  callback
});

export const createNewApplicationSuccess = employeeApplications => ({
  type: ApplicationsActionTypes.CREATE_NEW_APPLICATION_SUCCESS,
  payload: employeeApplications
});

export const createNewApplicationFailure = errorMessage => ({
  type: ApplicationsActionTypes.CREATE_NEW_APPLICATION_FAILURE,
  payload: errorMessage
});

// UPDATE EXISTING APPLICATION
export const updateExistingApplicationStart = (appData, callback) => ({
  type: ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_START,
  payload: appData,
  callback
});

export const updateExistingApplicationSuccess = employeeApplications => ({
  type: ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_SUCCESS,
  payload: employeeApplications
});

export const updateExistingApplicationFailure = errorMessage => ({
  type: ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_FAILURE,
  payload: errorMessage
});

// DELETE APPLICATION
export const deleteApplicationStart = (appId, callback) => ({
  type: ApplicationsActionTypes.DELETE_APPLICATION_START,
  payload: appId,
  callback
});

export const deleteApplicationSuccess = employeeApplications => ({
  type: ApplicationsActionTypes.DELETE_APPLICATION_SUCCESS,
  payload: employeeApplications
});

export const deleteApplicationFailure = errorMessage => ({
  type: ApplicationsActionTypes.DELETE_APPLICATION_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYEE APPLICATIONS
export const getAllEmployeeApplicationsStart = callback => ({
  type: ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START,
  callback
});

export const getAllEmployeeApplicationsSuccess = employeeApplications => ({
  type: ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_SUCCESS,
  payload: employeeApplications
});

export const getAllEmployeeApplicationsFailure = errorMessage => ({
  type: ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_FAILURE,
  payload: errorMessage
});

// GET ALL JOB APPLICATIONS
export const getAllJobApplicationsStart = (jobId, callback) => ({
  type: ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_START,
  payload: jobId,
  callback
});

export const getAllJobApplicationsSuccess = jobApplications => ({
  type: ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_SUCCESS,
  payload: jobApplications
});

export const getAllJobApplicationsFailure = errorMessage => ({
  type: ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_FAILURE,
  payload: errorMessage
});
