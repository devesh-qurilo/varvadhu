import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileInfo = ({ profile, onReject, onSuperLike, onLike }) => {
  return (
    <View style={styles.profileInfo}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <TouchableOpacity style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={20} color="#4facfe" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileAge}>{profile.age} • {profile.location}</Text>
      <Text style={styles.profileProfession}>{profile.profession}</Text>
      <Text style={styles.profileEducation}>{profile.education}</Text>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.rejectButton} onPress={() => onReject(profile.id)}>
          <LinearGradient
            colors={['#ff6b6b', '#ee5a52']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.superLikeButton} onPress={() => onSuperLike(profile.id)}>
          <LinearGradient
            colors={['#7D0A0A', '#764ba2']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="star" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.likeButton} onPress={() => onLike(profile.id)}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="heart" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  profileAge: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  profileProfession: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 2,
  },
  profileEducation: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    marginRight: 20,
  },
  superLikeButton: {
    marginHorizontal: 20,
  },
  likeButton: {
    marginLeft: 20,
  },
  actionButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ProfileInfo;
