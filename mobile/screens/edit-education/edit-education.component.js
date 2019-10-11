import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  Text,
  TextInput,
  Appbar,
  Divider,
  Checkbox,
  Paragraph
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

import URLS from '../../redux/utils/urls';

import {
  selectCurrentEmployee,
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import { editEmployeeEducationStart } from '../../redux/current-user/current-user.actions';

import ImagePicker from '../../components/image-picker/image-picker.component';

import styles from './edit-education.styles';

const EditEducation = ({
  navigation,
  currentEmployee,
  editEmployeeEducationStart,
  getCityNameById,
  citiesList,
  loading,
  errorMessage
}) => {
  const edu = navigation.getParam('education');

  const [education, setEducation] = useState(
    !!edu
      ? { ...edu, location: getCityNameById(edu.location_id), filtering: false }
      : {
          subject: '',
          institute: '',
          location_id: '',
          description: '',
          from: null,
          current: false,
          to: null,
          certificate_image: null,
          location: '',
          hasCertificate: false,
          filtering: false
        }
  );

  const {
    _id,
    subject,
    institute,
    description,
    location,
    filtering,
    hasCertificate,
    from,
    current,
    to
  } = education;

  const _handleChange = (name, value) => {
    setEducation(prevEdu => ({ ...prevEdu, [name]: value }));
    console.log(name, value);
  };

  const _handleLocationSelect = ({ id, city, country }) => {
    setEducation(prev => ({
      ...prev,
      filtering: false,
      location: `${city} - ${country}`,
      location_id: id
    }));
  };

  const _handleSubmit = () => {
    const { location, filtering, from, to, ...rest } = education;
    const formatedFrom = from ? new Date(from).toString() : null;
    const formatedTo = to ? new Date(to).toString() : null;
    editEmployeeEducationStart({ from: formatedFrom, to: formatedTo, ...rest });
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={!!edu ? 'Edit Education' : 'Add Education'} />
        <Appbar.Action icon='save' onPress={_handleSubmit} />
      </Appbar.Header>

      <ScrollView style={styles.screen}>
        <ImagePicker
          defaultImage={
            hasCertificate
              ? `${URLS.SERVE_EDUCATION_CERTIFICATE}/${currentEmployee._id}/${_id}`
              : null
          }
          onImageTaken={_handleChange.bind(this, 'certificate_image')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Subject'
          value={subject}
          name='subject'
          onChangeText={_handleChange.bind(this, 'subject')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Institute'
          value={institute}
          name='institute'
          onChangeText={_handleChange.bind(this, 'institute')}
        />

        <TextInput
          style={{ marginHorizontal: 10, marginTop: 10 }}
          value={location}
          mode='outlined'
          autoCapitalize='none'
          label='Location'
          onChangeText={text =>
            setEducation(prev => ({ ...prev, location: text, filtering: true }))
          }
        />

        {filtering && (
          <View style={styles.locationListContainer}>
            <View style={styles.locationsList}>
              {citiesList
                .filter(
                  ({ city }) =>
                    location.trim().length > 0 &&
                    city.toLowerCase().includes(location.trim().toLowerCase())
                )
                .map((city, index) => {
                  if (index < 10) {
                    return (
                      <View key={city.id}>
                        <Text
                          style={styles.locationListItem}
                          onPress={_handleLocationSelect.bind(this, city)}
                        >
                          {`${city.city} - ${city.country}`}
                        </Text>
                        <Divider />
                      </View>
                    );
                  }
                })}
            </View>
          </View>
        )}

        <DatePicker
          style={{
            width: '95%',
            height: 60,
            margin: 10,
            marginTop: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 5
          }}
          date={from}
          mode='date'
          showIcon={false}
          placeholder='From Date'
          format='YYYY-MM-DD'
          customStyles={{
            dateInput: {
              borderWidth: 0
            },
            placeholderText: {
              fontSize: 16,
              color: 'grey',
              alignSelf: 'flex-start'
            },
            dateText: {
              fontSize: 16,
              color: 'grey',
              alignSelf: 'flex-start'
            }
          }}
          onDateChange={_handleChange.bind(this, 'from')}
          // onDateChange={date => console.log(new Date(date).toString())}
        />

        <TouchableOpacity
          style={{ flexDirection: 'row', marginHorizontal: 10 }}
          onPress={() => setEducation(prev => ({ ...prev, current: !current }))}
        >
          <Checkbox status={current ? 'checked' : 'unchecked'} />
          <Paragraph style={{ color: 'grey', textAlignVertical: 'center' }}>
            Current Job
          </Paragraph>
        </TouchableOpacity>

        {!current && (
          <DatePicker
            style={{
              width: '95%',
              height: 60,
              margin: 10,
              marginTop: 20,
              padding: 10,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 5
            }}
            date={to}
            mode='date'
            showIcon={false}
            placeholder='Until Date'
            format='MM / YYYY'
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              placeholderText: {
                fontSize: 16,
                color: 'grey',
                alignSelf: 'flex-start'
              },
              dateText: {
                fontSize: 16,
                color: 'grey',
                alignSelf: 'flex-start'
              }
            }}
            onDateChange={_handleChange.bind(this, 'to')}
          />
        )}

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Description'
          value={description}
          name='description'
          onChangeText={_handleChange.bind(this, 'description')}
          multiline
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  citiesList: selectCitiesList(state),
  currentEmployee: selectCurrentEmployee(state),
  loading: selectLoading(state),
  errorMessage: selectErrorMessage(state),
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeEducationStart: info => dispatch(editEmployeeEducationStart(info))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);
