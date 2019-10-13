import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import {
  Appbar,
  TextInput,
  RadioButton,
  Divider,
  Text,
  Caption,
  IconButton
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

import { selectCurrentEmployer } from '../../redux/current-user/current-user.selectors';
import {
  selectCityNameById,
  selectCitiesList
} from '../../redux/constants/constants.selectors';
import {
  selectLoading,
  selectErrorMessage
} from '../../redux/jobs/jobs.selectors';
import {
  createNewJobStart,
  updateExistingJobStart
} from '../../redux/jobs/jobs.actions';

import ManageKeywords from './manage-keywords.component';
import ManageQuestions from './manage-questions.component';

import styles from './edit-job.styles';

const EditJob = ({
  navigation,
  citiesList,
  getCityName,
  createNewJobStart,
  updateExistingJobStart,
  loading,
  errorMessage
}) => {
  const job = navigation.getParam('job');

  const [currentJob, setCurrentJob] = useState(
    job
      ? { ...job, location: getCityName(job.location_id), filtering: false }
      : {
          position: '',
          location_id: '',
          location: '',
          referance_number: '',
          status: 'AVAILABLE',
          applying_email: '',
          applying_link: '',
          responsibilities: '',
          requirements: '',
          min_salary: '',
          max_salary: '',
          currency: '',
          other_info: '',
          keywords: [],
          expiry: '',
          questions: [],
          filtering: false
        }
  );

  const {
    position,
    location_id,
    location,
    referance_number,
    status,
    applying_email,
    applying_link,
    responsibilities,
    requirements,
    min_salary,
    max_salary,
    currency,
    other_info,
    keywords,
    expiry,
    questions,
    filtering
  } = currentJob;

  const _handleChange = (name, value) => {
    setCurrentJob(prev => ({ ...prev, [name]: value }));
  };

  const _handleLocationSelect = ({ id, city, country }) => {
    setCurrentJob(prev => ({
      ...prev,
      filtering: false,
      location: `${city} - ${country}`,
      location_id: id
    }));
  };

  const _handleSave = () => {
    if (position.trim().length === 0) {
      Alert.alert('Missing Info', 'Position is required', [{ text: 'OK' }]);
      return;
    }

    if (applying_email.trim().length === 0) {
      Alert.alert('Missing Info', 'Applying Email is required', [
        { text: 'OK' }
      ]);
      return;
    }

    if (responsibilities.trim().length === 0) {
      Alert.alert('Missing Info', 'Job Responsibilities are required', [
        { text: 'OK' }
      ]);
      return;
    }

    if (requirements.trim().length === 0) {
      Alert.alert('Missing Info', 'Position Requirements are required', [
        { text: 'OK' }
      ]);
      return;
    }

    const { location, filtering, ...rest } = currentJob;
    job ? updateExistingJobStart(currentJob) : createNewJobStart(rest);
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={job ? 'Edit Job' : 'Add Job'} />
        <Appbar.Action icon='save' onPress={_handleSave} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.screen}
        behavior='padding'
        keyboardVerticalOffset={5}
      >
        <ScrollView>
          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='Position (Required)'
            value={position}
            name='position'
            onChangeText={_handleChange.bind(this, 'position')}
          />

          <Divider />

          <TextInput
            style={{ marginHorizontal: 10, marginTop: 10 }}
            value={location}
            mode='outlined'
            autoCapitalize='none'
            label='Location'
            onChangeText={text =>
              setCurrentJob(prev => ({
                ...prev,
                location: text,
                filtering: true
              }))
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

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            label='Reference Number'
            value={referance_number}
            name='referance_number'
            onChangeText={_handleChange.bind(this, 'referance_number')}
          />

          <Divider />

          <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
            Job Status
          </Text>
          <RadioButton.Group
            onValueChange={_handleChange.bind(this, 'status')}
            value={status}
          >
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 0 }}>
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <RadioButton value='AVAILABLE' />
                <Text style={{ fontSize: 16 }}>Available</Text>
              </View>
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <RadioButton value='TAKEN' />
                <Text style={{ fontSize: 16 }}>Taken</Text>
              </View>
            </View>
          </RadioButton.Group>

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            label='Applying Email (Required)'
            value={applying_email}
            name='applying_email'
            onChangeText={_handleChange.bind(this, 'applying_email')}
          />

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            keyboardType='url'
            label='Applying Link'
            value={applying_link}
            name='applying_link'
            onChangeText={_handleChange.bind(this, 'applying_link')}
          />

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            multiline
            autoCapitalize='sentences'
            label='Position Responsibilities (Required)'
            value={responsibilities}
            name='responsibilities'
            onChangeText={_handleChange.bind(this, 'responsibilities')}
          />

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            multiline
            autoCapitalize='sentences'
            label='Requirements (Required)'
            value={requirements}
            name='requirements'
            onChangeText={_handleChange.bind(this, 'requirements')}
          />

          <Divider />

          <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
            Salary Range
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ margin: 10, marginTop: 0, flex: 1 }}
              mode='outlined'
              keyboardType='number-pad'
              label='Minimum'
              value={min_salary}
              name='min_salary'
              onChangeText={_handleChange.bind(this, 'min_salary')}
            />

            <TextInput
              style={{ margin: 10, marginTop: 0, flex: 1 }}
              mode='outlined'
              keyboardType='number-pad'
              label='Maximum'
              value={max_salary}
              name='max_salary'
              onChangeText={_handleChange.bind(this, 'max_salary')}
            />

            <TextInput
              style={{ margin: 10, marginTop: 0, flex: 1 }}
              mode='outlined'
              keyboardType='default'
              label='Currency'
              value={currency}
              name='currency'
              onChangeText={_handleChange.bind(this, 'currency')}
            />
          </View>

          <Divider />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            multiline
            autoCapitalize='sentences'
            label='Extra Info'
            value={other_info}
            name='other_info'
            onChangeText={_handleChange.bind(this, 'other_info')}
          />

          <Divider />

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
            date={expiry}
            mode='date'
            showIcon={false}
            placeholder='Expiry Date'
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
            onDateChange={_handleChange.bind(this, 'expiry')}
          />

          <Divider />

          <ManageKeywords
            keywords={keywords}
            onAddKeyword={newKeyword => {
              setCurrentJob(prev => ({
                ...prev,
                keywords: keywords.concat(newKeyword.trim())
              }));
            }}
            onRemoveKeyword={index =>
              setCurrentJob(prev => ({
                ...prev,
                keywords: keywords.filter((_, i) => i !== index)
              }))
            }
          />

          <Divider style={{ marginTop: 10 }} />

          <ManageQuestions
            questions={questions}
            onAddQuestion={newQuestion => {
              setCurrentJob(prev => ({
                ...prev,
                questions: questions.concat(newQuestion)
              }));
            }}
            onRemoveQuestion={index =>
              setCurrentJob(prev => ({
                ...prev,
                questions: questions.filter((_, i) => i !== index)
              }))
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
  createNewJobStart: data => dispatch(createNewJobStart(data)),
  updateExistingJobStart: data => dispatch(updateExistingJobStart(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJob);
