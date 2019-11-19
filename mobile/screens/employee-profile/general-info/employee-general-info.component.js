import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Divider } from 'react-native-paper';
import { ImagePreview, C_Paragraph, C_Headline } from '../../../components';
import moment from 'moment';

import URLS from '../../../redux/utils/urls';
import { selectRandomDate } from '../../../redux/api-utilities/api-utilities.selectors';

const EmployeeGeneralInfo = ({
  currentUser,
  getCityNameById,
  employee: {
    _id,
    first_name,
    middle_name,
    last_name,
    gender,
    birth_date,
    nationality,
    religion,
    marital_status,
    number_of_dependents,
    residence_country,
    visa_type,
    location_id,
    contact_number,
    driving_licences,
    has_a_car,
    bio
  },
  randomDate
}) => {
  const [showImage, setShowImage] = useState(false);

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
        <TouchableWithoutFeedback onPress={() => setShowImage(true)}>
          <Image
            style={{ height: '100%', borderRadius: 5, width: '100%' }}
            source={{
              uri: `${URLS.SERVE_EMPLOYEE_AVATAR}/${_id}?r=${randomDate}`
            }}
          />
        </TouchableWithoutFeedback>
      </View>

      <ImagePreview
        visible={showImage}
        onDismiss={() => setShowImage(false)}
        source={`${URLS.SERVE_EMPLOYEE_AVATAR}/${_id}?r=${randomDate}`}
      />

      <ScrollView
        style={{ marginHorizontal: 10, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            display: first_name || middle_name || last_name ? 'flex' : 'none'
          }}
        >
          <C_Paragraph>Full Name</C_Paragraph>
          <C_Headline>{concatFullName()}</C_Headline>
        </View>

        <View
          style={{
            display: currentUser && currentUser.email ? 'flex' : 'none'
          }}
        >
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Email</C_Paragraph>
          <C_Headline>{currentUser && currentUser.email}</C_Headline>
        </View>

        <View style={{ display: gender ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Gender</C_Paragraph>
          <C_Headline>{gender}</C_Headline>
        </View>

        <View style={{ display: birth_date ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Age</C_Paragraph>
          <C_Headline>
            {moment(birth_date, 'YYYY')
              .add(1, 'year')
              .fromNow()
              .replace('ago', 'old')}
          </C_Headline>
        </View>

        <View style={{ display: nationality ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Nationality</C_Paragraph>
          <C_Headline>{nationality}</C_Headline>
        </View>

        <View style={{ display: religion ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Religion</C_Paragraph>
          <C_Headline>{religion}</C_Headline>
        </View>

        <View style={{ display: marital_status ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Marital Status</C_Paragraph>
          <C_Headline>{marital_status}</C_Headline>
        </View>

        <View style={{ display: number_of_dependents ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Number of Dependents</C_Paragraph>
          <C_Headline>{number_of_dependents}</C_Headline>
        </View>

        <View style={{ display: residence_country ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Residence Country</C_Paragraph>
          <C_Headline>{residence_country}</C_Headline>
        </View>

        <View style={{ display: visa_type ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Visa Type</C_Paragraph>
          <C_Headline>{visa_type}</C_Headline>
        </View>

        <View style={{ display: location_id ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Location</C_Paragraph>
          <C_Headline>{getCityNameById(location_id)}</C_Headline>
        </View>

        <View style={{ display: contact_number ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Contact Number</C_Paragraph>
          <C_Headline>{contact_number}</C_Headline>
        </View>

        <View style={{ display: driving_licences ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Driving Licences from</C_Paragraph>
          <C_Headline>{driving_licences}</C_Headline>
        </View>

        <View style={{ display: has_a_car ? 'flex' : 'none' }}>
          <C_Headline>Owns a car</C_Headline>
        </View>

        <View style={{ display: bio ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <C_Paragraph>Bio</C_Paragraph>
          <C_Headline>{bio}</C_Headline>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(EmployeeGeneralInfo);
