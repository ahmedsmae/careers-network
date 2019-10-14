import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';

import { selectApplicationByJobId } from '../../redux/applications/applications.selectors';
import { createNewApplicationStart } from '../../redux/applications/applications.actions';

import ShowJob from './show-job.component';

import styles from './show-job.styles';

const EmployeeShowJob = ({
  navigation,
  getApplicationByJobId,
  createNewApplicationStart
}) => {
  const job = navigation.getParam('job');
  const application = getApplicationByJobId(job._id);

  const generateLabel = () => {
    if (application) {
      if (job.questions.length > 0) {
        return 'Edit Application';
      } else {
        return 'Already Applied';
      }
    } else {
      return 'Apply';
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Show Job' />
      </Appbar.Header>

      <ShowJob job={job} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        label={generateLabel()}
        icon='edit'
        color='white'
        onPress={() => {
          if (job.questions.length > 0) {
            navigation.navigate('EditApplication', { job, application });
          } else {
            createNewApplicationStart({ job_id: job._id });
          }
        }}
        disabled={generateLabel() === 'Already Applied'}
      />
    </>
  );
};

const EmployerShowJob = ({ navigation }) => {
  const job = navigation.getParam('job');
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Show Job' />
        <Appbar.Action
          icon='edit'
          onPress={() => navigation.navigate('EditJob', { job })}
        />
      </Appbar.Header>

      <ShowJob job={job} />
    </>
  );
};

const NoAuthShowJob = ({ navigation }) => {
  const job = navigation.getParam('job');
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Show Job' />
      </Appbar.Header>

      <ShowJob job={job} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        label='Apply'
        icon='edit'
        color='white'
        // open email with appling_email from the job
        onPress={() => {}}
      />
    </>
  );
};

const mapStateToProps = state => ({
  getApplicationByJobId: jobId => selectApplicationByJobId(jobId)(state)
});

const mapDispatchToProps = dispatch => ({
  createNewApplicationStart: appData =>
    dispatch(createNewApplicationStart(appData))
});

export const EmployeeShowJobContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeShowJob);

export const EmployerShowJobContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerShowJob);

export const NoAuthShowJobContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoAuthShowJob);
