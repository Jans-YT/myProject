import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwipeButton from 'rn-swipe-button';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Suppress the warning related to defaultProps
LogBox.ignoreLogs(['Support for defaultProps will be removed']);

const CheckIn = () => {
  const [selectedDate, setSelectedDate] = useState(0); // Index for the currently selected date
  const [serverTime, setServerTime] = useState('');
  const [masuk, setMasuk] = useState('');
  const [keluar, setKeluar] = useState('');
  const [checkInStatus, setCheckInStatus] = useState(null); // To track check-in status
  const navigation = useNavigation();

  // Date logic to show today and the past 5 days only
  const today = new Date();
  const dates = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return {
      day: date.getDate(),
      fullDate: date.toISOString().split('T')[0], // Store full date for backend requests
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  }).reverse(); // Reverse to show the most recent date at the end

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = { Authorization: accessToken };
        const response = await axios.get('http://10.0.2.2:3000/api/absensi/get/today/self', { headers });
        setServerTime(response.data.currtime);
        setMasuk(response.data.masuk);
        setKeluar(response.data.keluar);
        setCheckInStatus(response.data.status); // Set check-in status
      } catch (error) {
        console.error('Error fetching server time', error);
      }
    };

    fetchServerTime();

    const intervalId = setInterval(fetchServerTime, 1000); // Fetch every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Automatically select today's date in the scroll
    const todayDate = today.getDate();
    const todayIndex = dates.findIndex((date) => date.day === todayDate);
    if (todayIndex !== -1) {
      setSelectedDate(todayIndex); // Set the indicator to today's date
    }
  }, [dates]);

  // Handling check-in by connecting with the backend
  const handleSwipe = async () => {
    // If the user has already checked in, show a message
    if (checkInStatus === 'masuk' || checkInStatus === 'terlambat') {
      Alert.alert('Already Checked In', 'You have already checked in for the day.');
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = { Authorization: accessToken, 'Content-Type': 'application/json' };
      const apiSubmit = 'http://10.0.2.2:3000/api/absensi/patch/masuk';

      // Ambil waktu saat ini dari perangkat
      const now = new Date();
      const formattedTime = now.toTimeString().split(' ')[0]; // Format hh:mm:ss

      // Kirim waktu check-in ke backend
      await axios.patch(apiSubmit, { waktu_masuk: formattedTime }, { headers });
      Alert.alert('Check In Success', 'You have checked in successfully!');
      setCheckInStatus('masuk'); // Update check-in status after success
    } catch (error) {
      console.error('Error during check-in', error);
      Alert.alert('Check In Failed', 'An error occurred while checking in.');
    }
  };

  // Formatting server time for display
  const formatServerTime = (time) => {
    if (!time) return '';
    const [hours, minutes, seconds] = time.split(':').map((part) => part.padStart(2, '0'));
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-red-700 p-5 pt-12 rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold mt-10`}>
          Welcome back{'\n'}Yudis, Enjoy your work
        </Text>
        <Text style={tw`text-white text-2xl font-bold mt-1`}>{formatServerTime(serverTime)}</Text>
      </View>

      {/* Date Scroll - Show today and past 5 days */}
      <View style={tw`py-2 mx-5`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={tw`py-2`}
        >
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={tw`bg-white px-3 py-2 rounded-lg mx-1 w-14 h-14 items-center ${selectedDate === index ? 'bg-red-700' : ''}`}
              onPress={() => setSelectedDate(index)}
            >
              <Text style={tw`text-base font-bold ${selectedDate === index ? 'text-white' : 'text-black'}`}>
                {String(date.day).padStart(2, '0')}
              </Text>
              <Text style={tw`text-xs ${selectedDate === index ? 'text-white' : 'text-gray-600'}`}>
                {date.dayName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Attendance Log */}
      <View style={tw`flex px-5`}>
        <Text style={tw`text-lg font-bold mb-2`}>Attendance Log</Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`bg-white p-4 rounded-lg w-40 shadow-md`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Icon name="arrow-forward" size={16} color="red" />
              <Text style={tw`ml-1 font-bold text-black`}>Check In</Text>
            </View>
            <Text style={tw`text-xl text-black`}>{masuk || ''}</Text>
            <Text style={tw`text-sm text-gray-600`}>Yesterday</Text>
          </View>
          <View style={tw`bg-white p-4 rounded-lg w-40 shadow-md`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Icon name="arrow-back" size={16} color="red" />
              <Text style={tw`ml-1 font-bold text-black`}>Check Out</Text>
            </View>
            <Text style={tw`text-xl text-black`}>{keluar || ''}</Text>
            <Text style={tw`text-sm text-gray-600`}>Go Home</Text>
          </View>
        </View>
      </View>

      {/* Swipe to Check In */}
      <SwipeButton
        thumbIconBackgroundColor="#fff"
        thumbIconComponent={() => <Icon name="arrow-forward" size={20} color="#D32F2F" />}
        railBackgroundColor="#FFCDD2"
        railFillBackgroundColor="#D32F2F"
        railFillBorderColor="#D32F2F"
        title="Swipe to Check In"
        titleColor="#fff"
        titleFontSize={16}
        onSwipeSuccess={handleSwipe}
        containerStyles={tw`mx-5 mt-5`}
      />
    </View>
  );
};

export default CheckIn;
