import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { View, Picker, ScrollView, Alert } from "react-native";
import { Appbar, Card, Button, FAB, Divider } from "react-native-paper";
import { Filter, PopupAlert } from "../../../components";

import { selectCurrentEmployee } from "../../../redux/current-user/current-user.selectors";
import {
  selectLanguages,
  selectLanguageLevels
} from "../../../redux/constants/constants.selectors";

import {
  addEmployeeLanguageStart,
  deleteEmployeeLanguageStart
} from "../../../redux/current-user/current-user.actions";

import Languages from "./languages.component";

const EmployeeEmployeeLanguages = ({
  navigation,
  currentEmployee,
  languagesList,
  levelsList,
  addEmployeeLanguageStart,
  deleteEmployeeLanguageStart
}) => {
  const [addLanguage, setAddLanguage] = useState(false);
  const [languageQ, setLanguageQ] = useState("");
  const [level, setLevel] = useState(levelsList[2]);
  const [disabled, setDisabled] = useState(false);
  const [{ popupShow, popupMsg, popupWidth, popupType }, setPopup] = useState({
    popupShow: false,
    popupMsg: "",
    popupWidth: 150,
    popupType: "success"
  });

  const _handleSubmit = () => {
    setDisabled(true);
    addEmployeeLanguageStart(
      { language: languageQ, level },
      // callback function
      err => {
        if (err) {
          setPopup({
            popupType: "danger",
            popupMsg:
              err.response && err.response.data && err.response.data.errors
                ? err.response.data.errors.map(err => err.msg).toString()
                : "Please check your connection",
            popupShow: true,
            popupWidth: 300
          });
          setDisabled(false);
          return console.log(err);
        }

        setPopup({
          popupType: "success",
          popupMsg: "Language added successfully",
          popupShow: true,
          popupWidth: 300
        });
        setLanguageQ("");
        setLevel(levelsList[2]);
        setAddLanguage(false);
        setDisabled(false);
      }
    );
  };

  const _handleDelete = languageId => {
    deleteEmployeeLanguageStart(languageId, err => {
      if (err) {
        setPopup({
          popupType: "danger",
          popupMsg:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : "Please check your connection",
          popupShow: true,
          popupWidth: 300
        });
        return console.log(err);
      }

      setPopup({
        popupType: "success",
        popupMsg: "Language deleted successfully",
        popupShow: true,
        popupWidth: 300
      });
    });
  };

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
              <Button
                mode="outlined"
                disabled={disabled}
                onPress={_handleSubmit}
              >
                Add Language
              </Button>
            </Card.Actions>
          </Card>
          <Divider />
        </>
      )}

      <ScrollView>
        <Languages
          languages={currentEmployee.languages}
          levelsList={levelsList}
          onLanguageLongPress={languageId =>
            Alert.alert(
              "Delete Language",
              "Are you sure you want to delete this language ?",
              [
                { text: "Yes", onPress: _handleDelete.bind(this, languageId) },
                { text: "Cancel" }
              ]
            )
          }
        />
      </ScrollView>
      {popupShow && (
        <PopupAlert
          MESSAGE_TEXT={popupMsg}
          MESSAGE_WIDTH={popupWidth}
          MESSAGE_TYPE={popupType}
          MESSAGE_DURATION={1000}
          onDisplayComplete={() =>
            setPopup(prev => ({ ...prev, popupShow: false }))
          }
        />
      )}

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

const mapDispatchToProps = dispatch => ({
  addEmployeeLanguageStart: (languageData, callback) =>
    dispatch(addEmployeeLanguageStart(languageData, callback)),
  deleteEmployeeLanguageStart: (languageId, callback) =>
    dispatch(deleteEmployeeLanguageStart(languageId, callback))
});

export const EmployeeEmployeeLanguagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeLanguages);

export const EmployerEmployeeLanguagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeLanguages);
