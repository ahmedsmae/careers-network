import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { Appbar, Portal, Provider, FAB } from "react-native-paper";

import {
  selectCurrentUser,
  selectCurrentEmployee,
  selectLoading
} from "../../../redux/current-user/current-user.selectors";
import { selectCityNameById } from "../../../redux/constants/constants.selectors";

// import { deleteEmployeeEducationStart } from '../../../redux/current-user/current-user.actions';

import Trainings from "./trainings.component";

import Colors from "../../../constants/colors";

const EmployeeEmployeeTrainings = ({
  currentEmployee,
  navigation,
  // deleteEmployeeEducationStart,
  ...props
}) => {
  const [showFabOptions, setShowFabOptions] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Your Trainings and Certifications" />
      </Appbar.Header>

      <Provider>
        <Trainings
          trainings_certifications={currentEmployee.trainings_certifications}
          employeeId={currentEmployee._id}
          onTrainingPress={train =>
            navigation.navigate("EditTraining", { training: train })
          }
          onTrainingLongPress={train =>
            Alert.alert(
              "Delete Training",
              "Are you sure you want to delete this training ?",
              [
                {
                  text: "Yes"
                  // onPress: () => deleteEmployeeEducationStart(edu._id)
                },
                { text: "Cancel" }
              ]
            )
          }
          {...props}
        />

        <Portal>
          <FAB.Group
            open={showFabOptions}
            icon={"settings"}
            fabStyle={{ backgroundColor: Colors.ACCENT }}
            color="white"
            actions={[
              {
                icon: "add",
                label: "Training",
                onPress: () => navigation.navigate("EditTraining")
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

const EmployerEmployeeTrainings = ({ navigation, ...props }) => {
  const employee = navigation.getParam("employee");

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Employee Trainings" />
      </Appbar.Header>

      <Trainings
        trainings_certifications={employee.trainings_certifications}
        employeeId={employee._id}
        {...props}
        currentUser={null}
      />

      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        small
        icon="list"
        onPress={() => navigation.navigate("EmployeeProfile")}
      />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  currentEmployee: selectCurrentEmployee(state),
  getCityNameById: id => selectCityNameById(id)(state),
  loading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  // deleteEmployeeEducationStart: id => dispatch(deleteEmployeeEducationStart(id))
});

export const EmployeeEmployeeTrainingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEmployeeTrainings);

export const EmployerEmployeeTrainingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerEmployeeTrainings);
