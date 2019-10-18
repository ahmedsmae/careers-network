const BASE_URL = 'http://192.168.1.102:5000';

export default URLS = {
  SIGNUP: `${BASE_URL}/api/users/signup`,
  SIGNIN: `${BASE_URL}/api/users/signin`,
  AUTH: `${BASE_URL}/api/users/auth`,
  SIGNOUT: `${BASE_URL}/api/users/signout`,
  DELETE_USER: `${BASE_URL}/api/users/deleteuser`,

  CHANGE_PASSWORD: `${BASE_URL}/api/users/changepassword`,
  FORGET_PASSWORD: `${BASE_URL}/api/users/forgetpassword`,

  EDIT_EMPLOYEE_AVATAR: `${BASE_URL}/api/employees/avatars`,
  EDIT_EMPLOYEE_INFO: `${BASE_URL}/api/employees/info`,
  EDIT_EDUCATION_INFO: `${BASE_URL}/api/employees/educations`,
  EDIT_EDUCATION_IMAGE: `${BASE_URL}/api/employees/eduactions/setimage`, // + /:educationid
  SERVE_EMPLOYEE_AVATAR: `${BASE_URL}/api/employees/avatars`, // + /:employeeid
  SERVE_EDUCATION_CERTIFICATE: `${BASE_URL}/api/employees/educations`, // + /:employeeid/:educationid
  DELETE_EMPLOYEE_EDUCATION: `${BASE_URL}/api/employees/educations`, // + /:educationid

  EDIT_EMPLOYER_AVATAR: `${BASE_URL}/api/employers/avatars`,
  EDIT_EMPLOYER_COVER: `${BASE_URL}/api/employers/covers`,
  EDIT_EMPLOYER_INFO: `${BASE_URL}/api/employers/info`,
  SERVE_EMPLOYER_AVATAR: `${BASE_URL}/api/employers/avatars`, // + /:employerid
  SERVE_EMPLOYER_COVER: `${BASE_URL}/api/employers/covers`, // + /:employerid

  CREATE_NEW_JOB: `${BASE_URL}/api/jobs/`,
  UPDATE_EXISTING_JOB: `${BASE_URL}/api/jobs/`,
  GET_ALL_EMPLOYER_JOBS: `${BASE_URL}/api/jobs/employerjobs`, // + /:employerid
  SEARCH_JOBS: `${BASE_URL}/api/jobs/search`, // + /:position/:locationid
  PUBLIC_GET_ALL_EMPLOYER_JOBS: `${BASE_URL}/api/jobs`, // + /:employeeid

  CREATE_NEW_APPLICATION: `${BASE_URL}/api/applications/`,
  UPDATE_EXISTING_APPLICATION: `${BASE_URL}/api/applications/`,
  GET_ALL_EMPLOYEE_APPLICATIONS: `${BASE_URL}/api/applications/allemployee`,
  GET_ALL_JOB_APPLICATIONS: `${BASE_URL}/api/applications`, // + /:jobid

  SAVE_JOB: `${BASE_URL}/api/savedjobs/`, // + /:jobid
  UNSAVE_JOB: `${BASE_URL}/api/savedjobs/`, // + /:savedid
  GET_ALL_EMPLOYEE_SAVED_JOBS: `${BASE_URL}/api/savedjobs/`,

  FOLLOW_EMPLOYER: `${BASE_URL}/api/follows/`, // + /:employerid
  UNFOLLOW_EMPLOYER: `${BASE_URL}/api/follows/`, // + /:followid
  GET_ALL_EMPLOYEE_FOLLOWS: `${BASE_URL}/api/follows/`
};
