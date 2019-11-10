import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { Appbar, Paragraph } from 'react-native-paper';

import { selectCitiesList } from '../../redux/constants/constants.selectors';
import {
  selectLoading,
  selectErrorMessage
} from '../../redux/jobs/jobs.selectors';
import { searchJobsStart } from '../../redux/jobs/jobs.actions';
import { getAllEmployeeApplicationsStart } from '../../redux/applications/applications.actions';
import { getAllEmployeeSavedJobsStart } from '../../redux/saved/saved.actions';
import { getAllEmployeeFollowsStart } from '../../redux/follows/follows.actions';

import Search from './search.component';

import { Link } from '../../components';

import styles from './search.styles';

const NoAuthSearch = ({
  navigation,
  searchJobsStart,
  loading,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <Search
        onSearch={({ position, location_id: locationId }) => {
          searchJobsStart({ position, location_id: locationId });
          if (!loading && errorMessage.length === 0) {
            navigation.navigate('NoAuthSearchResults');
          }
        }}
        {...props}
      />

      <Link
        style={[styles.signIn]}
        onPress={() => navigation.navigate('SignIn')}
      >
        Sign In
      </Link>

      <View style={styles.contacts}>
        <Link
          style={styles.contact}
          onPress={() => navigation.navigate('About')}
        >
          About
        </Link>
        <Link
          style={styles.contact}
          onPress={() => navigation.navigate('ContactUs')}
        >
          Contact Us
        </Link>
      </View>
    </>
  );
};

const AuthSearch = ({
  navigation,
  searchJobsStart,
  loading,
  errorMessage,
  getAllEmployeeApplicationsStart,
  getAllEmployeeSavedJobsStart,
  getAllEmployeeFollowsStart,
  ...props
}) => {
  useEffect(() => {
    getAllEmployeeApplicationsStart();
    getAllEmployeeSavedJobsStart();
    getAllEmployeeFollowsStart();
  }, [
    getAllEmployeeApplicationsStart,
    getAllEmployeeSavedJobsStart,
    getAllEmployeeFollowsStart
  ]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Welcome' />
      </Appbar.Header>

      <Search
        onSearch={({ position, location_id: locationId }) => {
          searchJobsStart({ position, location_id: locationId });
          if (!loading && errorMessage.length === 0) {
            navigation.navigate('AuthSearchResults');
          }
        }}
        {...props}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectCitiesList,
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  searchJobsStart: searchData => dispatch(searchJobsStart(searchData)),
  getAllEmployeeApplicationsStart: () =>
    dispatch(getAllEmployeeApplicationsStart()),
  getAllEmployeeSavedJobsStart: () => dispatch(getAllEmployeeSavedJobsStart()),
  getAllEmployeeFollowsStart: () => dispatch(getAllEmployeeFollowsStart())
});

export const NoAuthSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoAuthSearch);

export const AuthSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSearch);
