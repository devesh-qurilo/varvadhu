// import { router } from 'expo-router';
// import { Button, Text, View } from 'react-native';
// import { useAuthStore } from '../../store/authStore';

// export default function LoginScreen() {
//   const login = useAuthStore((state) => state.login);

//   const handleLogin = () => {
//     login({ name: 'Devesh' }); // Mock user
//     router.replace('/(tabs)/home');
//   };

//   return (
//     <View>
//       <Text>🔐 Login with Zustand</Text>
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }


import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define your stack param list
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  // add other routes here if needed
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // ScrollView ref for programmatic scrolling
  const scrollViewRef = useRef<ScrollView>(null);

  // Dynamic height calculations based on screen size
  const imageHeight = screenHeight * 0.45; // 35% of screen height
  const isSmallScreen = screenHeight < 700;
  const formMarginTop = isSmallScreen ? -60 : -80;

  // Handle input focus to scroll to input
  const handleInputFocus = (inputPosition: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: inputPosition,
        animated: true,
      });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              {/* Hero Image - Dynamic Height */}
              <View 
                style={[styles.heroImageContainer, { height: imageHeight }]}
              >
                <Image
                  source={require('../../assets/images/login-img.jpg')}
                  style={styles.heroImage}
                />
              </View>

              {/* Login Form - Dynamic Margin */}
              <View 
                style={[
                  styles.formContainer,
                  { 
                    marginTop: formMarginTop,
                    minHeight: screenHeight * 0.6 
                  }
                ]}
              >
                {/* Email/Number Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Enter Your Email/Number
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => handleInputFocus(imageHeight - 50)}
                    style={styles.textInput}
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#9CA3AF"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Please enter password
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => handleInputFocus(imageHeight + 50)}
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Options Row - Responsive Layout */}
                <View style={[
                  styles.optionsRow,
                  { marginBottom: isSmallScreen ? 16 : 24 }
                ]}>
                  <TouchableOpacity
                    onPress={() => setLoginWithOTP(!loginWithOTP)}
                    style={styles.otpCheckboxContainer}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        loginWithOTP ? styles.checkboxChecked : styles.checkboxUnchecked
                      ]}
                    >
                      {loginWithOTP && (
                        <Ionicons name="checkmark" size={12} color="#ffffff" />
                      )}
                    </View>
                    <Text style={styles.otpText}>Login with OTP</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity 
                  style={[
                    styles.loginButton,
                    { 
                      paddingVertical: isSmallScreen ? 12 : 16,
                      marginBottom: isSmallScreen ? 16 : 24 
                    }
                  ]}
                  activeOpacity={0.8}   onPress={()=>router.push('/(auth)/OTPVerificationScreen')}
                >
                  <Text style={styles.loginButtonText}>
                    Login
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Link - Better Text Wrapping */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>
                    Don't have an account?{' '}
                    <Text 
                      style={styles.signUpLink}
                      onPress={() => router.push('/(auth)/register')}
                    >
                      Sign Up here
                    </Text>
                    .
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // bg-gray-100
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
  },
  heroImageContainer: {
    backgroundColor: '#fef2f2', // approximate gradient from red-50 to green-50
  },
  heroImage: {
    width: '100%',
    height: '200%',
    resizeMode: 'cover',
  },
  formContainer: {
    backgroundColor: '#FFF8F0',
    borderTopLeftRadius: 24, // rounded-t-3xl
    borderTopRightRadius: 24,
    paddingHorizontal: 24, // px-6
    paddingTop: 32, // pt-8
    paddingBottom: 48, // pb-12
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    minHeight: '100%',
  },
  inputContainer: {
    marginBottom: 16, // mb-4
  },
  inputLabel: {
    color: '#4b5563', // text-gray-600
    fontSize: 14, // text-sm
    marginBottom: 8, // mb-2
    fontWeight: '500', // font-medium
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-gray-200
    borderRadius: 12, // rounded-xl
    fontSize: 16, // text-base
    color: '#1f2937', // text-gray-800
    backgroundColor: '#f9fafb', // bg-gray-50
    minHeight: 48,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    width: '100%',
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    paddingRight: 48, // pr-12
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-gray-200
    borderRadius: 12, // rounded-xl
    fontSize: 16, // text-base
    color: '#1f2937', // text-gray-800
    backgroundColor: '#f9fafb', // bg-gray-50
    minHeight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16, // right-4
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4, // p-1
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otpCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16, // mr-4
  },
  checkbox: {
    width: 16, // w-4
    height: 16, // h-4
    borderWidth: 1,
    borderColor: '#9ca3af', // border-gray-400
    borderRadius: 2,
    marginRight: 8, // mr-2
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6', // bg-blue-500
    borderColor: '#3b82f6', // border-blue-500
  },
  checkboxUnchecked: {
    backgroundColor: '#ffffff', // bg-white
  },
  otpText: {
    color: '#4b5563', // text-gray-600
    fontSize: 14, // text-sm
    flexShrink: 1,
  },
  forgotPasswordText: {
    color: '#3b82f6', // text-blue-500
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#991b1b', // bg-red-800
    borderRadius: 12, // rounded-xl
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonText: {
    color: '#ffffff', // text-white
    textAlign: 'center',
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  signUpText: {
    color: '#4b5563', // text-gray-600
    fontSize: 16, // text-base
    textAlign: 'center',
  },
  signUpLink: {
    color: '#991b1b', // text-red-800
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
  },
});