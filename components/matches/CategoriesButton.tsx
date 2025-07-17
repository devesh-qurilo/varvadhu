
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const statsData = [
  { 
    id: 1, 
    count: 29, 
    label: 'Profile\nVisits', 
    gradient: ['#7D0A0A', '#8a0707'],
    route: '/profile-visits'
  },
  { 
    id: 2, 
    count: 12, 
    label: 'Shortlisted\nProfiles', 
    gradient: ['#f093fb', '#f5576c'],
    route: '/shortlisted-profiles'
  },
  { 
    id: 3, 
    count: 5, 
    label: 'Horoscope\nMatches', 
    gradient: ['#4facfe', '#00f2fe'],
    route: '/horoscope-matches'
  },
  { 
    id: 4, 
    count: 8, 
    label: 'Nearby\nMatches', 
    gradient: ['#43e97b', '#38f9d7'],
    route: '/nearby-matches'
  }
];

export default function CategoriesButton() {
  const renderStatsCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push({
        pathname: item.route,
        params: { 
          count: item.count,
          label: item.label,
          gradient: JSON.stringify(item.gradient)
        }
      })}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.countText}>{item.count}</Text>
        <Text style={styles.labelText}>{item.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View> */}
      
      <FlatList
        data={statsData}
        renderItem={renderStatsCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContent}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth:1
  },
  header: {
    padding: 2,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContent: {
    padding: 8,
  },
  cardContainer: {
    marginRight: 10,
  },
  card: {
    width: 95,
    height: 90,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});