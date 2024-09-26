import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from "react-native";
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current; // Initialize animated value

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
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiC9hzmlKpf8irkfZ2cm0Vh75L8uK2GkfkZQ&s',
                            }}
                            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 8 }} // Fixed width & height in numbers
                        />
                        <View>
                            <Text style={tw`text-white font-bold text-lg`}>Yudis Threey</Text>
                            <Text style={tw`text-red-200 text-sm`}>UI/UX Designer</Text>
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
    )
}
export default Profile;