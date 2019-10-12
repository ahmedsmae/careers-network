import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';

import styles from './my-jobs.styles';

const MyJobs = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='My Jobs' />
      </Appbar.Header>

      <ScrollView>
        <Text
          onPress={() => navigation.navigate('ShowJob')}
          style={{ padding: 10, backgroundColor: 'lightgrey' }}
        >
          Job Post
        </Text>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon='add'
        color='white'
        onPress={() => navigation.navigate('EditJob')}
      />
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MyJobs);
