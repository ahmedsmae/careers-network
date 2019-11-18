import React, { useState } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-paper';
import { H1, OutlinedInput, Filter } from '../../components';

import styles from './search.styles';

const Search = ({ citiesList, onSearch, disabled }) => {
  const [{ position, locationId }, setSearchValues] = useState({
    position: '',
    locationId: null
  });

  const handleLocationSelect = ({ id }) => {
    setSearchValues({ ...searchValues, locationId: id });
  };

  const handleSearch = () => {
    if (position.trim().length < 1) {
      return Alert.alert(
        'Missing Info',
        'You should type a position to search for',
        [{ text: 'OK' }]
      );
    }
    onSearch({ position, location_id: locationId });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={5}
    >
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View
          style={{
            width: 300,
            height: 300,
            marginVertical: 10,
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/network.png')}
            style={{ width: '100%', height: '100%', opacity: 0.5 }}
          />

          <H1 style={{ bottom: 25, position: 'absolute' }}>Careers Network</H1>
        </View>

        <OutlinedInput
          style={{ marginHorizontal: 10, marginBottom: 10, width: '90%' }}
          label="Position"
          value={position}
          onChange={({ value }) =>
            setSearchValues(prev => ({ ...prev, position: value }))
          }
          required="You have to add a position"
        />

        <Filter
          style={{ width: '90%' }}
          list={citiesList}
          label="Location"
          onSelect={handleLocationSelect}
          onClear={() =>
            setSearchValues(prev => ({ ...prev, locationId: null }))
          }
          filterItem="city"
          listItem={city => `${city.city} - ${city.country}`}
        />

        <Button
          style={styles.searchButton}
          disabled={disabled}
          icon="search"
          mode="contained"
          size={25}
          onPress={handleSearch}
        >
          Search
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Search;
