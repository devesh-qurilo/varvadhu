import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  // Optional: Load custom fonts
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/SpaceMono-Regular.ttf'), // example font
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
