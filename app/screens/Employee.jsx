import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OvertimePage = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]); // State untuk menyimpan data karyawan
  const [search, setSearch] = useState(""); // State untuk menyimpan pencarian

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = { Authorization: accessToken };

        const response = await axios.get('http://10.0.2.2:3000/api/karyawan/get', { headers });
        setEmployees(response.data); // Simpan data karyawan ke dalam state
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    // Filter data karyawan berdasarkan pencarian
    const filteredEmployees = employees.filter((employee) =>
      employee.nama.toLowerCase().includes(search.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
        <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={tw`justify-center items-center`}>
          <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M27.9999 24.8576C32.0893 24.8576 35.4043 21.5843 35.4043 17.5465C35.4043 13.5086 32.0893 10.2354 27.9999 10.2354C23.9105 10.2354 20.5955 13.5086 20.5955 17.5465C20.5955 21.5843 23.9105 24.8576 27.9999 24.8576Z" fill="white" />
            {/* SVG paths lainnya */}
          </Svg>
          <Text style={tw`text-white font-bold text-3xl mt-2`}>Employee</Text>
          <Text style={tw`text-white text-xs`}>Hexaon Business Mitrasindo</Text>
        </View>
        <View>
          <TextInput
            style={tw`mt-2 px-2 py-1 rounded-lg border w-80 bg-white text-gray-700`}
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      <View style={tw`bg-white rounded-lg p-6 flex-1`}>
        {/* List Data Karyawan */}
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center justify-between border-b border-gray-200 py-4`}>
              {/* Tampilkan foto user di sebelah kiri */}
              <Image
                source={{ uri: item.dokumen }} // Asumsi bahwa dokumen adalah URL gambar
                style={tw`w-12 h-12 rounded-full mr-4`} // Gaya untuk foto profil dengan margin kanan
                resizeMode="cover"
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold`}>{item.nama}</Text>
                <Text style={tw`text-sm text-gray-500`}>Jabatan: {item.jabatan}</Text>
                <Text style={tw`text-sm text-gray-500`}>Status: {item.status}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OvertimePage;
