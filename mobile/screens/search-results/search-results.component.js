import React from 'react';
import { FlatList } from 'react-native';

import JobCard from '../../components/job-card/job-card.component';

import styles from './search-results.styles';

const SearchResults = ({ searchJobs, onJobSelect }) => {
  return (
    <FlatList
      style={styles.screen}
      keyExtractor={(item, index) => item._id}
      data={searchJobs}
      renderItem={({ item }) => (
        <JobCard job={item} onPress={onJobSelect.bind(this, item)} />
      )}
    />
  );
};

export default SearchResults;
