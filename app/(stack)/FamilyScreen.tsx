import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const FamilyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Please provide your religious details:</Text>

      <TextInput style={styles.input} placeholder="Family Background" />
      <TextInput style={styles.input} placeholder="Family Income" />
      <TextInput style={styles.input} placeholder="Father's" />
      <TextInput style={styles.input} placeholder="Mother's" />
      <TextInput style={styles.input} placeholder="Brother" />
      <TextInput style={styles.input} placeholder="Sister" />
      <TextInput style={styles.input} placeholder="Family Based Out of" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FamilyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 16, marginBottom: 12, marginTop: HEADER_HEIGHT_MARGIN },
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
