import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './show-job.styles';

const ShowJob = ({ job }) => {
  return (
    <>
      <ScrollView>
        <Text>{JSON.stringify(job)}</Text>
      </ScrollView>
    </>
  );
};

export default ShowJob;
