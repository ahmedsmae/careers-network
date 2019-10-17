import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, FlatList } from 'react-native';
import { Text, Appbar } from 'react-native-paper';

import { selectMyApplications } from '../../redux/applications/applications.selectors';

import ApplicationCard from './application-card.component';

const MyApplications = ({ applications, navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='My Applications' />
      </Appbar.Header>

      <FlatList
        data={applications}
        keyExtractor={(item, _) => item._id}
        renderItem={({ item }) => (
          <ApplicationCard
            application={item}
            onPress={() =>
              navigation.navigate('EditApplication', {
                application: item,
                job: item.job
              })
            }
          />
        )}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  applications: selectMyApplications
});

export default connect(mapStateToProps)(MyApplications);
