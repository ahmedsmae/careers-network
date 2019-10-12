import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image } from 'react-native';
import {
  Appbar,
  Divider,
  Portal,
  Provider,
  FAB,
  Caption
} from 'react-native-paper';

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

import CustomText from '../../components/custom-text/custom-text.component';
import CustomHeader from '../../components/custom-header/custom-header.component';
import UserImage from '../../components/user-image/user-image.component';
import CameraOrMemory from '../../components/camera-or-memory/camera-or-memory.component';

import Colors from '../../constants/colors';
import styles from './employer-profile.styles';

const EmployerProfile = ({
  navigation,
  currentUser,
  currentEmployer,
  getCityNameById,
  editEmployerAvatarStart,
  editEmployerCoverStart,
  loading
}) => {
  const _id = currentEmployer ? currentEmployer._id : null;
  const name = currentEmployer ? currentEmployer.name : null;
  const kind = currentEmployer ? currentEmployer.kind : null;
  const speciality = currentEmployer ? currentEmployer.speciality : null;
  const location_id = currentEmployer ? currentEmployer.location_id : null;
  const contact_numbers = currentEmployer
    ? currentEmployer.contact_numbers
    : null;
  const web_site = currentEmployer ? currentEmployer.web_site : null;
  const bio = currentEmployer ? currentEmployer.bio : null;

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

      <Provider>
        <ScrollView style={styles.screen}>
          <Image
            source={{ uri: `${URLS.SERVE_EMPLOYER_COVER}/${_id}` }}
            style={{ height: 200, width: '100%' }}
          />
          <UserImage
            source={`${URLS.SERVE_EMPLOYER_AVATAR}/${_id}`}
            large
            style={{
              position: 'absolute',
              margin: 20,
              borderWidth: 2,
              borderColor: 'white'
            }}
          />

          <CustomHeader>Employer Info</CustomHeader>
          <CustomText label='Name' placeholder='please fill your name'>
            {name}
          </CustomText>
          <CustomText label='Type' placeholder='please select your type'>
            {kind}
          </CustomText>
          <CustomText
            label='Speciality'
            placeholder='please select your speciality'
          >
            {speciality}
          </CustomText>
          <Divider />
          <CustomText label='Email' placeholder='please fill your email'>
            {currentUser && currentUser.email}
          </CustomText>
          <Divider />
          <Caption style={{ fontSize: 12 }}>Contact Numbers</Caption>
          {contact_numbers &&
            contact_numbers.map(({ title, contact_number }, index) => (
              <CustomText
                key={index}
                placeholder='please fill your contact number'
              >
                {`${title} - ${contact_number}`}
              </CustomText>
            ))}
          <Divider />
          <CustomText label='Location' placeholder='please fill your location'>
            {getCityNameById(location_id)}
          </CustomText>
          <Divider />
          <CustomText label='Website' placeholder='please fill your Website'>
            {web_site}
          </CustomText>
          <Divider />
          <CustomText label='Bio' placeholder='please fill your bio'>
            {bio}
          </CustomText>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerProfile);
