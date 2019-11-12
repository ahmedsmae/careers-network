import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Appbar, Card, Button, FAB, Divider } from 'react-native-paper';
import { OutlinedInput } from '../../../components';

import { selectCurrentEmployee } from '../../../redux/current-user/current-user.selectors';

import Interests from './interests.component';

const EmployeeEmployeeInterests = ({ navigation, currentEmployee }) => {
  const [addInterest, setAddInterest] = useState(false);
  const [interest, setInterest] = useState('');
  const [award, setAward] = useState('');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your Interests' />
        <Appbar.Action
          icon={addInterest ? 'close' : 'add'}
          onPress={() => setAddInterest(!addInterest)}
        />
      </Appbar.Header>

      {addInterest && (
        <>
          <Card style={{ margin: 10 }}>
            <Card.Title
              title='Add Interest'
              subtitle='type new interest and achieved awards (if any)'
            />
            <Card.Content>
              <OutlinedInput
                autoCapitalize='words'
                label='Interest'
                value={interest}
                onChange={({ value }) => setInterest(value)}
                required='You should type an interest'
              />

              <OutlinedInput
                numberOfLines={2}
                multiline
                autoCapitalize='sentences'
                label='Award'
                value={award}
                onChange={({ value }) => setAward(value)}
              />
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button mode='outlined' onPress={() => {}}>
                Add Interest
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <Interests interests={currentEmployee.interests} onLongPress={() => {}} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const EmployerEmployeeInterests = ({ navigation }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee Interests' />
      </Appbar.Header>

      <Interests interests={employee.interests} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({});

export const EmployeeEmployeeInterestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeInterests);

export const EmployerEmployeeInterestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeInterests);
