import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Card,
  List,
  Avatar,
  Caption,
  Chip,
  Title,
  Paragraph
} from 'react-native-paper';

import { selectCityNameById } from '../../redux/constants/constants.selectors';

import URLS from '../../redux/utils/urls';
import AppColors from '../../constants/colors';

const ApplicationCard = ({
  application: { owner, answers },
  getCityName,
  onPress,
  job
}) => {
  const { _id, first_name, middle_name, last_name, location_id } = owner;

  const getQuestionText = questionId => {
    for (const q of job.questions) {
      if (q._id === questionId) {
        return q.question_text;
      }
    }
  };

  const getAnswerText = answerId => {
    for (const q of job.questions) {
      for (a of q.answer_options) {
        if (a._id === answerId) {
          return a.answer_text;
        }
      }
    }
  };

  const renderAnswer = ({ _id, answer_ids, question_id, answer_text }) => (
    <Chip
      key={_id}
      style={{
        marginHorizontal: 2,
        backgroundColor: AppColors.ACCENT
      }}
    >
      <Caption>{getQuestionText(question_id)}</Caption>
      <Caption> => </Caption>
      <Caption style={{ color: 'white' }}>
        {answer_text && answer_text.length
          ? answer_text
          : answer_ids.map(id => getAnswerText(id)).join(' | ')}
      </Caption>
    </Chip>
  );

  return (
    <Card style={{ margin: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', margin: 10 }}
        onPress={onPress}
      >
        <Avatar.Image
          size={60}
          style={{ marginRight: 10 }}
          source={{ uri: `${URLS.SERVE_EMPLOYEE_AVATAR}/${_id}` }}
        />

        <View>
          <Title>{`${first_name} ${middle_name} ${last_name}`}</Title>
          <Paragraph>{getCityName(location_id)}</Paragraph>
        </View>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexWrap: 'wrap'
        }}
      >
        {answers.map(renderAnswer)}
      </ScrollView>
    </Card>
  );
};

const mapStateToProps = state => ({
  getCityName: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(ApplicationCard);
