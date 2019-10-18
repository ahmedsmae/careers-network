import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { View, ScrollView, Alert } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { selectCurrentEmployee } from '../../redux/current-user/current-user.selectors';
import {
  selectLoading,
  selectErrorMessage
} from '../../redux/applications/applications.selectors';
import {
  createNewApplicationStart,
  updateExistingApplicationStart,
  deleteApplicationStart
} from '../../redux/applications/applications.actions';

import QuestionCard from './question-card.component';

import styles from './edit-application.styles';

const EditApplication = ({
  navigation,
  createNewApplicationStart,
  updateExistingApplicationStart,
  deleteApplicationStart,
  loading,
  errorMessage
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

  const _handleDelete = () => {
    Alert.alert(
      'Delete Application',
      'Are you sure you want to delete this application ?',
      [
        {
          text: 'DELETE',
          onPress: () => deleteApplicationStart(application._id)
        },
        { text: 'CANCEL' }
      ]
    );

    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  const _handleSave = () => {
    if (application) {
      // edit application
      const newApplication = { ...application, answers };
      updateExistingApplicationStart(newApplication);
    } else {
      // create new application
      const newApplication = { job: job_id, answers };
      createNewApplicationStart(newApplication);
    }
    if (!loading && errorMessage.length === 0) {
      setAnswers(application ? application.answers : getNewAnswersTemplate());
      navigation.goBack();
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action
            icon='menu'
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title='Edit Application' />
          <Appbar.Action icon='delete' onPress={_handleDelete} />
        </Appbar.Header>
        <Text>There is no questions attached to this job</Text>
      </>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Edit Application' />
        <Appbar.Action icon='delete' onPress={_handleDelete} />
        <Appbar.Action icon='save' onPress={_handleSave} />
      </Appbar.Header>

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
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee,
  loading: selectLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  createNewApplicationStart: appData =>
    dispatch(createNewApplicationStart(appData)),
  updateExistingApplicationStart: appData =>
    dispatch(updateExistingApplicationStart(appData)),
  deleteApplicationStart: appId => dispatch(deleteApplicationStart(appId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditApplication);
