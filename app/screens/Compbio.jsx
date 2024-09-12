import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const CompanyBio = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Fixed Header Section */}
      <View style={tw`absolute top-0 left-0 right-0 bg-red-500 p-6 rounded-b-xl items-center z-10`}>
        {/* Back Button */}
        <TouchableOpacity
          style={tw`absolute top-10 left-4`}
          onPress={() => navigation.goBack()}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 7l-5 5 5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Title */}
        <Text style={tw`text-white text-xl font-bold mt-10`}>My Profile</Text>
        <Text style={tw`text-white text-2xl font-bold mt-1`}>Company Bio</Text>
      </View>

      {/* Scrollable Content Section */}
      <ScrollView
        style={tw`flex-1 mt-36`} // Adds margin to prevent overlapping with the header
        contentContainerStyle={tw`pt-4`}
      >
        <View style={tw`px-6 py-4`}>
          <ProfileItem label="Logo" value="data:image,asndj" />
          <ProfileItem label="Company Name" value="HBM" />
          <ProfileItem label="Company Phone Number" value="(+62) 812345678" />
          <ProfileItem label="Email" value="thejansen@hbm.co.id" />
          <ProfileItem label="Address" value="Jl. Grogol no.5" />
          <ProfileItem label="Alt Address" value="Jl. Grogol no.5" />
          <ProfileItem label="City" value="Jakarta" />
          <ProfileItem label="Industry" value="Food" />
          <ProfileItem label="Company Size" value="1000" />
          <ProfileItem label="Type Lama" value=".........." />
          <ProfileItem label="Type Baru" value=".........." />
          <ProfileItem label="Company Estable Date" value=".........." />
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileItem = ({ label, value }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-gray-500 mb-1`}>{label}</Text>
    <Text style={tw`text-black text-lg`}>{value}</Text>
  </View>
);

export default CompanyBio;
