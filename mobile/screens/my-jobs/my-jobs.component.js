import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar, FAB, Searchbar, Provider, Menu } from 'react-native-paper';
import { SorryParagraph } from '../../components';

import { selectCurrentEmployer } from '../../redux/current-user/current-user.selectors';
import { selectMyJobs } from '../../redux/jobs/jobs.selectors';
import { getAllEmployerJobsStart } from '../../redux/jobs/jobs.actions';

import JobCard from './job-card.component';

import Colors from '../../constants/colors';
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

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('ALL');

  const [searchMode, setSearchMode] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const displayList = myJobs.filter(
    ({ position, status }) =>
      (status === selectedMenuItem || selectedMenuItem === 'ALL') &&
      position.toLowerCase().includes(searchQ.toLowerCase())
  );

  if (myJobs.length === 0) {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title="My Jobs" />
        </Appbar.Header>

        <SorryParagraph
          title="Currently you don't have any jobs"
          subtitle="Use + button to add one now"
          caption="Good Luck!"
        />

        <FAB
          style={styles.fab}
          icon="add"
          color="white"
          onPress={() => navigation.navigate('EditJob')}
        />
      </>
    );
  }

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
              <Appbar.Content title="My Jobs" color="white" />
              <Appbar.Action
                icon="search"
                color="white"
                onPress={() => setSearchMode(true)}
              />
            </>
          )}

          <Menu
            visible={showMenu}
            onDismiss={() => setShowMenu(false)}
            anchor={
              <Appbar.Action
                icon="more-vert"
                color="white"
                onPress={() => setShowMenu(prev => !prev)}
              />
            }
          >
            {selectedMenuItem === 'ALL' && (
              <>
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('AVAILABLE');
                    setShowMenu(false);
                  }}
                  title="Show available only"
                />
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('TAKEN');
                    setShowMenu(false);
                  }}
                  title="Show taken only"
                />
              </>
            )}
            {selectedMenuItem === 'AVAILABLE' && (
              <>
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('TAKEN');
                    setShowMenu(false);
                  }}
                  title="Show taken only"
                />
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('ALL');
                    setShowMenu(false);
                  }}
                  title="Show all"
                />
              </>
            )}

            {selectedMenuItem === 'TAKEN' && (
              <>
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('AVAILABLE');
                    setShowMenu(false);
                  }}
                  title="Show available only"
                />
                <Menu.Item
                  onPress={() => {
                    setSelectedMenuItem('ALL');
                    setShowMenu(false);
                  }}
                  title="Show all"
                />
              </>
            )}
          </Menu>
        </Appbar.Header>

        <FlatList
          keyExtractor={(item, _) => item._id}
          data={displayList}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => navigation.navigate('EmployerJob', { job: item })}
            />
          )}
        />
      </Provider>

      <FAB
        style={styles.fab}
        icon="add"
        color="white"
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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobs);
