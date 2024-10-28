import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi untuk menyimpan data ke AsyncStorage
  const storeData = async (accessToken, role, jabatan, operation, status) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('jabatan', jabatan);
      await AsyncStorage.setItem('operation', JSON.stringify(operation));
      await AsyncStorage.setItem('status', status);
      console.log('Data berhasil disimpan ke AsyncStorage');
    } catch (e) {
      console.log('Gagal menyimpan data ke AsyncStorage', e);
    }
  };

  // Fungsi untuk handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Username dan Password harus diisi!');
      console.log('Validation Error: Username atau Password kosong.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password,
      });

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.status === 200) {
        const { accessToken, result, role, jabatan, operation, status } = response.data;
        // Alert.alert('Login Berhasil', `Selamat datang, ${role}!`);
        console.log('Login Successful:', { accessToken, result, role, jabatan, operation, status });

        // Simpan token dan informasi penting ke AsyncStorage
        await storeData(accessToken, role, jabatan, operation, status);

        // Navigasi ke halaman Home setelah login berhasil
        navigation.navigate('Home', { role, jabatan });
      } else {
        Alert.alert('Login Gagal', 'Username atau password salah.');
        console.log('Login Failed: Status bukan 200.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan pada server.');
      console.log('Login Error:', error);
    } finally {
      setLoading(false);
      console.log('Login process finished.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://thumbs.dreamstime.com/b/business-phone-call-black-man-suit-talking-contact-negotiation-feedback-b-deal-african-person-professional-327560714.jpg' }}
      style={tw`flex-1 justify-center`}
    >
      {/* Overlay for dim effect */}
      <View style={tw`absolute inset-0 bg-black opacity-40`} />

      <View style={tw`flex-1 justify-center items-center p-5`}>
        <View style={tw`w-11/12 bg-white rounded-lg p-5 shadow-lg justify-center items-center absolute bottom-12`}>
          
          <Text style={tw`text-left font-bold text-xs mb-6`}>
            Selamat Datang!{'\n'}
            Log in using your username and password to access the HR Talent app.
          </Text>

          {/* Username Input */}
          <TextInput
            style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base`}
            placeholder="Username"
            value={email}
            onChangeText={setemail}
          />

          {/* Password Input */}
          <TextInput
            style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base`}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={tw`text-blue-600 text-right w-full mb-5`}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={tw`w-full bg-red-600 py-3 rounded-lg items-center`} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={tw`text-white text-lg font-bold`}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
