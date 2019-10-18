import CITIES_LIST from './cities.data';
import DELETE_USER_REASONS from './delete-user-reasons.data';

const INITIAL_STATE = {
  cities: CITIES_LIST,
  deleteUserReasons: DELETE_USER_REASONS
};

const constantsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default constantsReducer;
