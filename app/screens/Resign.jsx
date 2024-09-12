import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';

const ResignPage = () => {
  const navigation = useNavigation();
  const [reason, setReason] = useState('');
  const [resignDate, setResignDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleResignSubmit = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      navigation.navigate('Home');
    }, 2000); // Modal visible for 2 seconds before navigating
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || resignDate;
    setShowDatePicker(false);
    setResignDate(currentDate);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Container Pertama */}
      <View style={tw`bg-red-500 h-1/3 justify-center items-center`}>
        {/* Icon Panah Kiri */}
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Icon Pintu Keluar dan Tulisan Resign */}
        <View style={tw`justify-center items-center`}>
          <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 2v2H3v16h7v2h8V2h-8zm6 16h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V8h4v2zm0-4h-4V4h4v2z"
              fill="white"
            />
          </Svg>
          <Text style={tw`text-white font-bold text-2xl mt-2`}>Resign</Text>
        </View>
      </View>

      {/* Container Kedua */}
      <View style={tw`bg-white rounded-t-xl p-6 flex-1`}>
        {/* Reason Input */}
        <Text style={tw`text-gray-700 mb-2`}>Reason of Resign</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2 mb-4`}
          placeholder="Enter reason"
          value={reason}
          onChangeText={setReason}
        />

        {/* Resign Date Picker */}
        <Text style={tw`text-gray-700 mb-2`}>Resign Date</Text>
        <TouchableOpacity
          style={tw`border border-gray-300 rounded p-2 mb-4`}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{resignDate ? resignDate.toLocaleDateString('en-GB') : 'Select Date'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={resignDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Apply Button */}
        <TouchableOpacity
          style={tw`bg-red-500 p-3 rounded-full`}
          onPress={handleResignSubmit}
        >
          <Text style={tw`text-white text-center`}>Apply</Text>
        </TouchableOpacity>
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
            <Text style={tw`text-black text-lg font-bold mt-4`}>Resign Submitted</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResignPage;
