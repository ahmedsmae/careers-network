import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Headline, Title, Paragraph, Divider, Chip } from 'react-native-paper';
import moment from 'moment';

import { selectCityNameById } from '../../redux/constants/constants.selectors';

import styles from './show-job.styles';

const ShowJob = ({
  job: {
    position,
    location_id,
    referance_number,
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
    createdAt
  },
  getCityNameById
}) => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ display: position ? 'flex' : 'none' }}>
        <Paragraph>Position</Paragraph>
        <Headline>{position}</Headline>
      </View>

      <View style={{ display: location_id ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Location</Paragraph>
        <Title>{getCityNameById(location_id)}</Title>
      </View>

      <Divider style={{ marginTop: 10 }} />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Paragraph>Created At</Paragraph>
          <Title>{moment(createdAt).format('MMM Do')}</Title>
        </View>

        <View style={{ flex: 1, display: expiry ? 'flex' : 'none' }}>
          <Paragraph>Expire At</Paragraph>
          <Title>{expiry && moment(expiry).format('MMM Do')}</Title>
        </View>
      </View>

      <View style={{ display: referance_number ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Reference Number</Paragraph>
        <Title>{referance_number}</Title>
      </View>

      <View style={{ display: applying_link ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Applying Email</Paragraph>
        <Title>{applying_email}</Title>
      </View>

      <View style={{ display: applying_link ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Applying Link</Paragraph>
        <Title>{applying_link}</Title>
      </View>

      <View style={{ display: responsibilities ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Responsibilities</Paragraph>
        <Title>{responsibilities}</Title>
      </View>

      <View style={{ display: requirements ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Requirements</Paragraph>
        <Title>{requirements}</Title>
      </View>

      <View style={{ display: min_salary || max_salary ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Paragraph>Min Salary</Paragraph>
            <Title>{min_salary}</Title>
          </View>
          <View style={{ flex: 1 }}>
            <Paragraph>Max Salary</Paragraph>
            <Title>{max_salary}</Title>
          </View>
          <View style={{ flex: 1 }}>
            <Paragraph>Currency</Paragraph>
            <Title>{currency}</Title>
          </View>
        </View>
      </View>

      <View style={{ display: other_info ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Other Info</Paragraph>
        <Title>{other_info}</Title>
      </View>

      <View style={{ display: keywords && keywords.length ? 'flex' : 'none' }}>
        <Divider style={{ marginTop: 10 }} />
        <Paragraph>Keywords</Paragraph>
        <View
          style={{
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection: 'row'
          }}
        >
          {keywords.map((word, id) => (
            <Chip key={id} style={{ margin: 2 }}>
              {word}
            </Chip>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getCityNameById: id => selectCityNameById(id)(state)
});

export default connect(mapStateToProps)(ShowJob);
