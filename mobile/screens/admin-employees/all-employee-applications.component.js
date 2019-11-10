import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

import { selectSelectedEmployeeApplications } from '../../redux/admin/admin.selectors';

const AllEmployeeApplications = ({
  navigation,
  selectedEmployeeApplications
}) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='All Employee Applications' />
      </Appbar.Header>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedEmployeeApplications: selectSelectedEmployeeApplications
});

export default connect(mapStateToProps)(AllEmployeeApplications);
