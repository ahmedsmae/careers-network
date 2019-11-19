import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Appbar, Portal, Provider, FAB, Text } from 'react-native-paper';
import { CameraOrMemory } from '../../components';

import {
  selectCurrentUser,
  selectCurrentEmployer
} from '../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../redux/constants/constants.selectors';
import {
  editEmployerAvatarStart,
  editEmployerCoverStart
} from '../../redux/current-user/current-user.actions';
import {
  selectIsEmployerFollowed,
  selectFollowIdByEmployerId
} from '../../redux/follows/follows.selectors';
import {
  followEmployerStart,
  unfollowEmployerStart
} from '../../redux/follows/follows.actions';
import {
  showPopupApi,
  updateRandomDate
} from '../../redux/api-utilities/api-utilities.actions';

import EmployerProfile from './employer-profile.component';

import Colors from '../../constants/colors';
import styles from './employer-profile.styles';

const EmployeeEmployerProfile = ({
  navigation,
  followEmployerStart,
  unfollowEmployerStart,
  isEmployerFollowed,
  getFollowIdByEmployerId,
  showPopupApi,
  ...props
}) => {
  const employer = navigation.getParam('employer');

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employer Profile" />

        {isEmployerFollowed(employer._id) ? (
          <Appbar.Action
            color="yellow"
            icon="bookmark"
            onPress={() =>
              unfollowEmployerStart(
                getFollowIdByEmployerId(employer._id),
                err => {
                  if (err) {
                    showPopupApi({
                      type: 'danger',
                      message:
                        err.response &&
                        err.response.data &&
                        err.response.data.errors
                          ? err.response.data.errors
                              .map(err => err.msg)
                              .toString()
                          : 'Please check your connection'
                    });
                    return console.log(err);
                  }

                  showPopupApi({
                    message: 'You are not following this employer anymore',
                    width: 400,
                    duration: 600
                  });
                }
              )
            }
          />
        ) : (
          <Appbar.Action
            icon="bookmark-border"
            onPress={() =>
              followEmployerStart(employer._id, err => {
                if (err) {
                  showPopupApi({
                    type: 'danger',
                    message:
                      err.response &&
                      err.response.data &&
                      err.response.data.errors
                        ? err.response.data.errors
                            .map(err => err.msg)
                            .toString()
                        : 'Please check your connection'
                  });
                  return console.log(err);
                }

                showPopupApi({
                  message: 'You are now following this employer',
                  width: 400,
                  duration: 600
                });
              })
            }
          />
        )}

        <Text
          style={{ fontSize: 18, color: 'white', margin: 10 }}
          onPress={() =>
            navigation.navigate('SelectedEmployerJobs', {
              employerId: employer._id
            })
          }
        >
          Jops
        </Text>
      </Appbar.Header>

      <EmployerProfile employer={employer} {...props} />
    </>
  );
};

const EmployerEmployerProfile = ({
  navigation,
  editEmployerAvatarStart,
  editEmployerCoverStart,
  currentEmployer,
  showPopupApi,
  updateRandomDate,
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
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employer Profile" />
      </Appbar.Header>

      <Provider>
        <CameraOrMemory
          visible={showAvatarCameraOrMemory}
          hideDialog={() => setShowAvatarCameraOrMemory(false)}
          onImagePick={image => {
            setShowAvatarCameraOrMemory(false);
            editEmployerAvatarStart(image, err => {
              if (err) {
                showPopupApi({
                  type: 'danger',
                  message:
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                      ? err.response.data.errors.map(err => err.msg).toString()
                      : 'Please check your connection'
                });
                return console.log(err);
              }

              updateRandomDate();
              showPopupApi({
                message: 'Image uploaded successfully',
                duration: 600
              });
            });
          }}
        />

        <CameraOrMemory
          visible={showCoverCameraOrMemory}
          hideDialog={() => setShowCoverCameraOrMemory(false)}
          onImagePick={image => {
            setShowCoverCameraOrMemory(false);
            editEmployerCoverStart(image, err => {
              if (err) {
                showPopupApi({
                  type: 'danger',
                  message:
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                      ? err.response.data.errors.map(err => err.msg).toString()
                      : 'Please check your connection'
                });
                return console.log(err);
              }

              updateRandomDate();
              showPopupApi({
                message: 'Cover uploaded successfully',
                duration: 600
              });
            });
          }}
        />

        <EmployerProfile employer={currentEmployer} {...props} />

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

const NoAuthEmployerProfile = ({ navigation, ...props }) => {
  const employer = navigation.getParam('employer');

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Employer Profile" />
        <Text
          style={{ fontSize: 18, color: 'white', margin: 10 }}
          onPress={() =>
            navigation.navigate('SelectedEmployerJobs', {
              employerId: employer._id
            })
          }
        >
          Jops
        </Text>
      </Appbar.Header>

      <EmployerProfile employer={employer} {...props} />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  currentEmployer: selectCurrentEmployer(state),
  getCityNameById: id => selectCityNameById(id)(state),
  isEmployerFollowed: employerId => selectIsEmployerFollowed(employerId)(state),
  getFollowIdByEmployerId: employerId =>
    selectFollowIdByEmployerId(employerId)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployerAvatarStart: (avatar, callback) =>
    dispatch(editEmployerAvatarStart(avatar, callback)),
  editEmployerCoverStart: (cover, callback) =>
    dispatch(editEmployerCoverStart(cover, callback)),
  followEmployerStart: (employerId, callback) =>
    dispatch(followEmployerStart(employerId, callback)),
  unfollowEmployerStart: (followId, callback) =>
    dispatch(unfollowEmployerStart(followId, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails)),
  updateRandomDate: () => dispatch(updateRandomDate())
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
