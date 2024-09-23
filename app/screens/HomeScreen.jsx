import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from '../Component/Navbar'; // Import Navbar component
import tw from 'tailwind-react-native-classnames';

const HomeScreen = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // Initialize animated value

  // State for check-in and check-out times
  const [checkInTime, setCheckInTime] = useState('08:00');
  const [checkOutTime, setCheckOutTime] = useState('17:00');

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300, // Duration of the animation
      useNativeDriver: false, // Height animations need to use the layout driver
    }).start();
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const announcementItems = [
    { label: 'Izin', number: Math.floor(Math.random() * 100) },
    { label: 'Cuti', number: Math.floor(Math.random() * 100) },
    { label: 'Sakit', number: Math.floor(Math.random() * 100) },
  ];

  const gridItems = [
    { title: 'Check In', icon: 'login', onPress: () => navigation.navigate('Checkin') },
    { title: 'Check Out', icon: 'logout', onPress: () => navigation.navigate('Checkout') },
    { title: 'Apply Leave', icon: 'work', onPress: () => navigation.navigate('Leave') },
    { title: 'Overtime', icon: 'access-time', onPress: () => navigation.navigate('Overtime') },
    { title: 'Reimburse', icon: 'receipt', onPress: () => navigation.navigate('Reimburse') },
    { title: 'Calendar', icon: 'calendar-today', onPress: () => navigation.navigate('Calender') },
    { title: 'Resign', icon: 'exit-to-app', onPress: () => navigation.navigate('Resign') },
    { title: 'Payroll', icon: 'attach-money', onPress: () => navigation.navigate('Payroll') },
  ];

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust this range to the height of the expandable content
  });

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Red Header Section */}
      <View style={tw`bg-red-700 rounded-b-3xl p-5 pb-16`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center mt-6`}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiC9hzmlKpf8irkfZ2cm0Vh75L8uK2GkfkZQ&s',
              }}
              style={{ width: 60, height: 60, borderRadius: 30, marginRight: 8 }} // Fixed width & height in numbers
            />
            <View>
              <Text style={tw`text-white font-bold text-lg`}>Yudis Threey</Text>
              <Text style={tw`text-red-200 text-sm`}>UI/UX Designer</Text>
            </View>
          </View>
          {/* Notification Icon */}
          <TouchableOpacity>
            <View style={tw`bg-white bg-opacity-40 p-2 mt-6 rounded-lg`}>
              <Icon name="notifications" size={30} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expandable Container */}
      <View style={tw`bg-red-900 rounded-lg p-3 mx-5 -mt-9 shadow-lg`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-white font-bold text-lg`}>Information</Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Icon
              name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <Animated.View style={[tw`mt-2 mb-2 overflow-hidden`, { height: contentHeight }]}>
          {isExpanded && (
            <View style={tw`flex-row flex-wrap justify-start p-4 rounded`}>
              {announcementItems.map((item, index) => (
                <View key={index} style={tw`items-center mb-4`}>
                  <View style={tw`w-16 h-16 bg-white rounded-xl ml-6 items-center justify-center`}>
                    <Text style={tw`text-black text-lg font-bold`}>{item.number}</Text>
                  </View>
                  <Text style={tw`ml-6 text-white text-sm font-semibold`}>{item.label}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      </View>



      {/* Read Button */}
      {/* <View style={tw`bg-white rounded-lg py-2 px-5 mx-5 -mt-4 shadow-lg z-0`}>
        <TouchableOpacity
          style={tw`bg-blue-500 w-1/2 items-center rounded-lg self-center`}
          onPress={toggleExpand}
        >
          <Text style={tw`text-white text-lg font-bold`}>Read</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView style={tw`flex-1 mx-5 mt-5`} showsVerticalScrollIndicator={false}>
        {/* Grid Items */}
        <View style={[tw`bg-white rounded-lg p-3 h-52`]}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {gridItems.map((item, index) => (
              <View key={index} style={tw`w-14 h-14 rounded-lg mt-6 mx-2 items-center justify-center`}>
                <View style={tw`w-14`}>
                  <TouchableOpacity
                    style={tw`bg-red-600 w-full h-full rounded-2xl items-center justify-center border border-transparent`}
                    onPress={item.onPress}
                  >
                    <Icon name={item.icon} size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <Text style={tw`text-black w-20 text-xs mt-1 text-center`}>
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Check In and Check Out Buttons */}
        <View style={tw`flex-row justify-between mt-4`}>
          <View style={tw`w-1/2 pr-2`}>
            <TouchableOpacity
              style={[tw`h-24 flex-row items-center bg-white rounded-lg bg-white`]} // Inline style for percentage-based width
              onPress={() => navigation.navigate('Checkin')}
            >
              <View style={[tw`flex-row items-center bg-white rounded-lg bg-white ml-2`]}>
                <Icon name="arrow-forward" size={24} color="red" />
                <View style={tw`ml-2`}>
                  <Text style={tw`text-lg font-bold`}>Check In</Text>
                  <Text style={tw`text-gray-500`}>{checkInTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`w-1/2 pl-2`}>
            <TouchableOpacity
              style={[tw`h-24 flex-row items-center bg-white rounded-lg bg-white`]} // Inline style for percentage-based width
              onPress={() => navigation.navigate('Checkout')}
            >
              <View style={[tw`flex-row items-center bg-white rounded-lg bg-white pl-2`]}>
                <Icon name="arrow-back" size={24} color="red" />
                <View style={tw`ml-2`}>
                  <Text style={tw`text-lg font-bold`}>Check Out</Text>
                  <Text style={tw`text-gray-500`}>{checkOutTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Attendance Log Container */}

        <Text style={tw`text-lg font-bold mb-4 mt-2`}>Attendance Log</Text>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={tw`bg-white rounded-lg p-4 mb-4 shadow-lg`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm font-bold`}>24 February 2024 - 25 February 2024</Text>
              <Text style={tw`text-sm font-bold`}>2 days</Text>
            </View>
            <View style={tw`border-b border-gray-300 my-2`} />
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-bold`}>Applied</Text>
              <View style={tw`bg-red-600 rounded-full px-3 py-1`}>
                <Text style={tw`text-white text-sm font-bold`}>Pending</Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`flex-row justify-center items-center bg-blue-600 rounded-lg py-2 px-5 mt-3`}
            >
              <Text style={tw`text-white text-lg font-bold mr-2`}>Leave</Text>
              <Icon name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Navbar at the bottom */}
      <Navbar navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
