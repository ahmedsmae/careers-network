import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';

import { selectAllEmployees } from '../../redux/admin/admin.selectors';
import {
  getAllEmployeesStart,
  getAllEmployeeApplicationsStart
} from '../../redux/admin/admin.actions';

const AllEmployees = ({
  navigation,
  getAllEmployeesStart,
  allEmployees,
  getAllEmployeeApplicationsStart
}) => {
  useEffect(() => {
    getAllEmployeesStart();
  }, [getAllEmployeesStart]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='All Employees' />
      </Appbar.Header>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allEmployees: selectAllEmployees
});

const mapDispatchToProps = dispatch => ({
  getAllEmployeesStart: () => dispatch(getAllEmployeesStart()),
  getAllEmployeeApplicationsStart: employeeId =>
    dispatch(getAllEmployeeApplicationsStart(employeeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEmployees);
