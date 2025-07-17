// import CategoriesButton from '@/components/matches/CategoriesButton';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState } from 'react';
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width - 32;
// const SWIPE_THRESHOLD = width * 0.3;
// const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// const MatchesScreen = () => {
//   const [activeFilter, setActiveFilter] = useState('All Matches');
//   const [profiles, setProfiles] = useState([
//     {
//       id: 1,
//       name: 'Aaradhya Sharma',
//       age: 28,
//       location: 'Delhi',
//       profession: 'Software Developer',
//       education: 'B.Tech in Computer Science',
//       images: [
//         'https://via.placeholder.com/400x600/FF8E8E/FFFFFF?text=AS2',
//         'https://via.placeholder.com/400x600/FFB1B1/FFFFFF?text=AS3'
//       ],
//       lastSeen: 'Last seen an hour ago',
//       height: '5\'7"',
//       salary: 'Earns ₹5-7 Lakh',
//       language: 'Hindi/English',
//       isShortlisted: false,
//       hasPhoto: true,
//       isNearby: false,
//       category: 'All Matches'
//     },
//     {
//       id: 2,
//       name: 'Priya Patel',       
//       age: 26,
//       location: 'Mumbai',
//       profession: 'Marketing Manager',
//       education: 'MBA in Marketing',
//       images: [
//         'https://via.placeholder.com/400x600/71D7CF/FFFFFF?text=PP2',
//         'https://via.placeholder.com/400x600/94E2DA/FFFFFF?text=PP3'
//       ],
//       lastSeen: 'Online now',
//       height: '5\'5"',
//       salary: 'Earns ₹6-8 Lakh',
//       language: 'Hindi/English/Gujarati',
//       isShortlisted: true,
//       hasPhoto: true,
//       isNearby: true,
//       category: 'Shortlisted Profiles'
//     },
    
//   ]);

//   const filterOptions = [
//     { name: 'All Matches', count: profiles.length, color: '#7D0A0A' },
//     { name: 'Newly Matches', count: 2, color: '#764ba2' },
//     { name: 'Profiles with photo', count: profiles.filter(p => p.hasPhoto).length, color: '#f093fb' },
//     { name: 'Mutual', count: 1, color: '#f5576c' }
//   ];

  

//   const getFilteredProfiles = () => {
//     switch(activeFilter) {
//       case 'All Matches':
//         return profiles;
//       case 'Newly Matches':
//         return profiles.slice(0, 2);
//       case 'Profiles with photo':
//         return profiles.filter(p => p.hasPhoto);
//       case 'Mutual':
//         return profiles.slice(0, 1);
//       default:
//         return profiles;
//     }
//   };

//   const ImageCarousel = ({ images }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const scrollViewRef = React.useRef(null);

//     const handleImagePress = (index) => {
//       setCurrentIndex(index);
//       scrollViewRef.current?.scrollTo({ x: index * CARD_WIDTH, animated: true });
//     };

//     const onScroll = (event) => {
//       const slideSize = event.nativeEvent.layoutMeasurement.width;
//       const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
//       setCurrentIndex(index);
//     };

//     return (
//       <View style={styles.imageCarouselContainer}>
//         <ScrollView
//           ref={scrollViewRef}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={onScroll}
//           scrollEventThrottle={16}
//           style={styles.imageScroll}
//         >
//           {images.map((image, index) => (
//             <Image
//               key={index}
//               source={{ uri: image }}
//               style={styles.cardImage}
//               resizeMode="cover"
//             />
//           ))}
//         </ScrollView>

//         {/* Image Indicators */}
//         <View style={styles.imageIndicators}>
//           {images.map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.indicator,
//                 currentIndex === index && styles.activeIndicator
//               ]}
//               onPress={() => handleImagePress(index)}
//             />
//           ))}
//         </View>

//         {/* Image Counter */}
//         <View style={styles.imageCounter}>
//           <Text style={styles.imageCounterText}>
//             {currentIndex + 1} / {images.length}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   const SwipeableCard = ({ item, index, onSwipe }) => {
//     const translateX = useSharedValue(0);
//     const translateY = useSharedValue(0);
//     const scale = useSharedValue(1);
//     const rotate = useSharedValue(0);

//     const gestureHandler = useAnimatedGestureHandler({
//       onStart: (_, context) => {
//         context.startX = translateX.value;
//         context.startY = translateY.value;
//         scale.value = withSpring(1.05);
//       },
//       onActive: (event, context) => {
//         translateX.value = context.startX + event.translationX;
//         translateY.value = context.startY + event.translationY;
//         rotate.value = interpolate(
//           translateX.value,
//           [-width, 0, width],
//           [-30, 0, 30],
//           Extrapolate.CLAMP
//         );
//       },
//       onEnd: (event) => {
//         const shouldDismiss = Math.abs(translateX.value) > SWIPE_THRESHOLD;
        
//         if (shouldDismiss) {
//           const direction = translateX.value > 0 ? 'right' : 'left';
//           translateX.value = withTiming(translateX.value > 0 ? width : -width, { duration: 300 });
//           translateY.value = withTiming(translateY.value + event.velocityY * 0.1, { duration: 300 });
//           scale.value = withTiming(0.8, { duration: 300 });
//           runOnJS(onSwipe)(item.id, direction);
//         } else {
//           translateX.value = withSpring(0);
//           translateY.value = withSpring(0);
//           rotate.value = withSpring(0);
//           scale.value = withSpring(1);
//         }
//       },
//     });

//     const animatedStyle = useAnimatedStyle(() => {
//       return {
//         transform: [
//           { translateX: translateX.value },
//           { translateY: translateY.value },
//           { scale: scale.value },
//           { rotate: `${rotate.value}deg` },
//         ],
//       };
//     });

//     const likeOverlayStyle = useAnimatedStyle(() => {
//       const opacity = interpolate(
//         translateX.value,
//         [0, SWIPE_THRESHOLD],
//         [0, 1],
//         Extrapolate.CLAMP
//       );
//       return { opacity };
//     });

//     const nopeOverlayStyle = useAnimatedStyle(() => {
//       const opacity = interpolate(
//         translateX.value,
//         [-SWIPE_THRESHOLD, 0],
//         [1, 0],
//         Extrapolate.CLAMP
//       );
//       return { opacity };
//     });

//     return (
//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.swipeableCard, animatedStyle]}>
//           <View style={styles.cardContainer}>
//             <ImageCarousel images={item.images} />
            
//             {/* Like Overlay */}
//             <Animated.View style={[styles.overlay, styles.likeOverlay, likeOverlayStyle]}>
//               <View style={styles.overlayContent}>
//                 <Ionicons name="heart" size={60} color="#fff" />
//                 <Text style={styles.overlayText}>LIKE</Text>
//               </View>
//             </Animated.View>

//             {/* Nope Overlay */}
//             <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOverlayStyle]}>
//               <View style={styles.overlayContent}>
//                 <Ionicons name="close" size={60} color="#fff" />
//                 <Text style={styles.overlayText}>NOPE</Text>
//               </View>
//             </Animated.View>

//             {/* Gradient Overlay */}
//             <LinearGradient
//               colors={['transparent', 'rgba(0,0,0,0.8)']}
//               style={styles.gradientOverlay}
//             />

//             {/* Last Seen Badge */}
//             <View style={styles.lastSeenBadge}>
//               <View style={styles.onlineIndicator} />
//               <Text style={styles.lastSeenText}>{item.lastSeen}</Text>
//             </View>

//             {/* Profile Info */}
//             <View style={styles.profileInfo}>
//               <View style={styles.profileHeader}>
//                 <Text style={styles.profileName}>{item.name}</Text>
//                 <TouchableOpacity style={styles.verifiedBadge}>
//                   <Ionicons name="checkmark-circle" size={20} color="#4facfe" />
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.profileAge}>{item.age} • {item.location}</Text>
//               <Text style={styles.profileProfession}>{item.profession}</Text>
//               <Text style={styles.profileEducation}>{item.education}</Text>
              
//               {/* Action Buttons */}
//               <View style={styles.actionButtons}>
//                 <TouchableOpacity style={styles.rejectButton}>
//                   <LinearGradient
//                     colors={['#ff6b6b', '#ee5a52']}
//                     style={styles.actionButtonGradient}
//                   >
//                     <Ionicons name="close" size={24} color="#fff" />
//                   </LinearGradient>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.superLikeButton}>
//                   <LinearGradient
//                     colors={['#7D0A0A', '#764ba2']}
//                     style={styles.actionButtonGradient}
//                   >
//                     <Ionicons name="star" size={24} color="#fff" />
//                   </LinearGradient>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.likeButton}>
//                   <LinearGradient
//                     colors={['#f093fb', '#f5576c']}
//                     style={styles.actionButtonGradient}
//                   >
//                     <Ionicons name="heart" size={24} color="#fff" />
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Animated.View>
//       </PanGestureHandler>
//     );
//   };

//   const handleSwipe = (profileId, direction) => {
//     console.log(`Swiped ${direction} on profile ${profileId}`);
//     // Handle swipe logic here
//   };

//   const renderStatsCard = ({ item }) => (
//     <View style={styles.statsCard}>
//       <LinearGradient
//         colors={item.gradient}
//         style={styles.statsGradient}
//       >
//         <Text style={styles.statsCount}>{item.count}</Text>
//         <Text style={styles.statsLabel}>{item.label}</Text>
//       </LinearGradient>
//     </View>
//   );

//   const renderFilterButton = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.filterButton,
//         activeFilter === item.name && styles.activeFilterButton
//       ]}
//       onPress={() => setActiveFilter(item.name)}
//     >
//       <LinearGradient
//         colors={activeFilter === item.name ? ['#7D0A0A', '#764ba2'] : ['#fff', '#fff']}
//         style={styles.filterGradient}
//       >
//         <Text style={[
//           styles.filterButtonText,
//           activeFilter === item.name && styles.activeFilterButtonText
//         ]}>
//           {item.name}
//         </Text>
//         {item.count > 0 && (
//           <View style={[
//             styles.filterCount,
//             activeFilter === item.name && styles.activeFilterCount
//           ]}>
//             <Text style={[
//               styles.filterCountText,
//               activeFilter === item.name && styles.activeFilterCountText
//             ]}>
//               {item.count}
//             </Text>
//           </View>
//         )}
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={['#7D0A0A', '#764ba2']}
//         style={styles.header}
//       >
//         <View style={styles.headerContent}>
//           <View style={styles.headerLeft}>
//             <View style={styles.logo}>
//               <Ionicons name="heart" size={24} color="#fff" />
//             </View>
//             <Text style={styles.headerTitle}>Matches</Text>
//           </View>
//           <View style={styles.headerRight}>
//             <TouchableOpacity style={styles.headerIcon}>
//               <Ionicons name="notifications-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.headerIcon}>
//               <Ionicons name="search-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Stats Cards */}
     
//         <CategoriesButton/>
//       {/* Filter Buttons */}
//       <View style={styles.filtersContainer}>
//         <FlatList
//           data={filterOptions}
//           renderItem={renderFilterButton}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filtersContent}
//         />
//       </View>

//       {/* Profile Cards */}
//       <View style={styles.cardsContainer}>
//         <FlatList
//           data={getFilteredProfiles()}
//           renderItem={({ item, index }) => (
//             <SwipeableCard item={item} index={index} onSwipe={handleSwipe} />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.cardsContent}
//         />
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9ff',
//     marginTop: HEADER_HEIGHT_MARGIN,
//   },
//   header: {
//     paddingBottom: 16,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 16,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerIcon: {
//     marginLeft: 16,
//     padding: 8,
//   },
//   statsContainer: {
//     paddingVertical: 10,
//   },
//   statsContent: {
//     paddingHorizontal: 16,
//   },
//   statsCard: {
//     marginRight: 12,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   statsGradient: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     alignItems: 'center',
//     minWidth: 90,
//   },
//   statsCount: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   statsLabel: {
//     fontSize: 11,
//     color: '#fff',
//     textAlign: 'center',
//     lineHeight: 14,
//     opacity: 0.9,
//   },
//   filtersContainer: {
//     paddingVertical: 8,
//   },
//   filtersContent: {
//     paddingHorizontal: 8,
//   },
//   filterButton: {
//     marginRight: 6,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   filterGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   activeFilterButton: {
//     borderColor: 'transparent',
//   },
//   filterButtonText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '600',
//   },
//   activeFilterButtonText: {
//     color: '#fff',
//   },
//   filterCount: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginLeft: 8,
//   },
//   activeFilterCount: {
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   filterCountText: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: '600',
//   },
//   activeFilterCountText: {
//     color: '#fff',
//   },
//   cardsContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   cardsContent: {
//     paddingBottom: 100,
//   },
//   swipeableCard: {
//     marginBottom: 20,
//   },
//   cardContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   imageCarouselContainer: {
//     position: 'relative',
//     height: 400,
//   },
//   imageScroll: {
//     flex: 1,
//   },
//   cardImage: {
//     width: CARD_WIDTH,
//     height: 400,
//     resizeMode: 'cover',
//   },
//   imageIndicators: {
//     position: 'absolute',
//     top: 16,
//     left: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   indicator: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     marginHorizontal: 2,
//   },
//   activeIndicator: {
//     backgroundColor: '#fff',
//     width: 16,
//   },
//   imageCounter: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   imageCounterText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   likeOverlay: {
//     backgroundColor: 'rgba(76, 175, 80, 0.8)',
//   },
//   nopeOverlay: {
//     backgroundColor: 'rgba(244, 67, 54, 0.8)',
//   },
//   overlayContent: {
//     alignItems: 'center',
//   },
//   overlayText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 200,
//   },
//   lastSeenBadge: {
//     position: 'absolute',
//     top: 60,
//     right: 16,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   onlineIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#4CAF50',
//     marginRight: 6,
//   },
//   lastSeenText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   profileInfo: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 24,
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   profileName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginRight: 8,
//   },
//   verifiedBadge: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 12,
//     padding: 4,
//   },
//   profileAge: {
//     fontSize: 16,
//     color: '#fff',
//     opacity: 0.9,
//     marginBottom: 4,
//   },
//   profileProfession: {
//     fontSize: 16,
//     color: '#fff',
//     opacity: 0.9,
//     marginBottom: 2,
//   },
//   profileEducation: {
//     fontSize: 14,
//     color: '#fff',
//     opacity: 0.8,
//     marginBottom: 20,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rejectButton: {
//     marginRight: 20,
//   },
//   superLikeButton: {
//     marginHorizontal: 20,
//   },
//   likeButton: {
//     marginLeft: 20,
//   },
//   actionButtonGradient: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   bottomNav: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     paddingBottom: 20,
//   },
//   navItem: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   activeNavItem: {
//     // Additional styling for active nav item
//   },
//   activeNavIcon: {
//     backgroundColor: '#7D0A0A',
//     borderRadius: 16,
//     padding: 8,
//   },
//   navLabel: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   activeNavLabel: {
//     color: '#7D0A0A',
//     fontWeight: '600',
//   },
// });

// export default MatchesScreen;



// import React, { useState } from 'react';
// import {
//   Dimensions,
//   FlatList,
//   Platform,
//   StatusBar,
//   View,
// } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import FilterButton from '../../components/match/FilterButton';
// import Header from '../../components/match/Header';
// import StatsCard from '../../components/match/StatsCard';
// import SwipeableCard from '../../components/match/SwipeableCard';

// import dummyProfiles from '../../components/match/dummyProfiles';
// import styles from '../../components/match/styles';

// const { width } = Dimensions.get('window');
// const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// const MatchesScreen = () => {
//   const [activeFilter, setActiveFilter] = useState('All Matches');
//   const [profiles, setProfiles] = useState(dummyProfiles);

//   const filterOptions = [
//     { name: 'All Matches', count: profiles.length, color: '#7D0A0A' },
//     { name: 'Newly Matches', count: 2, color: '#764ba2' },
//     { name: 'Profiles with photo', count: profiles.filter(p => p.hasPhoto).length, color: '#f093fb' },
//     { name: 'Mutual', count: 1, color: '#f5576c' },
//   ];

//   const statsData = [
//     { id: 1, count: 29, label: 'Profile\nVisits', gradient: ['#7D0A0A', '#8a0707'] },
//     { id: 2, count: 12, label: 'Shortlisted\nProfiles', gradient: ['#f093fb', '#f5576c'] },
//     { id: 3, count: 5, label: 'Horoscope\nMatches', gradient: ['#4facfe', '#00f2fe'] },
//     { id: 4, count: 8, label: 'Nearby\nMatches', gradient: ['#43e97b', '#38f9d7'] },
//   ];

//   const getFilteredProfiles = () => {
//     switch (activeFilter) {
//       case 'All Matches':
//         return profiles;
//       case 'Newly Matches':
//         return profiles.slice(0, 2);
//       case 'Profiles with photo':
//         return profiles.filter(p => p.hasPhoto);
//       case 'Mutual':
//         return profiles.slice(0, 1);
//       default:
//         return profiles;
//     }
//   };

//   const handleSwipe = (profileId, direction) => {
//     console.log(`Swiped ${direction} on profile ${profileId}`);
//     // Add match/reject logic here if needed
//   };

//   return (
//     <GestureHandlerRootView style={[styles.container, { marginTop: HEADER_HEIGHT_MARGIN }]}>
//       {/* Header */}
//       <Header />

//       {/* Stats Section */}
//       <View style={styles.statsContainer}>
//         <FlatList
//           data={statsData}
//           renderItem={({ item }) => <StatsCard item={item} />}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.statsContent}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </View>

//       {/* Filter Buttons */}
//       <View style={styles.filtersContainer}>
//         <FlatList
//           data={filterOptions}
//           renderItem={({ item }) => (
//             <FilterButton
//               item={item}
//               activeFilter={activeFilter}
//               onPress={setActiveFilter}
//             />
//           )}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filtersContent}
//           keyExtractor={(item) => item.name}
//         />
//       </View>

//       {/* Swipeable Profile Cards */}
//       <View style={styles.cardsContainer}>
//         <FlatList
//           data={getFilteredProfiles()}
//           renderItem={({ item, index }) => (
//             <SwipeableCard item={item} index={index} onSwipe={handleSwipe} />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.cardsContent}
//         />
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default MatchesScreen;






import CategoriesButton from '@/components/matches/CategoriesButton';
import FilterTabs from '@/components/matches/FilterTabs';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const MatchesScreen = () => {
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
    { name: 'Profiles with photo', count: profiles.filter(p => p.hasPhoto).length, color: '#f093fb' },
    { name: 'Mutual', count: 1, color: '#f5576c' }
  ];

  const getFilteredProfiles = () => {
    switch(activeFilter) {
      case 'All Matches':
        return profiles;
      case 'Newly Matches':
        return profiles.slice(0, 2);
      case 'Profiles with photo':
        return profiles.filter(p => p.hasPhoto);
      case 'Mutual':
        return profiles.slice(0, 1);
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <MatchesHeader 
        onNotificationPress={handleNotificationPress}
        onSearchPress={handleSearchPress}
      /> */}
      
      <CategoriesButton />
      
      <FilterTabs 
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* <View style={styles.cardsContainer}>
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
        /> */}
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    // marginTop: HEADER_HEIGHT_MARGIN,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardsContent: {
    paddingBottom: 100,
  },
});

export default MatchesScreen;