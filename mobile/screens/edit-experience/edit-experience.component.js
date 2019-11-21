import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Appbar, Checkbox, Paragraph } from 'react-native-paper';
import {
  OutlinedInput,
  ImagePicker,
  Filter,
  CustomDatePicker
} from '../../components';

import URLS from '../../redux/utils/urls';

import { selectCurrentEmployee } from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList,
  selectCurrencies
} from '../../redux/constants/constants.selectors';
import { editEmployeeExperienceStart } from '../../redux/current-user/current-user.actions';
import {
  showPopupApi,
  updateRandomDate
} from '../../redux/api-utilities/api-utilities.actions';

import styles from './edit-experience.styles';

const EditExperience = ({
  navigation,
  currentEmployee,
  editEmployeeExperienceStart,
  getCityNameById,
  citiesList,
  currencies,
  showPopupApi,
  updateRandomDate
}) => {
  const exp = navigation.getParam('experience');

  const [experience, setExperience] = useState(
    !!exp
      ? { ...exp, location: getCityNameById(exp.location_id) }
      : {
          position: '',
          organization: '',
          location_id: '',
          description: '',
          salary: '',
          currency: '',
          from: null,
          current: false,
          to: null,
          certificate_image: null,
          location: '',
          hasCertificate: false
        }
  );

  const {
    _id,
    position,
    organization,
    description,
    location,
    salary,
    currency,
    hasCertificate,
    from,
    current,
    to
  } = experience;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) =>
    setExperience(prevEdu => ({ ...prevEdu, [name]: value }));

  const _handleLocationSelect = ({ id }) =>
    setExperience(prev => ({ ...prev, location_id: id }));

  const _handleSubmit = () => {
    const { location, from, to, ...rest } = experience;
    const formatedFrom = from ? new Date(from).toString() : null;
    const formatedTo = to ? new Date(to).toString() : null;
    setDisabled(true);
    editEmployeeExperienceStart(
      { ...rest, from: formatedFrom, to: formatedTo },
      err => {
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

        updateRandomDate();
        showPopupApi({
          message: 'Experience edited successfully',
          duration: 600
        });
        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={!!exp ? 'Edit Experience' : 'Add Experience'} />
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
        <ScrollView>
          <ImagePicker
            defaultImage={
              hasCertificate
                ? `${URLS.SERVE_EXPERIENCE_CERTIFICATE}/${currentEmployee._id}/${_id}`
                : null
            }
            onImageTaken={image =>
              setExperience(prev => ({
                ...prev,
                certificate_image: image
              }))
            }
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Position"
            value={position}
            name="position"
            onChange={_handleChange}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Organization"
            value={organization}
            name="organization"
            onChange={_handleChange}
          />

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            list={citiesList}
            label="Location"
            value={location}
            onSelect={_handleLocationSelect}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
          />

          <OutlinedInput
            style={{ margin: 10 }}
            keyboardType="number-pad"
            label="Salary"
            value={salary}
            name="salary"
            onChange={_handleChange}
          />

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            list={currencies}
            label="Currency"
            value={currency}
            onSelect={currency =>
              setExperience(prev => ({ ...prev, currency }))
            }
            listItem={currency => currency}
          />

          <CustomDatePicker
            placeholder="From Date"
            date={from}
            onDateChange={date =>
              setExperience(prevEdu => ({ ...prevEdu, from: date }))
            }
          />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginHorizontal: 10 }}
            onPress={() =>
              setExperience(prev => ({ ...prev, current: !current }))
            }
          >
            <Checkbox status={current ? 'checked' : 'unchecked'} />
            <Paragraph style={{ color: 'grey', textAlignVertical: 'center' }}>
              Current Experience
            </Paragraph>
          </TouchableOpacity>

          {!current && (
            <CustomDatePicker
              placeholder="To Date"
              date={to}
              onDateChange={date =>
                setExperience(prev => ({ ...prev, to: date }))
              }
            />
          )}

          <OutlinedInput
            style={{ margin: 10 }}
            multiline
            numberOfLines={3}
            autoCapitalize="sentences"
            label="Description"
            value={description}
            name="description"
            onChange={_handleChange}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  citiesList: selectCitiesList(state),
  currentEmployee: selectCurrentEmployee(state),
  currencies: selectCurrencies(state),
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeExperienceStart: (info, callback) =>
    dispatch(editEmployeeExperienceStart(info, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails)),
  updateRandomDate: () => dispatch(updateRandomDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExperience);
