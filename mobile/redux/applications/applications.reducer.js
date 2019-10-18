import ApplicationsActionTypes from './applications.types';

const INITIAL_STATE = {
  myApplications: [],
  jobApplications: [],
  loading: false,
  errorMessage: ''
};

const applicationsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ApplicationsActionTypes.CREATE_NEW_APPLICATION_START:
    case ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_START:
    case ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_START:
    case ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_START:
    case ApplicationsActionTypes.DELETE_APPLICATION_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case ApplicationsActionTypes.CREATE_NEW_APPLICATION_SUCCESS:
    case ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_SUCCESS:
    case ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_SUCCESS:
    case ApplicationsActionTypes.DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        myApplications: payload,
        loading: false,
        errorMessage: ''
      };

    case ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_SUCCESS:
      return {
        ...state,
        jobApplications: payload,
        loading: false,
        errorMessage: ''
      };

    case ApplicationsActionTypes.CREATE_NEW_APPLICATION_FAILURE:
    case ApplicationsActionTypes.UPDATE_EXISTING_APPLICATION_FAILURE:
    case ApplicationsActionTypes.DELETE_APPLICATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    case ApplicationsActionTypes.GET_ALL_EMPLOYEE_APPLICATIONS_FAILURE:
      return {
        ...state,
        myApplications: [],
        loading: false,
        errorMessage: payload
      };

    case ApplicationsActionTypes.GET_ALL_JOB_APPLICATIONS_FAILURE:
      return {
        ...state,
        jobApplications: [],
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default applicationsReducer;
