// const BASE_URL = 'http://192.168.1.100:5000';
const BASE_URL = 'https://afifi-careers-network.herokuapp.com/';

export default URLS = {
  SIGNUP: `${BASE_URL}/api/users/signup`,
  SIGNIN: `${BASE_URL}/api/users/signin`,
  AUTH: `${BASE_URL}/api/users/auth`,
  SIGNOUT: `${BASE_URL}/api/users/signout`,
  DELETE_USER: `${BASE_URL}/api/users/deleteuser`,

  CHANGE_PASSWORD: `${BASE_URL}/api/users/changepassword`,
  FORGET_PASSWORD: `${BASE_URL}/api/users/forgetpassword`,
  CONTACT_US: `${BASE_URL}/api/users/contactus`,

  EDIT_EMPLOYEE_AVATAR: `${BASE_URL}/api/employees/avatars`,
  EDIT_EMPLOYEE_INFO: `${BASE_URL}/api/employees/info`,
  ADD_EMPLOYEE_LANGUAGE: `${BASE_URL}/api/employees/languages`,
  DELETE_EMPLOYEE_LANGUAGE: `${BASE_URL}/api/employees/languages`, // + /:languageid
  ADD_EMPLOYEE_SKILL: `${BASE_URL}/api/employees/skills`,
  DELETE_EMPLOYEE_SKILL: `${BASE_URL}/api/employees/skills`, // + /:skillid
  ADD_EMPLOYEE_INTEREST: `${BASE_URL}/api/employees/interests`,
  DELETE_EMPLOYEE_INTEREST: `${BASE_URL}/api/employees/interests`, // + /:interestid
  ADD_EDIT_EMPLOYEE_REFERENCE: `${BASE_URL}/api/employees/references`,
  DELETE_EMPLOYEE_REFERENCE: `${BASE_URL}/api/employees/references`, // + /:referenceid
  EDIT_EMPLOYEE_SOCIAL_PROFILES: `${BASE_URL}/api/employees/socialprofiles`,
  EDIT_EMPLOYEE_PREFERED_JOBS_SETTINGS: `${BASE_URL}/api/employees/preferedjobssettings`,
  SERVE_EMPLOYEE_AVATAR: `${BASE_URL}/api/employees/avatars`, // + /:employeeid

  EDIT_EDUCATION_INFO: `${BASE_URL}/api/employees/educations`,
  EDIT_EDUCATION_IMAGE: `${BASE_URL}/api/employees/eduactions/setimage`, // + /:educationid
  SERVE_EDUCATION_CERTIFICATE: `${BASE_URL}/api/employees/educations`, // + /:employeeid/:educationid
  DELETE_EMPLOYEE_EDUCATION: `${BASE_URL}/api/employees/educations`, // + /:educationid

  EDIT_EMPLOYER_AVATAR: `${BASE_URL}/api/employers/avatars`,
  EDIT_EMPLOYER_COVER: `${BASE_URL}/api/employers/covers`,
  EDIT_EMPLOYER_INFO: `${BASE_URL}/api/employers/info`,
  SERVE_EMPLOYER_AVATAR: `${BASE_URL}/api/employers/avatars`, // + /:employerid
  SERVE_EMPLOYER_COVER: `${BASE_URL}/api/employers/covers`, // + /:employerid

  CREATE_NEW_JOB: `${BASE_URL}/api/jobs/`,
  UPDATE_EXISTING_JOB: `${BASE_URL}/api/jobs/`,
  DELETE_JOB: `${BASE_URL}/api/jobs/`, // + /:jobid
  GET_ALL_EMPLOYER_JOBS: `${BASE_URL}/api/jobs/employerjobs`, // + /:employerid
  SEARCH_JOBS: `${BASE_URL}/api/jobs/search`, // + /:position/:locationid
  GET_EMPLOYEE_HOME_JOBS: `${BASE_URL}/api/jobs/homejobs/`,
  // PUBLIC_GET_ALL_EMPLOYER_JOBS: `${BASE_URL}/api/jobs`, // + /:employeeid

  CREATE_NEW_APPLICATION: `${BASE_URL}/api/applications/`,
  UPDATE_EXISTING_APPLICATION: `${BASE_URL}/api/applications/`,
  DELETE_APPLICATION: `${BASE_URL}/api/applications/`, // + /:applicationid
  GET_ALL_EMPLOYEE_APPLICATIONS: `${BASE_URL}/api/applications/allemployee`,
  GET_ALL_JOB_APPLICATIONS: `${BASE_URL}/api/applications`, // + /:jobid

  SAVE_JOB: `${BASE_URL}/api/savedjobs/`, // + /:jobid
  UNSAVE_JOB: `${BASE_URL}/api/savedjobs/`, // + /:savedid
  GET_ALL_EMPLOYEE_SAVED_JOBS: `${BASE_URL}/api/savedjobs/`,

  FOLLOW_EMPLOYER: `${BASE_URL}/api/follows/`, // + /:employerid
  UNFOLLOW_EMPLOYER: `${BASE_URL}/api/follows/`, // + /:followid
  GET_ALL_EMPLOYEE_FOLLOWS: `${BASE_URL}/api/follows/`,

  ADMIN_CREATE_EMPLOYER: `${BASE_URL}/api/admin/createemployer`,
  ADMIN_GET_ALL_EMPLOYERS: `${BASE_URL}/api/admin/allemployers`,
  ADMIN_GET_ALL_EMPLOYEES: `${BASE_URL}/api/admin/allemployees`,
  ADMIN_GET_ALL_ADMINS: `${BASE_URL}/api/admin/alladmins`,
  ADMIN_GET_ALL_EMPLOYER_JOBS: `${BASE_URL}/api/admin/alljobs`, // + /:employerid
  ADMIN_GET_ALL_EMPLOYEE_APPLICATIONS: `${BASE_URL}/api/admin/allapplications`, // + /:employeeid
  ADMIN_CHANGE_EMPLOYER_EMAIL: `${BASE_URL}/api/admin/changeemployeremail`,
  ADMIN_CHANGE_EMPLOYEE_EMAIL: `${BASE_URL}/api/admin/changeemployeeemail`,
  ADMIN_DELETE_EMPLOYER: `${BASE_URL}/api/admin/deleteemployer`, // + /:userid
  ADMIN_DELETE_EMPLOYEE: `${BASE_URL}/api/admin/deleteemployee`, // + /:userid
  ADMIN_DELETE_JOB: `${BASE_URL}/api/admin/deletejob`, // + /:jobid
  ADMIN_DELETE_APPLICATION: `${BASE_URL}/api/admin/deleteapplication` // + /:applicationid
};

export const SOCIAL_MEDIA_BASE_URLS = {
  linkedin: 'https://www.linkedin.com/in/',
  twitter: 'https://twitter.com/',
  github: 'https://github.com/',
  stackoverflow: 'https://stackoverflow.com/users/',
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/user/',
  youtubeChannel: 'https://www.youtube.com/channel/'
};
