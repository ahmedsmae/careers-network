import { createSelector } from 'reselect';

const selectApiUtilities = state => state.apiUtilities;

export const selectPopupApi = createSelector(
  [selectApiUtilities],
  apiUtilities => apiUtilities.popupApi
);
