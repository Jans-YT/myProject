import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ApplyLeavePage = () => {
  const [selectedLeaveType, setSelectedLeaveType] = useState('Sick Leave');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [alasan, setAlasan] = useState(''); 
  const [pengganti, setPengganti] = useState(''); 
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadAlert, setUploadAlert] = useState(false);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('form');

  const handleConfirmStartDate = (date) => {
    setStartDate(format(date, 'yyyy-MM-dd'));
    setStartDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date) => {
    setEndDate(format(date, 'yyyy-MM-dd'));
    setEndDatePickerVisibility(false);
  };

  const handleFileUpload = async (file) => {
    const maxSizeInBytes = 5000000;
    if (file.size > maxSizeInBytes) {
      setUploadAlert(true);
      return;
    }
    setUploadedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedLeaveType === 'Personal Leave' && !pengganti) {
      alert('Please specify a replacement for Personal Leave.');
      return;
    }

    const accessToken = await AsyncStorage.getItem('accessToken');
    const headers = { Authorization: accessToken };
    const requestData = {
      alasan,
      mulai: startDate,
      selesai: endDate,
      pengganti: selectedLeaveType === 'Personal Leave' ? pengganti : null,
      dokumen: uploadedFile ? uploadedFile.name : null,
    };

    const url = selectedLeaveType === 'Personal Leave'
      ? 'http://10.0.2.2:3000/api/pengajuan/post/cuti'
      : 'http://10.0.2.2:3000/api/pengajuan/post/izin';

    try {
      const response = await axios.post(url, requestData, { headers });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting leave:', error);
    }

    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold text-center`}>Apply Leave</Text>
      </View>

      <View style={tw`bg-white rounded-lg p-6 flex-1`}>
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

        {activeTab === 'form' && (
          <ScrollView contentContainerStyle={tw`flex-1`} showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Keterangan"
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              value={alasan}
              onChangeText={setAlasan}
            />
            <View style={tw`mb-4`}>
              <Text style={tw`font-bold mb-2`}>Leave Type</Text>
              <Picker
                selectedValue={selectedLeaveType}
                onValueChange={(itemValue) => setSelectedLeaveType(itemValue)}
                style={tw`border border-gray-300 rounded`}
              >
                <Picker.Item label="izin" value="Sick Leave" />
                <Picker.Item label="cuti" value="Personal Leave" />
              </Picker>
            </View>

            {selectedLeaveType === 'Personal Leave' && (
              <TextInput
                placeholder="Pengganti"
                style={tw`border border-gray-300 rounded p-2 mb-4`}
                value={pengganti}
                onChangeText={setPengganti}
              />
            )}

            <TouchableOpacity style={tw`border border-gray-300 rounded p-2 mb-4`} onPress={() => setStartDatePickerVisibility(true)}>
              <Text>{startDate || 'Start Date'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`border border-gray-300 rounded p-2 mb-4`} onPress={() => setEndDatePickerVisibility(true)}>
              <Text>{endDate || 'End Date'}</Text>
            </TouchableOpacity>

            {selectedLeaveType === 'Personal Leave' && (
              <View style={tw`mb-4`}>
                <Text style={tw`font-bold mb-2`}>Upload File (Optional)</Text>
                <TouchableOpacity style={tw`border border-gray-300 rounded p-2 mb-4`} onPress={() => alert('Choose file')}>
                  <Text>{uploadedFile ? uploadedFile.name : 'Upload a file'}</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={tw`bg-red-500 rounded p-2`} onPress={handleSubmit}>
              <Text style={tw`text-white text-center`}>Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeTab === 'history' && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gray-500`}>No leave requests found</Text>
          </View>
        )}
      </View>

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

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
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
