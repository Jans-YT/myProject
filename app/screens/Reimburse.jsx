import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import ip from '../ip'; // Ensure this points to your API base URL
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReimbursementPage = () => {
  const navigation = useNavigation();
  const [information, setInformation] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cost, setCost] = useState('');
  const [file, setFile] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'history'
  const [reimbursementHistory, setReimbursementHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const apiUrl = `http://10.0.2.2:3000/api/reimburst/get/data/self`; // Adjust to your endpoint
    const accessToken = await AsyncStorage.getItem('accessToken');
    const headers = { Authorization: accessToken };

    try {
      const response = await axios.get(apiUrl, { headers });
      setReimbursementHistory(response.data); // Assuming the response contains an array
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch reimbursement history');
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
      keterangan: information,
      biaya: cost.replace(/\./g, ''), // Removing formatting for backend
      tanggal: date ? date.toISOString().split('T')[0] : null, // Format date for backend
      // Assuming file is being uploaded
    };

    const apiUrl = `http://10.0.2.2:3000/api/reimburst/post`; // Adjust to your endpoint
    const accessToken = await AsyncStorage.getItem('accessToken');
    const headers = { Authorization: accessToken };

    try {
      const response = await axios.post(apiUrl, requestBody, { headers });
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        setActiveTab('history'); // Beralih ke tab history secara otomatis
        fetchHistory(); // Refresh history after submission
      }, 2000);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit reimbursement request');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleCostChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    const formattedCost = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setCost(formattedCost);
  };

  const renderHistoryItem = ({ item }) => {
    const isReimbursed = item.status === true; 
    const isRejected = item.status === false;
    const isPending = item.status === null; // Status null dianggap pending

    return (
      <View style={tw`p-4 mb-2 border border-gray-300 rounded`}>
        <Text style={tw`text-gray-700`}>Info: {item.keterangan}</Text>
        <Text style={tw`text-gray-700`}>Date: {item.tanggal}</Text>
        
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray-700 mr-2`}>Status: </Text>
          {isReimbursed ? (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z"
                fill="#4CAF50" // Hijau untuk checklist
              />
            </Svg>
          ) : isRejected ? (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                fill="#F44336" // Merah untuk silang
              />
            </Svg>
          ) : isPending ? (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-2h-2v2zm0-4h2V7h-2v5z"
                fill="#FFC107" // Kuning untuk tanda seru
              />
            </Svg>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        <View style={tw`justify-center items-center `}>
          <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M40.3729 31.4706C41.7242 28.259 42.0351 24.7046 41.2619 21.3072C40.4887 17.9097 38.6703 14.84 36.0622 12.5294C33.4542 10.2189 30.1876 8.78372 26.7218 8.42564C23.2559 8.06756 19.7649 8.80459 16.7396 10.5331L14.6708 6.91437C17.8327 5.10781 21.4128 4.16157 25.0543 4.16998C28.6958 4.17838 32.2716 5.14115 35.425 6.96229C44.7792 12.3644 48.3625 23.9269 44.0042 33.5665L46.8 35.181L38.1208 39.7935L37.7771 29.9727L40.3729 31.4706ZM9.64375 18.5415C8.29197 21.7533 7.9808 25.3081 8.75399 28.706C9.52719 32.1039 11.3459 35.174 13.9543 37.4847C16.5628 39.7954 19.8298 41.2305 23.2962 41.5882C26.7625 41.9459 30.2538 41.2083 33.2792 39.479L35.3458 43.0977C32.1838 44.9039 28.6036 45.8498 24.9621 45.8411C21.3206 45.8323 17.7449 44.8692 14.5917 43.0477C5.2375 37.6456 1.65417 26.0852 6.01458 16.4435L3.21875 14.8331L11.8958 10.2185L12.2396 20.0394L9.64375 18.5415ZM17.7167 29.1727H29.175C29.4513 29.1727 29.7162 29.063 29.9116 28.8676C30.1069 28.6723 30.2167 28.4073 30.2167 28.131C30.2167 27.8548 30.1069 27.5898 29.9116 27.3945C29.7162 27.1991 29.4513 27.0894 29.175 27.0894H20.8417C19.4603 27.0894 18.1356 26.5406 17.1588 25.5639C16.1821 24.5871 15.6333 23.2624 15.6333 21.881C15.6333 20.4997 16.1821 19.1749 17.1588 18.1982C18.1356 17.2214 19.4603 16.6727 20.8417 16.6727H22.925V14.5894H27.0917V16.6727H32.3V20.8394H20.8417C20.5654 20.8394 20.3004 20.9491 20.1051 21.1445C19.9097 21.3398 19.8 21.6048 19.8 21.881C19.8 22.1573 19.9097 22.4223 20.1051 22.6176C20.3004 22.813 20.5654 22.9227 20.8417 22.9227H29.175C30.5563 22.9227 31.8811 23.4714 32.8578 24.4482C33.8346 25.4249 34.3833 26.7497 34.3833 28.131C34.3833 29.5124 33.8346 30.8371 32.8578 31.8139C31.8811 32.7906 30.5563 33.3394 29.175 33.3394H27.0917V35.4227H22.925V33.3394H17.7167V29.1727Z" fill="white" />
          </Svg>

          <Text style={tw`text-white text-lg font-bold mt-2`}>Reimbursement</Text>
        </View>
      </View>

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
            <Text style={tw`text-gray-700 mb-2 `}>Information</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter information"
              value={information}
              onChangeText={setInformation}
            />

            <Text style={tw`text-gray-700 mb-2`}>Date</Text>
            <TouchableOpacity
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{date ? date.toLocaleDateString() : 'Select Date'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={tw`text-gray-700 mb-2`}>Cost</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter cost in IDR"
              keyboardType="numeric"
              value={cost}
              onChangeText={handleCostChange}
            />

            <Text style={tw`text-gray-700 mb-2`}>Upload File</Text>
            <TouchableOpacity
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              onPress={() => Alert.alert('File upload functionality not implemented')}
            >
              <Text>Select File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`bg-red-500 p-3 rounded-full`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white text-center`}>Submit</Text>
            </TouchableOpacity>
          </>
        )}

        {/* History Section */}
        {activeTab === 'history' && (
          <FlatList
            data={reimbursementHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-8 rounded-lg items-center`}>
            <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.83l-3.79-3.79 1.41-1.41L11 13.34l5.88-5.88 1.41 1.41L11 16.83z"
                fill="#4CAF50"
              />
            </Svg>
            <Text style={tw`text-black text-lg font-bold mt-4`}>Reimbursement Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReimbursementPage;
