// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import tw from 'tailwind-react-native-classnames';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation(); 

//   const handleLogin = async () => {
//     try {
      
//       const response = await axios.post('http://localhost:3000/api/auth/login', {
//         username,
//         password,
//       });

//       const { accessToken, result, role, jabatan, operation, status } = response.data;

      
//       if (!accessToken) {
//         throw new Error('Access token is undefined');
//       }

      
//       await AsyncStorage.setItem('accessToken', accessToken);
//       await AsyncStorage.setItem('role', role);
//       await AsyncStorage.setItem('result', result);
//       await AsyncStorage.setItem('jabatan', jabatan);
//       await AsyncStorage.setItem('operation', operation);
//       await AsyncStorage.setItem('status', status);

//       // Navigate to Home page upon successful login
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error('Login failed', error);

//       // Check if the error is related to accessToken or something else
//       if (error.message === 'Access token is undefined') {
//         Alert.alert('Login Failed', 'Invalid username or password.');
//       } else {
//         Alert.alert('Login Failed', 'An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://static.wikia.nocookie.net/the-muse-list/images/1/11/Moric.png/revision/latest?cb=20201222211907' }}
//       style={tw`flex-1 justify-center `}
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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  const handleLogin = () => {
    // Perform login logic here (e.g., validation, API call, etc.)
    navigation.navigate('Home'); // Navigate to Home page
  };

  return (
    <ImageBackground
      source={{ uri: 'https://static.wikia.nocookie.net/the-muse-list/images/1/11/Moric.png/revision/latest?cb=20201222211907' }}
      style={tw`flex-1 justify-center `}
    >
      <View style={tw`flex-1 justify-center items-center p-5`}>
        <View style={tw`w-11/12 bg-white rounded-lg p-5 shadow-lg justify-center items-center absolute bottom-12`}>
          <TouchableOpacity style={tw`absolute top-3 right-3 p-2`}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={tw`text-left font-bold text-xs mb-6`}>
            Selamat Datang!{'\n'}
            Log in using your username and password to access the HR Talent app.
          </Text>

          {/* Username Input */}
          <TextInput
            style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base`}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
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
            <Text style={tw`text-white text-lg font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

