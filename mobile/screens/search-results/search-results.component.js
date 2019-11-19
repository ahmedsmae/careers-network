import React from 'react';
import { FlatList } from 'react-native';
import { SorryParagraph, EmployeeJobCard } from '../../components';

import styles from './search-results.styles';

const SearchResults = ({ searchJobs, onJobSelect }) => {
  if (searchJobs.length === 0) {
    return (
      <SorryParagraph
        title="There is no results for your search"
        subtitle="Try again with different position or location"
        caption="Good Luck!"
      />
    );
  }

  return (
    <FlatList
      style={styles.screen}
      keyExtractor={(item, index) => item._id}
      data={searchJobs}
      renderItem={({ item }) => (
        <EmployeeJobCard job={item} onPress={onJobSelect.bind(this, item)} />
      )}
    />
  );
};

export default SearchResults;
