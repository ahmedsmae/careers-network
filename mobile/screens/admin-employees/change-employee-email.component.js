import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

import { changeEmployeeEmailStart } from '../../redux/admin/admin.actions';

const ChangeEmployeeEmail = ({ navigation, changeEmployeeEmailStart }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Change Employee Email' />
      </Appbar.Header>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  changeEmployeeEmailStart: (oldEmail, newEmail) =>
    dispatch(changeEmployeeEmailStart(oldEmail, newEmail))
});

export default connect(
  null,
  mapDispatchToProps
)(ChangeEmployeeEmail);
