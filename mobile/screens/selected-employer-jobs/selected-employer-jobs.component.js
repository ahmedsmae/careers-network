import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar, Searchbar, Provider } from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectSelectedEmployerJobs } from '../../redux/jobs/jobs.selectors';
import { publicGetEmployerJobsStart } from '../../redux/jobs/jobs.actions';

import JobCard from './job-card.component';

import Colors from '../../constants/colors';

const MyJobs = ({
  navigation,
  currentUser,
  publicGetEmployerJobsStart,
  selectedEmployerJobs
}) => {
  const employerId = navigation.getParam('employerId');

  useEffect(() => {
    publicGetEmployerJobsStart(employerId, err => {});
  }, [publicGetEmployerJobsStart, employerId]);

  const [searchMode, setSearchMode] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const displayList = selectedEmployerJobs.filter(({ position }) =>
    position.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <Provider>
        <Appbar.Header style={{ backgroundColor: Colors.PRIMARY }}>
          {searchMode ? (
            <Searchbar
              placeholder="Search by position"
              value={searchQ}
              autoFocus
              clearButtonMode="always"
              onChangeText={text => {
                setSearchQ(text);
                if (text.length === 0) {
                  setSearchMode(false);
                }
              }}
            />
          ) : (
            <>
              <Appbar.Action
                icon="menu"
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
              <Appbar.Content title="Employer Jobs" color="white" />
              <Appbar.Action
                icon="search"
                color="white"
                onPress={() => setSearchMode(true)}
              />
            </>
          )}
        </Appbar.Header>

        <FlatList
          keyExtractor={(item, index) => item._id}
          data={displayList}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() =>
                currentUser
                  ? navigation.navigate('EmployeeShowJob', { job: item })
                  : navigation.navigate('NoAuthShowJob', { job: item })
              }
            />
          )}
        />
      </Provider>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectedEmployerJobs: selectSelectedEmployerJobs
});

const mapDispatchToProps = dispatch => ({
  publicGetEmployerJobsStart: (employerId, callback) =>
    dispatch(publicGetEmployerJobsStart(employerId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyJobs);
