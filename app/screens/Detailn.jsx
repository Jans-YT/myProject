import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const NotificationDetail = ({ route, navigation }) => {
  const { notification } = route.params;

  const handleDownload = (fileUrl) => {
    Linking.openURL(fileUrl); // Open URL to download the file
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url); // Check if the attachment is an image
  };

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
        <Text style={tw`text-blue-500`}>Back</Text>
      </TouchableOpacity>

      <Text style={tw`font-bold text-2xl mb-2`}>{notification.title}</Text>
      <Text style={tw`text-gray-700 mb-4`}>{notification.description}</Text>

      {notification.attachment && (
        <View>
          {isImage(notification.attachment) ? (
            <Image
              source={{ uri: notification.attachment }}
              style={tw`w-full h-64 rounded-lg`}
              resizeMode="contain"
            />
          ) : (
            <View>
              <Text style={tw`text-gray-500 mb-2`}>Attachment: {notification.attachment.split('/').pop()}</Text>
              <TouchableOpacity
                style={tw`bg-blue-500 px-4 py-2 rounded-lg`}
                onPress={() => handleDownload(notification.attachment)}
              >
                <Text style={tw`text-white font-bold`}>Download File</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default NotificationDetail;
