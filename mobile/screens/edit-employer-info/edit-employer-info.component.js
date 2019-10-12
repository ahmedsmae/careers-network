import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Appbar, TextInput, Text, Divider } from 'react-native-paper';

import {
  selectCurrentEmployer,
  selectLoading,
  selectErrorMessage
} from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import { editEmployerInfoStart } from '../../redux/current-user/current-user.actions';

import ManageContacts from './manage-contacts.component';

import styles from './edit-employer-info.styles';

const EditEmployerInfo = ({
  currentEmployer,
  navigation,
  citiesList,
  getCityName,
  editEmployerInfoStart,
  loading,
  errorMessage
}) => {
  const [employer, setEmployer] = useState(
    currentEmployer
      ? {
          ...currentEmployer,
          location: getCityName(currentEmployer.location_id),
          filtering: false
        }
      : {
          name: '',
          kind: '',
          speciality: '',
          contact_numbers: [],
          location: '',
          location_id: '',
          web_site: '',
          bio,
          filtering: false
        }
  );

  const {
    name,
    kind,
    speciality,
    contact_numbers,
    location,
    location_id,
    web_site,
    bio,
    filtering
  } = employer;

  const _handleChange = (name, value) => {
    setEmployer(prev => ({ ...prev, [name]: value }));
  };

  const _handleLocationSelect = ({ id, city, country }) => {
    setEmployer(prev => ({
      ...prev,
      filtering: false,
      location: `${city} - ${country}`,
      location_id: id
    }));
  };

  const _handleSave = () => {
    const { location, filtering, ...rest } = employer;
    editEmployerInfoStart(rest);
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Edit Employer info' />
        <Appbar.Action icon='save' onPress={_handleSave} />
      </Appbar.Header>

      <ScrollView style={styles.screen}>
        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Name'
          value={name}
          name='name'
          onChangeText={_handleChange.bind(this, 'name')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Kind'
          value={kind}
          name='kind'
          onChangeText={_handleChange.bind(this, 'kind')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          autoCapitalize='words'
          label='Speciality'
          value={speciality}
          name='speciality'
          onChangeText={_handleChange.bind(this, 'speciality')}
        />

        <ManageContacts
          contacts={contact_numbers}
          onAddContact={con =>
            setEmployer(prev => ({
              ...prev,
              contact_numbers: [...contact_numbers, con]
            }))
          }
          onRemoveContact={index =>
            setEmployer(prev => ({
              ...prev,
              contact_numbers: contact_numbers.filter((c, i) => i !== index)
            }))
          }
        />

        <TextInput
          style={{ marginHorizontal: 10, marginTop: 10 }}
          value={location}
          mode='outlined'
          autoCapitalize='none'
          label='Location'
          onChangeText={text =>
            setEmployer(prev => ({ ...prev, location: text, filtering: true }))
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
        <View style={{ marginBottom: 10 }} />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          keyboardType='url'
          autoCapitalize='none'
          label='Website'
          value={web_site}
          name='web_site'
          onChangeText={_handleChange.bind(this, 'web_site')}
        />

        <TextInput
          style={{ margin: 10 }}
          mode='outlined'
          multiline
          autoCapitalize='sentences'
          label='Bio'
          value={bio}
          name='bio'
          onChangeText={_handleChange.bind(this, 'bio')}
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployer: selectCurrentEmployer(state),
  citiesList: selectCitiesList(state),
  getCityName: id => selectCityNameById(id)(state),
  loading: selectLoading(state),
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployerInfoStart: data => dispatch(editEmployerInfoStart(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmployerInfo);
