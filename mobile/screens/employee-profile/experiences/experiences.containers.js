import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee
} from '../../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../../redux/constants/constants.selectors';

// import { deleteEmployeeEducationStart } from '../../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../../redux/api-utilities/api-utilities.actions';

import Experiences from './experiences.component';

import Colors from '../../../constants/colors';

const EmployeeEmployeeExperiences = ({
  currentEmployee,
  navigation,
  // deleteEmployeeEducationStart,
  showPopupApi,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);

  // const _handleDelete = experienceId =>
  // deleteEmployeeEducationStart(experienceId, err => {
  //   if (err) {
  //     showPopupApi({
  //       type: 'danger',
  //       message:
  //         err.response && err.response.data && err.response.data.errors
  //           ? err.response.data.errors.map(err => err.msg).toString()
  //           : 'Please check your connection'
  //     });
  //     return console.log(err);
  //   }

  //   showPopupApi({
  //     message: 'Experience deleted successfully',
  //     duration: 600
  //   });
  // });

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Experiences" />
      </Appbar.Header>

      <Provider>
        <Experiences
          experiences={currentEmployee.experiences}
          employeeId={currentEmployee._id}
          onExperiencePress={exp =>
            navigation.navigate('EditExperience', { experience: exp })
          }
          onExperienceLongPress={exp =>
            Alert.alert(
              'Delete Experience',
              'Are you sure you want to delete this experience ?',
              [
                {
                  text: 'Yes'
                  // onPress: _handleDelete.bind(this, exp._id)
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
                label: 'Experience',
                onPress: () => navigation.navigate('EditExperience')
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

const EmployerEmployeeExperiences = ({ navigation, ...props }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Experiences" />
      </Appbar.Header>

      <Experiences
        experiences={employee.experiences}
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
  // deleteEmployeeEducationStart: id => dispatch(deleteEmployeeEducationStart(id)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export const EmployeeEmployeeExperiencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeExperiences);

export const EmployerEmployeeExperiencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeExperiences);
