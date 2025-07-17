// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const AboutMeScreen = () => {
//   return (
//     <View style={{backgroundColor:'red', flex:1, justifyContent:'center', alignItems:'center'}}>
//       <Text>Me</Text>
//     </View>
//   )
// }

// export default AboutMeScreen

// const styles = StyleSheet.create({})



import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const AboutMeScreen = () => {
  const [about, setAbout] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Please provide your about yourself:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="About Yourself"
        multiline
        numberOfLines={6}
        value={about}
        onChangeText={setAbout}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AboutMeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 16, marginBottom: 12 , marginTop:HEADER_HEIGHT_MARGIN },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6a0000',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
