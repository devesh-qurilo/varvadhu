import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Dashboard' }} /> */}
      <Stack.Screen name="profile-visits" options={{ title: 'Profile Visits' }} />
      <Stack.Screen name="shortlisted-profiles" options={{ title: 'Shortlisted Profiles' }} />
      <Stack.Screen name="horoscope-matches" options={{ title: 'Horoscope Matches' }} />
      <Stack.Screen name="nearby-matches" options={{ title: 'Nearby Matches' }} />
    </Stack>
  );
}
