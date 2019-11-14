import React, { useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import {
  Appbar,
  Chip,
  Button,
  IconButton,
  Title,
  Divider,
  Caption
} from "react-native-paper";
import { OutlinedInput, Filter } from "../../components";

import { selectCurrentEmployee } from "../../redux/current-user/current-user.selectors";
import {
  selectCityNameById,
  selectCitiesList
} from "../../redux/constants/constants.selectors";

import {} from "../../redux/current-user/current-user.actions";

const HomeSettings = ({
  navigation,
  currentEmployee: { prefered_jobs_settings },
  citiesList,
  getCityNameById
}) => {
  const [keywords, setKeywords] = useState(
    prefered_jobs_settings.keywords || []
  );
  const [locationIds, setLocationIds] = useState(
    prefered_jobs_settings.location_ids || []
  );

  const [currentKeyword, setCurrentKeyword] = useState("");

  const _handleSubmit = () => {
    // action
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Prefered Jobs Settings" />
        <Appbar.Action icon="save" onPress={_handleSubmit} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView style={{ padding: 10 }}>
          <Title>Locations</Title>
          <Caption>Here you can select your favourite job locations</Caption>
          <View
            style={{
              marginVertical: 10,
              flexWrap: "wrap",
              alignItems: "flex-start",
              flexDirection: "row"
            }}
          >
            {locationIds.map((id, index) => (
              <Chip
                style={{ margin: 3 }}
                key={index}
                onClose={() =>
                  setLocationIds(prev => prev.filter((_, i) => i !== index))
                }
              >
                {getCityNameById(id)}
              </Chip>
            ))}
          </View>

          <Filter
            style={{ marginBottom: 10 }}
            list={citiesList}
            label="Location"
            onSelect={({ id }) => setLocationIds(prev => prev.concat(id))}
            filterItem="city"
            listItem={city => `${city.city} - ${city.country}`}
            clearAfterSelect
          />

          <Divider />

          <Title>Keywords</Title>
          <Caption>
            Here you can add any keywords for your favourite job
          </Caption>
          <View
            style={{
              marginVertical: 10,
              flexWrap: "wrap",
              alignItems: "flex-start",
              flexDirection: "row"
            }}
          >
            {keywords.map((word, index) => (
              <Chip
                style={{ margin: 3 }}
                key={index}
                onClose={() =>
                  setKeywords(prev => prev.filter((_, i) => i !== index))
                }
              >
                {word}
              </Chip>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%"
            }}
          >
            <OutlinedInput
              style={{ width: currentKeyword.length ? "85%" : null }}
              label="New Keyword"
              value={currentKeyword}
              onChange={({ value }) => setCurrentKeyword(value)}
            />

            {!!currentKeyword.length && (
              <IconButton
                style={{
                  width: 50,
                  height: 50,
                  paddingVertical: 5,
                  paddingRight: 10,
                  borderRadius: 5
                }}
                icon="check"
                size={30}
                color="green"
                onPress={() => {
                  setKeywords(prev => prev.concat(currentKeyword));
                  setCurrentKeyword("");
                }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  currentEmployee: selectCurrentEmployee(state),
  citiesList: selectCitiesList(state),
  getCityNameById: id => selectCityNameById(id)(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettings);
