import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import ImageCarousel from './ImageCarousel';
import ProfileInfo from './ProfileInfo';

const ProfileCard = ({ profile, onReject, onSuperLike, onLike }) => {
  return (
    <View style={styles.cardContainer}>
      <ImageCarousel images={profile.images} />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradientOverlay}
      />

      {/* Last Seen Badge */}
      <View style={styles.lastSeenBadge}>
        <View style={styles.onlineIndicator} />
        <Text style={styles.lastSeenText}>{profile.lastSeen}</Text>
      </View>

      <ProfileInfo 
        profile={profile}
        onReject={onReject}
        onSuperLike={onSuperLike}
        onLike={onLike}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  lastSeenBadge: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  lastSeenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProfileCard;