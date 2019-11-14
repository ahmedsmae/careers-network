import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import PopupChild from './popup.child.rnc';
import Loading from './loading.rnc';

const Parent = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDangerPopup, setShowDangerPopup] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSuccessPopup(true)}
      >
        <Text style={styles.buttonText}>SUCCESS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDangerPopup(true)}
      >
        <Text style={styles.buttonText}>DANGER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowLoading(true);
          setTimeout(() => {
            setShowLoading(false);
          }, 7000);
        }}
      >
        <Text style={styles.buttonText}>LOADING</Text>
      </TouchableOpacity>

      {showSuccessPopup && (
        <PopupChild
          MESSAGE_TEXT='Ahmed Afifi'
          MESSAGE_WIDTH={200}
          MESSAGE_TYPE='success'
          MESSAGE_DURATION={1000}
          onDisplayComplete={() => setShowSuccessPopup(false)}
        />
      )}

      {showDangerPopup && (
        <PopupChild
          MESSAGE_TEXT='Error type A'
          MESSAGE_WIDTH={200}
          MESSAGE_TYPE='danger'
          MESSAGE_DURATION={1500}
          onDisplayComplete={() => setShowDangerPopup(false)}
        />
      )}

      {showLoading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 10,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'brown'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Parent;
