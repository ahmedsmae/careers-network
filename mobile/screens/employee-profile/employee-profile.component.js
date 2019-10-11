import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Alert } from 'react-native';
import { Appbar, Divider, Portal, Provider, FAB } from 'react-native-paper';
import ImageEditor from '@react-native-community/image-editor';

import URLS from '../../redux/utils/urls';
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

import CustomText from '../../components/custom-text/custom-text.component';
import CustomHeader from '../../components/custom-header/custom-header.component';
import EducationCard from './education-card.component';
import ExperienceCard from './experience-card.component';
import UserImage from '../../components/user-image/user-image.component';
import CameraOrMemory from '../../components/camera-or-memory/camera-or-memory.component';

import Colors from '../../constants/colors';
import styles from './employee-profile.styles';

const MyProfile = ({
  navigation,
  currentUser,
  currentEmployee,
  getCityNameById,
  editEmployeeAvatarStart,
  deleteEmployeeEducationStart,
  loading
}) => {
  const {
    _id,
    first_name,
    middle_name,
    last_name,
    contact_number,
    location_id,
    web_site,
    bio,
    educations,
    experiences
  } = currentEmployee;

  const [expandEducations, setExpandEducations] = useState(true);
  const [expandExperiences, setExpandExperiences] = useState(true);
  const [showFabOptions, setShowFabOptions] = useState(false);
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  const concatFullName = () => {
    let name = first_name || '';
    !!middle_name && (name += ' ' + middle_name);
    !!last_name && (name += ' ' + last_name);
    return name;
  };

  return (
    <View style={styles.screen}>
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
        <ScrollView style={styles.screen}>
          <UserImage
            source={`${URLS.SERVE_EMPLOYEE_AVATAR}/${_id}`}
            large
            style={styles.avatar}
          />

          <CustomHeader>User Info</CustomHeader>
          <CustomText label='Full Name' placeholder='please fill your name'>
            {concatFullName()}
          </CustomText>
          <Divider />
          <CustomText label='Email' placeholder='please fill your email'>
            {currentUser.email}
          </CustomText>
          <Divider />
          <CustomText
            label='Contact Number'
            placeholder='please fill your contact number'
          >
            {contact_number}
          </CustomText>
          <Divider />
          <CustomText label='Location' placeholder='please fill your location'>
            {getCityNameById(location_id)}
          </CustomText>
          <Divider />
          <CustomText label='Website' placeholder='please fill your web_site'>
            {web_site}
          </CustomText>
          <Divider />
          <CustomText label='Bio' placeholder='please fill your bio'>
            {bio}
          </CustomText>

          <CustomHeader>Educations</CustomHeader>
          {!!educations &&
            !!educations.length &&
            educations.map(edu => (
              <EducationCard
                key={edu._id}
                education={edu}
                employeeId={_id}
                onPress={() =>
                  navigation.navigate('EditEducation', { education: edu })
                }
                onLongPress={() =>
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
              />
            ))}

          <CustomHeader>Experiences</CustomHeader>
          {!!experiences &&
            !!experiences.length &&
            experiences.map(exp => (
              <ExperienceCard
                key={exp._id}
                experience={exp}
                employeeId={_id}
                onPress={() =>
                  navigation.navigate('EditExperience', { experience: exp })
                }
                onLongPress={() =>
                  Alert.alert(
                    'Delete Experience',
                    'Are you sure you want to delete this experience ?',
                    [
                      {
                        text: 'Yes',
                        onPress: () => console.log('delete experience')
                      },
                      { text: 'Cancel' }
                    ]
                  )
                }
              />
            ))}
        </ScrollView>

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
                // onPress: _handleAvatarChange
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
    </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
