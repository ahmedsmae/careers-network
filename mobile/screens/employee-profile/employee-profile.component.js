import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Appbar, Divider, Portal, Provider, FAB } from 'react-native-paper';

import {
  selectCurrentUser,
  selectCurrentEmployee
} from '../../redux/current-user/current-user.selectors';
import { selectCityNameById } from '../../redux/constants/constants.selectors';

import CustomText from '../../components/custom-text/custom-text.component';
import CustomHeader from '../../components/custom-header/custom-header.component';
import EducationCard from './education-card.component';
import ExperienceCard from './experience-card.component';
import UserImage from '../../components/user-image/user-image.component';

import Colors from '../../constants/colors';
import styles from './employee-profile.styles';

const MyProfile = ({
  navigation,
  currentUser,
  currentEmployee,
  getCityNameById
}) => {
  const {
    first_name,
    middle_name,
    last_name,
    contact_number,
    location_id,
    website,
    bio,
    avatar,
    educations,
    experiences
  } = currentEmployee;

  const [expandEducations, setExpandEducations] = useState(true);
  const [expandExperiences, setExpandExperiences] = useState(true);
  const [showFabOptions, setShowFabOptions] = useState(false);

  const getLocationName = id => {
    const city = getCityNameById(id);
    if (city) {
      return `${city.city} - ${city.country}`;
    }
  };

  const fullName = () => {
    let name = '';
    if (!!first_name) {
      name += first_name;
    }

    if (!!middle_name) {
      name += ' ' + middle_name;
    }

    if (!!last_name) {
      name += ' ' + last_name;
    }

    return name;
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Your CV' />
      </Appbar.Header>
      <Provider>
        <ScrollView style={styles.screen}>
          <UserImage source={null} large style={styles.avatar} />

          <CustomHeader>User Info</CustomHeader>

          <CustomText label='Full Name' placeholder='please fill your name'>
            {fullName()}
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
            {getLocationName(location_id)}
          </CustomText>

          <Divider />

          <CustomText label='Website' placeholder='please fill your website'>
            {website}
          </CustomText>

          <Divider />

          <CustomText label='Bio' placeholder='please fill your bio'>
            {bio}
          </CustomText>

          <CustomHeader>Educations</CustomHeader>

          {!!educations &&
            !!educations.length &&
            educations.map(edu => <EducationCard education={edu} />)}

          <CustomHeader>Experiences</CustomHeader>
          {!!experiences &&
            !!experiences.length &&
            experiences.map(exp => <ExperienceCard experience={exp} />)}
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
                onPress: () => console.log('set avatar')
              },
              { icon: 'edit', label: 'Info', onPress: () => {} },
              { icon: 'add', label: 'Education', onPress: () => {} },
              { icon: 'add', label: 'Experience', onPress: () => {} }
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
  getCityNameById: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(MyProfile);
