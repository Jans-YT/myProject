import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';

const ReimbursementPage = () => {
  const navigation = useNavigation();
  const [information, setInformation] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cost, setCost] = useState('');
  const [file, setFile] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      navigation.navigate('Home');
    }, 2000);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleCostChange = (text) => {
    // Remove non-numeric characters (except for dot and comma)
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Format the number with thousand separators
    const formattedCost = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setCost(formattedCost);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center `}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        <View style={tw`justify-center items-center `}>
          <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 3C6.48 3 2 7.48 2 12s4.48 9 10 9 10-4.48 10-9S17.52 3 12 3zm-1 14h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="white"
            />
          </Svg>
          <Text style={tw`text-white text-lg font-bold mt-2`}>Reimbursement</Text>
        </View>
      </View>

      <View style={tw`bg-white rounded-lg p-6 flex-1 `}>
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
