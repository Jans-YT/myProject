import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Path } from 'react-native-svg';

const OvertimePage = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`bg-red-500 h-1/3 justify-center items-center rounded-b-3xl`}>
                <TouchableOpacity style={tw`absolute mt-5 top-4 left-4`} onPress={() => navigation.navigate('Home')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M14 7l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <View style={tw`justify-center items-center`}>
                    <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M27.9999 24.8576C32.0893 24.8576 35.4043 21.5843 35.4043 17.5465C35.4043 13.5086 32.0893 10.2354 27.9999 10.2354C23.9105 10.2354 20.5955 13.5086 20.5955 17.5465C20.5955 21.5843 23.9105 24.8576 27.9999 24.8576Z" fill="white" />
                        <Path d="M16.7689 18.2777H17.5156V17.6088C17.5201 15.6638 18.0688 13.7588 19.0997 12.1093C20.1306 10.4599 21.6025 9.1319 23.3489 8.27549C22.8319 7.08481 22.002 6.05639 20.9475 5.29946C19.8929 4.54253 18.6531 4.08535 17.3595 3.97649C16.066 3.86763 14.7672 4.11115 13.601 4.68118C12.4347 5.25121 11.4447 6.12646 10.7359 7.21399C10.0272 8.30151 9.62622 9.56069 9.57563 10.8578C9.52505 12.1549 9.82673 13.4415 10.4486 14.5809C11.0705 15.7203 11.9894 16.67 13.1077 17.3291C14.226 17.9882 15.5019 18.3322 16.8 18.3244L16.7689 18.2777ZM38.5156 17.5466V18.2155H39.2622C40.543 18.2026 41.7966 17.8447 42.8911 17.1795C43.9857 16.5142 44.8806 15.5662 45.4817 14.4352C46.0829 13.3042 46.368 12.032 46.3071 10.7526C46.2462 9.47325 45.8415 8.23394 45.1357 7.16515C44.4298 6.09637 43.4489 5.23764 42.2961 4.67935C41.1433 4.12107 39.8614 3.88387 38.5852 3.99274C37.309 4.10161 36.0857 4.55251 35.0442 5.29798C34.0026 6.04345 33.1813 7.05592 32.6667 8.22882C34.4136 9.08188 35.8871 10.4065 36.9207 12.0531C37.9543 13.6997 38.5067 15.6025 38.5156 17.5466ZM34.6733 25.5888C37.7659 26.202 40.7563 27.2494 43.5556 28.6999C43.95 28.9163 44.3072 29.1947 44.6133 29.5244H52.8889V24.2044C52.8904 24.0003 52.8361 23.7997 52.732 23.6243C52.6278 23.4488 52.4777 23.3052 52.2978 23.2088C48.266 21.1 43.7811 20.0054 39.2311 20.0199H38.2044C37.6653 22.2113 36.4255 24.1667 34.6733 25.5888ZM10.1578 32.5422C10.1549 31.7587 10.3665 30.9895 10.7696 30.3177C11.1727 29.6459 11.7519 29.0972 12.4444 28.731C15.2437 27.2805 18.2341 26.2331 21.3267 25.6199C19.583 24.2099 18.3439 22.2721 17.7956 20.0977H16.7689C12.2189 20.0832 7.73399 21.1778 3.70223 23.2866C3.52235 23.383 3.37222 23.5266 3.26805 23.7021C3.16387 23.8775 3.10961 24.0781 3.11111 24.2822V34.2222H10.1578V32.5422ZM33.3822 41.5177H42.6533V43.6955H33.3822V41.5177Z" fill="white" />
                        <Path d="M51.0377 33.0713H40.351V31.5158C40.351 31.1032 40.1872 30.7075 39.8954 30.4158C39.6037 30.1241 39.2081 29.9602 38.7955 29.9602C38.3829 29.9602 37.9873 30.1241 37.6955 30.4158C37.4038 30.7075 37.2399 31.1032 37.2399 31.5158V33.0713H34.2222V28.6691C32.1758 28.2376 30.0912 28.0135 27.9999 28.0002C23.0905 27.9817 18.2514 29.1674 13.9066 31.4535C13.7131 31.5539 13.5511 31.7058 13.4386 31.8925C13.326 32.0792 13.2673 32.2934 13.2688 32.5113V41.238H24.3288V50.7113C24.3288 51.1239 24.4927 51.5195 24.7844 51.8113C25.0762 52.103 25.4718 52.2669 25.8844 52.2669H51.0377C51.4503 52.2669 51.8459 52.103 52.1377 51.8113C52.4294 51.5195 52.5933 51.1239 52.5933 50.7113V34.6269C52.5933 34.2143 52.4294 33.8187 52.1377 33.5269C51.8459 33.2352 51.4503 33.0713 51.0377 33.0713ZM49.4822 49.1869H27.4399V36.1824H37.2399V37.598C37.2399 38.0106 37.4038 38.4062 37.6955 38.6979C37.9873 38.9897 38.3829 39.1535 38.7955 39.1535C39.2081 39.1535 39.6037 38.9897 39.8954 38.6979C40.1872 38.4062 40.351 38.0106 40.351 37.598V36.1824H49.4822V49.1869Z" fill="white" />
                    </Svg>
                    <Text style={tw`text-white font-bold text-3xl mt-2`}>Employee</Text>
                    <Text style={tw`text-white text-xs`}>Hexaon Business Mitrasindo</Text>
                </View>
                <View>
                    <TextInput style={tw`mt-2 px-2 py-1 rounded-lg border w-80 bg-white text-gray-700`}>
                        
                        search
                    </TextInput>
                </View>
            </View>

            <View style={tw`bg-white rounded-lg p-6 flex-1`}>

            </View>


        </View>
    );
};

export default OvertimePage;