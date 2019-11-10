import AdminActionTypes from './admin.types';

const INITIAL_STATE = {
  allEmployers: [],
  allEmployees: [],
  allAdmins: [],
  selectedEmployerJobs: [],
  selectedEmployeeApplications: [],
  loading: false,
  errorMessage: ''
};

const adminReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AdminActionTypes.CREATE_EMPLOYER_START:
    case AdminActionTypes.GET_ALL_EMPLOYERS_START:
    case AdminActionTypes.GET_ALL_EMPLOYEES_START:
    case AdminActionTypes.GET_ALL_ADMINS_START:
    case AdminActionTypes.CHANGE_EMPLOYER_EMAIL_START:
    case AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_START:
    case AdminActionTypes.GET_ALL_EMPLOYER_JOBS_START:
    case AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START:
    case AdminActionTypes.DELETE_EMPLOYER_START:
    case AdminActionTypes.DELETE_EMPLOYEE_START:
    case AdminActionTypes.DELETE_JOB_START:
    case AdminActionTypes.DELETE_APPLICATION_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case AdminActionTypes.CREATE_EMPLOYER_SUCCESS:
    case AdminActionTypes.GET_ALL_EMPLOYERS_SUCCESS:
    case AdminActionTypes.CHANGE_EMPLOYER_EMAIL_SUCCESS:
    case AdminActionTypes.DELETE_EMPLOYER_SUCCESS:
      return {
        ...state,
        allEmployers: payload,
        loading: false,
        errorMessage: ''
      };

    case AdminActionTypes.GET_ALL_EMPLOYEES_SUCCESS:
    case AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_SUCCESS:
    case AdminActionTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        allEmployees: payload,
        loading: false,
        errorMessage: ''
      };

    case AdminActionTypes.GET_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        allAdmins: payload,
        loading: false,
        errorMessage: ''
      };

    case AdminActionTypes.GET_ALL_EMPLOYER_JOBS_SUCCESS:
    case AdminActionTypes.DELETE_JOB_SUCCESS:
      return {
        ...state,
        selectedEmployerJobs: payload,
        loading: false,
        errorMessage: ''
      };

    case AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_SUCCESS:
    case AdminActionTypes.DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        selectedEmployeeApplications: payload,
        loading: false,
        errorMessage: ''
      };

    case AdminActionTypes.GET_ALL_EMPLOYERS_FAILURE:
      return {
        ...state,
        allEmployers: [],
        loading: false,
        errorMessage: payload
      };

    case AdminActionTypes.GET_ALL_EMPLOYEES_FAILURE:
      return {
        ...state,
        allEmployees: [],
        loading: false,
        errorMessage: payload
      };

    case AdminActionTypes.GET_ALL_ADMINS_FAILURE:
      return {
        ...state,
        allAdmins: [],
        loading: false,
        errorMessage: payload
      };

    case AdminActionTypes.GET_ALL_EMPLOYER_JOBS_FAILURE:
      return {
        ...state,
        selectedEmployerJobs: [],
        loading: false,
        errorMessage: payload
      };

    case AdminActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_FAILURE:
      return {
        ...state,
        selectedEmployeeApplications: [],
        loading: false,
        errorMessage: payload
      };

    case AdminActionTypes.CREATE_EMPLOYER_FAILURE:
    case AdminActionTypes.CHANGE_EMPLOYER_EMAIL_FAILURE:
    case AdminActionTypes.DELETE_EMPLOYER_FAILURE:
    case AdminActionTypes.CHANGE_EMPLOYEE_EMAIL_FAILURE:
    case AdminActionTypes.DELETE_EMPLOYEE_FAILURE:
    case AdminActionTypes.DELETE_JOB_FAILURE:
    case AdminActionTypes.DELETE_APPLICATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default adminReducer;
