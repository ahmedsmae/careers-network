import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { selectCurrentEmployee } from '../../redux/current-user/current-user.selectors';
import {
  createNewApplicationStart,
  updateExistingApplicationStart,
  deleteApplicationStart
} from '../../redux/applications/applications.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import QuestionCard from './question-card.component';

import styles from './edit-application.styles';

const EditApplication = ({
  navigation,
  createNewApplicationStart,
  updateExistingApplicationStart,
  deleteApplicationStart,
  showPopupApi
}) => {
  const job = navigation.getParam('job');
  const application = navigation.getParam('application');
  const job_id = job._id;
  const questions = job.questions;

  const getNewAnswersTemplate = () => {
    let answers = [];
    if (questions && questions.length > 0) {
      for (const q of questions) {
        answers.push({
          question_id: '',
          answer_ids: [],
          answer_text: ''
        });
      }
    }
    return answers;
  };

  const [answers, setAnswers] = useState(
    application ? application.answers : getNewAnswersTemplate()
  );

  const [disabled, setDisabled] = useState(false);

  const _handleDelete = () => {
    setDisabled(true);
    Alert.alert(
      'Delete Application',
      'Are you sure you want to delete this application ?',
      [
        {
          text: 'DELETE',
          onPress: () =>
            deleteApplicationStart(application._id, err => {
              if (err) {
                showPopupApi({
                  type: 'danger',
                  message:
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                      ? err.response.data.errors.map(err => err.msg).toString()
                      : 'Please check your connection'
                });
                setDisabled(false);
                return console.log(err);
              }

              showPopupApi({
                message: 'Application deleted successfully',
                duration: 600
              });
              setDisabled(false);
              setAnswers(
                application ? application.answers : getNewAnswersTemplate()
              );
              navigation.goBack();
            })
        },
        { text: 'CANCEL' }
      ]
    );
  };

  const _handleSave = () => {
    setDisabled(true);
    if (application) {
      // edit application
      const newApplication = { ...application, answers };
      updateExistingApplicationStart(newApplication, err => {
        if (err) {
          showPopupApi({
            type: 'danger',
            message:
              err.response && err.response.data && err.response.data.errors
                ? err.response.data.errors.map(err => err.msg).toString()
                : 'Please check your connection'
          });
          setDisabled(false);
          return console.log(err);
        }

        showPopupApi({
          message: 'Application edited successfully',
          duration: 600
        });
        setDisabled(false);
        setAnswers(application ? application.answers : getNewAnswersTemplate());
        navigation.goBack();
      });
    } else {
      // create new application
      const newApplication = { job: job_id, answers };
      createNewApplicationStart(newApplication, err => {
        if (err) {
          showPopupApi({
            type: 'danger',
            message:
              err.response && err.response.data && err.response.data.errors
                ? err.response.data.errors.map(err => err.msg).toString()
                : 'Please check your connection'
          });
          setDisabled(false);
          return console.log(err);
        }

        showPopupApi({
          message: 'Application created successfully',
          duration: 600
        });
        setDisabled(false);
        setAnswers(application ? application.answers : getNewAnswersTemplate());
        navigation.goBack();
      });
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title="Edit Application" />
          <Appbar.Action icon="delete" onPress={_handleDelete} />
        </Appbar.Header>
        <Text>There is no questions attached to this job</Text>
      </>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Edit Application" />
        <Appbar.Action icon="delete" onPress={_handleDelete} />
        <Appbar.Action icon="save" disabled={disabled} onPress={_handleSave} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView style={{ flex: 1 }}>
          {questions.map((q, i) => (
            <QuestionCard
              key={i}
              index={i}
              question={q}
              initAnswer={answers[i]}
              onAnswer={(answer, index) => {
                const newAnswers = answers;
                newAnswers[index] = answer;
                setAnswers(newAnswers);
              }}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({
  createNewApplicationStart: (appData, callback) =>
    dispatch(createNewApplicationStart(appData, callback)),
  updateExistingApplicationStart: (appData, callback) =>
    dispatch(updateExistingApplicationStart(appData, callback)),
  deleteApplicationStart: (appId, callback) =>
    dispatch(deleteApplicationStart(appId, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditApplication);
