import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch('http://10.0.2.2:3000/api/karyawan/get/data/self', {
          method: 'GET',
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data[0]); // Assuming the response is an array with a single object
        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 p-6 rounded-b-xl items-center`}>
        <TouchableOpacity style={tw`absolute top-10 left-4`} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={tw`flex mt-10`}>
          <Image
            source={{ uri: profileData?.dokumen || 'https://via.placeholder.com/150' }}
            style={tw`w-24 h-24 rounded-full content-center border-4 border-white mt-4`}
          />
          <Text style={tw`text-white  text-xl font-bold mt-2`}>{profileData?.nama || 'My Profile'}</Text>
          <Text style={tw`text-white text-2xl font-bold mt-1`}>{profileData?.jabatan || 'Personal'}</Text>
        </View>
      </View>

      <View style={tw`px-6 py-4`}>
        <ProfileItem label="Full Name" value={profileData?.nama || 'N/A'} />
        <ProfileItem label="Email Address" value={profileData?.email || 'N/A'} />
        <ProfileItem label="Phone Number" value={profileData?.notelp || 'N/A'} />
        <ProfileItem label="Address" value={profileData?.alamat || 'N/A'} />
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
