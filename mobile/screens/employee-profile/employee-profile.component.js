import React from 'react';
import { ScrollView } from 'react-native';
import { Divider, Appbar, List } from 'react-native-paper';

import styles from './employee-profile.styles';

const EmployeeProfile = ({ navigation, employee }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Employee Profile' />
      </Appbar.Header>

      <ScrollView>
        <List.Item
          title='General Info'
          description='Check out employee general information eg. Name, Age, Image, ...etc'
          left={props => <List.Icon {...props} icon='info' />}
          onPress={() => navigation.navigate('EmployeeGeneralInfo')}
        />

        <Divider />

        <List.Item
          title='Educations'
          description='Employee educations'
          left={props => <List.Icon {...props} icon='content-paste' />}
          onPress={() => navigation.navigate('EmployeeEducations')}
        />

        <Divider />

        <List.Item
          title='Experiences'
          description='Employee experiences'
          left={props => <List.Icon {...props} icon='work' />}
          onPress={() => navigation.navigate('EmployeeExperiences')}
        />

        <Divider />

        <List.Item
          title='Training and Certifications'
          description='Employee training and certifications'
          left={props => <List.Icon {...props} icon='book' />}
          onPress={() => navigation.navigate('EmployeeTrainings')}
        />

        <Divider />

        <List.Item
          title='Languages'
          description='Employee languages'
          left={props => <List.Icon {...props} icon='language' />}
          onPress={() => navigation.navigate('EmployeeLanguages')}
        />

        <Divider />

        <List.Item
          title='Skills'
          description='Employee skills'
          left={props => <List.Icon {...props} icon='build' />}
          onPress={() => navigation.navigate('EmployeeSkills')}
        />

        <Divider />

        <List.Item
          title='Interests'
          description='Employee interests'
          left={props => <List.Icon {...props} icon='color-lens' />}
          onPress={() => navigation.navigate('EmployeeInterests')}
        />

        <Divider />

        <List.Item
          title='References'
          description='Employee references'
          left={props => <List.Icon {...props} icon='people' />}
          onPress={() => navigation.navigate('EmployeeReferences')}
        />

        <Divider />

        <List.Item
          title='Social Profiles'
          description='Employee social profiles'
          left={props => <List.Icon {...props} icon='contacts' />}
          onPress={() => navigation.navigate('EmployeeSocialProfiles')}
        />
      </ScrollView>
    </>
  );
};

export default EmployeeProfile;
