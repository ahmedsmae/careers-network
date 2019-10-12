import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import styles from './edit-job.styles';

const EditJob = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Edit Job' />
        <Appbar.Action icon='save' onPress={() => {}} />
      </Appbar.Header>

      <ScrollView></ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(EditJob);
