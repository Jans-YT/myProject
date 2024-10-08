import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'; // Import Axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Profile = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userData, setUserData] = useState({
        nama: "",
        dokumen: null, // Base64-encoded image string
        jabatan: "",
        cutimandiri: "",
    });
    const animation = useRef(new Animated.Value(0)).current; // Initialize animated value

    useEffect(() => {
        // Fetch user data from backend
        const fetchData = async () => {
            try {
                // Retrieve the token from AsyncStorage
                const accessToken = await AsyncStorage.getItem("accessToken");
                console.log(accessToken);

                // Ensure the token is retrieved
                if (!accessToken) {
                    throw new Error("Token tidak ditemukan.");
                }

                const headers = {
                    Authorization: ` ${accessToken}`, // Add Bearer token prefix
                };

                // Send the API request with the token in the header
                const apiUrl = `http://10.0.2.2:3000/api/karyawan/get/data/self`;

                const response = await axios.get(apiUrl, { headers });

                // Capture data from API response
                const userData = response.data[0];
                setUserData({
                    nama: userData.nama || "",
                    dokumen: userData.dokumen || null, // Assume this is Base64 string
                    jabatan: userData.jabatan || "",
                    cutimandiri: userData.cutimandiri || "",
                });

                // Store cutimandiri in AsyncStorage
                await AsyncStorage.setItem('cutimandiri', userData.cutimandiri);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isExpanded ? 1 : 0,
            duration: 300, // Duration of the animation
            useNativeDriver: false, // Height animations need to use the layout driver
        }).start();
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const announcementItems = [
        { label: 'Izin', number: Math.floor(Math.random() * 100) },
        { label: 'Cuti', number: Math.floor(Math.random() * 100) },
        { label: 'Sakit', number: Math.floor(Math.random() * 100) },
    ];

    const contentHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Adjust this range to the height of the expandable content
    });

    return (
        <View>
            <View style={tw`bg-red-700 rounded-b-3xl p-5 pb-16`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row items-center mt-6`}>
                        <Image
                            source={{
                                url: userData.dokumen
                                    ? `data:image/png;base64,${userData.dokumen}` // Assuming the document is in base64 format
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiC9hzmlKpf8irkfZ2cm0Vh75L8uK2GkfkZQ&s', // Default image if no Base64 data
                            }}
                            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 8 }} // Fixed width & height in numbers
                        />
                        <View>
                            <Text style={tw`text-white font-bold text-lg`}>{userData.nama}</Text>
                            <Text style={tw`text-red-200 text-sm`}>{userData.jabatan}</Text>
                        </View>
                    </View>
                    {/* Notification Icon */}
                    <TouchableOpacity>
                        <View style={tw`bg-white bg-opacity-40 p-2 mt-6 rounded-lg`}>
                            <Icon name="notifications" size={30} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Expandable Container */}
            <View style={tw`bg-red-900 rounded-2xl p-3 mx-5 -mt-9 shadow-lg`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-white font-bold text-lg`}>Information</Text>
                    <TouchableOpacity onPress={toggleExpand}>
                        <Icon
                            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <Animated.View style={[tw`mt-2 mb-2 overflow-hidden`, { height: contentHeight }]}>
                    {isExpanded && (
                        <View style={tw`flex-row flex-wrap justify-start p-4 rounded`}>
                            {announcementItems.map((item, index) => (
                                <View key={index} style={tw`items-center mb-4`}>
                                    <View style={tw`w-16 h-16 bg-white rounded-xl ml-6 items-center justify-center`}>
                                        <Text style={tw`text-black text-lg font-bold`}>{item.number}</Text>
                                    </View>
                                    <Text style={tw`ml-6 text-white text-sm font-semibold`}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </Animated.View>
            </View>
        </View>
    );
};

export default Profile;
