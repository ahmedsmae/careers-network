import { createSelector } from 'reselect';

const selectJobs = state => state.jobs;

export const selectMyJobs = createSelector(
  [selectJobs],
  jobs => jobs.myJobs
);

export const selectSearchJobs = createSelector(
  [selectJobs],
  jobs => jobs.searchJobs
);

export const selectHomeJobs = createSelector(
  [selectJobs],
  jobs => jobs.homeJobs
);

export const selectFollowingJobs = createSelector(
  [selectJobs],
  jobs => jobs.followingJobs
);

export const selectLoading = createSelector(
  [selectJobs],
  jobs => jobs.loading
);

export const selectErrorMessage = createSelector(
  [selectJobs],
  jobs => jobs.errorMessage
);
