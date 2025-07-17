import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const HEADER_START = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// Sample data
const sampleProfiles = [
  {
    id: 1,
    name: 'Aaradhya Sharma',
    age: 28,
    location: 'Gurgaon',
    profession: 'Software Developer',
    salary: 'Earn 5-7 Lakh',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    status: 'online',
    premium: true,
    requestDate: '2 days ago',
  },
  {
    id: 2,
    name: 'Priya Patel',
    age: 26,
    location: 'Mumbai',
    profession: 'Marketing Manager',
    salary: 'Earn 4-6 Lakh',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
    status: 'offline',
    premium: false,
    requestDate: '1 week ago',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    age: 29,
    location: 'Bangalore',
    profession: 'Data Scientist',
    salary: 'Earn 8-10 Lakh',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face',
    status: 'online',
    premium: true,
    requestDate: '3 days ago',
  },
];

// Received Component
const ReceivedComponent = ({ profiles, onAccept, onDecline, onChat, onCall }) => {
  const renderProfileCard = (profile) => (
    <View key={profile.id} style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          {profile.premium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
            </View>
          )}
          <View style={[styles.statusIndicator, { backgroundColor: profile.status === 'online' ? '#34C759' : '#ccc' }]} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileAge}>{profile.age} Yrs. • {profile.location}</Text>
          <Text style={styles.profileLocation}>{profile.profession} • {profile.salary}</Text>
          <Text style={styles.requestDate}>Request received {profile.requestDate}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => onAccept(profile)}
        >
          <Ionicons name="checkmark-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.chatButton]}
          onPress={() => onChat(profile)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => onDecline(profile)}
        >
          <Ionicons name="close-outline" size={20} color="#666" />
          <Text style={[styles.actionButtonText, styles.declineButtonText]}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.sectionTitle}>Received Requests ({profiles.length})</Text>
      {profiles.map(renderProfileCard)}
    </View>
  );
};

// Accepted Component
const AcceptedComponent = ({ profiles, onChat, onCall, onRemove }) => {
  const renderAcceptedProfile = (profile) => (
    <View key={profile.id} style={styles.acceptedProfileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          {profile.premium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
            </View>
          )}
          <View style={[styles.statusIndicator, { backgroundColor: profile.status === 'online' ? '#34C759' : '#ccc' }]} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileAge}>{profile.age} Yrs. • {profile.location}</Text>
          <Text style={styles.profileLocation}>{profile.profession} • {profile.salary}</Text>
          <View style={styles.acceptedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#34C759" />
            <Text style={styles.acceptedText}>Accepted</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.chatButton]}
          onPress={() => onChat(profile)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.callButton]}
          onPress={() => onCall(profile)}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => onRemove(profile)}
        >
          <Ionicons name="trash-outline" size={20} color="#666" />
          <Text style={[styles.actionButtonText, styles.removeButtonText]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.sectionTitle}>Accepted Connections ({profiles.length})</Text>
      {profiles.length > 0 ? (
        profiles.map(renderAcceptedProfile)
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No accepted connections yet</Text>
          <Text style={styles.emptyStateSubtext}>Start connecting with people you're interested in</Text>
        </View>
      )}
    </View>
  );
};

// Sent Component
const SentComponent = ({ profiles, onWithdraw, onRemind }) => {
  const renderSentProfile = (profile) => (
    <View key={profile.id} style={styles.sentProfileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          {profile.premium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
            </View>
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileAge}>{profile.age} Yrs. • {profile.location}</Text>
          <Text style={styles.profileLocation}>{profile.profession} • {profile.salary}</Text>
          <View style={styles.sentBadge}>
            <Ionicons name="paper-plane" size={16} color="#007AFF" />
            <Text style={styles.sentText}>Request sent {profile.requestDate}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.remindButton]}
          onPress={() => onRemind(profile)}
        >
          <Ionicons name="notifications-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Remind</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.withdrawButton]}
          onPress={() => onWithdraw(profile)}
        >
          <Ionicons name="arrow-undo-outline" size={20} color="#666" />
          <Text style={[styles.actionButtonText, styles.withdrawButtonText]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.sectionTitle}>Sent Requests ({profiles.length})</Text>
      {profiles.length > 0 ? (
        profiles.map(renderSentProfile)
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="paper-plane-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No sent requests</Text>
          <Text style={styles.emptyStateSubtext}>Send interest requests to connect with people</Text>
        </View>
      )}
    </View>
  );
};

// Deleted Component
const DeletedComponent = ({ profiles, onRestore, onPermanentDelete }) => {
  const renderDeletedProfile = (profile) => (
    <View key={profile.id} style={styles.deletedProfileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.image }} style={[styles.profileImage, styles.deletedImage]} />
          <View style={styles.deletedOverlay}>
            <Ionicons name="trash" size={24} color="#FF3B30" />
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, styles.deletedText]}>{profile.name}</Text>
          <Text style={[styles.profileAge, styles.deletedText]}>{profile.age} Yrs. • {profile.location}</Text>
          <Text style={[styles.profileLocation, styles.deletedText]}>{profile.profession} • {profile.salary}</Text>
          <View style={styles.deletedBadge}>
            <Ionicons name="trash" size={16} color="#FF3B30" />
            <Text style={styles.deletedBadgeText}>Deleted {profile.requestDate}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.restoreButton]}
          onPress={() => onRestore(profile)}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Restore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.permanentDeleteButton]}
          onPress={() => onPermanentDelete(profile)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Delete Forever</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.sectionTitle}>Deleted Requests ({profiles.length})</Text>
      {profiles.length > 0 ? (
        profiles.map(renderDeletedProfile)
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="trash-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No deleted requests</Text>
          <Text style={styles.emptyStateSubtext}>Deleted requests will appear here</Text>
        </View>
      )}
    </View>
  );
};

// Main Inbox Component
const InboxComponent = () => {
  const [activeTab, setActiveTab] = useState('Received');
  const [profiles] = useState({
    received: sampleProfiles,
    accepted: sampleProfiles.slice(0, 1),
    sent: sampleProfiles.slice(1, 2),
    deleted: sampleProfiles.slice(2, 3),
  });

  const tabs = [
    { key: 'Received', label: `Received(${profiles.received.length})`, count: profiles.received.length },
    { key: 'Accepted', label: 'Accepted', count: profiles.accepted.length },
    { key: 'Sent', label: 'Sent', count: profiles.sent.length },
    { key: 'Deleted', label: 'Deleted', count: profiles.deleted.length },
  ];

  // Action handlers
  const handleAccept = (profile) => {
    console.log('Accept:', profile.name);
    // Add your accept logic here
  };

  const handleDecline = (profile) => {
    console.log('Decline:', profile.name);
    // Add your decline logic here
  };

  const handleChat = (profile) => {
    console.log('Chat:', profile.name);
    // Add your chat logic here
  };

  const handleCall = (profile) => {
    console.log('Call:', profile.name);
    // Add your call logic here
  };

  const handleRemove = (profile) => {
    console.log('Remove:', profile.name);
    // Add your remove logic here
  };

  const handleWithdraw = (profile) => {
    console.log('Withdraw:', profile.name);
    // Add your withdraw logic here
  };

  const handleRemind = (profile) => {
    console.log('Remind:', profile.name);
    // Add your remind logic here
  };

  const handleRestore = (profile) => {
    console.log('Restore:', profile.name);
    // Add your restore logic here
  };

  const handlePermanentDelete = (profile) => {
    console.log('Permanent Delete:', profile.name);
    // Add your permanent delete logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Received':
        return (
          <ReceivedComponent 
            profiles={profiles.received}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onChat={handleChat}
            onCall={handleCall}
          />
        );
      case 'Accepted':
        return (
          <AcceptedComponent 
            profiles={profiles.accepted}
            onChat={handleChat}
            onCall={handleCall}
            onRemove={handleRemove}
          />
        );
      case 'Sent':
        return (
          <SentComponent 
            profiles={profiles.sent}
            onWithdraw={handleWithdraw}
            onRemind={handleRemind}
          />
        );
      case 'Deleted':
        return (
          <DeletedComponent 
            profiles={profiles.deleted}
            onRestore={handleRestore}
            onPermanentDelete={handlePermanentDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerTitle}>Inbox</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
              {tab.count > 0 && activeTab !== tab.key && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        {[
          { name: 'Home', icon: 'home-outline' },
          { name: 'Matches', icon: 'people-outline' },
          { name: 'Inbox', icon: 'chatbubble-outline', active: true },
          { name: 'Messages', icon: 'mail-outline' },
        ].map((item) => (
          <TouchableOpacity key={item.name} style={styles.bottomNavItem}>
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={item.active ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.bottomNavText,
              item.active && styles.bottomNavTextActive
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    // marginTop: HEADER_START,
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
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  tabBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  componentContainer: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  acceptedProfileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  sentProfileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  deletedProfileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
    opacity: 0.7,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  deletedImage: {
    opacity: 0.5,
  },
  deletedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  requestDate: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  deletedText: {
    color: '#999',
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  acceptedText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
    marginLeft: 4,
  },
  sentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sentText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  deletedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  deletedBadgeText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: '#34C759',
  },
  chatButton: {
    backgroundColor: '#007AFF',
  },
  callButton: {
    backgroundColor: '#34C759',
  },
  declineButton: {
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    backgroundColor: '#f0f0f0',
  },
  remindButton: {
    backgroundColor: '#FF9500',
  },
  withdrawButton: {
    backgroundColor: '#f0f0f0',
  },
  restoreButton: {
    backgroundColor: '#34C759',
  },
  permanentDeleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  declineButtonText: {
    color: '#666',
  },
  removeButtonText: {
    color: '#666',
  },
  withdrawButtonText: {
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomNavText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  bottomNavTextActive: {
    color: '#007AFF',
  },
});

export default InboxComponent;