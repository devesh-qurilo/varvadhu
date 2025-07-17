
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const CareerScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Please provide your career details:</Text>

      <TextInput style={styles.input} placeholder="Employed In" />
      <TextInput style={styles.input} placeholder="Occupation" />
      <TextInput style={styles.input} placeholder="Company" />
      <TextInput style={styles.input} placeholder="Annual Income" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CareerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 16, marginBottom: 12 , marginTop: HEADER_HEIGHT_MARGIN},
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
