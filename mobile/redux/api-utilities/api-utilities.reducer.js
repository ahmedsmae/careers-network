import ApiUtilitiesActionTypes from './api-utilities.types';

const INITIAL_STATE = {
  popupApi: {
    show: false,
    message: '',
    type: 'success',
    duration: 1000,
    width: 300
  }
};

const apiUtilitiesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ApiUtilitiesActionTypes.SHOW_POPUP_API:
      return {
        ...state,
        popupApi: {
          ...state.popupApi,
          ...payload,
          show: true
        }
      };

    case ApiUtilitiesActionTypes.HIDE_POPUO_API:
      return {
        ...state,
        popupApi: {
          show: false,
          message: '',
          type: 'success',
          duration: 1000,
          width: 300
        }
      };

    default:
      return state;
  }
};

export default apiUtilitiesReducer;
