import { createSelector } from 'reselect';

const selectApiUtilities = state => state.apiUtilities;

export const selectPopupApi = createSelector(
  [selectApiUtilities],
  apiUtilities => apiUtilities.popupApi
);

export const selectRandomDate = createSelector(
  [selectApiUtilities],
  apiUtilities => apiUtilities.randomDate
);
