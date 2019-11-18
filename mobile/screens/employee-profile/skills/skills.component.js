import React from 'react';
import { View, Platform } from 'react-native';
import { Paragraph, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Skills = ({ skills, levelsList, onSkillLongPress }) => {
  // const sks = [
  //   { _id: '0', skill: 'Singing', level: 'Intermediate' },
  //   { _id: '1', skill: 'Drawing', level: 'Expert' }
  // ];

  return (
    <>
      {skills.map(({ _id, skill, level }) => (
        <Card
          key={_id}
          style={{ margin: 10 }}
          onLongPress={onSkillLongPress && onSkillLongPress.bind(this, _id)}
        >
          <Card.Title title={skill} />
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              {levelsList.map((_, i) => (
                <Ionicons
                  key={i}
                  name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
                  color={levelsList.indexOf(level) < i ? 'lightgrey' : 'orange'}
                  size={24}
                />
              ))}
            </View>

            <Paragraph>{level}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default Skills;
