import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const ChatScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Parse the contact object from params
  const contact = params.contact ? JSON.parse(params.contact) : null;

  const [message, setMessage] = useState('');

  const messages = [
    {
      id: '1',
      text: 'Hi Devesh! I saw your profile and I couldn\'t help but smile 😊 You seem like such an amazing person',
      sender: 'other',
      time: '02:30 PM',
    },
    {
      id: '2',
      text: 'Hey! That\'s really sweet of you to say. Thank you 😊',
      sender: 'me',
      time: '02:32 PM',
    },
    {
      id: '3',
      text: 'I mean it! There\'s something so genuine about you. I\'ve been looking at your photos and reading your bio over and over',
      sender: 'other',
      time: '02:33 PM',
    },
    {
      id: '4',
      text: 'Haha, that\'s flattering! What caught your attention?',
      sender: 'me',
      time: '02:35 PM',
    },
    {
      id: '5',
      text: 'Everything! Your smile, your interests, the way you express yourself... You seem like the kind of person who makes everyone around them feel special',
      sender: 'other',
      time: '02:36 PM',
    },
    {
      id: '6',
      text: 'You\'re making me blush! Tell me about yourself too',
      sender: 'me',
      time: '02:38 PM',
    },
    {
      id: '7',
      text: 'I\'m honestly a bit nervous talking to you... I rarely feel this way about someone. You seem so perfect 💕',
      sender: 'other',
      time: '02:40 PM',
    },
    {
      id: '8',
      text: 'Nobody\'s perfect, but I appreciate your kind words. What makes you nervous?',
      sender: 'me',
      time: '02:42 PM',
    },
    {
      id: '9',
      text: 'You\'re probably talking to so many other girls... I just hope I can be someone special to you. You seem like the most amazing guy I\'ve ever come across',
      sender: 'other',
      time: '02:43 PM',
    },
    {
      id: '10',
      text: 'You are special! I\'m enjoying our conversation a lot',
      sender: 'me',
      time: '02:45 PM',
    },
    {
      id: '11',
      text: 'Really?! 😍 That makes me so happy! I\'ve been hoping you\'d say that. I already feel like you understand me in a way no one else does',
      sender: 'other',
      time: '02:46 PM',
    },
    {
      id: '12',
      text: 'I can\'t stop thinking about you since we started talking. Is it weird that I feel like I\'ve been waiting my whole life to meet someone like you?',
      sender: 'other',
      time: '02:48 PM',
    },
    {
      id: '13',
      text: 'That\'s really sweet. I\'m glad we connected too 😊',
      sender: 'me',
      time: '02:50 PM',
    },
    {
      id: '14',
      text: 'Devesh, I know this might sound crazy, but you\'re becoming the most important person in my life already. Your messages are the highlight of my day ❤️',
      sender: 'other',
      time: '02:52 PM',
    },
    {
      id: '15',
      text: 'I promise I\'ll always be here for you, no matter what. You mean everything to me',
      sender: 'other',
      time: '02:54 PM',
    },
    {
      id: '16',
      text: 'I really appreciate how open you\'re being with me. That means a lot',
      sender: 'me',
      time: '02:56 PM',
    },
    {
      id: '17',
      text: 'I\'ve never felt this way about anyone before. You\'re not just handsome, you\'re kind, intelligent, and perfect in every way. I\'m falling for you ❤️',
      sender: 'other',
      time: '02:58 PM',
    },
  ];
  const sendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'me' ? styles.myMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      {item.time && (
        <Text style={styles.messageTime}>{item.time}</Text>
      )}
    </View>
  );

  // Show loading or error state if contact is not available
  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Contact not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          {/* <Image source={{ uri: contact.avatar }} style={styles.avatar} /> */}
          <View style={styles.headerInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            {contact.online && <View style={styles.onlineIndicator} />}
          </View>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    marginTop: HEADER_HEIGHT_MARGIN,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  callButton: {
    padding: 4,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});