import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import Svg, { Path } from 'react-native-svg';

const PayrollDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { payrollItem } = route.params; // Get the selected payroll item

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header with Back Button */}
      <View style={tw`bg-red-500 h-1/4 justify-center items-center`}>
        <TouchableOpacity style={tw`absolute top-4 left-4`} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
        <Text style={tw`text-white font-bold text-2xl mt-10`}>Payroll Detail</Text>
      </View>

      {/* Payroll Detail Section */}
      <View style={tw`p-6`}>
        <Text style={tw`text-xl font-bold mb-4`}>Monthly Salary HBM</Text>
        
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700`}>Date: {payrollItem.date}</Text>
          <Text style={tw`text-gray-700`}>Month: {payrollItem.month}</Text>
          <Text style={tw`text-gray-700`}>Year: {payrollItem.year}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700`}>Monthly Salary</Text>
          <Text style={tw`text-gray-900 font-bold`}>IDR {payrollItem.salary}</Text>
        </View>

        <View>
          <Text style={tw`text-gray-700`}>Status</Text>
          <View style={tw`bg-green-300 rounded px-2 py-1 w-20`}>
            <Text style={tw`text-white text-center text-sm`}>{payrollItem.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayrollDetail;