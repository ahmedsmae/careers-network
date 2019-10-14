import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  TextInput,
  Text,
  Caption,
  IconButton,
  Chip,
  Colors,
  RadioButton,
  Button
} from 'react-native-paper';

import AppColors from '../../constants/colors';
import { QUESTION_TYPES } from '../../utils/types';

const ManageQuestions = ({ questions, onAddQuestion, onRemoveQuestion }) => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question_type: QUESTION_TYPES.TYPE_MCQ,
    question_text: '',
    answer_options: []
  });

  const { question_type, question_text, answer_options } = newQuestion;
  const [newAnswer, setNewAnswer] = useState('');

  const isQuestionReady = () => {
    if (question_text.trim().length < 1) {
      return false;
    }

    if (
      question_type !== QUESTION_TYPES.TYPE_GIVE_AN_ANSWER &&
      answer_options.length < 2
    ) {
      return false;
    }

    return true;
  };

  const _handleAddQuestion = () => {
    onAddQuestion(newQuestion);
    setNewQuestion({
      question_type: QUESTION_TYPES.TYPE_MCQ,
      question_text: '',
      answer_options: []
    });
    setShowAddQuestion(false);
  };

  const questionCard = ({ question_text, question_type, answer_options }) => {
    let type;
    if (question_type === QUESTION_TYPES.TYPE_MCQ) type = 'MCQ';
    if (question_type === QUESTION_TYPES.TYPE_CHOOSE_MULTIPLE)
      type = 'Multiple';
    if (question_type === QUESTION_TYPES.TYPE_GIVE_AN_ANSWER) type = 'Answer';

    return (
      <Text
        style={{ flex: 1, fontSize: 16, padding: 10 }}
      >{`${type} - ${question_text} - ${answer_options.length} Answers`}</Text>
    );
  };

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
            Questions
          </Text>
          <Caption style={{ marginLeft: 10 }}>
            Questions will be answered by applicants and will help you filter
            them by there answers
          </Caption>
        </View>

        <IconButton
          style={{ marginRight: 30 }}
          icon='add'
          size={30}
          onPress={() => setShowAddQuestion(true)}
        />
      </View>

      {showAddQuestion && (
        <View
          style={{
            marginVertical: 10,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              margin: 10,
              marginBottom: 0,
              fontSize: 16,
              width: '100%',
              paddingLeft: 10
            }}
          >
            Question Type
          </Text>
          <RadioButton.Group
            onValueChange={value =>
              setNewQuestion(prev => ({ ...prev, question_type: value }))
            }
            value={question_type}
          >
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 0 }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <RadioButton value={QUESTION_TYPES.TYPE_MCQ} />
                <Text style={{ fontSize: 16 }}>MCQ</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 2,
                  alignItems: 'center'
                }}
              >
                <RadioButton value={QUESTION_TYPES.TYPE_CHOOSE_MULTIPLE} />
                <Text style={{ fontSize: 16 }}>Choose Multible</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 2,
                  alignItems: 'center'
                }}
              >
                <RadioButton value={QUESTION_TYPES.TYPE_GIVE_AN_ANSWER} />
                <Text style={{ fontSize: 16 }}>Give Answer</Text>
              </View>
            </View>
          </RadioButton.Group>

          {/* ADD QUESTION */}
          <View style={{ marginHorizontal: 10, width: '100%' }}>
            <TextInput
              style={{ width: '95%', marginHorizontal: 10, height: 60 }}
              mode='outlined'
              autoFocus
              label='Question ?'
              value={question_text}
              onChangeText={text =>
                setNewQuestion(prev => ({ ...prev, question_text: text }))
              }
            />

            {question_type !== QUESTION_TYPES.TYPE_GIVE_AN_ANSWER && (
              <View style={{ width: '95%', marginHorizontal: 10 }}>
                {/* ADD ANSWER */}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <TextInput
                    style={{ flex: 1 }}
                    mode='outlined'
                    label={`Answer Option ${answer_options.length + 1}`}
                    value={newAnswer}
                    onChangeText={setNewAnswer}
                  />
                  {newAnswer.trim().length > 0 && (
                    <IconButton
                      style={{ color: 'green', marginRight: 20 }}
                      icon='check'
                      size={30}
                      color={Colors.green500}
                      onPress={() => {
                        setNewQuestion(prev => ({
                          ...prev,
                          answer_options: answer_options.concat({
                            answer_text: newAnswer
                          })
                        }));
                        setNewAnswer('');
                      }}
                    />
                  )}
                </View>

                {/* DISPLAY ANSWERS */}
                <View style={{ marginVertical: 5 }}>
                  {answer_options.length > 0 && (
                    <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
                      Answers
                    </Text>
                  )}
                  {answer_options.map((answer, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'lightgrey',
                        borderRadius: 5,
                        marginVertical: 5
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 16, padding: 10 }}>
                        {answer.answer_text}
                      </Text>
                      <IconButton
                        style={{ color: 'green', marginRight: 20 }}
                        icon='close'
                        size={30}
                        color={Colors.red500}
                        onPress={() =>
                          setNewQuestion(prev => ({
                            ...prev,
                            answer_options: answer_options.filter(
                              (_, i) => index !== i
                            )
                          }))
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* SUBMIT QUESTION BUTTON */}
          {isQuestionReady() && (
            <Button
              style={{ marginTop: 10 }}
              icon='check'
              mode='contained'
              color={AppColors.ACCENT}
              onPress={_handleAddQuestion}
            >
              Confirm Question
            </Button>
          )}
        </View>
      )}

      {/* DISPLAY QUESTIONS */}

      {questions && questions.length > 0 && (
        <View style={{ marginVertical: 5 }}>
          {/* {answer_options.length > 0 && (
                    <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
                      Answers
                    </Text>
                  )} */}
          {questions.map((question, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: AppColors.ACCENT,
                borderRadius: 5,
                marginVertical: 5,
                marginHorizontal: 10
              }}
            >
              {questionCard(question)}
              <IconButton
                style={{ color: 'green', marginRight: 20 }}
                icon='close'
                size={30}
                color={Colors.red500}
                onPress={onRemoveQuestion.bind(this, index)}
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default ManageQuestions;
