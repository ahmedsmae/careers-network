import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import {
  Appbar,
  Headline,
  TextInput,
  Button,
  Paragraph
} from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';

import styles from './search.styles';

const Search = ({ navigation, currentUser }) => {
  const { routeName } = navigation.state;

  useEffect(() => {
    currentUser &&
      routeName === 'NoAuthSearch' &&
      navigation.navigate('Search');
  }, [currentUser, routeName]);

  const [searchValues, setSearchValues] = useState({
    position: '',
    location: ''
  });
  const { position, location } = searchValues;

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
        <TextInput
          style={styles.searchInput}
          label='Position'
          value={position}
          onChangeText={text =>
            setSearchValues({ ...searchValues, position: text })
          }
        />
        <TextInput
          style={styles.searchInput}
          label='Location'
          value={location}
          onChangeText={text =>
            setSearchValues({ ...searchValues, location: text })
          }
        />

        <Button
          style={styles.searchButton}
          icon='search'
          mode='contained'
          onPress={handleSearch}
        >
          Search
        </Button>

        {!currentUser && (
          <Paragraph
            style={styles.signIn}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign in
          </Paragraph>
        )}
      </View>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
