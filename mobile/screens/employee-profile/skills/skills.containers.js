import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Picker, ScrollView, Alert } from 'react-native';
import { Appbar, Card, Button, FAB, Divider } from 'react-native-paper';
import { OutlinedInput } from '../../../components';

import { selectCurrentEmployee } from '../../../redux/current-user/current-user.selectors';
import { selectSkillLevels } from '../../../redux/constants/constants.selectors';

import {
  addEmployeeSkillStart,
  deleteEmployeeSkillStart
} from '../../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../../redux/api-utilities/api-utilities.actions';

import Skills from './skills.component';

const EmployeeEmployeeSkills = ({
  navigation,
  currentEmployee,
  levelsList,
  addEmployeeSkillStart,
  deleteEmployeeSkillStart,
  showPopupApi
}) => {
  const [addSkill, setAddSkill] = useState(false);
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState(levelsList[1]);
  const [disabled, setDisabled] = useState(false);

  const _handleSubmit = () => {
    setDisabled(true);
    addEmployeeSkillStart({ skill, level }, err => {
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
        message: 'Skill added successfully',
        duration: 600
      });
      setSkill('');
      setLevel(levelsList[1]);
      setAddSkill(false);
      setDisabled(false);
    });
  };

  const _handleDelete = skillid => {
    console.log(skillid);

    deleteEmployeeSkillStart(skillid, err => {
      if (err) {
        showPopupApi({
          type: 'danger',
          message:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : 'Please check your connection'
        });
        return console.log(err);
      }

      showPopupApi({
        message: 'Skill deleted successfully',
        duration: 600
      });
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Skills" />
        <Appbar.Action
          icon={addSkill ? 'close' : 'add'}
          onPress={() => setAddSkill(!addSkill)}
        />
      </Appbar.Header>

      {addSkill && (
        <>
          <Card style={{ margin: 10 }}>
            <Card.Title title="Add Skill" subtitle="type new skill" />
            <Card.Content>
              <OutlinedInput
                label="Skill"
                value={skill}
                onChange={({ value }) => setSkill(value)}
                required="You should type a skill"
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
              <Button
                mode="outlined"
                disabled={disabled}
                onPress={_handleSubmit}
              >
                Add Skill
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <ScrollView>
        <Skills
          skills={currentEmployee.skills}
          levelsList={levelsList}
          onSkillLongPress={skillid =>
            Alert.alert(
              'Delete Skill',
              'Are you sure you want to delete this skill ?',
              [
                { text: 'Yes', onPress: _handleDelete.bind(this, skillid) },
                { text: 'Cancel' }
              ]
            )
          }
        />
      </ScrollView>

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="list"
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
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Languages" />
      </Appbar.Header>

      <Skills skills={employee.skills} levelsList={levelsList} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="list"
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  levelsList: selectSkillLevels,
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({
  addEmployeeSkillStart: (skillData, callback) =>
    dispatch(addEmployeeSkillStart(skillData, callback)),
  deleteEmployeeSkillStart: (skillid, callback) =>
    dispatch(deleteEmployeeSkillStart(skillid, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export const EmployeeEmployeeSkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeSkills);

export const EmployerEmployeeSkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeSkills);
