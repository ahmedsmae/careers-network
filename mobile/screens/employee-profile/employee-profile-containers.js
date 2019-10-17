import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectLoading
} from '../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../redux/constants/constants.selectors';

import {
  editEmployeeAvatarStart,
  deleteEmployeeEducationStart
} from '../../redux/current-user/current-user.actions';

import CameraOrMemory from '../../components/camera-or-memory/camera-or-memory.component';
import EmployeeProfile from './employee-profile.component';

import Colors from '../../constants/colors';

const EmployeeEmployeeProfile = ({
  currentEmployee,
  editEmployeeAvatarStart,
  navigation,
  deleteEmployeeEducationStart,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your CV' />
      </Appbar.Header>

      <CameraOrMemory
        visible={showCameraOrMemory}
        hideDialog={() => setShowCameraOrMemory(false)}
        onImagePick={image => {
          setShowCameraOrMemory(false);
          editEmployeeAvatarStart(image);
        }}
      />

      <Provider>
        <EmployeeProfile
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
          onExperiencePress={exp =>
            navigation.navigate('EdirExperience', { experience: exp })
          }
          onExperienceLongPress={exp =>
            Alert.alert(
              'Delete Experience',
              'Are you sure you want to delete this experience ?',
              [
                {
                  text: 'Yes',
                  onPress: () => {}
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
            icon={'edit'}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color='white'
            actions={[
              {
                icon: 'image',
                label: 'Avatar',
                onPress: () => setShowCameraOrMemory(true)
              },
              {
                icon: 'edit',
                label: 'User info',
                onPress: () => navigation.navigate('EditInfo')
              },
              {
                icon: 'add',
                label: 'Education',
                onPress: () => navigation.navigate('EditEducation')
              },
              {
                icon: 'add',
                label: 'Experience',
                onPress: () => navigation.navigate('EditExperience')
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

const EmployerEmployeeProfile = ({ navigation, ...props }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee CV' />
      </Appbar.Header>

      {/* to prevent employer user email from display in the employee profile */}
      <EmployeeProfile employee={employee} {...props} currentUser={null} />
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
  editEmployeeAvatarStart: avatar => dispatch(editEmployeeAvatarStart(avatar)),
  deleteEmployeeEducationStart: id => dispatch(deleteEmployeeEducationStart(id))
});

export const EmployeeEmployeeProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeProfile);

export const EmployerEmployeeProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeProfile);
