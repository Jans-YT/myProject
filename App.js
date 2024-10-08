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
import Overtime from './app/screens/Overtime';
import Reimburse from './app/screens/Reimburse';
import Calender from './app/screens/Calender';
import Resign from './app/screens/Resign';
import Payroll from './app/screens/Payroll';
import PayrollDetail from './app/screens/PayrollDetail';
import Profile from './app/screens/Profile';
import Myprofile from './app/screens/Myprofile';
import Compbio from './app/screens/Compbio';
import Changepass from './app/screens/Changepass';
import Lapor from './app/screens/Laporan';
import Employee from './app/screens/Employee'
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
        <Stack.Screen name="Overtime" component={Overtime} />
        <Stack.Screen name="Reimburse" component={Reimburse} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Resign" component={Resign} />
        <Stack.Screen name="Payroll" component={Payroll} />
        <Stack.Screen name="PayrollDetail" component={PayrollDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Myprofile" component={Myprofile} />
        <Stack.Screen name="Compbio" component={Compbio} />
        <Stack.Screen name="Changepass" component={Changepass} />
        <Stack.Screen name="Lapor" component={Lapor} />
        <Stack.Screen name="Employee" component={Employee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;