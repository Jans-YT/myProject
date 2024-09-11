import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();

  const handleCapture = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', data.uri);

        // Show success notification
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Clock In Successful',
          text2: 'You have successfully clocked in.',
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => navigation.navigate('Home'),
        });
      } catch (error) {
        console.error('Error capturing photo:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Icon name="flash-on" size={30} color="#fff" />
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
