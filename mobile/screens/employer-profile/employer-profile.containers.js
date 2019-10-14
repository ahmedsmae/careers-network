import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Appbar, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployer,
  selectLoading
} from '../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../redux/constants/constants.selectors';
import {
  editEmployerAvatarStart,
  editEmployerCoverStart
} from '../../redux/current-user/current-user.actions';

import CameraOrMemory from '../../components/camera-or-memory/camera-or-memory.component';

import EmployerProfile from './employer-profile.component';

import Colors from '../../constants/colors';
import styles from './employer-profile.styles';

const EmployeeEmployerProfile = ({ navigation, ...props }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employer Profile' />
      </Appbar.Header>

      <EmployerProfile {...props} />
    </>
  );
};

const EmployerEmployerProfile = ({
  navigation,
  editEmployerAvatarStart,
  editEmployerCoverStart,
  loading,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  const [showAvatarCameraOrMemory, setShowAvatarCameraOrMemory] = useState(
    false
  );
  const [showCoverCameraOrMemory, setShowCoverCameraOrMemory] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employer Profile' />
      </Appbar.Header>

      <Provider>
        <CameraOrMemory
          visible={showAvatarCameraOrMemory}
          hideDialog={() => setShowAvatarCameraOrMemory(false)}
          onImagePick={image => {
            setShowAvatarCameraOrMemory(false);
            editEmployerAvatarStart(image);
          }}
        />

        <CameraOrMemory
          visible={showCoverCameraOrMemory}
          hideDialog={() => setShowCoverCameraOrMemory(false)}
          onImagePick={image => {
            setShowCoverCameraOrMemory(false);
            editEmployerCoverStart(image);
          }}
        />

        <EmployerProfile {...props} />

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
                onPress: () => setShowAvatarCameraOrMemory(true)
              },
              {
                icon: 'image',
                label: 'Cover Image',
                onPress: () => setShowCoverCameraOrMemory(true)
              },
              {
                icon: 'edit',
                label: 'Employer info',
                onPress: () => navigation.navigate('EditInfo')
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

const NoAuthEmployerProfile = props => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Employer Profile' />
      </Appbar.Header>

      <EmployerProfile {...props} />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  currentEmployer: selectCurrentEmployer(state),
  getCityNameById: id => selectCityNameById(id)(state),
  loading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployerAvatarStart: avatar => dispatch(editEmployerAvatarStart(avatar)),
  editEmployerCoverStart: cover => dispatch(editEmployerCoverStart(cover))
});

export const NoAuthEmployerProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoAuthEmployerProfile);

export const EmployeeEmployerProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployerProfile);

export const EmployerEmployerProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployerProfile);
