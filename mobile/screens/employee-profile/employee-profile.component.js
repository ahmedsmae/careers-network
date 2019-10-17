import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Divider } from 'react-native-paper';

import URLS from '../../redux/utils/urls';

import CustomText from '../../components/custom-text/custom-text.component';
import CustomHeader from '../../components/custom-header/custom-header.component';
import EducationCard from './education-card.component';
import ExperienceCard from './experience-card.component';
import UserImage from '../../components/user-image/user-image.component';

import styles from './employee-profile.styles';

const EmployeeProfile = ({
  employee,
  currentUser,
  getCityNameById,
  onEducationPress,
  onEducationLongPress,
  onExperiencePress,
  onExperienceLongPress
}) => {
  const _id = employee ? employee._id : null;
  const first_name = employee ? employee.first_name : null;
  const middle_name = employee ? employee.middle_name : null;
  const last_name = employee ? employee.last_name : null;
  const contact_number = employee ? employee.contact_number : null;
  const location_id = employee ? employee.location_id : null;
  const web_site = employee ? employee.web_site : null;
  const bio = employee ? employee.bio : null;
  const educations = employee ? employee.educations : null;
  const experiences = employee ? employee.experiences : null;

  const concatFullName = () => {
    let name = '';
    !!first_name && (name += ' ' + first_name);
    !!middle_name && (name += ' ' + middle_name);
    !!last_name && (name += ' ' + last_name);
    return name;
  };

  return (
    <View style={styles.screen}>
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
        {currentUser && (
          <CustomText label='Email' placeholder='please fill your email'>
            {currentUser.email}
          </CustomText>
        )}
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
              onPress={onEducationPress && onEducationPress.bind(this, edu)}
              onLongPress={
                onEducationLongPress && onEducationLongPress.bind(this, edu)
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
              onPress={onExperiencePress && onExperiencePress.bind(this, exp)}
              onLongPress={
                onExperienceLongPress && onExperienceLongPress.bind(this.exp)
              }
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default EmployeeProfile;
