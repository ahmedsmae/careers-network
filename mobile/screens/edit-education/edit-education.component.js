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
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import { editEmployeeEducationStart } from '../../redux/current-user/current-user.actions';
import {
  showPopupApi,
  updateRandomDate
} from '../../redux/api-utilities/api-utilities.actions';

import styles from './edit-education.styles';

const EditEducation = ({
  navigation,
  currentEmployee,
  editEmployeeEducationStart,
  getCityNameById,
  citiesList,
  showPopupApi,
  updateRandomDate
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
    hasCertificate,
    from,
    current,
    to
  } = education;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setEducation(prevEdu => ({ ...prevEdu, [name]: value }));
  };

  const _handleLocationSelect = ({ id }) =>
    setEducation(prev => ({ ...prev, location_id: id }));

  const _handleSubmit = () => {
    const { location, filtering, from, to, ...rest } = education;
    const formatedFrom = from ? new Date(from).toString() : null;
    const formatedTo = to ? new Date(to).toString() : null;
    setDisabled(true);
    editEmployeeEducationStart(
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
          message: 'Education edited successfully',
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
        <Appbar.Content title={!!edu ? 'Edit Education' : 'Add Education'} />
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
                ? `${URLS.SERVE_EDUCATION_CERTIFICATE}/${currentEmployee._id}/${_id}`
                : null
            }
            onImageTaken={image =>
              setEducation(prevEdu => ({
                ...prevEdu,
                certificate_image: image
              }))
            }
          />

          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Subject"
            value={subject}
            name="subject"
            onChange={_handleChange}
          />
          <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize="words"
            label="Institute"
            value={institute}
            name="institute"
            onChange={_handleChange}
          />

          <Filter
            style={{ width: '95%', marginHorizontal: 10 }}
            list={citiesList}
            label="Location"
            onSelect={_handleLocationSelect}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
          />

          <CustomDatePicker
            placeholder="From Date"
            date={from}
            onDateChange={date =>
              setEducation(prevEdu => ({ ...prevEdu, from: date }))
            }
          />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginHorizontal: 10 }}
            onPress={() =>
              setEducation(prev => ({ ...prev, current: !current }))
            }
          >
            <Checkbox status={current ? 'checked' : 'unchecked'} />
            <Paragraph style={{ color: 'grey', textAlignVertical: 'center' }}>
              Current Job
            </Paragraph>
          </TouchableOpacity>

          {!current && (
            <CustomDatePicker
              placeholder="To Date"
              date={to}
              onDateChange={date =>
                setEducation(prevEdu => ({ ...prevEdu, to: date }))
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
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeEducationStart: (info, callback) =>
    dispatch(editEmployeeEducationStart(info, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails)),
  updateRandomDate: () => dispatch(updateRandomDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEducation);
