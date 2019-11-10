import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

import { changeEmployerEmailStart } from '../../redux/admin/admin.actions';

const ChangeEmployerEmail = ({ navigation, changeEmployerEmailStart }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Change Employer Email' />
      </Appbar.Header>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  changeEmployerEmailStart: (oldEmail, newEmail) =>
    dispatch(changeEmployerEmailStart(oldEmail, newEmail))
});

export default connect(
  null,
  mapDispatchToProps
)(ChangeEmployerEmail);
