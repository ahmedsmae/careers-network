import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Appbar, TextInput, Text, Divider } from 'react-native-paper';

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

class EditEmployeeEnfo extends React.Component {
  // navigation, currentEmployee, editEmployeeInfoStart, citiesList, getCityName, loading, errorMessage
  constructor(props) {
    super(props);
    const city = props.getCityName(props.currentEmployee.location_id);

    this.state = {
      first_name: props.currentEmployee.first_name,
      middle_name: props.currentEmployee.middle_name,
      last_name: props.currentEmployee.last_name,
      contact_number: props.currentEmployee.contact_number,
      location_id: props.currentEmployee.location_id,
      web_site: props.currentEmployee.web_site,
      bio: props.currentEmployee.bio,
      location: `${city.city} - ${city.country}`,
      filtering: false
    };
  }

  _handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  _handleLocationSelect = ({ id, city, country }) => {
    this.setState({
      filtering: false,
      location: `${city} - ${country}`,
      location_id: id
    });
  };

  _handleSubmit = () => {
    const {
      editEmployeeInfoStart,
      loading,
      errorMessage,
      navigation
    } = this.props;
    const { location, filtering, ...rest } = this.state;
    editEmployeeInfoStart(rest);
    if (!loading && errorMessage.length === 0) {
      navigation.goBack();
    }
  };

  render() {
    const {
      first_name,
      middle_name,
      last_name,
      contact_number,
      web_site,
      bio,
      location,
      filtering
    } = this.state;
    const { navigation, citiesList } = this.props;
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.Action
            icon='menu'
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title='Edit your info' />
          <Appbar.Action icon='save' onPress={this._handleSubmit} />
        </Appbar.Header>

        <ScrollView>
          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='First Name'
            value={first_name}
            name='first_name'
            onChangeText={this._handleChange.bind(this, 'first_name')}
          />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='Middle Name'
            value={middle_name}
            name='middle_name'
            onChangeText={this._handleChange.bind(this, 'middle_name')}
          />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            autoCapitalize='words'
            label='Last Name'
            value={last_name}
            name='last_name'
            onChangeText={this._handleChange.bind(this, 'last_name')}
          />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            keyboardType='phone-pad'
            label='Contact Number'
            value={contact_number}
            name='contact_number'
            onChangeText={this._handleChange.bind(this, 'contact_number')}
          />

          <TextInput
            style={{ marginHorizontal: 10, marginTop: 10 }}
            value={location}
            mode='outlined'
            autoCapitalize='none'
            label='Location'
            onChangeText={text =>
              this.setState({ location: text, filtering: true })
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
                            onPress={this._handleLocationSelect.bind(
                              this,
                              city
                            )}
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
            onChangeText={this._handleChange.bind(this, 'web_site')}
          />

          <TextInput
            style={{ margin: 10 }}
            mode='outlined'
            multiline
            autoCapitalize='sentences'
            label='Bio'
            value={bio}
            name='bio'
            onChangeText={this._handleChange.bind(this, 'bio')}
          />
        </ScrollView>
      </View>
    );
  }
}

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
