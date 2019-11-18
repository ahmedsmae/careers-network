import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { selectCitiesList } from '../../redux/constants/constants.selectors';

import { searchJobsStart } from '../../redux/jobs/jobs.actions';
import { getAllEmployeeApplicationsStart } from '../../redux/applications/applications.actions';
import { getAllEmployeeSavedJobsStart } from '../../redux/saved/saved.actions';
import { getAllEmployeeFollowsStart } from '../../redux/follows/follows.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import Search from './search.component';

import { Link } from '../../components';

import styles from './search.styles';

const NoAuthSearch = ({
  navigation,
  searchJobsStart,
  showPopupApi,
  ...props
}) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <View style={{ marginTop: 30 }} />
      <Search
        onSearch={searchData => {
          searchJobsStart(searchData, err => {
            if (err) {
              showPopupApi({
                type: 'danger',
                message:
                  err.response && err.response.data && err.response.data.errors
                    ? err.response.data.errors.map(err => err.msg).toString()
                    : 'Please check your connection'
              });
              setDisabled(false);
              return console.log(err);
            }

            setDisabled(false);
            navigation.navigate('NoAuthSearchResults');
          });
        }}
        disabled={disabled}
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
  getAllEmployeeApplicationsStart,
  getAllEmployeeSavedJobsStart,
  getAllEmployeeFollowsStart,
  showPopupApi,
  ...props
}) => {
  useEffect(() => {
    getAllEmployeeApplicationsStart(err => {});
    getAllEmployeeSavedJobsStart(err => {});
    getAllEmployeeFollowsStart(err => {});
  }, [
    getAllEmployeeApplicationsStart,
    getAllEmployeeSavedJobsStart,
    getAllEmployeeFollowsStart
  ]);

  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Welcome" />
      </Appbar.Header>

      <Search
        onSearch={searchData => {
          searchJobsStart(searchData, err => {
            if (err) {
              showPopupApi({
                type: 'danger',
                message:
                  err.response && err.response.data && err.response.data.errors
                    ? err.response.data.errors.map(err => err.msg).toString()
                    : 'Please check your connection'
              });
              setDisabled(false);
              return console.log(err);
            }

            setDisabled(false);
            navigation.navigate('AuthSearchResults');
          });
        }}
        disabled={disabled}
        {...props}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectCitiesList
});

const mapDispatchToProps = dispatch => ({
  searchJobsStart: (searchData, callback) =>
    dispatch(searchJobsStart(searchData, callback)),
  getAllEmployeeApplicationsStart: callback =>
    dispatch(getAllEmployeeApplicationsStart(callback)),
  getAllEmployeeSavedJobsStart: callback =>
    dispatch(getAllEmployeeSavedJobsStart(callback)),
  getAllEmployeeFollowsStart: callback =>
    dispatch(getAllEmployeeFollowsStart(callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export const NoAuthSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoAuthSearch);

export const AuthSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSearch);
