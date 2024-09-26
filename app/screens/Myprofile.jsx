import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const MyProfile = ({ navigation }) => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 p-6  rounded-b-xl items-center`}>
        <TouchableOpacity style={tw`absolute top-10 left-4`} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={tw`flex mt-10`}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiC9hzmlKpf8irkfZ2cm0Vh75L8uK2GkfkZQ&s',
            }}
            style={tw`w-24 h-24 rounded-full border-4 border-white mt-4`}
          />
          <Text style={tw`text-white text-xl font-bold mt-2`}>My Profile</Text>
          <Text style={tw`text-white text-2xl font-bold mt-1`}>Personal</Text>
        </View>
      </View>

      <View style={tw`px-6 py-4`}>
        <ProfileItem label="Full Name" value="Yudis Threey" />
        <ProfileItem label="Email Address" value="Yudis Threey@gmail.com" />
        <ProfileItem label="Phone Number" value="(+62) 812345678" />
        <ProfileItem label="Address" value="Jl. Grogol no.5" />
      </View>
    </ScrollView>
  );
};

const ProfileItem = ({ label, value }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-gray-500 mb-1`}>{label}</Text>
    <Text style={tw`text-black text-lg`}>{value}</Text>
  </View>
);

export default MyProfile;