import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { View, Text, Picker } from "react-native";
import { Appbar, Card, Button, FAB, Divider } from "react-native-paper";
import { OutlinedInput, Filter } from "../../../components";

import { selectCurrentEmployee } from "../../../redux/current-user/current-user.selectors";
import {
  selectLanguages,
  selectLanguageLevels
} from "../../../redux/constants/constants.selectors";

import Languages from "./languages.component";

const EmployeeEmployeeLanguages = ({
  navigation,
  currentEmployee,
  languagesList,
  levelsList
}) => {
  const [addLanguage, setAddLanguage] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [languageQ, setLanguageQ] = useState("");
  const [level, setLevel] = useState(levelsList[2]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Languages" />
        <Appbar.Action
          icon={addLanguage ? "close" : "add"}
          onPress={() => setAddLanguage(!addLanguage)}
        />
      </Appbar.Header>

      {addLanguage && (
        <>
          <Card style={{ margin: 10 }}>
            <Card.Title
              title="Add Language"
              subtitle="type and select from list"
            />
            <Card.Content>
              <Filter
                list={languagesList}
                label="Language"
                onSelect={lang => setLanguageQ(lang)}
                listItem={lang => lang}
              />
              {/* <OutlinedInput
                label='Language'
                value={languageQ}
                onChange={({ value }) => {
                  setLanguageQ(value);
                  setFiltering(true);
                }}
                required='You should select a language'
              /> */}

              {/* {filtering && (
                <View
                  style={{
                    backgroundColor: 'lightgrey',
                    width: '100%',
                    maxHeight: 200,
                    overflow: 'hidden',
                    borderRadius: 5,
                    elevation: 10,
                    marginVertical: 5
                  }}
                >
                  {languagesList
                    .filter(
                      lang =>
                        languageQ.trim().length > 0 &&
                        lang
                          .toLowerCase()
                          .includes(languageQ.trim().toLowerCase())
                    )
                    .map((lang, index) => {
                      if (index < 10) {
                        return (
                          <View key={index}>
                            <Text
                              style={{ padding: 5, margin: 5, elevation: 11 }}
                              onPress={() => {
                                setLanguageQ(lang);
                                setFiltering(false);
                              }}
                            >
                              {lang}
                            </Text>
                            <Divider />
                          </View>
                        );
                      }
                    })}
                </View>
              )} */}

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "grey",
                  marginTop: 5,
                  borderRadius: 5,
                  height: 60,
                  justifyContent: "center"
                }}
              >
                <Picker
                  selectedValue={level}
                  onValueChange={lev => setLevel(lev)}
                >
                  {levelsList.map((level, index) => (
                    <Picker.Item key={index} label={level} value={level} />
                  ))}
                </Picker>
              </View>
            </Card.Content>
            <Card.Actions style={{ justifyContent: "center" }}>
              <Button mode="outlined" onPress={() => {}}>
                Add Language
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <Languages
        languages={currentEmployee.languages}
        levelsList={levelsList}
        onLongPress={() => {}}
      />

      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="list"
        onPress={() => navigation.navigate("EmployeeProfile")}
      />
    </>
  );
};

const EmployerEmployeeLanguages = ({ navigation }) => {
  const employee = navigation.getParam("employee");

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Languages" />
      </Appbar.Header>

      <Languages languages={employee.languages} levelsList={levelsList} />

      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="list"
        onPress={() => navigation.navigate("EmployeeProfile")}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  languagesList: selectLanguages,
  levelsList: selectLanguageLevels,
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({});

export const EmployeeEmployeeLanguagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeLanguages);

export const EmployerEmployeeLanguagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeLanguages);
