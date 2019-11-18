import ApiUtilitiesActionTypes from './api-utilities.types';

export const showPopupApi = popupDetails => ({
  type: ApiUtilitiesActionTypes.SHOW_POPUP_API,
  payload: popupDetails
});

export const hidePopupApi = () => ({
  type: ApiUtilitiesActionTypes.HIDE_POPUP_API
});
