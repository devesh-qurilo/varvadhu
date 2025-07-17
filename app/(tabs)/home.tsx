import React from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
// import HeaderBar from '../components/HeaderBar';
import ProfileCard from '../../components/home/ProfileCard';
import SuccessStoryCard from '../../components/home/SuccessStoryCard';
import { dummyProfiles, successStories } from '../../components/home/dummyProfiles';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Home = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <HeaderBar /> */}

      {/* Hero/Banner */}
      <View style={styles.banner} >
        <Image source={require('@/assets/images/WeddingBanner2.png')} style={{height:140, resizeMode:'contain'}}/>
      </View>

      {/* People who value honesty */}
      <Section title="People who value honesty just like you">
        <FlatList
          data={dummyProfiles}
          horizontal
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <ProfileCard data={item} />}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      {/* Daily Recommendations */}
      <Section title="Daily Recommendations">
        <FlatList
          data={dummyProfiles.slice(0, 2)}
          horizontal
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <ProfileCard data={item} />}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      {/* Success Stories */}
      <Section title="Success Story">
        <View style={styles.successContainer}>
          {successStories.map((story, index) => (
            <SuccessStoryCard key={index} data={story} />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
    banner: {
    height: 120,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ececec',
  },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },
  horizontalList: { paddingLeft: 4 },
  successContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
});

export default Home;
