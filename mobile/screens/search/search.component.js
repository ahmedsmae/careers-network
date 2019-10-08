import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Headline,
  TextInput,
  Button,
  Paragraph,
  Text,
  Divider
} from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectCitiesList } from '../../redux/constants/constants.selectors';

import FormInput from '../../components/form-input/form-input.component';

import styles from './search.styles';

const Search = ({ navigation, currentUser, citiesList }) => {
  const { routeName } = navigation.state;
  console.log(routeName);

  useEffect(() => {
    currentUser &&
      routeName === 'NoAuthSearch' &&
      navigation.navigate('Search');
    !currentUser &&
      routeName === 'Search' &&
      navigation.navigate('NoAuthSearch');
  }, [currentUser, routeName]);

  const [searchValues, setSearchValues] = useState({
    position: '',
    searching: false,
    location: '',
    locationId: null
  });
  const { searching, position, location, locationId } = searchValues;

  const handleLocationSelect = city => {
    const { geonameid, name, country } = city;
    setSearchValues({
      ...searchValues,
      searching: false,
      location: `${name} - ${country}`,
      locationId: geonameid
    });
  };

  const handleSearch = () => {
    // Search for text in database
  };

  return (
    <>
      {currentUser && (
        <Appbar.Header>
          <Appbar.Action
            icon='menu'
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title='Welcome' />
        </Appbar.Header>
      )}
      <View style={styles.screen}>
        <Headline style={styles.headline}>Careers Network</Headline>
        <FormInput
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
        />

        <View style={styles.locationInputContainer}>
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
        </View>
        {searching && (
          <View style={styles.locationListContainer}>
            <View style={styles.locationsList}>
              {citiesList
                .filter(
                  city =>
                    location.trim().length > 0 &&
                    city.name
                      .toLowerCase()
                      .includes(location.trim().toLowerCase())
                )
                .map((city, index) => {
                  if (index < 10) {
                    return (
                      <View key={city.geonameid.toString()}>
                        <Text
                          style={styles.locationListItem}
                          onPress={handleLocationSelect.bind(this, city)}
                        >
                          {`${city.name} - ${city.country}`}
                        </Text>
                        <Divider />
                      </View>
                    );
                  }
                })}
            </View>
          </View>
        )}
        <Button
          style={styles.searchButton}
          icon='search'
          mode='contained'
          onPress={handleSearch}
        >
          Search
        </Button>
        {!currentUser && (
          <>
            <Paragraph
              style={styles.signIn}
              onPress={() => navigation.navigate('SignIn')}
            >
              Sign in
            </Paragraph>
            <View style={styles.contacts}>
              <Paragraph
                style={styles.contact}
                onPress={() => navigation.navigate('About')}
              >
                About
              </Paragraph>
              <Paragraph
                style={styles.contact}
                onPress={() => navigation.navigate('ContactUs')}
              >
                Contact Us
              </Paragraph>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  citiesList: selectCitiesList
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
