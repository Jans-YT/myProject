import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyBio = () => {
  const [formData, setFormData] = useState({
    logo: '',
    company_name: '',
    company_phone_number: '',
    email: '',
    address: '',
    city: '',
    industry: '',
    company_size: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://10.0.2.2:3000/api/perusahaan/get';
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = { Authorization: accessToken };

        const companyResponse = await axios.get(apiUrl, { headers });
        if (companyResponse.data && companyResponse.data.length > 0) {
          const data = companyResponse.data[0];
          setFormData({
            logo: data.logo || '',
            company_name: data.company_name || '',
            company_phone_number: data.company_pnumber || '',
            email: data.email || '',
            address: data.address || '',
            city: data.city || '',
            industry: data.industry || '',
            company_size: data.company_size || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
        <Text style={tw`text-white text-xl font-bold mt-10`}>Company Profile</Text>

        {/* White Background Circle for Logo */}
        <View style={tw`w-28 h-28 rounded-full bg-white mt-4 items-center justify-center`}>
          {/* Company Logo */}
          {formData.logo ? (
            <Image
              source={{ uri: formData.logo }}
              style={tw`w-24 h-24 rounded-full`}
              resizeMode="contain"
            />
          ) : null}
        </View>

        <Text style={tw`text-white text-2xl font-bold mt-1`}>Company Bio</Text>
      </View>

      {/* Scrollable Content Section */}
      <ScrollView
        style={tw`flex-1 mt-44`} // Adjusted margin top to prevent overlapping with the header
        contentContainerStyle={tw`pt-4`}
      >
        <View style={tw`px-6 py-4`}>
          <ProfileItem label="Company Name" value={formData.company_name} />
          <ProfileItem label="Company Phone Number" value={formData.company_phone_number} />
          <ProfileItem label="Email" value={formData.email} />
          <ProfileItem label="Address" value={formData.address} />
          <ProfileItem label="City" value={formData.city} />
          <ProfileItem label="Industry" value={formData.industry} />
          <ProfileItem label="Company Size" value={formData.company_size} />
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
