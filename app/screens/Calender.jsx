import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path, Circle } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const navigation = useNavigation();

  // Dummy schedule data
  const schedules = {
    1: [
      { title: 'Meeting with Team', description: 'Project discussion', startTime: '10:00 AM', endTime: '11:00 AM' },
      { title: 'Lunch Break', description: 'Time for lunch', startTime: '1:00 PM', endTime: '2:00 PM' }
    ],
    2: [
      { title: 'Client Presentation', description: 'Presenting new ideas', startTime: '9:00 AM', endTime: '10:30 AM' }
    ],
    5: [
      { title: 'Team Building', description: 'Outdoor activities', startTime: '3:00 PM', endTime: '5:00 PM' }
    ],
    12: [
      { title: 'Project Review', description: 'Review project progress', startTime: '11:00 AM', endTime: '12:00 PM' },
      { title: 'Design Workshop', description: 'Creative workshop', startTime: '2:00 PM', endTime: '4:00 PM' }
    ]
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const onDateChange = (event, selected) => {
    const currentDate = selected || pickedDate;
    setShowDatePicker(false);
    setPickedDate(currentDate);
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    setSelectedDate(currentDate.getDate());
  };

  const formatSelectedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={tw`flex-auto`}>
      {/* Container 1: Header */}
      <View style={tw`bg-red-500 flex-auto justify-center items-center`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Calendar SVG */}
        <Svg height="100" width="100" viewBox="0 0 24 24" fill="white">
          <Path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
        </Svg>

        {/* Title */}
        <Text style={tw`text-white text-lg font-bold mt-2`}>Calendar</Text>
      </View>

      {/* Container 2: Calendar */}
      <View style={tw`bg-white flex-auto p-4`}>
        {/* Pilih Tanggal */}
        <Text style={tw`text-lg font-bold text-center`}>Pilih Tanggal</Text>
        <Text style={tw`text-center text-xl font-bold mb-4`}>
          {selectedDate ? `${selectedDate}/${month + 1}/${year}` : formatSelectedDate(pickedDate)}
        </Text>

        {/* Month and Year with Arrows */}
        <View style={tw`flex-row justify-between items-center py-2 px-8`}>
          <TouchableOpacity onPress={prevMonth}>
            <Svg height="24" width="24" viewBox="0 0 24 24" fill="black">
              <Path d="M15 18l-6-6 6-6" />
            </Svg>
          </TouchableOpacity>

          {/* Clickable Month and Year */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={tw`text-xl font-bold`}>
              {`${months[month]} ${year}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextMonth}>
            <Svg height="24" width="24" viewBox="0 0 24 24" fill="black">
              <Path d="M9 18l6-6-6-6" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Dates */}
        <ScrollView contentContainerStyle={tw`flex-wrap flex-row justify-center`}>
          {daysArray.map((day) => (
            <TouchableOpacity
              key={day}
              style={tw`w-12 h-12 m-1 justify-center items-center rounded-full ${
                selectedDate === day ? 'bg-red-500' : 'bg-white'
              }`}
              onPress={() => handleDatePress(day)}
            >
              <Text
                style={tw`text-lg ${
                  selectedDate === day ? 'text-white' : 'text-black'
                }`}
              >
                {day}
              </Text>
              {schedules[day] && (
                <Svg height="8" width="8" style={tw`absolute bottom-1`}>
                  <Circle cx="4" cy="4" r="4" fill={selectedDate === day ? 'white' : 'blue'} />
                </Svg>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* DatePicker */}
        {showDatePicker && (
          <DateTimePicker
            value={pickedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      {/* Container 3: Schedule for Selected Day */}
      <View style={tw`bg-gray-100 flex-auto p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>
          Schedule for {selectedDate ? `${selectedDate} ${months[month]} ${year}` : 'Select a date'}
        </Text>

        <ScrollView>
          {selectedDate && schedules[selectedDate] ? (
            schedules[selectedDate].map((schedule, index) => (
              <View key={index} style={tw`bg-white p-4 mb-2 rounded-lg shadow`}>
                <Text style={tw`text-xl font-bold`}>{schedule.title}</Text>
                <Text style={tw`text-gray-600 mb-1`}>{schedule.description}</Text>
                <Text style={tw`text-gray-800`}>
                  {schedule.startTime} - {schedule.endTime}
                </Text>
              </View>
            ))
          ) : (
            <Text style={tw`text-gray-600`}>No schedule available for this day.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CalendarPage;
