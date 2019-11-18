import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, Alert } from 'react-native';
import { Appbar, Card, Button, FAB, Divider } from 'react-native-paper';
import { OutlinedInput } from '../../../components';

import { selectCurrentEmployee } from '../../../redux/current-user/current-user.selectors';

import {
  addEmployeeInterestStart,
  deleteEmployeeInterestStart
} from '../../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../../redux/api-utilities/api-utilities.actions';

import Interests from './interests.component';

const EmployeeEmployeeInterests = ({
  navigation,
  currentEmployee,
  addEmployeeInterestStart,
  deleteEmployeeInterestStart,
  showPopupApi
}) => {
  const [addInterest, setAddInterest] = useState(false);
  const [interest, setInterest] = useState('');
  const [award, setAward] = useState('');
  const [disabled, setDisabled] = useState(false);

  const _handleSubmit = () => {
    setDisabled(true);
    addEmployeeInterestStart({ interest, award }, err => {
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
        message: 'Interest added successfully',
        duration: 600
      });
      setInterest('');
      setAward('');
      setAddInterest(false);
      setDisabled(false);
    });
  };

  const _handleDelete = interestId => {
    deleteEmployeeInterestStart(interestId, err => {
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
        message: 'Interest deleted successfully',
        duration: 600
      });
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Interests" />
        <Appbar.Action
          icon={addInterest ? 'close' : 'add'}
          onPress={() => setAddInterest(!addInterest)}
        />
      </Appbar.Header>

      {addInterest && (
        <>
          <Card style={{ margin: 10 }}>
            <Card.Title
              title="Add Interest"
              subtitle="type new interest and achieved awards (if any)"
            />
            <Card.Content>
              <OutlinedInput
                autoCapitalize="words"
                label="Interest"
                value={interest}
                onChange={({ value }) => setInterest(value)}
                required="You should type an interest"
              />

              <OutlinedInput
                numberOfLines={2}
                multiline
                autoCapitalize="sentences"
                label="Award"
                value={award}
                onChange={({ value }) => setAward(value)}
              />
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button
                mode="outlined"
                disabled={disabled}
                onPress={_handleSubmit}
              >
                Add Interest
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <ScrollView>
        <Interests
          interests={currentEmployee.interests}
          onInterestLongPress={interestId =>
            Alert.alert(
              'Delete Interest',
              'Are you sure you want to delete this interest ?',
              [
                { text: 'Yes', onPress: _handleDelete.bind(this, interestId) },
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

const EmployerEmployeeInterests = ({ navigation }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Interests" />
      </Appbar.Header>

      <Interests interests={employee.interests} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="list"
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({
  addEmployeeInterestStart: (interestData, callback) =>
    dispatch(addEmployeeInterestStart(interestData, callback)),
  deleteEmployeeInterestStart: (interestId, callback) =>
    dispatch(deleteEmployeeInterestStart(interestId, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});
export const EmployeeEmployeeInterestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeInterests);

export const EmployerEmployeeInterestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeInterests);
