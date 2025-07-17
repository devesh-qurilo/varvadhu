// screens/PartnerPreferencesScreen.js
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStore from '../../store/useStore';

const PartnerPreferencesScreen = () => {
  const { preferences, updatePreference } = useStore();

  const handleSave = () => {
    // Add save logic here
    console.log('Preferences saved:', preferences);
    router.push('/(tabs)/home')
    // Navigate to next screen or show success message
  };

  const DropdownField = ({ label, value, onValueChange, options }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          <Picker.Item label={`Select ${label}`} value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const ageOptions = ['21-50 years of age', '25-35 years of age', '30-40 years of age', '35-45 years of age'];
  const heightOptions = ['4\'0 - 4\'2', '5\'2 - 5\'6', '5\'4 - 5\'8', '5\'6 - 6\'0', '5\'8 - 6\'2'];
  const locationOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'West Bangal', 'Hyderabad'];
  const maritalOptions = ['Never Married', 'Divorced', 'Widowed', 'Separated'];
  const educationOptions = ['Graduate', 'Post Graduate', 'PhD', 'Professional','MCA', 'Diploma'];
  const occupationOptions = ['Engineer', 'Doctor', 'Teacher', 'Business', 'Lawyer', 'CA', 'UI/UX', 'Other'];
  const incomeOptions = ['2-5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', '20-50 Lakhs', '50+ Lakhs', "papa ka paisa"];
  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
  const casteOptions = ['General', 'OBC', 'SC', 'ST', 'Other'];
  const communityOptions = ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Other'];
  const subCommunityOptions = ['Gujarati', 'Punjabi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Other'];
  const languageOptions = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Punjabi', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.signal}>📶</Text>
          <Text style={styles.wifi}>📶</Text>
          <Text style={styles.battery}>🔋</Text>
        </View>
      </View> */}
      
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Partner Preferences</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Tell us what matters to you in a life partner - education, profession, values, lifestyle, or community. We'll recommend matches that truly align with you.
          </Text>
          
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <DropdownField
            label="Partner's Age"
            value={preferences.age}
            onValueChange={(value) => updatePreference('age', value)}
            options={ageOptions}
          />
          
          <DropdownField
            label="Height"
            value={preferences.height}
            onValueChange={(value) => updatePreference('height', value)}
            options={heightOptions}
          />
          
          <DropdownField
            label="State"
            value={preferences.state}
            onValueChange={(value) => updatePreference('state', value)}
            options={locationOptions}
          />
          
          <DropdownField
            label="City"
            value={preferences.city}
            onValueChange={(value) => updatePreference('city', value)}
            options={locationOptions}
          />
          
          <DropdownField
            label="Marital Status"
            value={preferences.maritalStatus}
            onValueChange={(value) => updatePreference('maritalStatus', value)}
            options={maritalOptions}
          />
          
          <Text style={styles.sectionTitle}>Education</Text>
          
          <DropdownField
            label="Education"
            value={preferences.education}
            onValueChange={(value) => updatePreference('education', value)}
            options={educationOptions}
          />
          
          <DropdownField
            label="Occupation"
            value={preferences.occupation}
            onValueChange={(value) => updatePreference('occupation', value)}
            options={occupationOptions}
          />
          
          <DropdownField
            label="Income"
            value={preferences.income}
            onValueChange={(value) => updatePreference('income', value)}
            options={incomeOptions}
          />
          
          <Text style={styles.sectionTitle}>Religion & Ethnicity</Text>
          
          <DropdownField
            label="Religion"
            value={preferences.religion}
            onValueChange={(value) => updatePreference('religion', value)}
            options={religionOptions}
          />
          
          <DropdownField
            label="Caste"
            value={preferences.caste}
            onValueChange={(value) => updatePreference('caste', value)}
            options={casteOptions}
          />
          
          <DropdownField
            label="Community"
            value={preferences.community}
            onValueChange={(value) => updatePreference('community', value)}
            options={communityOptions}
          />
          
          <DropdownField
            label="Sub Community"
            value={preferences.subCommunity}
            onValueChange={(value) => updatePreference('subCommunity', value)}
            options={subCommunityOptions}
          />
          
          <DropdownField
            label="Mother Tongue"
            value={preferences.motherTongue}
            onValueChange={(value) => updatePreference('motherTongue', value)}
            options={languageOptions}
          />
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  signal: {
    fontSize: 14,
  },
  wifi: {
    fontSize: 14,
  },
  battery: {
    fontSize: 14,
  },
  titleContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#8b1538',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#8b1538',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PartnerPreferencesScreen;