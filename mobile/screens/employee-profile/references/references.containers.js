import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { View, Text, ScrollView, Alert } from "react-native";
import { Appbar, Provider, Portal, FAB } from "react-native-paper";
import { Filter, PopupAlert } from "../../../components";

import { selectCurrentEmployee } from "../../../redux/current-user/current-user.selectors";

import { deleteEmployeeReferenceStart } from "../../../redux/current-user/current-user.actions";

import References from "./references.component";

import Colors from "../../../constants/colors";

const EmployeeEmployeeReferences = ({
  navigation,
  currentEmployee,
  deleteEmployeeReferenceStart
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);
  const [{ popupShow, popupMsg, popupWidth, popupType }, setPopup] = useState({
    popupShow: false,
    popupMsg: "",
    popupWidth: 150,
    popupType: "success"
  });

  const _handleDelete = referenceId => {
    deleteEmployeeReferenceStart(referenceId, err => {
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
        popupMsg: "Reference deleted successfully",
        popupShow: true,
        popupWidth: 300
      });
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your References" />
      </Appbar.Header>

      <Provider>
        <ScrollView>
          <References
            references={currentEmployee.references}
            onReferencePress={ref =>
              navigation.navigate("EditReference", { reference: ref })
            }
            onReferenceLongPress={referenceId =>
              Alert.alert(
                "Delete Reference",
                "Are you sure you want to delete this reference ?",
                [
                  {
                    text: "Yes",
                    onPress: _handleDelete.bind(this, referenceId)
                  },
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
            onDisplayComplete={() => setPopup({ popupShow: false })}
          />
        )}

        <Portal>
          <FAB.Group
            open={showFabOptions}
            icon={"settings"}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color="white"
            actions={[
              {
                icon: "add",
                label: "Reference",
                onPress: () => navigation.navigate("EditReference")
              },
              {
                icon: "list",
                label: "Profile Sections",
                onPress: () => navigation.navigate("EmployeeProfile")
              }
            ]}
            onStateChange={({ open }) => setShowFabOptions(open)}
            onPress={() => {
              if (showFabOptions) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </>
  );
};

const EmployerEmployeeReferences = ({ navigation }) => {
  const employee = navigation.getParam("reference");

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee References" />
      </Appbar.Header>

      <References references={employee.references} />

      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="list"
        onPress={() => navigation.navigate("EmployeeProfile")}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentEmployee: selectCurrentEmployee
});

const mapDispatchToProps = dispatch => ({
  deleteEmployeeReferenceStart: (referenceId, callback) =>
    dispatch(deleteEmployeeReferenceStart(referenceId, callback))
});

export const EmployeeEmployeeReferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeReferences);

export const EmployerEmployeeReferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeReferences);
