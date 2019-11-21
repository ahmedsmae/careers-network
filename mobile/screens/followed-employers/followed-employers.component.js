import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SorryParagraph, EmployerCard } from '../../components';

import { selectFollowedEmployers } from '../../redux/follows/follows.selectors';

const FollowedEmployers = ({ navigation, followedEmployers }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Followed Employers" />
      </Appbar.Header>

      {followedEmployers.length === 0 ? (
        <SorryParagraph title="You are not following any employers yet" />
      ) : (
        <FlatList
          data={followedEmployers}
          keyExtractor={item => item._id}
          renderItem={({ item: { employer } }) => (
            <EmployerCard
              employer={employer}
              onPress={() =>
                navigation.navigate('EmployerProfile', { employer })
              }
            />
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  followedEmployers: selectFollowedEmployers
});

export default connect(mapStateToProps)(FollowedEmployers);
