import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import styles from './show-job.styles';

const ShowJob = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Show Job' />
        <Appbar.Action
          icon='edit'
          onPress={() => navigation.navigate('EditJob')}
        />
      </Appbar.Header>

      <ScrollView></ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(ShowJob);
