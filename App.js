import React from 'react';
// import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './app/screens/LoginScreen'; // Import your LoginScreen
import HomeScreen from './app/screens/HomeScreen'; // Import your HomeScreen
// import Board from './app/screens/OnboardingScreen';
// import Check from './app/screens/CheckIn';
// import Load from './app/screens/Loading';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true, // Enable gestures for transition
          gestureDirection: 'horizontal', // Specify the gesture direction
          headerShown: false, // Hide the header
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Slide from right to left
                  }),
                },
              ],
            },
          }),
        }}
      >
        {/* <Stack.Screen name="Load" component={Load} /> */}
         {/* <Stack.Screen name="Board" component={Board} /> */}
        <Stack.Screen name="Login" component={HomeScreen} />
        {/* <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen name="Check" component={Check} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;