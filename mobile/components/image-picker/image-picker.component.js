import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import DefaultUserImage from '../../assets/user.png';

import styles from './image-picker.styles';

const ImgPicker = ({ defaultImage, onImageTaken, style }) => {
  const [pickedImage, setPickedImage] = useState(defaultImage);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
    console.log(image.uri);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Image style={styles.image} source={DefaultUserImage} />
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <FAB style={styles.fab} small icon='create' onPress={handleTakeImage} />
    </View>
  );
};

export default ImgPicker;
