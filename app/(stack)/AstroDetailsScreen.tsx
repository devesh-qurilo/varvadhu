import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const AstroDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Please provide your Astro details:</Text>

      <TextInput style={styles.input} placeholder="Manglik" />
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="DD" keyboardType="numeric" />
        <TextInput style={[styles.input, { flex: 1, marginHorizontal: 8 }]} placeholder="MM" keyboardType="numeric" />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="YYYY" keyboardType="numeric" />
      </View>
      <TextInput style={styles.input} placeholder="Time of Birth (HH:MM AM/PM)" />
      <TextInput style={styles.input} placeholder="City of Birth" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AstroDetailsScreen;

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
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    backgroundColor: '#6a0000',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
