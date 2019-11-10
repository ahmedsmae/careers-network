import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Text, Divider } from 'react-native-paper';
import { H1, ContainedButton, OutlinedInput } from '../../components';

import FormInput from '../../components/form-input/form-input.component';

import styles from './search.styles';

const Search = ({ citiesList, onSearch }) => {
  const [searchValues, setSearchValues] = useState({
    position: '',
    searching: false,
    location: '',
    locationId: null
  });
  const { searching, position, location, locationId } = searchValues;

  const handleLocationSelect = ({ id, city, country }) => {
    setSearchValues({
      ...searchValues,
      searching: false,
      location: `${city} - ${country}`,
      locationId: id
    });
  };

  const handleSearch = () => {
    if (position.trim().length < 1) {
      Alert.alert('Missing Info', 'You should type a position to search for', [
        { text: 'OK' }
      ]);
      return;
    }
    onSearch({ position, location_id: locationId });
  };

  return (
    <>
      <View style={styles.screen}>
        <H1 style={{ marginTop: 100, marginBottom: 50 }}>Careers Network</H1>

        <OutlinedInput
          style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
          label='Position'
          name='position'
          value={position}
          onChange={({ name, value }) =>
            setSearchValues({
              ...searchValues,
              searching: true,
              [name]: value
            })
          }
          required='You have to add a position'
        />

        <OutlinedInput
          style={{ marginHorizontal: 10, marginBottom: 5, width: '90%' }}
          label='Location'
          name='location'
          value={location}
          onChange={({ name, value }) =>
            setSearchValues({
              ...searchValues,
              searching: true,
              [name]: value
            })
          }
        />

        {/* <FormInput
          style={styles.positionSearchInput}
          name='position'
          value={position}
          onChange={({ name, value }) =>
            setSearchValues({
              ...searchValues,
              searching: true,
              [name]: value
            })
          }
          label='Position'
          capWords
          clear
        /> */}

        {/* <View style={styles.locationInputContainer}>
          <TextInput
            style={styles.locationSearchInput}
            label='Location'
            value={location}
            onChangeText={text =>
              setSearchValues({
                ...searchValues,
                searching: true,
                location: text
              })
            }
          />
          {!!location && !!location.length && (
            <Text
              style={styles.clearButton}
              onPress={() => {
                setSearchValues({
                  ...searchValues,
                  location: '',
                  locationId: null,
                  searching: false
                });
              }}
            >
              &times;
            </Text>
          )}
        </View> */}
        {searching && (
          <View style={styles.locationListContainer}>
            <View style={styles.locationsList}>
              {citiesList
                .filter(
                  ({ city }) =>
                    location.trim().length > 0 &&
                    city.toLowerCase().includes(location.trim().toLowerCase())
                )
                .map((city, index) => {
                  if (index < 10) {
                    return (
                      <View key={city.id}>
                        <Text
                          style={styles.locationListItem}
                          onPress={handleLocationSelect.bind(this, city)}
                        >
                          {`${city.city} - ${city.country}`}
                        </Text>
                        <Divider />
                      </View>
                    );
                  }
                })}
            </View>
          </View>
        )}

        <ContainedButton
          icon='md-search'
          style={styles.searchButton}
          onPress={handleSearch}
        >
          Search
        </ContainedButton>
      </View>
    </>
  );
};

export default Search;
