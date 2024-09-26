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
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'history'

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
    <View style={tw`flex-1 bg-white`}>
      {/* Red Container */}
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        {/* Icon and Text */}
        <View style={tw`mb-4`}>
          <Svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M25.1429 4.64058L10.4717 9.64988C8.82917 10.2086 7.72949 11.7155 7.72949 13.4083V28.0666C7.72949 32.5314 9.39216 36.832 12.3871 40.1823C13.7979 41.7635 15.5954 43.0789 17.7759 44.2233L25.7199 48.3879C26.2156 48.6478 26.8126 48.6476 27.3082 48.3875L35.2382 44.2254C37.4128 43.0828 39.2105 41.7648 40.6214 40.1831C43.6118 36.8352 45.2712 32.5373 45.2712 28.0753V13.4083C45.2712 11.7155 44.1715 10.2086 42.5272 9.64926L27.8598 4.6413C26.9817 4.34104 26.0227 4.34104 25.1429 4.64058ZM26.7503 7.70478L41.4208 12.7139C41.7259 12.8176 41.9282 13.0949 41.9282 13.4077V28.0747C41.9282 31.7528 40.5606 35.295 38.096 38.0543L37.6583 38.5182C36.5976 39.5822 35.2614 40.5199 33.6488 41.3673L26.5117 45.1112L19.3643 41.3644C17.5155 40.3941 16.0341 39.3099 14.9125 38.0528C12.4434 35.2908 11.0729 31.746 11.0729 28.0661V13.4077C11.0729 13.0949 11.2752 12.8176 11.5785 12.7145L26.2502 7.70503C26.4121 7.6499 26.5897 7.6499 26.7503 7.70478ZM34.7934 20.404C34.1406 19.7697 33.0822 19.7697 32.4294 20.404L24.9225 27.6966L21.8891 24.7461L21.7016 24.5888C21.0474 24.1169 20.1187 24.1691 19.5251 24.7455C18.8721 25.3796 18.8718 26.4079 19.5245 27.0424L23.7413 31.1417L23.9288 31.299C24.5832 31.771 25.5121 31.7187 26.1056 31.142L34.7934 22.7008L34.9553 22.5187C35.4408 21.8828 35.3869 20.9806 34.7934 20.404Z" fill="white" />
          </Svg>
        </View>
        <Text style={tw`text-white text-xl font-bold text-center`}>
          Apply Leave
        </Text>
        <Text style={tw`text-white text-base text-center mt-2`}>
          Hurry back to work because your work is waiting
        </Text>
      </View>

      {/* White Container with Toggle Buttons */}
      <View style={tw`bg-white rounded-lg p-6 flex-1`}>
        {/* Tab Switcher */}
        <View style={tw`flex-row justify-around mb-4`}>
          <TouchableOpacity
            style={tw`p-2 ${activeTab === 'form' ? 'border-b-2 border-red-500' : ''}`}
            onPress={() => setActiveTab('form')}
          >
            <Text style={tw`${activeTab === 'form' ? 'text-red-500' : 'text-gray-500'}`}>Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`p-2 ${activeTab === 'history' ? 'border-b-2 border-red-500' : ''}`}
            onPress={() => setActiveTab('history')}
          >
            <Text style={tw`${activeTab === 'history' ? 'text-red-500' : 'text-gray-500'}`}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        {activeTab === 'form' && (
          <>
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
          </>
        )}

        {/* History Section */}
        {activeTab === 'history' && (
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
              <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z" fill="#4CAF50" />
            </Svg>
            <Text style={tw`text-black text-lg font-bold mt-4`}>Leave Applied Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ApplyLeavePage;