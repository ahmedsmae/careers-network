import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, FlatList, Alert } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';

import { selectSelectedEmployerJobs } from '../../redux/admin/admin.selectors';
import { deleteEmployerStart } from '../../redux/admin/admin.actions';

const AllEmployerJobs = ({
  navigation,
  selectedEmployerJobs,
  deleteEmployerStart
}) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='All Employer Jobs' />
        <Appbar.Action
          icon='delete'
          onPress={() =>
            Alert.alert(
              'Delete Employer',
              'Are you sure you want to delete this employer ?',
              [
                {
                  text: 'DELETE',
                  onPress: () =>
                    deleteEmployerStart(selectedEmployerJobs[0].owner)
                },
                {
                  text: 'CANCEL'
                }
              ]
            )
          }
        />
      </Appbar.Header>

      <FlatList
        data={selectedEmployerJobs}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { position, createdAt } }) => (
          <>
            <List.Item title={position} description={createdAt} />
            <Divider />
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedEmployerJobs: selectSelectedEmployerJobs
});

const mapDispatchToProps = dispatch => ({
  deleteEmployerStart: employerId => dispatch(deleteEmployerStart(employerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEmployerJobs);
