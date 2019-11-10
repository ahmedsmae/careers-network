import AdminActionTypes from './admin.types';

// CREATE EMPLOYER
export const createEmployerStart = email => ({
  type: AdminActionTypes.CREATE_EMPLOYER_START,
  payload: email
});

export const createEmployerSuccess = allEmployers => ({
  type: AdminActionTypes.CREATE_EMPLOYER_SUCCESS,
  payload: allEmployers
});

export const createEmployerFailure = errorMessage => ({
  type: AdminActionTypes.CREATE_EMPLOYER_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYERS
export const getAllEmployersStart = () => ({
  type: AdminActionTypes.GET_ALL_EMPLOYERS_START
});

export const getAllEmployersSuccess = allEmployers => ({
  type: AdminActionTypes.GET_ALL_EMPLOYERS_SUCCESS,
  payload: allEmployers
});

export const getAllEmployersFailure = errorMessage => ({
  type: AdminActionTypes.GET_ALL_EMPLOYERS_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYEES
export const getAllEmployeesStart = () => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_START
});

export const getAllEmployeesSuccess = allEmployees => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_SUCCESS,
  payload: allEmployees
});

export const getAllEmployeesFailure = errorMessage => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_FAILURE,
  payload: errorMessage
});

// GET ALL ADMINS
export const getAllAdminsStart = () => ({
  type: AdminActionTypes.GET_ALL_ADMINS_START
});

export const getAllAdminsSuccess = allAdmins => ({
  type: AdminActionTypes.GET_ALL_ADMINS_SUCCESS,
  payload: allAdmins
});

export const getAllAdminsFailure = errorMessage => ({
  type: AdminActionTypes.GET_ALL_ADMINS_FAILURE,
  payload: errorMessage
});

// CHANGE EMPLOYER EMAIL
export const changeEmployerEmailStart = (oldEmail, newEmail) => ({
  type: AdminActionTypes.CHANGE_EMPLOYER_EMAIL_START,
  payload: { oldEmail, newEmail }
});

export const changeEmployerEmailSuccess = allEmployers => ({
  type: AdminActionTypes.CHANGE_EMPLOYER_EMAIL_SUCCESS,
  payload: allEmployers
});

export const changeEmployerEmailFailure = errorMessage => ({
  type: AdminActionTypes.CHANGE_EMPLOYER_EMAIL_FAILURE,
  payload: errorMessage
});

// CHANGE EMPLOYEE EMAIL
export const changeEmployeeEmailStart = (oldEmail, newEmail) => ({
  type: AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_START,
  payload: { oldEmail, newEmail }
});

export const changeEmployeeEmailSuccess = allEmployees => ({
  type: AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_SUCCESS,
  payload: allEmployees
});

export const changeEmployeeEmailFailure = errorMessage => ({
  type: AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYER JOBS
export const getAllEmployerJobsStart = employerId => ({
  type: AdminActionTypes.GET_ALL_EMPLOYER_JOBS_START,
  payload: employerId
});

export const getAllEmployerJobsSuccess = allEmployerJobs => ({
  type: AdminActionTypes.GET_ALL_EMPLOYER_JOBS_SUCCESS,
  payload: allEmployerJobs
});

export const getAllEmployerJobsFailure = errorMessage => ({
  type: AdminActionTypes.GET_ALL_EMPLOYER_JOBS_FAILURE,
  payload: errorMessage
});

// GET ALL EMPLOYEE APPLICATIONS
export const getAllEmployeeApplicationsStart = employeeId => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START,
  payload: employeeId
});

export const getAllEmployeeApplicationsSuccess = allEmployeeApplications => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_SUCCESS,
  payload: allEmployeeApplications
});

export const getAllEmployeeApplicationsFailure = errorMessage => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYER
export const deleteEmployerStart = userId => ({
  type: AdminActionTypes.DELETE_EMPLOYER_START,
  payload: userId
});

export const deleteEmployerSuccess = allEmployers => ({
  type: AdminActionTypes.DELETE_EMPLOYER_SUCCESS,
  payload: allEmployers
});

export const deleteEmployerFailure = errorMessage => ({
  type: AdminActionTypes.DELETE_EMPLOYER_FAILURE,
  payload: errorMessage
});

// DELETE EMPLOYEE
export const deleteEmployeeStart = userId => ({
  type: AdminActionTypes.DELETE_EMPLOYEE_START,
  payload: userId
});

export const deleteEmployeeSuccess = allEmployees => ({
  type: AdminActionTypes.DELETE_EMPLOYEE_SUCCESS,
  payload: allEmployees
});

export const deleteEmployeeFailure = errorMessage => ({
  type: AdminActionTypes.DELETE_EMPLOYEE_FAILURE,
  payload: errorMessage
});

// DELETE JOB
export const deleteJobStart = jobId => ({
  type: AdminActionTypes.DELETE_JOB_START,
  payload: jobId
});

export const deleteJobSuccess = allEmployerJobs => ({
  type: AdminActionTypes.DELETE_JOB_SUCCESS,
  payload: allEmployerJobs
});

export const deleteJobFailure = errorMessage => ({
  type: AdminActionTypes.DELETE_JOB_FAILURE,
  payload: errorMessage
});

// DELETE APPLICATION
export const deleteApplicationStart = applicationId => ({
  type: AdminActionTypes.DELETE_APPLICATION_START,
  payload: applicationId
});

export const deleteApplicationSuccess = allEmployeeApplications => ({
  type: AdminActionTypes.DELETE_APPLICATION_SUCCESS,
  payload: allEmployeeApplications
});

export const deleteApplicationFailure = errorMessage => ({
  type: AdminActionTypes.DELETE_APPLICATION_FAILURE,
  payload: errorMessage
});
