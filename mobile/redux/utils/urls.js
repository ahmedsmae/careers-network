const BASE_URL = 'http://192.168.1.102:5000';

export default URLS = {
  SIGNUP: `${BASE_URL}/api/users/signup`,
  SIGNIN: `${BASE_URL}/api/users/signin`,
  AUTH: `${BASE_URL}/api/users/auth`,
  SIGNOUT: `${BASE_URL}/api/users/signout`,

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
  SEARCH_JOBS: `${BASE_URL}/api/jobs/search`,
  GET_FOLLOWING_EMPLOYERS_JOBS: `${BASE_URL}/api/jobs/following` // + /:employeeid
};
