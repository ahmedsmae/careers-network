import React, { useState } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Appbar, Checkbox, Paragraph } from "react-native-paper";
import {
  OutlinedInput,
  ImagePicker,
  Filter,
  CustomDatePicker
} from "../../components";

import URLS from "../../redux/utils/urls";

import {
  selectCurrentEmployee,
  selectLoading,
  selectErrorMessage
} from "../../redux/current-user/current-user.selectors";
import {
  selectCityNameById,
  selectCitiesList
} from "../../redux/constants/constants.selectors";
import { editEmployeeEducationStart } from "../../redux/current-user/current-user.actions";

import styles from "./edit-education.styles";

const EditEducation = ({
  navigation,
  currentEmployee,
  editEmployeeEducationStart,
  getCityNameById,
  citiesList,
  loading,
  errorMessage
}) => {
  const edu = navigation.getParam("education");

  const [education, setEducation] = useState(
    !!edu
      ? { ...edu, location: getCityNameById(edu.location_id), filtering: false }
      : {
          subject: "",
          institute: "",
          location_id: "",
          description: "",
          from: null,
          current: false,
          to: null,
          certificate_image: null,
          location: "",
          hasCertificate: false,
          filtering: false
        }
  );

  const {
    _id,
    subject,
    institute,
    description,
    // location,
    // filtering,
    hasCertificate,
    from,
    current,
    to
  } = education;

  const _handleChange = ({ name, value }) => {
    setEducation(prevEdu => ({ ...prevEdu, [name]: value }));
  };

  const _handleLocationSelect = ({ id, city, country }) => {
    setEducation(prev => ({
      ...prev,
      // filtering: false,
      // location: `${city} - ${country}`,
      location_id: id
    }));
  };

  const _handleSubmit = () => {
    const { location, filtering, from, to, ...rest } = education;
    const formatedFrom = from ? new Date(from).toString() : null;
    const formatedTo = to ? new Date(to).toString() : null;
    editEmployeeEducationStart({ ...rest, from: formatedFrom, to: formatedTo });
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={!!edu ? "Edit Education" : "Add Education"} />
        <Appbar.Action icon="save" onPress={_handleSubmit} />
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
            style={{ width: "95%", marginHorizontal: 10 }}
            list={citiesList}
            label="Location"
            onSelect={_handleLocationSelect}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
          />

          {/* <OutlinedInput
            style={{ margin: 10 }}
            autoCapitalize='none'
            label='Location'
            name='location'
            value={location}
            onChange={({ name, value }) =>
              setEducation(prev => ({
                ...prev,
                [name]: value,
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
          )} */}

          <CustomDatePicker
            placeholder="From Date"
            date={from}
            onDateChange={date =>
              setEducation(prevEdu => ({ ...prevEdu, from: date }))
            }
          />

          <TouchableOpacity
            style={{ flexDirection: "row", marginHorizontal: 10 }}
            onPress={() =>
              setEducation(prev => ({ ...prev, current: !current }))
            }
          >
            <Checkbox status={current ? "checked" : "unchecked"} />
            <Paragraph style={{ color: "grey", textAlignVertical: "center" }}>
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
  loading: selectLoading(state),
  errorMessage: selectErrorMessage(state),
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({
  editEmployeeEducationStart: info => dispatch(editEmployeeEducationStart(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEducation);
