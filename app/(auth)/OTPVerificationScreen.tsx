import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ImageBackground,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '','']);
  const [isResending, setIsResending] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRefs = useRef([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardVisible(true);
      const keyboardHeight = event.endCoordinates.height;
      // Slide up by keyboard height minus some padding
      Animated.timing(slideAnim, {
        toValue: -keyboardHeight + 100,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      // Return to original position
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [slideAnim]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      Alert.alert('Success', `OTP Verified: ${otpString}`);
      router.push('/(verifications)/MultiStepForm')
    } else {
      Alert.alert('Error', 'Please enter complete OTP');
    }
  };

  const handleResend = () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      Alert.alert('Success', 'OTP sent to your registered email');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Background Image Section */}
      <View style={styles.imageSection}>
        <ImageBackground
          source={require('@/assets/images/register-image.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.imageOverlay} />
        </ImageBackground>
      </View>

      {/* Bottom Card Section */}
      <Animated.View 
        style={[
          styles.bottomSection,
          {
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>OTP VERIFICATION</Text>
              <Text style={styles.subtitle}>
                We have sent the OTP to
              </Text>
              <Text style={styles.email}>96********330</Text>
            </View>

            {/* OTP Input Container */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : styles.otpInputEmpty
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Resend Section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't receive OTP?{' '}
                <Text 
                  style={styles.resendLink} 
                  onPress={handleResend}
                >
                  Resend
                </Text>
              </Text>
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              style={styles.verifyButton}
              onPress={handleVerify}
              activeOpacity={0.8} 
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageSection: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    minHeight: height * 0.6,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  otpInputEmpty: {
    borderColor: '#e0e0e0',
    color: '#333',
  },
  otpInputFilled: {
    borderColor: '#8B4513',
    color: '#333',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    color: '#8B4513',
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#7D0A0A',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default OTPVerificationScreen;