import { createSelector } from 'reselect';

const selectApplications = state => state.applications;

export const selectMyApplications = createSelector(
  [selectApplications],
  apps => apps.myApplications
);

export const selectJobApplications = createSelector(
  [selectApplications],
  apps => apps.jobApplications
);

export const selectLoading = createSelector(
  [selectApplications],
  apps => apps.loading
);

export const selectErrorMessage = createSelector(
  [selectApplications],
  apps => apps.errorMessage
);

export const selectApplicationByJobId = jobId =>
  createSelector(
    [selectMyApplications],
    apps => apps.find(app => app.job_id === jobId)
  );
