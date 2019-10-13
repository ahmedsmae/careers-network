import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';

import { selectCurrentEmployer } from '../../redux/current-user/current-user.selectors';
import { selectMyJobs } from '../../redux/jobs/jobs.selectors';
import { getAllEmployerJobsStart } from '../../redux/jobs/jobs.actions';

import JobCard from './job-card.component';

import styles from './my-jobs.styles';

const MyJobs = ({
  navigation,
  currentEmployer,
  getAllEmployerJobsStart,
  myJobs
}) => {
  useEffect(() => {
    currentEmployer && getAllEmployerJobsStart(currentEmployer._id);
  }, [currentEmployer, getAllEmployerJobsStart]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='My Jobs' />
      </Appbar.Header>

      <FlatList
        keyExtractor={(item, index) => item._id}
        data={myJobs}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('EditJob', { job: item })}
          />
        )}
      />

      <FAB
        style={styles.fab}
        icon='add'
        color='white'
        onPress={() => navigation.navigate('EditJob')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployer: selectCurrentEmployer,
  myJobs: selectMyJobs
});

const mapDispatchToProps = dispatch => ({
  getAllEmployerJobsStart: employerId =>
    dispatch(getAllEmployerJobsStart(employerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyJobs);
