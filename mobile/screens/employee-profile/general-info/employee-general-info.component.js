import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Divider, Headline, Paragraph, Title } from 'react-native-paper';
import { ImagePreview } from '../../../components';
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
          <Paragraph>Full Name</Paragraph>
          <Headline>{concatFullName()}</Headline>
        </View>

        <View
          style={{
            display: currentUser && currentUser.email ? 'flex' : 'none'
          }}
        >
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Email</Paragraph>
          <Title>{currentUser && currentUser.email}</Title>
        </View>

        <View style={{ display: gender ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Gender</Paragraph>
          <Title>{gender}</Title>
        </View>

        <View style={{ display: birth_date ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Age</Paragraph>
          <Title>
            {moment(birth_date, 'YYYY')
              .add(1, 'year')
              .fromNow()
              .replace('ago', 'old')}
          </Title>
        </View>

        <View style={{ display: nationality ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Nationality</Paragraph>
          <Title>{nationality}</Title>
        </View>

        <View style={{ display: religion ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Religion</Paragraph>
          <Title>{religion}</Title>
        </View>

        <View style={{ display: marital_status ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Marital Status</Paragraph>
          <Title>{marital_status}</Title>
        </View>

        <View style={{ display: number_of_dependents ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Number of Dependents</Paragraph>
          <Title>{number_of_dependents}</Title>
        </View>

        <View style={{ display: residence_country ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Residence Country</Paragraph>
          <Title>{residence_country}</Title>
        </View>

        <View style={{ display: visa_type ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Visa Type</Paragraph>
          <Title>{visa_type}</Title>
        </View>

        <View style={{ display: location_id ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Location</Paragraph>
          <Title>{getCityNameById(location_id)}</Title>
        </View>

        <View style={{ display: contact_number ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Contact Number</Paragraph>
          <Title>{contact_number}</Title>
        </View>

        <View style={{ display: driving_licences ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Driving Licences from</Paragraph>
          <Title>{driving_licences}</Title>
        </View>

        <View style={{ display: has_a_car ? 'flex' : 'none' }}>
          <Title>Owns a car</Title>
        </View>

        <View style={{ display: bio ? 'flex' : 'none' }}>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>Bio</Paragraph>
          <Title>{bio}</Title>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  randomDate: selectRandomDate
});

export default connect(mapStateToProps)(EmployeeGeneralInfo);
