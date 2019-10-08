import { createSelector } from 'reselect';

const selectConstants = state => state.constants;

export const selectCitiesList = createSelector(
  [selectConstants],
  constants => constants.cities
);

export const selectCityNameById = id =>
  createSelector(
    [selectCitiesList],
    cities => cities.find(c => c.id === id)
  );
