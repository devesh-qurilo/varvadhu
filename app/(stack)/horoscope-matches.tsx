// import { LinearGradient } from 'expo-linear-gradient';
// import { useLocalSearchParams } from 'expo-router';
// import {
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function HoroscopeMatches() {
//   const { count, label, gradient } = useLocalSearchParams();
//   const gradientColors = JSON.parse(gradient);

//   const horoscopeData = [
//     { name: 'Anjali Gupta', time: '30 min ago', action: 'Horoscope matched (95%)' },
//     { name: 'Rahul Verma', time: '2 hours ago', action: 'Horoscope matched (88%)' },
//     { name: 'Kavya Reddy', time: '1 day ago', action: 'Horoscope matched (92%)' },
//     { name: 'Arjun Singh', time: '3 days ago', action: 'Horoscope matched (85%)' },
//     { name: 'Ritu Sharma', time: '4 days ago', action: 'Horoscope matched (90%)' },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Header Card */}
//         <View style={styles.headerCard}>
//           <LinearGradient
//             colors={gradientColors}
//             style={styles.gradientHeader}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <Text style={styles.headerCount}>{count}</Text>
//             <Text style={styles.headerTitle}>{label.replace('\n', ' ')}</Text>
//           </LinearGradient>
//         </View>

//         {/* Horoscope Matches List */}
//         <View style={styles.listContainer}>
//           <Text style={styles.sectionTitle}>Horoscope Matches</Text>
//           {horoscopeData.map((item, index) => (
//             <TouchableOpacity key={index} style={styles.listItem}>
//               <View style={styles.avatarContainer}>
//                 <LinearGradient
//                   colors={gradientColors}
//                   style={styles.avatar}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                 >
//                   <Text style={styles.avatarText}>
//                     {item.name.split(' ').map(n => n[0]).join('')}
//                   </Text>
//                 </LinearGradient>
//               </View>
//               <View style={styles.itemContent}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemAction}>{item.action}</Text>
//                 <Text style={styles.itemTime}>{item.time}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Summary Card */}
//         <View style={styles.summaryCard}>
//           <Text style={styles.summaryTitle}>Summary</Text>
//           <Text style={styles.summaryText}>
//             {count} horoscope matches found. These profiles have high astrological compatibility with you.
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   headerCard: {
//     margin: 20,
//     marginBottom: 10,
//   },
//   gradientHeader: {
//     borderRadius: 15,
//     padding: 30,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   headerCount: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   listContainer: {
//     margin: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   avatarContainer: {
//     marginRight: 12,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   itemContent: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   itemAction: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   itemTime: {
//     fontSize: 12,
//     color: '#999',
//   },
//   summaryCard: {
//     margin: 20,
//     marginTop: 10,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   summaryText: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
// });














import FilterTabs from '@/components/matches/FilterTabs';
import MatchesHeader from '@/components/matches/MatchesHeader';
import SwipeableCard from '@/components/matches/SwipeableCard';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const HoroscopeMatches = () => {
  const [activeFilter, setActiveFilter] = useState('All Matches');
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Aaradhya Sharma',
      age: 28,
      location: 'Delhi',
      profession: 'Software Developer',
      education: 'B.Tech in Computer Science',
      images: [
        'https://via.placeholder.com/400x600/FF8E8E/FFFFFF?text=AS2',
        'https://via.placeholder.com/400x600/FFB1B1/FFFFFF?text=AS3'
      ],
      lastSeen: 'Last seen an hour ago',
      height: '5\'7"',
      salary: 'Earns ₹5-7 Lakh',
      language: 'Hindi/English',
      isShortlisted: false,
      hasPhoto: true,
      isNearby: false,
      category: 'All Matches'
    },
    {
      id: 2,
      name: 'Priya Patel',       
      age: 26,
      location: 'Mumbai',
      profession: 'Marketing Manager',
      education: 'MBA in Marketing',
      images: [
        'https://via.placeholder.com/400x600/71D7CF/FFFFFF?text=PP2',
        'https://via.placeholder.com/400x600/94E2DA/FFFFFF?text=PP3'
      ],
      lastSeen: 'Online now',
      height: '5\'5"',
      salary: 'Earns ₹6-8 Lakh',
      language: 'Hindi/English/Gujarati',
      isShortlisted: true,
      hasPhoto: true,
      isNearby: true,
      category: 'Shortlisted Profiles'
    },
  ]);

  const filterOptions = [
    { name: 'All Matches', count: profiles.length, color: '#7D0A0A' },
    { name: 'Newly Matches', count: 2, color: '#764ba2' },
    // { name: 'Profiles with photo', count: profiles.filter(p => p.hasPhoto).length, color: '#f093fb' },
    // { name: 'Mutual', count: 1, color: '#f5576c' }
  ];

  const getFilteredProfiles = () => {
    switch(activeFilter) {
      case 'All Matches':
        return profiles;
      case 'Newly Matches':
        return profiles.slice(0, 2);
      // case 'Profiles with photo':
      //   return profiles.filter(p => p.hasPhoto);
      // case 'Mutual':
      //   return profiles.slice(0, 1);
      default:
        return profiles;
    }
  };

  const handleSwipe = (profileId, direction) => {
    console.log(`Swiped ${direction} on profile ${profileId}`);
    // This is where you'll integrate with your API/Zustand
  };

  const handleReject = (profileId) => {
    console.log(`Rejected profile ${profileId}`);
    // API call to reject profile
  };

  const handleSuperLike = (profileId) => {
    console.log(`Super liked profile ${profileId}`);
    // API call to super like profile
  };

  const handleLike = (profileId) => {
    console.log(`Liked profile ${profileId}`);
    // API call to like profile
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <MatchesHeader 
        onNotificationPress={handleNotificationPress}
        onSearchPress={handleSearchPress}
      />
      
      {/* <CategoriesButton /> */}
      
      <FilterTabs 
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <View style={styles.cardsContainer}>
        <FlatList
          data={getFilteredProfiles()}
          renderItem={({ item }) => (
            <SwipeableCard 
              profile={item}
              onSwipe={handleSwipe}
              onReject={handleReject}
              onSuperLike={handleSuperLike}
              onLike={handleLike}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardsContent}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    marginTop: HEADER_HEIGHT_MARGIN,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardsContent: {
    paddingBottom: 100,
  },
});

export default HoroscopeMatches;