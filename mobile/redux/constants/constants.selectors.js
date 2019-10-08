import { createSelector } from 'reselect';

const selectConstants = state => state.constants;

export const selectCitiesList = createSelector(
  [selectConstants],
  constants => constants.cities
);
