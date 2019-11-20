import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import { Appbar, Paragraph } from 'react-native-paper';
import { OutlinedInput, Filter } from '../../components';

import { selectCurrentEmployer } from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList,
  selectCompanySizes
} from '../../redux/constants/constants.selectors';
import { editEmployerInfoStart } from '../../redux/current-user/current-user.actions';
import { showPopupApi } from '../../redux/api-utilities/api-utilities.actions';

import ManageContacts from './manage-contacts.component';
import { SOCIAL_MEDIA_BASE_URLS } from '../../redux/utils/urls';
import styles from './edit-employer-info.styles';

const EditEmployerInfo = ({
  currentEmployer,
  navigation,
  citiesList,
  getCityName,
  companySizes,
  editEmployerInfoStart,
  showPopupApi
}) => {
  const [employer, setEmployer] = useState({
    name: currentEmployer.name || '',
    size: currentEmployer.size || '',
    speciality: currentEmployer.speciality || '',
    contact_numbers: currentEmployer.contact_numbers || [],
    location_id: currentEmployer.location_id || '',
    location: currentEmployer.location_id
      ? getCityName(currentEmployer.location_id)
      : '',
    bio: currentEmployer.bio || '',
    social_profiles: currentEmployer.social_profiles
      ? {
          website: currentEmployer.social_profiles.website || '',
          linkedin: currentEmployer.social_profiles.linkedin || '',
          github: currentEmployer.social_profiles.github || '',
          stackoverflow: currentEmployer.social_profiles.stackoverflow || '',
          facebook: currentEmployer.social_profiles.facebook || '',
          instagram: currentEmployer.social_profiles.instagram || '',
          youtube: currentEmployer.social_profiles.youtube || ''
        }
      : {
          website: '',
          linkedin: '',
          twitter: '',
          github: '',
          stackoverflow: '',
          facebook: '',
          instagram: '',
          youtube: ''
        }
  });

  const {
    name,
    kind,
    size,
    speciality,
    contact_numbers,
    location,
    location_id,
    bio,
    social_profiles
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView>
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
              selectedValue={size}
              onValueChange={value =>
                setEmployer(prev => ({ ...prev, size: value }))
              }
            >
              <Picker.Item
                color="grey"
                label="Choose company Size"
                value={null}
              />
              {companySizes.map((size, index) => (
                <Picker.Item key={index} label={size} value={size} />
              ))}
            </Picker>
          </View>

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
            value={location}
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
            onChange={this._handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="none"
            keyboardType="url"
            label="Website"
            value={social_profiles.website}
            name="website"
            onChange={({ name, value }) =>
              setEmployer(prev => ({
                ...prev,
                social_profiles: { ...social_profiles, [name]: value }
              }))
            }
          />

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.linkedin}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.linkedin}
              name="linkedin"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.twitter}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.twitter}
              name="twitter"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.github}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.github}
              name="github"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.stackoverflow}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.stackoverflow}
              name="stackoverflow"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.facebook}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.facebook}
              name="facebook"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.instagram}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.instagram}
              name="instagram"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Paragraph style={{ color: 'grey' }}>
              {SOCIAL_MEDIA_BASE_URLS.youtube}
            </Paragraph>
            <OutlinedInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              mode="none"
              value={social_profiles.youtube}
              name="youtube"
              onChange={({ name, value }) =>
                setEmployer(prev => ({
                  ...prev,
                  social_profiles: { ...social_profiles, [name]: value }
                }))
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployer: selectCurrentEmployer(state),
  citiesList: selectCitiesList(state),
  getCityName: id => selectCityNameById(id)(state),
  companySizes: selectCompanySizes(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployerInfoStart: (data, callback) =>
    dispatch(editEmployerInfoStart(data, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerInfo);
