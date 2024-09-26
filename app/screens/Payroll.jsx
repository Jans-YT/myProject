import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const PayrollPage = () => {
  const navigation = useNavigation();

  const payrollData = [
    { date: '31', month: 'Jul', year: '2024', salary: '10.000.000,00', status: 'Success' },
    { date: '30', month: 'Jun', year: '2024', salary: '10.000.000,00', status: 'Success' },
    { date: '31', month: 'May', year: '2024', salary: '10.000.000,00', status: 'Success' },
    { date: '30', month: 'Apr', year: '2024', salary: '10.000.000,00', status: 'Success' },
    // Add more items as needed
  ];

  const handleNavigateToDetail = (item) => {
    navigation.navigate('PayrollDetail', { payrollItem: item });
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Section */}
      <View style={tw`bg-red-500 h-1/4 justify-center items-center`}>
        {/* Back Button */}
        <TouchableOpacity style={tw`absolute top-10 left-4`} onPress={() => navigation.navigate('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Dollar Icon and Payroll Text */}
        <View style={tw`justify-center items-center`}>
          <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17v-2h1v-1h-3v1h1v2h-1c-1.1 0-2-.9-2-2v-1H7v-2h1v-1H7V9h1V8h1V7c0-1.1.9-2 2-2h1V4h2v1h-1v1c1.1 0 2 .9 2 2v1h1v2h-1v1h1v2h-1v1c0 1.1-.9 2-2 2h-1v2h-2z"
              fill="white"
            />
          </Svg>
          <Text style={tw`text-white font-bold text-2xl mt-2`}>Payroll</Text>
        </View>
      </View>

      {/* Scrollable Payroll Information */}
      <View style={tw`bg-white rounded-t-xl p-4 flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {payrollData.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={tw`flex-row justify-between items-center border-b border-gray-300 py-4`}
              onPress={() => handleNavigateToDetail(item)}
            >
              <View>
                <Text style={tw`text-gray-600 text-lg`}>{item.date}</Text>
                <Text style={tw`text-gray-400`}>{item.month}</Text>
                <Text style={tw`text-gray-400`}>{item.year}</Text>
              </View>

              <View>
                <Text style={tw`text-black font-bold`}>Monthly Salary HBM</Text>
                <Text style={tw`text-gray-600`}>IDR {item.salary}</Text>
                <View style={tw`bg-green-300 rounded px-2 py-1 w-20`}>
                  <Text style={tw`text-white text-center text-sm`}>{item.status}</Text>
                </View>
              </View>
              
              {/* Right Arrow Icon */}
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PayrollPage;