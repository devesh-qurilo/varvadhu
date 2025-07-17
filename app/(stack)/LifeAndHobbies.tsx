import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const LifestyleHobbiesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Please provide your Lifestyle & Hobbies details:</Text>

        <TextInput style={styles.input} placeholder="Dietary Habits" />
        <TextInput style={styles.input} placeholder="Dietary Habits" />
        <TextInput style={styles.input} placeholder="Smoking Habits" />
        <TextInput style={styles.input} placeholder="Drinking Habits" />
        <TextInput style={styles.input} placeholder="Open to pets" />
        <TextInput style={styles.input} placeholder="Own a House" />
        <TextInput style={styles.input} placeholder="Own a Car" />
        <TextInput style={styles.input} placeholder="Food I cook" />
        <TextInput style={styles.input} placeholder="Hobbies" />
        <TextInput style={styles.input} placeholder="Interests" />
        <TextInput style={styles.input} placeholder="Favorite Music" />
        <TextInput style={styles.input} placeholder="Sports" />
        <TextInput style={styles.input} placeholder="Cuisine" />
        <TextInput style={styles.input} placeholder="Movies" />
        <TextInput style={styles.input} placeholder="TV Shows" />
        <TextInput style={styles.input} placeholder="Vacation Destination" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LifestyleHobbiesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 16, marginBottom: 12 , marginTop: HEADER_HEIGHT_MARGIN },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6a0000',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
