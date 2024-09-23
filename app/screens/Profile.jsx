import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Container 1: Red Header Section */}
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-xl`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute top-10 left-4`} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Profile Image */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiC9hzmlKpf8irkfZ2cm0Vh75L8uK2GkfkZQ&s' }}
          style={tw`w-24 h-24 rounded-full mt-8`}
        />

        {/* Profile Name and Title */}
        <Text style={tw`text-white font-bold text-xl mt-4`}>Yudis Threey</Text>
        <Text style={tw`text-white text-sm`}>Lead UI/UX Designer</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={tw`bg-white rounded-full px-6 py-2 mt-4`} onPress={() => navigation.navigate('Myprofile')}>
          <Text style={tw`text-red-500 font-bold`}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Container 2: White Scrollable Section */}
      <ScrollView style={tw`bg-white flex-1 mt-4`}>
        {/* My Profile */}
        <TouchableOpacity style={tw`flex-row justify-between items-center px-6 py-4 border-b border-gray-300`} onPress={() => navigation.navigate('Myprofile')}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#000" />
            </Svg>
            <Text style={tw`text-black ml-4`}>My Profile</Text>
          </View>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Company Bio */}
        <TouchableOpacity style={tw`flex-row justify-between items-center px-6 py-4 border-b border-gray-300`} onPress={() => navigation.navigate('Compbio')}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M3 13h18v8H3v-8zm0-2h18V7H3v4zm3-6h4V3H6v2zm5 0h4V3h-4v2zm5 0h4V3h-4v2z" fill="#000" />
            </Svg>
            <Text style={tw`text-black ml-4`}>Company Bio</Text>
          </View>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Change Password */}
        <TouchableOpacity style={tw`flex-row justify-between items-center px-6 py-4 border-b border-gray-300`} onPress={() => navigation.navigate('Changepass')}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12 2C7.58 2 4 5.58 4 10c0 3.31 2.69 6 6 6h2v2H8v2h8v-2h-4v-2h2c3.31 0 6-2.69 6-6 0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#000" />
            </Svg>
            <Text style={tw`text-black ml-4`}>Change Password</Text>
          </View>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Setting */}
        <TouchableOpacity style={tw`flex-row justify-between items-center px-6 py-4 border-b border-gray-300`}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M19.14 12.94l1.43-1.43-2.12-2.12-1.43 1.43c-.15-.06-.31-.1-.48-.12L16 9h-2V7.83L12.17 6 11 7.17V9H9l-.48-.12-1.43-1.43-2.12 2.12 1.43 1.43c-.06.15-.1.31-.12.48L7 12v2h2v1.83L11 18v-2h2v1.17L16.83 16H18v-2h1.83l.31-.31c.06-.17.1-.33.12-.5L19.14 12.94zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#000" />
            </Svg>
            <Text style={tw`text-black ml-4`}>Setting</Text>
          </View>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={tw`flex-row justify-between items-center px-6 py-4`}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M16 13v-2H7V9l-5 3 5 3v-2h9zm2-8H5V2h13a2 2 0 012 2v16a2 2 0 01-2 2H5v-3h13V5z" fill="#FF0000" />
            </Svg>
            <Text style={tw`text-red-500 ml-4`}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfilePage;