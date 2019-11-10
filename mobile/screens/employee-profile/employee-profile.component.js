import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Divider, Headline, Paragraph, Title } from 'react-native-paper';

import URLS from '../../redux/utils/urls';

import EducationCard from './education-card.component';
import ExperienceCard from './experience-card.component';

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
    !!first_name && (name += first_name);
    !!middle_name && (name += ' ' + middle_name);
    !!last_name && (name += ' ' + last_name);
    return name;
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
          width: 100,
          height: 100,
          marginRight: 16,
          marginTop: -40,
          borderRadius: 5,
          elevation: 5,
          borderWidth: 1,
          borderColor: 'white'
        }}
      >
        <Image
          style={{ height: '100%', borderRadius: 5, width: '100%' }}
          source={{ uri: `${URLS.SERVE_EMPLOYEE_AVATAR}/${_id}` }}
        />
      </View>

      <ScrollView
        style={{ marginHorizontal: 10, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            display: first_name || middle_name || last_name ? 'flex' : 'none'
          }}
        >
          <Paragraph>Full Name</Paragraph>
          <Headline>{concatFullName()}</Headline>
        </View>

        <View style={{ display: currentUser.email ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Email</Paragraph>
          <Title>{currentUser.email}</Title>
        </View>

        <View style={{ display: contact_number ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Contact Number</Paragraph>
          <Title>{contact_number}</Title>
        </View>

        <View style={{ display: location_id ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Location</Paragraph>
          <Title>{getCityNameById(location_id)}</Title>
        </View>

        <View style={{ display: web_site ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Website</Paragraph>
          <Title>{web_site}</Title>
        </View>

        <View style={{ display: bio ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Bio</Paragraph>
          <Title>{bio}</Title>
        </View>

        <View
          style={{ display: educations && educations.length ? 'flex' : 'none' }}
        >
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Educations</Paragraph>
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
        </View>

        <View
          style={{
            display: experiences && experiences.length ? 'flex' : 'none'
          }}
        >
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Experiences</Paragraph>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default EmployeeProfile;
