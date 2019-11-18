import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { Appbar, Text, RadioButton, Chip } from 'react-native-paper';
import { OutlinedInput, Filter, CustomDatePicker } from '../../components';

import { selectCurrentEmployee } from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList,
  selectCountries,
  selectNationalities,
  selectReligions,
  selectVisaTypes,
  selectMaritalStatuses
} from '../../redux/constants/constants.selectors';
import { editEmployeeInfoStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import styles from './edit-employee.styles';
import COLORS from '../../constants/colors';

const EditEmployeeEnfo = ({
  navigation,
  currentEmployee,
  editEmployeeInfoStart,
  citiesList,
  getCityName,
  countriesList,
  nationalitiesList,
  religionsList,
  visaTypesList,
  maritalStatusesList,
  showPopupApi
}) => {
  const [employee, setEmployee] = useState(
    currentEmployee
      ? {
          ...currentEmployee,
          location: getCityName(currentEmployee.location_id),
          filtering: false
        }
      : {
          first_name: '',
          middle_name: '',
          last_name: '',
          gender: '',
          birth_date: null,
          nationality: '',
          religion: '',
          marital_status: '',
          number_of_dependents: '',
          residence_country: '',
          visa_type: '',
          contact_number: '',
          driving_licenses: ['Egypt', 'UAE', 'USA'],
          has_a_car: false,
          location: '',
          location_id: '',
          bio,
          filtering: false
        }
  );

  const {
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
    contact_number,
    driving_licenses,
    has_a_car,
    location_id,
    bio
  } = employee;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const _handleLocationSelect = ({ id }) =>
    setEmployee(prev => ({ ...prev, location_id: id }));

  _handleSubmit = () => {
    const { location, filtering, birth_date, ...rest } = employee;
    const formatedBirthDate = birth_date
      ? new Date(birth_date).toString()
      : null;
    editEmployeeInfoStart({ ...rest, birth_date: formatedBirthDate }, err => {
      if (err) {
        showPopupApi({
          type: 'danger',
          message:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : 'Please check your connection'
        });
        setDisabled(false);
        return console.log(err);
      }

      showPopupApi({
        message: 'Info edited successfully',
        duration: 600
      });
      setDisabled(false);
      navigation.goBack();
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Edit your info" />
        <Appbar.Action
          icon="save"
          disabled={disabled}
          onPress={_handleSubmit}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="First Name"
            value={first_name}
            name="first_name"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Middle Name"
            value={middle_name}
            name="middle_name"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Last Name"
            value={last_name}
            name="last_name"
            onChange={_handleChange}
          />

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={gender}
              onValueChange={value =>
                setEmployee(prev => ({ ...prev, gender: value }))
              }
            >
              <Picker.Item color="grey" label="Choose Gender" value={null} />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            list={nationalitiesList}
            value={nationality}
            label="Nationality"
            onSelect={nationality =>
              setEmployee(prev => ({ ...prev, nationality }))
            }
            listItem={nat => nat}
          />

          <CustomDatePicker
            placeholder="Birth Date"
            date={birth_date}
            onDateChange={date =>
              setEmployee(prev => ({ ...prev, birth_date: date }))
            }
          />

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={religion}
              onValueChange={value =>
                setEmployee(prev => ({ ...prev, religion: value }))
              }
            >
              <Picker.Item color="grey" label="Choose Religion" value={null} />
              {religionsList.map((religion, index) => (
                <Picker.Item key={index} label={religion} value={religion} />
              ))}
            </Picker>
          </View>

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={marital_status}
              onValueChange={value =>
                setEmployee(prev => ({ ...prev, marital_status: value }))
              }
            >
              <Picker.Item
                color="grey"
                label=" Choose Marital Status"
                value={null}
              />
              {maritalStatusesList.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>

          <OutlinedInput
            style={{ margin: 10 }}
            keyboardType="numeric"
            label="Number of Dependents"
            value={number_of_dependents}
            name="number_of_dependents"
            onChange={_handleChange}
          />

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            list={countriesList}
            value={residence_country}
            label="Residence Country"
            onSelect={residence_country =>
              setEmployee(prev => ({ ...prev, residence_country }))
            }
            listItem={country => country}
          />

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={visa_type}
              onValueChange={value =>
                setEmployee(prev => ({ ...prev, visa_type: value }))
              }
            >
              <Picker.Item color="grey" label="Choose Visa Type" value={null} />
              {visaTypesList.map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
          </View>

          <OutlinedInput
            style={{ margin: 10 }}
            keyboardType="phone-pad"
            label="Contact Number"
            value={contact_number}
            name="contact_number"
            onChange={_handleChange}
          />

          <RadioButton.Group
            value={!!has_a_car}
            onValueChange={value =>
              setEmployee(prev => ({ ...prev, has_a_car: value }))
            }
          >
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 0 }}>
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <RadioButton value={false} />
                <Text style={{ fontSize: 16 }}>Don't have a Car</Text>
              </View>
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <RadioButton value={true} />
                <Text style={{ fontSize: 16 }}>Have a Car</Text>
              </View>
            </View>
          </RadioButton.Group>

          <View
            style={{
              borderWidth: 1,
              margin: 10,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Text style={{ fontSize: 16, margin: 5, color: 'grey' }}>
              Driving Licenses From
            </Text>

            {driving_licenses && driving_licenses.length > 0 && (
              <View
                style={{
                  margin: 10,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flexDirection: 'row'
                }}
              >
                {driving_licenses.map((license, index) => (
                  <Chip
                    key={index}
                    onClose={() =>
                      setEmployee(prev => ({
                        ...prev,
                        driving_licenses: driving_licenses.filter(
                          (_, i) => i !== index
                        )
                      }))
                    }
                    style={{
                      margin: 2,
                      backgroundColor: COLORS.ACCENT
                    }}
                  >
                    {license}
                  </Chip>
                ))}
              </View>
            )}

            <Filter
              style={{ width: '100%' }}
              list={countriesList}
              label="Add Country"
              onSelect={country =>
                setEmployee(prev => ({
                  ...prev,
                  driving_licenses: [...driving_licenses, country]
                }))
              }
              listItem={country => country}
              clearAfterSelect
            />
          </View>

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            value={location_id && getCityName(location_id)}
            list={citiesList}
            label="Location"
            onSelect={_handleLocationSelect}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
          />

          <View style={{ marginBottom: 10 }} />

          <OutlinedInput
            style={{ margin: 10 }}
            multiline
            numberOfLines={3}
            autoCapitalize="sentences"
            label="Bio"
            value={bio}
            name="bio"
            onChange={_handleChange}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployee: selectCurrentEmployee(state),
  citiesList: selectCitiesList(state),
  getCityName: id => selectCityNameById(id)(state),
  countriesList: selectCountries(state),
  nationalitiesList: selectNationalities(state),
  religionsList: selectReligions(state),
  visaTypesList: selectVisaTypes(state),
  maritalStatusesList: selectMaritalStatuses(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeInfoStart: (info, callback) =>
    dispatch(editEmployeeInfoStart(info, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeEnfo);
