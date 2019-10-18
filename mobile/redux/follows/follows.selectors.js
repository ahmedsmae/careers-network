import { createSelector } from 'reselect';

const selectFollows = state => state.follows;

export const selectFollowedEmployers = createSelector(
  [selectFollows],
  follows => follows.followedEmployers
);

export const selectLoading = createSelector(
  [selectFollows],
  follows => follows.loading
);

export const selectErrorMessage = createSelector(
  [selectFollows],
  follows => follows.errorMessage
);

export const selectIsEmployerFollowed = employerId =>
  createSelector(
    [selectFollowedEmployers],
    followedEmployers => {
      for (const follow of followedEmployers) {
        if (employerId === follow.employer._id) return true;
      }

      return false;
    }
  );

export const selectFollowIdByEmployerId = employerId =>
  createSelector(
    [selectFollowedEmployers],
    followedEmployers => {
      for (const follow of followedEmployers) {
        if (employerId === follow.employer._id) return follow._id;
      }

      return null;
    }
  );
