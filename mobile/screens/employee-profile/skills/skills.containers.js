import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Picker } from 'react-native';
import { Appbar, Card, Button, FAB, Divider } from 'react-native-paper';
import { OutlinedInput } from '../../../components';

import { selectCurrentEmployee } from '../../../redux/current-user/current-user.selectors';
import { selectSkillLevels } from '../../../redux/constants/constants.selectors';

import Skills from './skills.component';

const EmployeeEmployeeSkills = ({
  navigation,
  currentEmployee,
  levelsList
}) => {
  const [addSkill, setAddSkill] = useState(false);
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState(levelsList[1]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your Skills' />
        <Appbar.Action
          icon={addSkill ? 'close' : 'add'}
          onPress={() => setAddSkill(!addSkill)}
        />
      </Appbar.Header>

      {addSkill && (
        <>
          <Card style={{ margin: 10 }}>
            <Card.Title title='Add Skill' subtitle='type new skill' />
            <Card.Content>
              <OutlinedInput
                label='Skill'
                value={skill}
                onChange={({ value }) => setSkill(value)}
                required='You should type a skill'
              />

              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  marginTop: 5,
                  borderRadius: 5,
                  height: 60,
                  justifyContent: 'center'
                }}
              >
                <Picker
                  selectedValue={level}
                  onValueChange={lev => setLevel(lev)}
                >
                  {levelsList.map((level, index) => (
                    <Picker.Item key={index} label={level} value={level} />
                  ))}
                </Picker>
              </View>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button mode='outlined' onPress={() => {}}>
                Add Skill
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <Skills
        skills={currentEmployee.skills}
        levelsList={levelsList}
        onLongPress={() => {}}
      />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const EmployerEmployeeSkills = ({ navigation }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee Languages' />
      </Appbar.Header>

      <Skills skills={employee.skills} levelsList={levelsList} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  levelsList: selectSkillLevels,
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({});

export const EmployeeEmployeeSkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeSkills);

export const EmployerEmployeeSkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeSkills);
