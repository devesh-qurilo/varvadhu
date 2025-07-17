

import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const ReligiousBackground = () => {
  const [willingToMarry, setWillingToMarry] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Please provide your religious details:</Text>

      <TextInput style={styles.input} placeholder="Religion" />
      <View style={styles.switchContainer}>
        <Text>Willing to marry from other caste also</Text>
        <Switch value={willingToMarry} onValueChange={setWillingToMarry} />
      </View>
      <TextInput style={styles.input} placeholder="Mother Tongue" />
      <TextInput style={styles.input} placeholder="Community" />
      <TextInput style={styles.input} placeholder="Sub Community" />
      <TextInput style={styles.input} placeholder="Caste No Bar" />
      <TextInput style={styles.input} placeholder="Gotra/Gothr" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReligiousBackground;

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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
