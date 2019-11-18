import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { OutlinedInput, Filter } from '../../components';

import { selectCurrentEmployer } from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import { editEmployerInfoStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import ManageContacts from './manage-contacts.component';

import styles from './edit-employer-info.styles';

const EditEmployerInfo = ({
  currentEmployer,
  navigation,
  citiesList,
  getCityName,
  editEmployerInfoStart,
  showPopupApi
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
    bio
  } = employer;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = (name, value) =>
    setEmployer(prev => ({ ...prev, [name]: value }));

  const _handleLocationSelect = ({ id }) =>
    setEmployer(prev => ({ ...prev, location_id: id }));

  const _handleSave = () => {
    const { location, filtering, ...rest } = employer;
    editEmployerInfoStart(rest, err => {
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
        <Appbar.Content title="Edit Employer info" />
        <Appbar.Action icon="save" disabled={disabled} onPress={_handleSave} />
      </Appbar.Header>

      <ScrollView style={styles.screen}>
        <OutlinedInput
          style={{ margin: 10 }}
          autoCapitalize="words"
          label="Name"
          value={name}
          name="name"
          onChange={_handleChange}
        />

        <OutlinedInput
          style={{ margin: 10 }}
          autoCapitalize="words"
          label="Kind"
          value={kind}
          name="kind"
          onChange={_handleChange}
        />

        <OutlinedInput
          style={{ margin: 10 }}
          autoCapitalize="words"
          label="Speciality"
          value={speciality}
          name="speciality"
          onChange={_handleChange}
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

        <Filter
          style={{ width: '90%' }}
          list={citiesList}
          label="Location"
          onSelect={_handleLocationSelect}
          filterItem="city"
          listItem={city => `${city.city} - ${city.country}`}
        />

        <View style={{ marginBottom: 10 }} />

        <OutlinedInput
          style={{ margin: 10 }}
          keyboardType="url"
          autoCapitalize="none"
          label="Website"
          value={web_site}
          name="web_site"
          onChange={_handleChange}
        />

        <OutlinedInput
          style={{ margin: 10 }}
          multiline
          numberOfLines={3}
          autoCapitalize="sentences"
          label="Bio"
          value={bio}
          name="bio"
          onChange={this._handleChange}
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployer: selectCurrentEmployer(state),
  citiesList: selectCitiesList(state),
  getCityName: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployerInfoStart: (data, callback) =>
    dispatch(editEmployerInfoStart(data, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerInfo);
