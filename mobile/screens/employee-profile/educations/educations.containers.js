import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectLoading
} from '../../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../../redux/constants/constants.selectors';

import { deleteEmployeeEducationStart } from '../../../redux/current-user/current-user.actions';

import Educations from './educations.component';

import Colors from '../../../constants/colors';

const EmployeeEmployeeEducations = ({
  currentEmployee,
  navigation,
  deleteEmployeeEducationStart,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your Educations' />
      </Appbar.Header>

      <Provider>
        <Educations
          employee={currentEmployee}
          onEducationPress={edu =>
            navigation.navigate('EditEducation', { education: edu })
          }
          onEducationLongPress={edu =>
            Alert.alert(
              'Delete Education',
              'Are you sure you want to delete this education ?',
              [
                {
                  text: 'Yes',
                  onPress: () => deleteEmployeeEducationStart(edu._id)
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
            color='white'
            actions={[
              {
                icon: 'add',
                label: 'Education',
                onPress: () => navigation.navigate('EditEducation')
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

const EmployerEmployeeEducations = ({ navigation, ...props }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee Educations' />
      </Appbar.Header>

      <Educations employee={employee} {...props} currentUser={null} />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        small
        icon='list'
        onPress={() => navigation.navigate('EmployeeProfile')}
      />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  currentEmployee: selectCurrentEmployee(state),
  getCityNameById: id => selectCityNameById(id)(state),
  loading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  deleteEmployeeEducationStart: id => dispatch(deleteEmployeeEducationStart(id))
});

export const EmployeeEmployeeEducationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeEducations);

export const EmployerEmployeeEducationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeEducations);
