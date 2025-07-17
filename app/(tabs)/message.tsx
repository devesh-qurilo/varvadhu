
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const MessagesListScreen = () => {

  const conversations = [
    {
      id: '1',
      name: 'Aaradhya Sharma',
      message: 'hello',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      online: true,
    },
    {
      id: '2',
      name: 'Ishita Verma',
      message: 'I am interested',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      online: false,
    },
    {
      id: '3',
      name: 'Ananya Mehta',
      message: 'Thanks for letting us know!',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      online: false,
    },
    {
      id: '4',
      name: 'Ridhima Kapoo',
      message: 'how are you',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      online: false,
    },
    {
      id: '5',
      name: 'Saanvi Bansal',
      message: 'Of course.',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      online: false,
    },
    {
      id: '6',
      name: 'Saanvi Bansal',
      message: 'Like your profile',
      time: '3:40 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      online: false,
    },
  ];

  const tabs = [
    { id: 'all', label: 'All', active: true },
    { id: 'accepted', label: 'Accepted', active: false },
    { id: 'interested', label: 'Interested', active: false },
    { id: 'call', label: 'Call', active: false },
  ];

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => router.push({ pathname: '(stack)/ChatScreen', params: { contact: JSON.stringify(item) } })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.message}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderTab = (tab) => (
    <TouchableOpacity
      key={tab.id}
      style={[styles.tab, tab.active && styles.activeTab]}
    >
      <Text style={[styles.tabText, tab.active && styles.activeTabText]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(renderTab)}
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

export default MessagesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#f0f0f0',
  // },
  // headerLeft: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // profileImage: {
  //   width: 32,
  //   height: 32,
  //   borderRadius: 16,
  //   marginRight: 12,
  // },
  // headerTitle: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   color: '#333',
  // },
  // notificationButton: {
  //   padding: 4,
  // },
  tabContainer: {
    // marginTop: HEADER_HEIGHT_MARGIN,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#8B0000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  conversationsList: {
    flex: 1,
    borderWidth:1
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  activeNavItem: {
    // Active nav item styles
  },
  navLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#8B0000',
  },
});

// export default styles;



