import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar, List, Avatar, Divider } from 'react-native-paper';

import { selectAllEmployers } from '../../redux/admin/admin.selectors';
import {
  getAllEmployersStart,
  getAllEmployerJobsStart
} from '../../redux/admin/admin.actions';

import URLS from '../../redux/utils/urls';

const AllEmployers = ({
  navigation,
  getAllEmployersStart,
  allEmployers,
  getAllEmployerJobsStart
}) => {
  useEffect(() => {
    getAllEmployersStart();
  }, [getAllEmployersStart]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="All Employers" />
      </Appbar.Header>

      <FlatList
        data={allEmployers}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { _id, name, createdAt } }) => (
          <>
            <List.Item
              title={name}
              description={createdAt}
              left={props => (
                <Avatar.Image
                  size={60}
                  source={{ uri: `${URLS.SERVE_EMPLOYER_AVATAR}/${_id}` }}
                  {...props}
                />
              )}
              onPress={() => {
                getAllEmployerJobsStart(_id);
                navigation.navigate('AllEmployerJobs');
              }}
            />
            <Divider />
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allEmployers: selectAllEmployers
});

const mapDispatchToProps = dispatch => ({
  getAllEmployersStart: () => dispatch(getAllEmployersStart()),
  getAllEmployerJobsStart: employerId =>
    dispatch(getAllEmployerJobsStart(employerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployers);
