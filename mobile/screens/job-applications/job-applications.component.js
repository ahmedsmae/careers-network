import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  Checkbox,
  Divider
} from 'react-native-paper';

import { selectJobApplications } from '../../redux/applications/applications.selectors';

import ApplicationCard from './application-card.component';

import { QUESTION_TYPES } from '../../utils/types';

import styles from './job-applications.styles';

const JobApplications = ({ navigation, jobApplications }) => {
  const job = navigation.getParam('job');

  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const [_, forceUpdate] = useState({});

  const [filterQuery, setFilterQuery] = useState(
    job.questions.map(({ _id }) => ({
      questionId: _id,
      answerIds: []
    }))
  );

  const [filteredList, setFilteredList] = useState(null);

  // building a single [contains all questionIds and all answerIds]
  const getFilteredListAnswersQuestionsArray = () => {
    let list = [];
    for (const filterAnswer of filterQuery) {
      const qid = filterAnswer.questionId;
      list = [...list, ...filterAnswer.answerIds, qid];
    }
    return list;
  };

  // building a single [contains all question_ids and all answer_ids of this application]
  const getApplicationAnswersQuestionsList = app => {
    let list = [];
    for (const answer of app.answers) {
      const qid = answer.question_id;
      list = [...list, ...answer.answer_ids, qid];
    }
    return list;
  };

  const filterList = () => {
    let list = [];
    for (const app of jobApplications) {
      if (
        // getFilteredListAnswersQuestionsArray().every(i =>
        //   getApplicationAnswersQuestionsList(app).includes(i)
        // )
        // &&

        // all application question_ids and answer_ids included in the filtered list
        getApplicationAnswersQuestionsList(app).every(i =>
          getFilteredListAnswersQuestionsArray().includes(i)
        )
      ) {
        list.push(app);
      }
    }
    setFilteredList(list);
  };

  const couldBeFiltered = () => {
    if (job.questions.length === 0) {
      return false;
    }

    for (const question of job.questions) {
      if (question.question_type !== QUESTION_TYPES.TYPE_GIVE_AN_ANSWER) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Job Applications' />
        {couldBeFiltered() && (
          <Appbar.Action
            icon='filter-list'
            onPress={() => setShowFilterDialog(true)}
          />
        )}
      </Appbar.Header>

      <Portal>
        <Dialog
          style={{ maxHeight: '80%' }}
          visible={showFilterDialog}
          onDismiss={() => setShowFilterDialog(false)}
        >
          <Dialog.Title>Filter Applications</Dialog.Title>

          <Dialog.Content>
            <ScrollView>
              {job.questions.map(
                (
                  { _id, question_type, question_text, answer_options },
                  index
                ) =>
                  question_type !== QUESTION_TYPES.TYPE_GIVE_AN_ANSWER && (
                    <View key={_id}>
                      <Text style={{ fontSize: 18 }}>{question_text}</Text>
                      {question_type === QUESTION_TYPES.TYPE_MCQ && (
                        <RadioButton.Group
                          onValueChange={value => {
                            const newFilterQuery = filterQuery;
                            newFilterQuery[index].answerIds[0] = value;
                            setFilterQuery(newFilterQuery);
                            forceUpdate({});
                          }}
                          value={filterQuery[index].answerIds[0]}
                        >
                          {answer_options.map((option, i) => (
                            <View
                              key={i}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                              }}
                            >
                              <RadioButton
                                style={{ margin: 10 }}
                                value={answer_options[i]._id}
                              />
                              <Text style={{ fontSize: 16 }}>
                                {option.answer_text}
                              </Text>
                            </View>
                          ))}
                        </RadioButton.Group>
                      )}

                      {question_type === QUESTION_TYPES.TYPE_CHOOSE_MULTIPLE &&
                        answer_options.map((option, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <Checkbox
                              style={{ margin: 10 }}
                              status={
                                filterQuery[index].answerIds.includes(
                                  option._id
                                )
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() => {
                                const newFilterQuery = filterQuery;

                                let answerIds = filterQuery[index].answerIds;

                                if (answerIds.includes(option._id)) {
                                  answerIds = answerIds.filter(
                                    id => id !== option._id
                                  );
                                } else {
                                  answerIds.push(option._id);
                                }

                                newFilterQuery[index].answerIds = answerIds;
                                setFilterQuery(newFilterQuery);
                                forceUpdate({});
                              }}
                            />
                            <Text style={{ fontSize: 16 }}>
                              {option.answer_text}
                            </Text>
                          </View>
                        ))}
                      {index < job.questions.length - 2 && (
                        <Divider style={{ marginVertical: 10 }} />
                      )}
                    </View>
                  )
              )}
            </ScrollView>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              style={{ marginRight: 10 }}
              icon='filter-list'
              onPress={() => {
                filterList();
                setShowFilterDialog(false);
              }}
            >
              Filter
            </Button>

            <Button
              style={{ marginLeft: 10 }}
              onPress={() => {
                setFilteredList(null);
                setShowFilterDialog(false);
                setFilterQuery(
                  job.questions.map(({ _id }) => ({
                    questionId: _id,
                    answerIds: []
                  }))
                );
              }}
            >
              Clear Filter
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FlatList
        data={filteredList || jobApplications}
        keyExtractor={(item, _) => item._id}
        renderItem={({ item }) => (
          <ApplicationCard
            application={item}
            job={job}
            onPress={() =>
              navigation.navigate('EmployerEmployeeProfile', {
                employee: item.owner
              })
            }
          />
        )}
      />
    </>
  );
};

const mapStateToProps = state => ({
  jobApplications: selectJobApplications(state)
});

export default connect(mapStateToProps)(JobApplications);
