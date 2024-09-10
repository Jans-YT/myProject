import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const images = [
  {
    url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?cs=srgb&dl=pexels-fauxels-3183197.jpg&fm=jpg',
    text: 'Welcome to Our App!',
  },
  {
    url: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?cs=srgb&dl=pexels-hillaryfox-1595385.jpg&fm=jpg',
    text: 'Enjoy the Best Experience!',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZSUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D',
    text: 'Join Us and Get Started!',
  },
];

const SlideshowScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [slideAnim] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        slideAnim.setValue(0);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {/* Current Image */}
      <Animated.View
        style={[
          tw`absolute w-full h-full`,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Image source={{ uri: images[currentIndex].url }} style={tw`w-full h-full opacity-75`} />
      </Animated.View>

      {/* Next Image */}
      <Animated.View
        style={[
          tw`absolute w-full h-full`,
          {
            transform: [{ translateX: slideAnim.interpolate({
              inputRange: [-screenWidth, 0],
              outputRange: [0, screenWidth],
            }) }],
          },
        ]}
      >
        <Image source={{ uri: images[nextIndex].url }} style={tw`w-full h-full opacity-75`} />
      </Animated.View>

      <View style={tw`absolute w-full h-full bg-black opacity-25`} />

      <View style={tw`absolute bottom-24 w-full items-center`}>
        <Text style={tw`text-white font-bold text-2xl text-center mb-5`}>{images[currentIndex].text}</Text>
        <TouchableOpacity
          style={tw`bg-red-600 py-3 px-10 rounded-full`}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={tw`text-white text-lg font-bold`}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlideshowScreen;
