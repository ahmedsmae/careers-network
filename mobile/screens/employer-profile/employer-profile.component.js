import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Divider, Caption } from 'react-native-paper';

import CustomText from '../../components/custom-text/custom-text.component';
import CustomHeader from '../../components/custom-header/custom-header.component';
import UserImage from '../../components/user-image/user-image.component';

import styles from './employer-profile.styles';

const EmployerProfile = ({ currentUser, employer, getCityNameById }) => {
  const _id = employer ? employer._id : null;
  const name = employer ? employer.name : null;
  const kind = employer ? employer.kind : null;
  const speciality = employer ? employer.speciality : null;
  const location_id = employer ? employer.location_id : null;
  const contact_numbers = employer ? employer.contact_numbers : null;
  const web_site = employer ? employer.web_site : null;
  const bio = employer ? employer.bio : null;

  return (
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
          <CustomText key={index} placeholder='please fill your contact number'>
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
  );
};

export default EmployerProfile;
