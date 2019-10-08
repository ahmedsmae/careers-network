import { createSelector } from 'reselect';

const selectUser = state => state.currentUser;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentEmployee = createSelector(
  [selectUser],
  user => user.employee
);

export const selectCurrentEmployer = createSelector(
  [selectUser],
  user => user.employer
);

export const selectLoading = createSelector(
  [selectUser],
  user => user.loading
);

export const selectErrorMessage = createSelector(
  [selectUser],
  user => user.errorMessage
);
