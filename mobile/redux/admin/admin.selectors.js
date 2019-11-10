import { createSelector } from 'reselect';

const selectAdmin = state => state.admin;

export const selectAllEmployers = createSelector(
  [selectAdmin],
  admin => admin.allEmployers
);

export const selectAllEmployees = createSelector(
  [selectAdmin],
  admin => admin.allEmployees
);

export const selectAllAdmins = createSelector(
  [selectAdmin],
  admin => admin.allAdmins
);

export const selectSelectedEmployerJobs = createSelector(
  [selectAdmin],
  admin => admin.selectedEmployerJobs
);

export const selectSelectedEmployeeApplications = createSelector(
  [selectAdmin],
  admin => admin.selectedEmployeeApplications
);

export const selectLoading = createSelector(
  [selectAdmin],
  admin => admin.loading
);

export const selectErrorMessage = createSelector(
  [selectAdmin],
  admin => admin.errorMessage
);
