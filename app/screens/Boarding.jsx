import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);
      slideAnim.setValue(0);
    });
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(prevIndex);
      slideAnim.setValue(0);
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 30;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 30) {
        prevSlide();
      } else if (gestureState.dx < -30) {
        nextSlide();
      }
    },
  });

  return (
    <View style={tw`flex-1 justify-center items-center`} {...panResponder.panHandlers}>
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

      {/* Overlay for a dimming effect */}
      <View style={tw`absolute w-full h-full bg-black opacity-25`} />

      {/* Slide Text */}
      <View style={tw`absolute bottom-24 w-full items-center`}>
        <Text style={tw`text-white font-bold text-2xl text-center mb-5`}>{images[currentIndex].text}</Text>
        {/* Show button only on the last slide */}
        {currentIndex === images.length - 1 && (
          <TouchableOpacity
            style={tw`bg-red-600 py-3 px-10 rounded-full`}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={tw`text-white text-lg font-bold`}>Get Started!</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Indicators */}
      <View style={tw`absolute bottom-16 flex-row justify-center`}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              tw`w-3 h-3 mx-1 rounded-full`,
              {
                backgroundColor: currentIndex === index ? 'white' : 'gray',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SlideshowScreen;
