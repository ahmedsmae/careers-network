import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Appbar, FAB, Provider, Portal } from 'react-native-paper';
import { EmployerCard } from '../../components';

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
import { deleteJobStart } from '../../redux/jobs/jobs.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import ShowJob from './show-job.component';

import Colors from '../../constants/colors';

import styles from './show-job.styles';

const EmployeeShowJob = ({
  navigation,
  getApplicationByJobId,
  createNewApplicationStart,
  isJobSaved,
  getSavedIdByJobId,
  saveJobStart,
  unsaveJobStart,
  showPopupApi
}) => {
  const job = navigation.getParam('job');
  const application = getApplicationByJobId(job._id);

  const [disabled, setDisabled] = useState(false);

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
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Show Job" />
        {isJobSaved(job._id) ? (
          <Appbar.Action
            disabled={disabled}
            icon="star"
            color="yellow"
            onPress={() =>
              unsaveJobStart(getSavedIdByJobId(job._id), err => {
                if (err) {
                  showPopupApi({
                    type: 'danger',
                    message:
                      err.response &&
                      err.response.data &&
                      err.response.data.errors
                        ? err.response.data.errors
                            .map(err => err.msg)
                            .toString()
                        : 'Please check your connection'
                  });
                  setDisabled(false);
                  return console.log(err);
                }

                showPopupApi({
                  message: 'Jon unsaved successfully',
                  duration: 600
                });
                setDisabled(false);
              })
            }
          />
        ) : (
          <Appbar.Action
            disabled={disabled}
            icon="star-border"
            onPress={() =>
              saveJobStart(job._id, err => {
                if (err) {
                  showPopupApi({
                    type: 'danger',
                    message:
                      err.response &&
                      err.response.data &&
                      err.response.data.errors
                        ? err.response.data.errors
                            .map(err => err.msg)
                            .toString()
                        : 'Please check your connection'
                  });
                  setDisabled(false);
                  return console.log(err);
                }

                showPopupApi({
                  message: 'Job saved successfully',
                  duration: 600
                });
                setDisabled(false);
              })
            }
          />
        )}
      </Appbar.Header>

      {job.owner._id && (
        <EmployerCard
          employer={job.owner}
          onPress={() =>
            navigation.navigate('EmployerProfile', { employer: job.owner })
          }
        />
      )}

      <ShowJob job={job} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        label={generateLabel()}
        icon="edit"
        color="white"
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
  showPopupApi
}) => {
  const job = navigation.getParam('job');

  const [showOptions, setShowOptions] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Show Job" />
        <Appbar.Action
          disabled={disabled}
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Job',
              'Are you sure you want to delete this job ?',
              [
                {
                  text: 'DELETE',
                  onPress: () =>
                    deleteJobStart(job._id, err => {
                      if (err) {
                        showPopupApi({
                          type: 'danger',
                          message:
                            err.response &&
                            err.response.data &&
                            err.response.data.errors
                              ? err.response.data.errors
                                  .map(err => err.msg)
                                  .toString()
                              : 'Please check your connection'
                        });
                        setDisabled(false);
                        return console.log(err);
                      }

                      showPopupApi({
                        message: 'Job deleted successfully',
                        duration: 600
                      });
                      setDisabled(false);
                      navigation.goBack();
                    })
                },
                { text: 'CANCEL' }
              ]
            );
          }}
        />
      </Appbar.Header>

      <Provider>
        <ShowJob job={job} />

        <Portal>
          <FAB.Group
            open={showOptions}
            icon="settings"
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color="white"
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
        <Appbar.Content title="Show Job" />
      </Appbar.Header>

      {job.owner._id && (
        <EmployerCard
          employer={job.owner}
          onPress={() =>
            navigation.navigate('NoAuthEmployer', { employer: job.owner })
          }
        />
      )}

      <ShowJob job={job} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        label="Apply"
        icon="edit"
        color="white"
        // open email with appling_email from the job
        onPress={() => {}}
      />
    </>
  );
};

const mapStateToProps = state => ({
  getApplicationByJobId: jobId => selectApplicationByJobId(jobId)(state),
  isJobSaved: jobId => selectIsJobSaved(jobId)(state),
  getSavedIdByJobId: jobId => selectSavedIdByJobId(jobId)(state)
});

const mapDispatchToProps = dispatch => ({
  createNewApplicationStart: (appData, callback) =>
    dispatch(createNewApplicationStart(appData, callback)),
  getAllJobApplicationsStart: (jobId, callback) =>
    dispatch(getAllJobApplicationsStart(jobId, callback)),
  saveJobStart: (jobId, callback) => dispatch(saveJobStart(jobId, callback)),
  unsaveJobStart: (saveId, callback) =>
    dispatch(unsaveJobStart(saveId, callback)),
  deleteJobStart: (jobId, callback) =>
    dispatch(deleteJobStart(jobId, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
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
