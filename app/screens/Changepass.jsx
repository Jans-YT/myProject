import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal,ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleApply = () => {
    // Validate password match and non-empty fields
    if (newPassword === confirmPassword && newPassword !== '') {
      setModalVisible(true); // Show the success modal
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Login'); // Navigate to Login page after modal
      }, 2000); // Delay before navigating to Login
    } else {
      alert('Passwords do not match or are empty!'); // Alert if passwords do not match
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Fixed Header Section */}
      <View style={tw`absolute top-0 left-0 right-0 bg-red-500 p-6 rounded-b-xl items-center z-10`}>
        {/* Back Button */}
        <TouchableOpacity
          style={tw`absolute top-10 left-4`}
          onPress={() => navigation.goBack()}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 7l-5 5 5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Title */}
        <Text style={tw`text-white text-xl font-bold mt-10`}>My Profile</Text>
        <Text style={tw`text-white text-2xl font-bold mt-1`}>Change Password</Text>
      </View>

      {/* Scrollable Content Section */}
      <ScrollView
        style={tw`flex-1 mt-36`} // Adds margin to prevent overlapping with the header
        contentContainerStyle={tw`pt-4`}
      >
        <View style={tw`px-6 py-4`}>
          {/* New Password Input */}
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg mb-4`}>
            <TextInput
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={tw`flex-1 p-4`}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={tw`p-2`}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d={showNewPassword ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.31 0-6-2.69-6-6 0-.52.07-1.02.18-1.5l8.32 8.32c-.48.11-.98.18-1.5.18zm7.32-2.32L4.68 4.68A7.96 7.96 0 0120 12c0 1.62-.48 3.12-1.32 4.38z" 
                  : "M12 4.5c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.52.07-1.02.18-1.5l8.32 8.32c-.48.11-.98.18-1.5.18zm7.32-2.32L4.68 4.68A7.96 7.96 0 0120 12c0 1.62-.48 3.12-1.32 4.38z"}
                  fill={showNewPassword ? "#4CAF50" : "#888"}
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg mb-4`}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={tw`flex-1 p-4`}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={tw`p-2`}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d={showConfirmPassword ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.31 0-6-2.69-6-6 0-.52.07-1.02.18-1.5l8.32 8.32c-.48.11-.98.18-1.5.18zm7.32-2.32L4.68 4.68A7.96 7.96 0 0120 12c0 1.62-.48 3.12-1.32 4.38z" 
                  : "M12 4.5c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.52.07-1.02.18-1.5l8.32 8.32c-.48.11-.98.18-1.5.18zm7.32-2.32L4.68 4.68A7.96 7.96 0 0120 12c0 1.62-.48 3.12-1.32 4.38z"}
                  fill={showConfirmPassword ? "#4CAF50" : "#888"}
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={tw`bg-red-500 p-4 rounded-lg items-center`}
            onPress={handleApply}
          >
            <Text style={tw`text-white text-lg font-bold`}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-8 rounded-lg items-center`}>
            {/* Icon Checklist */}
            <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z"
                fill="#4CAF50"
              />
            </Svg>
            <Text style={tw`text-black text-lg font-bold mt-4`}>Overtime Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePassword;
