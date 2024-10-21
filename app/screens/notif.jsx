import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const NotificationPage = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'http://10.0.2.2:3000/api/announcment/get'; // Backend API URL

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Retrieve token from AsyncStorage
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: accessToken, // Set the access token in the headers
          'Content-Type': 'application/json'
        }
      });
      const announcementData = response.data;
      const formattedNotifications = announcementData.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        attachment: item.attachment, // Added attachment
        time: new Date(item.tanggal_upload).toLocaleTimeString(),
        date: new Date(item.tanggal_upload).toDateString() === new Date().toDateString() ? 'today' : 'yesterday',
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NotificationDetail', { notification: item })} // Navigate to detail page
      style={tw`bg-white p-4 rounded-lg shadow mb-4`}
    >
      <Text style={tw`font-bold text-lg`}>{item.title}</Text>
      <Text style={tw`text-gray-500`}>{item.description}</Text>
      <Text style={tw`text-gray-400 text-xs`}>{item.time}</Text>
    </TouchableOpacity>
  );

  const todayNotifications = notifications.filter((item) => item.date === 'today');
  const yesterdayNotifications = notifications.filter((item) => item.date === 'yesterday');

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={tw`justify-center items-center`}>
          <Icon name="notifications" size={64} color="white" />
          <Text style={tw`text-white font-bold text-2xl mt-2`}>Notifications</Text>
        </View>
      </View>

      <View style={tw`bg-white rounded-lg p-6 flex-1`}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF0000" />
        ) : (
          <>
            {todayNotifications.length > 0 && (
              <>
                <Text style={tw`text-red-500 font-bold mb-4`}>Today</Text>
                <FlatList
                  data={todayNotifications}
                  renderItem={renderNotificationItem}
                  keyExtractor={(item) => item.id}
                />
              </>
            )}

            {yesterdayNotifications.length > 0 && (
              <>
                <View style={tw`border-b border-gray-300 my-4`} />
                <Text style={tw`text-red-500 font-bold mb-4`}>Yesterday</Text>
                <FlatList
                  data={yesterdayNotifications}
                  renderItem={renderNotificationItem}
                  keyExtractor={(item) => item.id}
                />
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default NotificationPage;
