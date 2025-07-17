// screens/VerificationScreen.js
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import useStore from '../../store/useStore';

const VerificationScreen = () => {
  const { 
    verification, 
    setVerificationType, 
    setCardNumber 
  } = useStore();

  const handleVerify = () => {
    // Add verification logic here if needed
    // navigation.navigate('PartnerPreferences');
    router.push('PartnerPreferences');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.verificationIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>
        
        <Text style={styles.title}>ID Verification</Text>
        <Text style={styles.subtitle}>
          Verification is important to ensure safety and establish authenticity of your profile
        </Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              verification.selectedType === 'Pan Card' && styles.selectedOption
            ]}
            onPress={() => setVerificationType('Pan Card')}
          >
            <View style={styles.optionContent}>
              {verification.selectedType === 'Pan Card' && (
                <View style={styles.checkbox}>
                  <Text style={styles.checkboxText}>✓</Text>
                </View>
              )}
              <Text style={[
                styles.optionText,
                verification.selectedType === 'Pan Card' && styles.selectedOptionText
              ]}>
                Pan Card
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton,
              verification.selectedType === 'Driving License' && styles.selectedOption
            ]}
            onPress={() => setVerificationType('Driving License')}
          >
            <View style={styles.optionContent}>
              {verification.selectedType === 'Driving License' && (
                <View style={styles.checkbox}>
                  <Text style={styles.checkboxText}>✓</Text>
                </View>
              )}
              <Text style={[
                styles.optionText,
                verification.selectedType === 'Driving License' && styles.selectedOptionText
              ]}>
                Driving License
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton,
              verification.selectedType === 'Voter ID' && styles.selectedOption
            ]}
            onPress={() => setVerificationType('Voter ID')}
          >
            <View style={styles.optionContent}>
              {verification.selectedType === 'Voter ID' && (
                <View style={styles.checkbox}>
                  <Text style={styles.checkboxText}>✓</Text>
                </View>
              )}
              <Text style={[
                styles.optionText,
                verification.selectedType === 'Voter ID' && styles.selectedOptionText
              ]}>
                Voter ID
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Your Pan Card number"
          value={verification.cardNumber}
          onChangeText={setCardNumber}
        />
        
        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  verificationIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4285f4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 30,
    gap: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#8b1538',
    backgroundColor: '#fff5f7',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8b1538',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#8b1538',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});

export default VerificationScreen;