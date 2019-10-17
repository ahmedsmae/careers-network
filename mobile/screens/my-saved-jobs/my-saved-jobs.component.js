import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, FlatList } from 'react-native';
import { Text, Appbar } from 'react-native-paper';

import { selectSavedJobs } from '../../redux/saved/saved.selectors';

import JobCard from './job-card.component';

const MySavedJobs = ({ navigation, savedJobs }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='My Saved Jobs' />
      </Appbar.Header>
      <FlatList
        data={savedJobs}
        keyExtractor={item => item._id}
        renderItem={({ item: { job } }) => (
          <JobCard
            job={job}
            onPress={() => navigation.navigate('EmployeeShowJob', { job })}
          />
        )}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  savedJobs: selectSavedJobs
});

export default connect(mapStateToProps)(MySavedJobs);
