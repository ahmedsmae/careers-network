import { createSelector } from 'reselect';

const selectConstants = state => state.constants;

export const selectCitiesList = createSelector(
  [selectConstants],
  constants => constants.cities
);

export const selectDeleteUserReasons = createSelector(
  [selectConstants],
  constants => constants.deleteUserReasons
);

export const selectCityNameById = id =>
  createSelector(
    [selectCitiesList],
    cities => {
      const city = cities.find(c => c.id === id);
      return city ? `${city.city} - ${city.country}` : null;
    }
  );

export const selectCountries = createSelector(
  [selectConstants],
  constants => constants.countries
);

export const selectNationalities = createSelector(
  [selectConstants],
  constants => constants.nationalities
);

export const selectLanguages = createSelector(
  [selectConstants],
  constants => constants.languages
);

export const selectLanguageLevels = createSelector(
  [selectConstants],
  constants => constants.languageLevels
);

export const selectSkillLevels = createSelector(
  [selectConstants],
  constants => constants.skillLevels
);

export const selectMaritalStatuses = createSelector(
  [selectConstants],
  constants => constants.maritalStatuses
);

export const selectReligions = createSelector(
  [selectConstants],
  constants => constants.religions
);

export const selectVisaTypes = createSelector(
  [selectConstants],
  constants => constants.visaTypes
);
