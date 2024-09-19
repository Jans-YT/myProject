import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';

const Navbar = ({ navigation }) => {
  return (
    <View style={tw`flex-row justify-around items-center bg-white py-2 border-t border-gray-300`}>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Group')}>
        <Icon name="group" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Add')}>
        <View style={tw`bg-red-600 rounded-full p-2`}>
          <Icon name="add" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Lapor')}>
        <Icon name="attach-file" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Profile')}>
        <Icon name="person" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
