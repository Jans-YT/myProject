import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const LaporanPage = () => {
  const navigation = useNavigation();
  const [information, setInformation] = useState('');
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState('');
  const [reportType, setReportType] = useState('dalam'); // default to 'dalam'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setUploadedFile(result);
      Alert.alert('File Uploaded', `File: ${result.name}`);
    } else {
      Alert.alert('Upload Canceled');
    }
  };

  const validateAndSubmit = async () => {
    if (!location) {
      Alert.alert('Error', 'Lokasi harus diisi');
      return;
    }
    if (!date) {
      Alert.alert('Error', 'Tanggal harus diisi');
      return;
    }
    if (reportType === 'luar' && !uploadedFile) {
      Alert.alert('Error', 'Laporan luar harus menyertakan file');
      return;
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'Access token tidak ditemukan');
        return;
      }

      // Mengatur waktu dalam format hh:mm
      const currentTime = new Date();
      const formattedTime = 
        `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;

      const requestBody = {
        lokasi: location,
        keterangan: information,
        jenis: reportType,
        tanggal: date.toISOString().split('T')[0],
        time: formattedTime, // Menggunakan waktu yang diformat
        dokumen: uploadedFile ? [uploadedFile.uri] : [],
      };

      const response = await fetch('http://10.0.2.2:3000/api/laporan/post', {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.text();
      if (response.status === 200) {
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.navigate('Home');
        }, 2000);
      } else {
        Alert.alert('Error', data);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Gagal mengirim laporan');
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={tw`p-4 mb-2 border border-gray-300 rounded`}>
      <Text style={tw`text-gray-700`}>Info: {item.info}</Text>
      <Text style={tw`text-gray-700`}>Date: {item.date}</Text>
      <Text style={tw`text-gray-700`}>Type: {item.type}</Text>
      {item.type === 'luar' && <Text style={tw`text-gray-700`}>Location: {item.location}</Text>}
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center`}>
        <TouchableOpacity
          style={tw`absolute mt-5 top-4 left-4`}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`justify-center items-center`}>
          <MaterialIcons name="attach-file" size={64} color="white" />
          <Text style={tw`text-white text-lg font-bold mt-2`}>Laporan</Text>
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
          <>
            <Text style={tw`text-gray-700 mb-2`}>Information</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter information"
              value={information}
              onChangeText={setInformation}
            />

            <Text style={tw`text-gray-700 mb-2`}>Location</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter location"
              value={location}
              onChangeText={setLocation}
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

            <Text style={tw`text-gray-700 mb-2`}>Jenis Laporan</Text>
            <View style={tw`flex-row mb-4`}>
              <TouchableOpacity
                style={tw`flex-1 p-2 ${reportType === 'dalam' ? 'bg-gray-300' : ''}`}
                onPress={() => setReportType('dalam')}
              >
                <Text>Dalam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 p-2 ${reportType === 'luar' ? 'bg-gray-300' : ''}`}
                onPress={() => setReportType('luar')}
              >
                <Text>Luar</Text>
              </TouchableOpacity>
            </View>

            {reportType === 'luar' && (
              <TouchableOpacity
                style={tw`border border-gray-300 rounded p-2 mb-4`}
                onPress={handleFileUpload}
              >
                <Text>{uploadedFile ? uploadedFile.name : 'Upload File'}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={tw`bg-red-500 p-3 rounded-full mb-4`}
              onPress={validateAndSubmit}
            >
              <Text style={tw`text-white text-center`}>Submit</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'history' && (
          <FlatList
            data={[]} // ganti dengan data history yang sesuai
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-8 rounded-lg items-center`}>
            <MaterialIcons name="check-circle" size={64} color="#4CAF50" />
            <Text style={tw`text-black text-lg font-bold mt-4`}>Laporan Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LaporanPage;
