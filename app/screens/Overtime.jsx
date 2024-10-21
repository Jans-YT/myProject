import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker'; // Import DateTimePicker
import moment from 'moment'; // Import moment untuk format waktu

// Fungsi untuk memformat tanggal menjadi dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const OvertimePage = () => {
  const navigation = useNavigation();
  const [note, setNote] = useState('');
  const [overtimeType, setOvertimeType] = useState('');
  const [rest, setRest] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [historyData, setHistoryData] = useState([]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  };

  const handleOvertimeSubmit = async () => {
    const token = await getToken();
    try {
      await axios.post(
        'http://10.0.2.2:3000/api/overtime/post',
        {
          note,
          mulai: startTime,
          selesai: endTime,
          tanggal_overtime: new Date().toISOString().split('T')[0],
          tipe: overtimeType === 'sebelum',
          breaktime: rest,
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.error('Error submitting overtime:', error);
      Alert.alert('Error', 'Failed to submit overtime. Please try again.');
    }
  };

  const fetchHistoryData = async () => {
    const token = await getToken();
    try {
      const response = await axios.get('http://10.0.2.2:3000/api/overtime/list', {
        headers: { Authorization: token },
      });
      const formattedData = response.data.map((item) => ({
        id: item.id,
        note: item.note,
        tanggal_overtime: formatDate(item.tanggal_overtime),
        status: item.status,
      }));
      setHistoryData(formattedData);
    } catch (error) {
      console.error('Error fetching history:', error);
      Alert.alert('Error', 'Failed to fetch overtime history.');
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistoryData();
    }
  }, [activeTab]);

  const handleStartTimeConfirm = (time) => {
    setStartTime(moment(time).format('HH:mm'));
    setStartPickerVisible(false);
  };

  const handleEndTimeConfirm = (time) => {
    setEndTime(moment(time).format('HH:mm'));
    setEndPickerVisible(false);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={tw`p-4 mb-2 bg-gray-100 rounded-lg flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-gray-800 font-bold`}>{item.tanggal_overtime}</Text>
        <Text style={tw`text-gray-700`}>{item.note}</Text>
      </View>
      {item.status === null ? (
        <Text style={tw`text-black`}>Waiting for approval</Text>
      ) : item.status ? (
        <Icon name="checkmark-circle" size={24} color="green" />
      ) : (
        <Icon name="close-circle" size={24} color="red" />
      )}
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={tw`justify-center items-center`}>
          <Icon name="time-outline" size={64} color="white" />
          <Text style={tw`text-white font-bold text-2xl mt-2`}>Overtime</Text>
        </View>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={tw`text-gray-700 mb-2`}>Note</Text>
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-4`}
                placeholder="Enter note"
                value={note}
                onChangeText={setNote}
              />

              <Text style={tw`text-gray-700 mb-2`}>Overtime Type</Text>
              <View style={tw`border border-gray-300 rounded mb-4`}>
                <Picker selectedValue={overtimeType} onValueChange={setOvertimeType}>
                  <Picker.Item label="Select Overtime Type" value="" />
                  <Picker.Item label="Sebelum Shift" value="sebelum" />
                  <Picker.Item label="Setelah Shift" value="setelah" />
                </Picker>
              </View>

              <Text style={tw`text-gray-700 mb-2`}>Start Time</Text>
              <TouchableOpacity onPress={() => setStartPickerVisible(true)}>
                <Text style={tw`border border-gray-300 rounded p-2 mb-4`}>{startTime || 'Select Start Time'}</Text>
              </TouchableOpacity>

              <Text style={tw`text-gray-700 mb-2`}>End Time</Text>
              <TouchableOpacity onPress={() => setEndPickerVisible(true)}>
                <Text style={tw`border border-gray-300 rounded p-2 mb-4`}>{endTime || 'Select End Time'}</Text>
              </TouchableOpacity>

              <DateTimePicker
                isVisible={isStartPickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={() => setStartPickerVisible(false)}
              />

              <DateTimePicker
                isVisible={isEndPickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={() => setEndPickerVisible(false)}
              />

              <Text style={tw`text-gray-700 mb-2`}>Rest</Text>
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-4`}
                placeholder="Enter rest time"
                value={rest}
                onChangeText={setRest}
              />


              <TouchableOpacity style={tw`bg-red-500 p-3 rounded-full`} onPress={handleOvertimeSubmit}>
                <Text style={tw`text-white text-center`}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {activeTab === 'history' && (
          <FlatList data={historyData} renderItem={renderHistoryItem} keyExtractor={(item) => item.id.toString()} />
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-8 rounded-lg items-center`}>
            <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z"
                fill="#4CAF50"
              />
            </Svg>
            <Text style={tw`text-xl font-bold mt-4`}>Submission Successful!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OvertimePage;
