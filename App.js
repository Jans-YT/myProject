import React from 'react';
// import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/Login'; // Import your LoginScreen
import HomeScreen from './app/screens/HomeScreen'; // Import your HomeScreen
import Board from './app/screens/Boarding';
import Checkin from './app/screens/Checkin';
import Checkout from './app/screens/Checkout';
import Face from './app/screens/Facecapture';
import Leave from './app/screens/Applyleave';
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
         <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Face" component={Face} />
        <Stack.Screen name="Checkin" component={Checkin} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Leave" component={Leave} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;