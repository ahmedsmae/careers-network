import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Appbar, TextInput, Text, Divider } from 'react-native-paper';
import { H2, ContainedButton, OutlinedInput, Link } from '../../components';

import {
  selectCurrentEmployee,
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import { editEmployeeInfoStart } from '../../redux/current-user/current-user.actions';

import styles from './edit-employee.styles';

const EditEmployeeEnfo = ({
  navigation,
  currentEmployee,
  editEmployeeInfoStart,
  citiesList,
  getCityName,
  loading,
  errorMessage
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
          contact_number: '',
          location: '',
          location_id: '',
          web_site: '',
          bio,
          filtering: false
        }
  );

  const {
    first_name,
    middle_name,
    last_name,
    contact_number,
    location,
    location_id,
    web_site,
    bio,
    filtering
  } = employee;

  const _handleChange = ({ name, value }) => {
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const _handleLocationSelect = ({ id, city, country }) => {
    setEmployee(prev => ({
      ...prev,
      filtering: false,
      location: `${city} - ${country}`,
      location_id: id
    }));
  };

  _handleSubmit = () => {
    const { location, filtering, ...rest } = employee;
    editEmployeeInfoStart(rest);
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Edit your info' />
        <Appbar.Action icon='save' onPress={_handleSubmit} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.screen}
        behavior='padding'
        keyboardVerticalOffset={5}
      >
        <ScrollView>
          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='First Name'
            value={first_name}
            name='first_name'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='Middle Name'
            value={middle_name}
            name='middle_name'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='words'
            label='Last Name'
            value={last_name}
            name='last_name'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            keyboardType='phone-pad'
            label='Contact Number'
            value={contact_number}
            name='contact_number'
            onChange={_handleChange}
          />

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='First Name'
            value={first_name}
            name='first_name'
            onChangeText={this._handleChange.bind(this, 'first_name')}
          /> */}

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='Middle Name'
            value={middle_name}
            name='middle_name'
            onChangeText={this._handleChange.bind(this, 'middle_name')}
          /> */}

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='Last Name'
            value={last_name}
            name='last_name'
            onChangeText={this._handleChange.bind(this, 'last_name')}
          /> */}

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            keyboardType='phone-pad'
            label='Contact Number'
            value={contact_number}
            name='contact_number'
            onChangeText={this._handleChange.bind(this, 'contact_number')}
          /> */}

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='none'
            label='Location'
            value={location}
            name='location'
            onChange={({ name, value }) =>
              setEmployee(prev => ({ ...prev, [name]: value, filtering: true }))
            }
          />

          {/* <TextInput
            style={{ marginHorizontal: 10, marginTop: 10 }}
            mode='outlined'
            value={location}
            autoCapitalize='none'
            label='Location'
            onChangeText={text =>
              this.setState({ location: text, filtering: true })
            }
          /> */}

          {filtering && (
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
          )}
          <View style={{ marginBottom: 10 }} />

          <OutlinedInput
            style={{ margin: 10 }}
            keyboardType='url'
            autoCapitalize='none'
            label='Website'
            value={web_site}
            name='web_site'
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            multiline
            numberOfLines={3}
            autoCapitalize='sentences'
            label='Bio'
            value={bio}
            name='bio'
            onChange={_handleChange}
          />

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            keyboardType='url'
            autoCapitalize='none'
            label='Website'
            value={web_site}
            name='web_site'
            onChangeText={this._handleChange.bind(this, 'web_site')}
          /> */}

          {/* <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            multiline
            autoCapitalize='sentences'
            label='Bio'
            value={bio}
            name='bio'
            onChangeText={this._handleChange.bind(this, 'bio')}
          /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployee: selectCurrentEmployee(state),
  citiesList: selectCitiesList(state),
  getCityName: id => selectCityNameById(id)(state),
  loading: selectLoading(state),
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeInfoStart: info => dispatch(editEmployeeInfoStart(info))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmployeeEnfo);
