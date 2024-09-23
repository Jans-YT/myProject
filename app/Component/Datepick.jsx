import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import tw from 'tailwind-react-native-classnames';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';

const DatePickerPage = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { setStartDate, setEndDate } = route.params;

  const handleConfirm = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Container pertama dengan tanggal */}
      <View style={tw`bg-red-500 flex-1 justify-center items-center`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute top-4 left-4`} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        <Text style={tw`text-white text-2xl`}>{selectedDate || 'No Date Selected'}</Text>
      </View>

      {/* Container kedua dengan DateTimePicker */}
      <View style={tw`bg-white flex-1 p-6`}>
        <TouchableOpacity style={tw`bg-gray-200 rounded p-4`} onPress={() => setDatePickerVisibility(true)}>
          <Text>{selectedDate || 'Pick a Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`bg-red-500 rounded p-4 mt-4`} onPress={() => {
          if (setStartDate) {
            setStartDate(selectedDate);
          } else if (setEndDate) {
            setEndDate(selectedDate);
          }
          navigation.goBack();
        }}>
          <Text style={tw`text-white text-center`}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default DatePickerPage;