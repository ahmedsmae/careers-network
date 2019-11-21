import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker
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
import { editEmployeeTrainingStart } from '../../redux/current-user/current-user.actions';
import {
  showPopupApi,
  updateRandomDate
} from '../../redux/api-utilities/api-utilities.actions';

import styles from './edit-training.styles';

const EditTraining = ({
  navigation,
  currentEmployee,
  editEmployeeTrainingStart,
  getCityNameById,
  citiesList,
  showPopupApi,
  updateRandomDate
}) => {
  const train = navigation.getParam('training');

  const [training, setTraining] = useState(
    !!train
      ? { ...train, location: getCityNameById(train.location_id) }
      : {
          subject: '',
          kind: '',
          institute: '',
          location_id: '',
          description: '',
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
    subject,
    kind,
    institute,
    location,
    description,
    hasCertificate,
    from,
    current,
    to
  } = training;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) =>
    setTraining(prevEdu => ({ ...prevEdu, [name]: value }));

  const _handleLocationSelect = ({ id }) =>
    setTraining(prev => ({ ...prev, location_id: id }));

  const _handleSubmit = () => {
    const { location, from, to, ...rest } = training;
    const formatedFrom = from ? new Date(from).toString() : null;
    const formatedTo = to ? new Date(to).toString() : null;
    setDisabled(true);
    editEmployeeTrainingStart(
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
          message: 'Training edited successfully',
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
        <Appbar.Content
          title={
            !!train
              ? 'Edit Training/Certification'
              : 'Add Training/Certification'
          }
        />
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
                ? `${URLS.SERVE_TRAINING_CERTIFICATE}/${currentEmployee._id}/${_id}`
                : null
            }
            onImageTaken={image =>
              setTraining(prev => ({
                ...prev,
                certificate_image: image
              }))
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
              selectedValue={kind}
              onValueChange={value =>
                setTraining(prev => ({ ...prev, kind: value }))
              }
            >
              <Picker.Item color="grey" label="Choose Type" value={null} />
              <Picker.Item label="Training" value="Training" />
              <Picker.Item label="Certification" value="Certification" />
            </Picker>
          </View>

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
            value={location}
            label="Location"
            onSelect={_handleLocationSelect}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
          />

          <CustomDatePicker
            placeholder="From Date"
            date={from}
            onDateChange={date =>
              setTraining(prev => ({ ...prev, from: date }))
            }
          />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginHorizontal: 10 }}
            onPress={() =>
              setTraining(prev => ({ ...prev, current: !current }))
            }
          >
            <Checkbox status={current ? 'checked' : 'unchecked'} />
            <Paragraph style={{ color: 'grey', textAlignVertical: 'center' }}>
              Current Training/Certification
            </Paragraph>
          </TouchableOpacity>

          {!current && (
            <CustomDatePicker
              placeholder="To Date"
              date={to}
              onDateChange={date =>
                setTraining(prev => ({ ...prev, to: date }))
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
  editEmployeeTrainingStart: (info, callback) =>
    dispatch(editEmployeeTrainingStart(info, callback)),
  showPopupApi: popupDetails => dispatch(showPopupApi(popupDetails)),
  updateRandomDate: () => dispatch(updateRandomDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTraining);
