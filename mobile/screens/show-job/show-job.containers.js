import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import {
  Appbar,
  FAB,
  Provider,
  Portal,
  Card,
  Title,
  Paragraph
} from 'react-native-paper';

import { selectApplicationByJobId } from '../../redux/applications/applications.selectors';
import {
  selectIsJobSaved,
  selectSavedIdByJobId
} from '../../redux/saved/saved.selectors';
import {
  createNewApplicationStart,
  getAllJobApplicationsStart
} from '../../redux/applications/applications.actions';
import { saveJobStart, unsaveJobStart } from '../../redux/saved/saved.actions';
import {
  selectLoading,
  selectErrorMessage
} from '../../redux/jobs/jobs.selectors';
import { deleteJobStart } from '../../redux/jobs/jobs.actions';

import ShowJob from './show-job.component';
import UserImage from '../../components/user-image/user-image.component';

import Colors from '../../constants/colors';
import URLS from '../../redux/utils/urls';

import styles from './show-job.styles';

const EmployeeShowJob = ({
  navigation,
  getApplicationByJobId,
  createNewApplicationStart,
  isJobSaved,
  getSavedIdByJobId,
  saveJobStart,
  unsaveJobStart
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
        {isJobSaved(job._id) ? (
          <Appbar.Action
            icon='star'
            color='yellow'
            onPress={() => unsaveJobStart(getSavedIdByJobId(job._id))}
          />
        ) : (
          <Appbar.Action
            icon='star-border'
            onPress={() => saveJobStart(job._id)}
          />
        )}
      </Appbar.Header>

      {job.owner._id && (
        <Card
          style={{ margin: 10 }}
          onPress={() =>
            navigation.navigate('EmployerProfile', { employer: job.owner })
          }
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          >
            <UserImage
              small
              style={{ marginRight: 10 }}
              source={`${URLS.SERVE_EMPLOYER_AVATAR}/${job.owner._id}`}
            />

            <View>
              <Title>{job.owner.name}</Title>
              <Paragraph>{job.owner.speciality}</Paragraph>
            </View>
          </View>
        </Card>
      )}

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
            createNewApplicationStart({ job: job._id });
          }
        }}
        disabled={generateLabel() === 'Already Applied'}
      />
    </>
  );
};

const EmployerShowJob = ({
  navigation,
  getAllJobApplicationsStart,
  deleteJobStart,
  loading,
  errorMessage
}) => {
  const job = navigation.getParam('job');

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Show Job' />
        <Appbar.Action
          icon='delete'
          onPress={() => {
            Alert.alert(
              'Delete Job',
              'Are you sure you want to delete this job ?',
              [
                {
                  text: 'DELETE',
                  onPress: () => deleteJobStart(job._id)
                },
                { text: 'CANCEL' }
              ]
            );

            if (!loading && errorMessage.length === 0) {
              navigation.goBack();
            }
          }}
        />
      </Appbar.Header>

      <Provider>
        <ShowJob job={job} />

        <Portal>
          <FAB.Group
            open={showOptions}
            icon='settings'
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color='white'
            actions={[
              {
                icon: 'edit',
                label: 'Edit Job',
                onPress: () => navigation.navigate('EditJob', { job })
              },
              {
                icon: 'list',
                label: 'Show Applications',
                onPress: () => {
                  getAllJobApplicationsStart(job._id);
                  navigation.navigate('JobApplications', { job });
                }
              }
            ]}
            onStateChange={({ open }) => setShowOptions(open)}
            onPress={() => {
              if (showOptions) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
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

      {job.owner._id && (
        <Card
          style={{ margin: 10 }}
          onPress={() =>
            navigation.navigate('NoAuthEmployer', { employer: job.owner })
          }
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          >
            <UserImage
              small
              style={{ marginRight: 10 }}
              source={`${URLS.SERVE_EMPLOYER_AVATAR}/${job.owner._id}`}
            />

            <View>
              <Title>{job.owner.name}</Title>
              <Paragraph>{job.owner.speciality}</Paragraph>
            </View>
          </View>
        </Card>
      )}

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
  getApplicationByJobId: jobId => selectApplicationByJobId(jobId)(state),
  isJobSaved: jobId => selectIsJobSaved(jobId)(state),
  getSavedIdByJobId: jobId => selectSavedIdByJobId(jobId)(state),
  loading: selectLoading(state),
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = dispatch => ({
  createNewApplicationStart: appData =>
    dispatch(createNewApplicationStart(appData)),
  getAllJobApplicationsStart: jobId =>
    dispatch(getAllJobApplicationsStart(jobId)),
  saveJobStart: jobId => dispatch(saveJobStart(jobId)),
  unsaveJobStart: saveId => dispatch(unsaveJobStart(saveId)),
  deleteJobStart: jobId => dispatch(deleteJobStart(jobId))
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
