import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';

const OvertimePage = () => {
  const navigation = useNavigation();
  const [note, setNote] = useState('');
  const [overtimeType, setOvertimeType] = useState('');
  const [rest, setRest] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('form'); // Untuk mengatur tab yang aktif

  // Contoh data riwayat overtime
  const historyData = [
    { id: '1', status: 'Accepted', date: '2024-09-17' },
    { id: '2', status: 'Rejected', date: '2024-09-16' },
    { id: '3', status: 'Accepted', date: '2024-09-15' },
  ];

  const handleOvertimeSubmit = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      navigation.navigate('Home');
    }, 2000); // Modal visible for 2 seconds before navigating
  };

  const renderHistoryItem = ({ item }) => {
    return (
      <View style={tw`p-4 mb-2 bg-gray-100 rounded-lg flex-row justify-between items-center`}>
        <Text style={tw`text-gray-800 font-bold`}>{item.date}</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray-600 mr-4`}>{item.status}</Text>
          <Icon name="download-outline" size={24} color="gray" />
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Container Pertama */}
      <View style={tw`bg-red-500 h-1/3 justify-center items-center`}>
        {/* Icon Panah Kiri */}
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Icon Jam dan Tulisan Overtime */}
        <View style={tw`justify-center items-center`}>
          <Icon name="time-outline" size={64} color="white" />
          <Text style={tw`text-white font-bold text-2xl mt-2`}>Overtime</Text>
        </View>
      </View>

      {/* Container Kedua */}
      <View style={tw`bg-white rounded-t-xl p-6 flex-1`}>
        {/* Tab Selection */}
        <View style={tw`flex-row mb-4`}>
          <TouchableOpacity
            style={tw`flex-1 p-3 ${selectedTab === 'form' ? 'bg-red-500' : 'bg-gray-200'} rounded-l-full`}
            onPress={() => setSelectedTab('form')}
          >
            <Text style={tw`text-center ${selectedTab === 'form' ? 'text-white' : 'text-gray-600'}`}>Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 p-3 ${selectedTab === 'history' ? 'bg-red-500' : 'bg-gray-200'} rounded-r-full`}
            onPress={() => setSelectedTab('history')}
          >
            <Text style={tw`text-center ${selectedTab === 'history' ? 'text-white' : 'text-gray-600'}`}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering Based on Selected Tab */}
        {selectedTab === 'form' ? (
          <View>
            {/* Note Input */}
            <Text style={tw`text-gray-700 mb-2`}>Note</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter note"
              value={note}
              onChangeText={setNote}
            />

            {/* Overtime Type Dropdown */}
            <Text style={tw`text-gray-700 mb-2`}>Overtime Type</Text>
            <View style={tw`border border-gray-300 rounded mb-4`}>
              <Picker
                selectedValue={overtimeType}
                onValueChange={(itemValue) => setOvertimeType(itemValue)}
              >
                <Picker.Item label="Select Overtime Type" value="" />
                <Picker.Item label="Setelah" value="setelah" />
                <Picker.Item label="Sebelum" value="sebelum" />
              </Picker>
            </View>

            {/* Rest Input */}
            <Text style={tw`text-gray-700 mb-2`}>Rest</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 mb-4`}
              placeholder="Enter rest"
              value={rest}
              onChangeText={setRest}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={tw`bg-red-500 p-3 rounded-full`}
              onPress={handleOvertimeSubmit}
            >
              <Text style={tw`text-white text-center`}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-1`}>
            <Text style={tw`text-gray-700 mb-4 text-lg font-bold`}>Overtime History</Text>
            <FlatList
              data={historyData}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>

      {/* Modal Notifikasi */}
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
            <Text style={tw`text-xl font-bold mt-4`}>Submission Successful!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OvertimePage;
