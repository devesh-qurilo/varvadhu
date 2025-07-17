import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';




const HEADER_HEIGHT_MARGIN = Platform.OS === 'android'? StatusBar.currentHeight : 0
const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Profile Viewed', description: 'John Doe viewed your profile.', time: '2 hrs ago' },
    { id: '2', title: 'Match Found', description: 'You have a new match!', time: '5 hrs ago' },
    { id: '3', title: 'New Message', description: 'You received a message from Priya.', time: '1 day ago' },
    // Add more notifications here
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  screenTitle: {
    marginTop:HEADER_HEIGHT_MARGIN,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6a0000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});
