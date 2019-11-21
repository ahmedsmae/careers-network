import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee
} from '../../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../../redux/constants/constants.selectors';

import { deleteEmployeeTrainingStart } from '../../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../../redux/api-utilities/api-utilities.actions';

import Trainings from './trainings.component';

import Colors from '../../../constants/colors';

const EmployeeEmployeeTrainings = ({
  currentEmployee,
  navigation,
  deleteEmployeeTrainingStart,
  showPopupApi,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);

  const _handleDelete = trainingId =>
    deleteEmployeeTrainingStart(trainingId, err => {
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
        message: 'Training deleted successfully',
        duration: 600
      });
    });

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Trainings and Certifications" />
      </Appbar.Header>

      <Provider>
        <Trainings
          trainings_certifications={currentEmployee.trainings_certifications}
          employeeId={currentEmployee._id}
          onTrainingPress={train =>
            navigation.navigate('EditTraining', { training: train })
          }
          onTrainingLongPress={train =>
            Alert.alert(
              'Delete Training',
              'Are you sure you want to delete this training ?',
              [
                {
                  text: 'Yes',
                  onPress: _handleDelete.bind(this, train._id)
                },
                { text: 'Cancel' }
              ]
            )
          }
          {...props}
        />

        <Portal>
          <FAB.Group
            open={showFabOptions}
            icon={'settings'}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color="white"
            actions={[
              {
                icon: 'add',
                label: 'Training',
                onPress: () => navigation.navigate('EditTraining')
              },
              {
                icon: 'list',
                label: 'Profile Sections',
                onPress: () => navigation.navigate('EmployeeProfile')
              }
            ]}
            onStateChange={({ open }) => setShowFabOptions(open)}
            onPress={() => {
              if (showFabOptions) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </>
  );
};

const EmployerEmployeeTrainings = ({ navigation, ...props }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Trainings" />
      </Appbar.Header>

      <Trainings
        trainings_certifications={employee.trainings_certifications}
        employeeId={employee._id}
        {...props}
        currentUser={null}
      />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        small
        icon="list"
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  currentEmployee: selectCurrentEmployee(state),
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  deleteEmployeeTrainingStart: (id, callback) =>
    dispatch(deleteEmployeeTrainingStart(id, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export const EmployeeEmployeeTrainingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeTrainings);

export const EmployerEmployeeTrainingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeTrainings);
