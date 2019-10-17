import { createSelector } from 'reselect';

const selectSaved = state => state.saved;

export const selectSavedJobs = createSelector(
  [selectSaved],
  saved => saved.savedJobs
);

export const selectLoading = createSelector(
  [selectSaved],
  saved => saved.loading
);

export const selectErrorMessage = createSelector(
  [selectSaved],
  saved => saved.errorMessage
);

export const selectIsJobSaved = jobId =>
  createSelector(
    [selectSavedJobs],
    savedJobs => {
      for (const saved of savedJobs) {
        if (jobId === saved.job._id) return true;
      }

      return false;
    }
  );

export const selectSavedIdByJobId = jobId =>
  createSelector(
    [selectSavedJobs],
    savedJobs => {
      for (const saved of savedJobs) {
        if (jobId === saved.job._id) return saved._id;
      }

      return null;
    }
  );
