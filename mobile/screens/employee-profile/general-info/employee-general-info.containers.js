import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee
} from '../../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../../redux/constants/constants.selectors';

import { editEmployeeAvatarStart } from '../../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../../redux/api-utilities/api-utilities.actions';

import CameraOrMemory from '../../../components/camera-or-memory/camera-or-memory.component';
import EmployeeGeneralInfo from './employee-general-info.component';

import Colors from '../../../constants/colors';

const EmployeeEmployeeGeneralInfo = ({
  currentEmployee,
  editEmployeeAvatarStart,
  navigation,
  showPopupApi,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your General Info" />
      </Appbar.Header>

      <CameraOrMemory
        visible={showCameraOrMemory}
        hideDialog={() => setShowCameraOrMemory(false)}
        onImagePick={image => {
          setShowCameraOrMemory(false);
          editEmployeeAvatarStart(image, err => {
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
              message: 'Image uploaded successfully',
              duration: 600
            });
          });
        }}
      />

      <Provider>
        <EmployeeGeneralInfo employee={currentEmployee} {...props} />

        <Portal>
          <FAB.Group
            open={showFabOptions}
            icon={'settings'}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color="white"
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

const EmployerEmployeeGeneralInfo = ({ navigation, ...props }) => {
  const employee = navigation.getParam('employee');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee General Info" />
      </Appbar.Header>

      {/* to prevent employer user email from display in the employee profile */}
      <EmployeeProfile employee={employee} {...props} currentUser={null} />

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
  editEmployeeAvatarStart: (avatar, callback) =>
    dispatch(editEmployeeAvatarStart(avatar, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export const EmployeeEmployeeGeneralInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeGeneralInfo);

export const EmployerEmployeeGeneralInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeGeneralInfo);
