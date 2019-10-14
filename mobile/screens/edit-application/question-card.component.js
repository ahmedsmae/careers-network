import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Card,
  TextInput,
  Text,
  RadioButton,
  Checkbox
} from 'react-native-paper';

import { QUESTION_TYPES } from '../../utils/types';

const QuestionCard = ({ question, initAnswer, index, onAnswer }) => {
  const { _id, question_type, question_text, answer_options } = question;

  const [currentAnswer, setCurrentAnswer] = useState(
    initAnswer
      ? initAnswer
      : { question_id: _id, answer_ids: [], answer_text: '' }
  );

  const { question_id, answer_ids, answer_text } = currentAnswer;

  if (question_type === QUESTION_TYPES.TYPE_MCQ) {
    return (
      <Card key={index} style={{ elevation: 5, margin: 10, padding: 15 }}>
        <Text style={{ fontSize: 18 }}>{question_text}</Text>
        <RadioButton.Group
          onValueChange={value => {
            setCurrentAnswer(prev => ({ ...prev, answer_ids: [value] }));
            onAnswer(
              { ...initAnswer, answer_ids: [value], question_id: _id },
              index
            );
          }}
          value={answer_ids[0]}
        >
          {answer_options.map((option, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <RadioButton
                style={{ margin: 10 }}
                value={answer_options[i]._id}
              />
              <Text style={{ fontSize: 16 }}>{option.answer_text}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </Card>
    );
  }

  if (question_type === QUESTION_TYPES.TYPE_CHOOSE_MULTIPLE) {
    return (
      <Card key={index} style={{ elevation: 5, margin: 10, padding: 15 }}>
        <Text style={{ fontSize: 18 }}>{question_text}</Text>
        {answer_options.map((option, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              style={{ margin: 10 }}
              status={answer_ids.includes(option._id) ? 'checked' : 'unchecked'}
              onPress={() => {
                setCurrentAnswer(prev => ({
                  ...prev,
                  answer_ids: answer_ids.includes(option._id)
                    ? answer_ids.filter(id => id !== option._id)
                    : answer_ids.concat(option._id)
                }));
                onAnswer(
                  {
                    ...initAnswer,
                    answer_ids: answer_ids.includes(option._id)
                      ? answer_ids.filter(id => id !== option._id)
                      : answer_ids.concat(option._id),
                    question_id: _id
                  },
                  index
                );
              }}
            />
            <Text style={{ fontSize: 16 }}>{option.answer_text}</Text>
          </View>
        ))}
      </Card>
    );
  }

  if (question_type === QUESTION_TYPES.TYPE_GIVE_AN_ANSWER) {
    return (
      <Card key={index} style={{ elevation: 5, margin: 10, padding: 15 }}>
        <Text style={{ fontSize: 18 }}>{question_text}</Text>
        <TextInput
          mode='outlined'
          label='Your Answer'
          multiline
          autoCapitalize='sentences'
          value={answer_text}
          onChangeText={text => {
            setCurrentAnswer(prev => ({ ...prev, answer_text: text }));
            onAnswer(
              { ...initAnswer, answer_text: text, question_id: _id },
              index
            );
          }}
        />
      </Card>
    );
  }
};

export default QuestionCard;
