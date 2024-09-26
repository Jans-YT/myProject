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
            <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Dollar Icon and Payroll Text */}
        <View style={tw`justify-center items-center`}>
          <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M27.0833 2.34375V3.36914C27.6389 3.48633 28.1771 3.63281 28.6632 3.7793C29.7743 4.11133 30.434 5.40039 30.1389 6.65039C29.8437 7.90039 28.6979 8.64258 27.5868 8.31055C26.6406 8.02734 25.7552 7.83203 24.9653 7.82227C24.3316 7.8125 23.6892 7.98828 23.2813 8.25195C23.099 8.37891 23.0122 8.48633 22.9774 8.54492C22.9514 8.59375 22.9167 8.66211 22.9167 8.81836V8.87695C22.934 8.89648 22.9948 8.99414 23.2031 9.13086C23.7066 9.47266 24.4531 9.73633 25.5816 10.1172L25.6597 10.1465C26.6233 10.4688 27.908 10.9082 28.9497 11.6406C30.1389 12.4805 31.2153 13.877 31.2413 16.0254C31.2674 18.2227 30.2517 19.8242 28.9236 20.7617C28.342 21.1621 27.717 21.4453 27.0747 21.6211V22.6562C27.0747 23.9551 26.1458 25 24.9913 25C23.8368 25 22.908 23.9551 22.908 22.6562V21.543C22.0833 21.3184 21.3281 21.0254 20.6858 20.7813C20.5035 20.7129 20.3299 20.6445 20.1649 20.5859C19.0712 20.1758 18.4809 18.8477 18.8455 17.6172C19.2101 16.3867 20.3906 15.7227 21.4844 16.1328C21.7101 16.2207 21.9184 16.2988 22.1181 16.377C23.2986 16.8262 24.1493 17.1484 25.0608 17.1875C25.7552 17.2168 26.3715 17.0312 26.7274 16.7871C26.8924 16.6699 26.9705 16.5723 27.0052 16.5039C27.0399 16.4453 27.0833 16.3281 27.0747 16.1035V16.084C27.0747 15.9863 27.0747 15.8789 26.7274 15.6348C26.2326 15.2832 25.4861 15.0098 24.375 14.6289L24.2101 14.5703C23.2726 14.2578 22.0399 13.8379 21.0503 13.1641C19.8785 12.373 18.75 11.0156 18.7413 8.85742C18.7326 6.62109 19.8611 5.08789 21.1458 4.22852C21.7014 3.85742 22.3003 3.60352 22.8993 3.42773L22.9167 2.34375C22.9167 1.04492 23.8455 0 25 0C26.1545 0 27.0833 1.04492 27.0833 2.34375ZM49.3229 32.8418C50.4601 34.5801 50.1302 37.0215 48.5851 38.3008L37.5955 47.4121C35.5642 49.0918 33.1163 50 30.5903 50H2.77778C1.24132 50 0 48.6035 0 46.875V40.625C0 38.8965 1.24132 37.5 2.77778 37.5H5.97222L9.86979 33.9844C11.8403 32.207 14.2882 31.25 16.8142 31.25H30.5556C32.092 31.25 33.3333 32.6465 33.3333 34.375C33.3333 36.1035 32.092 37.5 30.5556 37.5H23.6111C22.8472 37.5 22.2222 38.2031 22.2222 39.0625C22.2222 39.9219 22.8472 40.625 23.6111 40.625H34.0799L44.4705 32.0117C46.0156 30.7324 48.1858 31.1035 49.3229 32.8418Z" fill="white" />
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
                <Path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PayrollPage;