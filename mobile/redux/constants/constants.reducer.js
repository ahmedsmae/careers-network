import CITIES_LIST from './cities.data';
import DELETE_USER_REASONS from './delete-user-reasons.data';
import COUNTRIES_LIST from './countries.data';
import NATIONALITIES_LIST from './nationalities.data';
import LANGUAGES_LIST from './languages.data';
import LANGUAGE_LEVELS_LIST from './language-levels.data';
import SKILL_LEVELS_LIST from './skill-levels.data';
import MARITAL_STATUSES_LIST from './marital-statuses.data';
import RELIGIONS_LIST from './religions.data';
import VISA_TYPES_LIST from './visa-types.data';

const INITIAL_STATE = {
  cities: CITIES_LIST,
  deleteUserReasons: DELETE_USER_REASONS,
  countries: COUNTRIES_LIST,
  nationalities: NATIONALITIES_LIST,
  languages: LANGUAGES_LIST,
  languageLevels: LANGUAGE_LEVELS_LIST,
  skillLevels: SKILL_LEVELS_LIST,
  maritalStatuses: MARITAL_STATUSES_LIST,
  religions: RELIGIONS_LIST,
  visaTypes: VISA_TYPES_LIST
};

const constantsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default constantsReducer;
