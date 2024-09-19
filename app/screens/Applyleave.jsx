import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ApplyLeavePage = () => {
  const [selectedSection, setSelectedSection] = useState('form'); // State untuk menentukan tampilan yang ditampilkan
  const [selectedLeaveType, setSelectedLeaveType] = useState('Sick Leave');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const navigation = useNavigation();

  const handleConfirmStartDate = (date) => {
    setStartDate(format(date, 'yyyy-MM-dd'));
    setStartDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date) => {
    setEndDate(format(date, 'yyyy-MM-dd'));
    setEndDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    const now = new Date();
    setCurrentTime(format(now, 'HH:mm:ss'));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Red Container */}
      <View style={tw`bg-red-500 flex-1 justify-center items-center`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Icon and Text */}
        <View style={tw`mb-4`}>
          <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="white"/>
          </Svg>
        </View>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          Apply Leave
        </Text>
        <Text style={tw`text-white text-lg text-center mt-2`}>
          Hurry back to work because your work is waiting
        </Text>
      </View>

      {/* White Container with Toggle Buttons */}
      <View style={tw`bg-white flex-1 rounded-t-3xl p-6`}>
        {/* Toggle Buttons */}
        <View style={tw`flex-row justify-between mb-4`}>
          <TouchableOpacity
            style={[tw`flex-1 p-2 rounded-l-lg`, selectedSection === 'form' ? tw`bg-red-500` : tw`bg-gray-300`]}
            onPress={() => setSelectedSection('form')}
          >
            <Text style={tw`text-center ${selectedSection === 'form' ? 'text-white' : 'text-black'}`}>Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`flex-1 p-2 rounded-r-lg`, selectedSection === 'history' ? tw`bg-red-500` : tw`bg-gray-300`]}
            onPress={() => setSelectedSection('history')}
          >
            <Text style={tw`text-center ${selectedSection === 'history' ? 'text-white' : 'text-black'}`}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering: Show Form or History */}
        {selectedSection === 'form' ? (
          <ScrollView contentContainerStyle={tw`flex-1`} showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Keterangan"
              style={tw`border border-gray-300 rounded p-2 mb-4`}
            />
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold mb-2`}>Leave Type</Text>
              <Picker
                selectedValue={selectedLeaveType}
                onValueChange={(itemValue) => setSelectedLeaveType(itemValue)}
                style={tw`border border-gray-300 rounded`}
              >
                <Picker.Item label="Sick Leave" value="Sick Leave" />
                <Picker.Item label="Personal Leave" value="Personal Leave" />
              </Picker>
            </View>
            <TouchableOpacity style={tw`border border-gray-300 rounded p-2 mb-4`} onPress={() => setStartDatePickerVisibility(true)}>
              <Text>{startDate || 'Start Date'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`border border-gray-300 rounded p-2 mb-4`} onPress={() => setEndDatePickerVisibility(true)}>
              <Text>{endDate || 'End Date'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-gray-200 rounded p-2 mb-4`}>
              <Text>Upload File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-red-500 rounded p-2`} onPress={handleSubmit}>
              <Text style={tw`text-white text-center`}>Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          // History Section
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gray-500`}>No leave requests found</Text>
          </View>
        )}
      </View>

      {/* Date Picker Modals */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisibility(false)}
      />

      {/* Notification Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>qqq
          <View style={tw`bg-white p-8 rounded-lg items-center`}>
            <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z" fill="#4CAF50"/>
            </Svg>
            <Text style={tw`text-black text-lg font-bold mt-4`}>Leave Applied Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ApplyLeavePage;  

