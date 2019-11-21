import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SorryParagraph, EmployeeJobCard } from '../../components';

import { selectSavedJobs } from '../../redux/saved/saved.selectors';

const MySavedJobs = ({ navigation, savedJobs }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="My Saved Jobs" />
      </Appbar.Header>
      {savedJobs.length === 0 ? (
        <SorryParagraph title="You don't have any saved jobs yet" />
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item._id}
          renderItem={({ item: { job } }) => (
            <EmployeeJobCard
              job={job}
              onPress={() => navigation.navigate('EmployeeShowJob', { job })}
            />
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  savedJobs: selectSavedJobs
});

export default connect(mapStateToProps)(MySavedJobs);
