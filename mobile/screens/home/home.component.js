import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SorryParagraph } from '../../components';

import { selectHomeJobs } from '../../redux/jobs/jobs.selectors';
import { getHomeJobsStart } from '../../redux/jobs/jobs.actions';

import JobCard from './job-card.component';

const Home = ({ navigation, homeJobs, getHomeJobsStart }) => {
  useEffect(() => {
    getHomeJobsStart();
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Home Jobs" />
        <Appbar.Action
          icon="settings"
          onPress={() => navigation.navigate('HomeSettings')}
        />
      </Appbar.Header>

      {homeJobs.length === 0 ? (
        <SorryParagraph
          title="Sorry, No prefered jobs results"
          subtitle="Edit your locations and keywords in the settings page to see results"
          caption="Good Luck!"
        />
      ) : (
        <FlatList
          data={homeJobs}
          keyExtractor={(item, _) => item._id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => navigation.navigate('EmployeeShowJob', { job })}
            />
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  homeJobs: selectHomeJobs
});

const mapDispatchToProps = dispatch => ({
  getHomeJobsStart: () => dispatch(getHomeJobsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
