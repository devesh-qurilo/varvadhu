// import { router } from 'expo-router';
// import { useEffect } from 'react';
// import { ActivityIndicator, Text, View } from 'react-native';
// import { useAppStore } from '../store/appStore';

// export default function SplashScreen() {
//   const { isOnboarded, user } = useAppStore();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!isOnboarded) {
//         router.replace('/(onboarding)/welcome');
//       } else if (!user) {
//         router.replace('/(auth)/login');
//       } else {
//         router.replace('/(tabs)/home');
//       }
//     }, 2000); // 2-second splash

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//       <Text>🚀 Loading...</Text>
//     </View>
//   );
// }





import { useAppStore } from '@/store/appStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Animated,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function SplashScreen() {
     const { isOnboarded, user } = useAppStore();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

//     // Navigate to onboarding after 3 seconds
//     const timer = setTimeout(() => {
//       navigation.replace('Onboarding');
//       // navigation.replace('Login');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation]);






//   useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOnboarded) {
        router.replace('/(onboarding)/welcome');
      } else if (!user) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(tabs)/home');
      }
    }, 4000); // 2-second splash

    return () => clearTimeout(timer);
}, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash-bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        {/* Overlay for better text readability */}
        <View style={styles.overlay}>
          {/* <StatusBar barStyle="light-content" backgroundColor="#991b1b" /> */}
          
          {/* Animated Logo Container */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            {/* Logo/Icon */}
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>💕</Text>
            </View>
            
            {/* App Name */}
            <Text style={styles.appName}>
              Varvadhu
            </Text>
            
            {/* Tagline */}
            <Text style={styles.tagline}>
              Find your perfect match
            </Text>
          </Animated.View>

          {/* Loading Indicator */}
          <Animated.View 
            style={[styles.loadingContainer, { opacity: fadeAnim }]}
          >
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          </Animated.View>

          {/* Version */}
          <Animated.View 
            style={[styles.versionContainer, { opacity: fadeAnim }]}
          >
            <Text style={styles.versionText}>
              Version 1.0.0
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(243, 244, 246, 0.7)', // bg-gray-100/70
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 96, // w-24 (24 * 4 = 96)
    height: 96, // h-24
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // bg-white/90
    borderRadius: 48, // rounded-full
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24, // mb-6 (6 * 4 = 24)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // shadow-lg equivalent
  },
  logoEmoji: {
    fontSize: 36, // text-4xl equivalent
  },
  appName: {
    color: '#ef4444', // text-red-500
    fontSize: 60, // text-6xl equivalent
    fontWeight: 'bold',
    marginBottom: 8, // mb-2
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    color: '#7f1d1d', // text-red-900
    fontSize: 20, // text-xl
    textAlign: 'center',
    paddingHorizontal: 32, // px-8
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80, // bottom-20 (20 * 4 = 80)
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // space-x-2
  },
  dot: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
  },
  dot1: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // bg-white/60
  },
  dot2: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // bg-white/80
  },
  dot3: {
    backgroundColor: 'rgba(255, 255, 255, 1)', // bg-white
  },
  versionContainer: {
    position: 'absolute',
    bottom: 32, // bottom-8 (8 * 4 = 32)
  },
  versionText: {
    color: '#fecaca', // text-red-200
    fontSize: 14, // text-sm
  },
});