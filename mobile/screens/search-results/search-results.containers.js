import React from 'react';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';

import { selectSearchJobs } from '../../redux/jobs/jobs.selectors';

import SearchResults from './search-results.component';

import styles from './search-results.styles';

const AuthSearchResults = ({ navigation, ...props }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Search Results' />
      </Appbar.Header>

      <SearchResults
        onJobSelect={job => navigation.navigate('EmployeeShowJob', { job })}
        {...props}
      />
    </>
  );
};

const NoAuthSearchResults = ({ navigation, ...props }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Search Results' />
      </Appbar.Header>

      <SearchResults
        onJobSelect={job => navigation.navigate('NoAuthShowJob', { job })}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => ({
  searchJobs: selectSearchJobs(state)
});

export const AuthSearchResultsContainer = connect(mapStateToProps)(
  AuthSearchResults
);

export const NoAuthSearchResultsContainer = connect(mapStateToProps)(
  NoAuthSearchResults
);
