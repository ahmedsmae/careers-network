import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { View, Text, FlatList } from "react-native";
import { Appbar } from "react-native-paper";

import { selectHomeJobs } from "../../redux/jobs/jobs.selectors";
import { getHomeJobsStart } from "../../redux/jobs/jobs.actions";

import JobCard from "./job-card.component";

const Home = ({ navigation, homeJobs, getHomeJobsStart }) => {
  useEffect(() => {
    getHomeJobsStart();
  }, [getHomeJobsStart]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Home Jobs" />
        <Appbar.Action
          icon="settings"
          onPress={() => navigation.navigate("HomeSettings")}
        />
      </Appbar.Header>

      <FlatList
        data={homeJobs}
        keyExtractor={(item, _) => item._id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("EmployeeShowJob", { job })}
          />
        )}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  homeJobs: selectHomeJobs
});

const mapDispatchToProps = dispatch => ({
  getHomeJobsStart: () => dispatch(getHomeJobsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
