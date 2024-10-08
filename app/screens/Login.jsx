// Import libraries yang dibutuhkan
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi untuk handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Username dan Password harus diisi!");
      console.log("Validation Error: Username atau Password kosong.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password,
      });

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 200) {
        const { accessToken, result, role, jabatan, operation, status } = response.data;
        Alert.alert('Login Berhasil', `Selamat datang, ${role}!`);
        console.log("Login Successful:", { accessToken, result, role, jabatan, operation, status });
        // Simpan token di local storage atau navigation ke halaman lain
        navigation.navigate('Home', { role, jabatan });
      } else {
        Alert.alert('Login Gagal', 'Username atau password salah.');
        console.log("Login Failed: Status bukan 200.");
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan pada server.');
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
      console.log("Login process finished.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setemail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import tw from 'tailwind-react-native-classnames';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation(); // Get the navigation object

//   const handleLogin = () => {
//     // Perform login logic here (e.g., validation, API call, etc.)
//     navigation.navigate('Home'); // Navigate to Home page
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://static.wikia.nocookie.net/the-muse-list/images/1/11/Moric.png/revision/latest?cb=20201222211907' }}
//       style={tw`flex-1 justify-center`}
//     >
//       <View style={tw`flex-1 justify-center items-center p-5`}>
//         <View style={tw`w-11/12 bg-white rounded-lg p-5 shadow-lg justify-center items-center absolute bottom-12`}>
//           <TouchableOpacity style={tw`absolute top-3 right-3 p-2`}>
//             <Icon name="close" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={tw`text-left font-bold text-xs mb-6`}>
//             Selamat Datang!{'\n'}
//             Log in using your username and password to access the HR Talent app.
//           </Text>

//           {/* Username Input */}
//           <TextInput
//             style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base`}
//             placeholder="Username"
//             value={username}
//             onChangeText={setUsername}
//           />

//           {/* Password Input */}
//           <TextInput
//             style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base`}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />

//           {/* Forgot Password */}
//           <TouchableOpacity>
//             <Text style={tw`text-blue-600 text-right w-full mb-5`}>Forgot Password?</Text>
//           </TouchableOpacity>

//           {/* Login Button */}
//           <TouchableOpacity style={tw`w-full bg-red-600 py-3 rounded-lg items-center`} onPress={handleLogin}>
//             <Text style={tw`text-white text-lg font-bold`}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// export default LoginScreen;