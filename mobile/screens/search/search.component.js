import React, { useState } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { H1, ContainedButton, OutlinedInput } from '../../components';

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
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
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
          icon={Platform.OS === 'android' ? 'md-search' : 'ios-serach'}
          style={styles.searchButton}
          onPress={handleSearch}
        >
          Search
        </ContainedButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Search;
