import CITIES_LIST from './cities.data';

const INITIAL_STATE = {
  cities: CITIES_LIST
};

const constantsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default constantsReducer;
