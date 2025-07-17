import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerShown: false
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="ChatScreen" options={{}} />
      <Stack.Screen name="profile-visits" options={{ title: 'Profile Visits' }} />
      <Stack.Screen name="shortlisted-profiles" options={{ title: 'Shortlisted Profiles' }} />
      <Stack.Screen name="horoscope-matches" options={{ title: 'Horoscope Matches' }} />
      <Stack.Screen name="nearby-matches" options={{ title: 'Nearby Matches' }} />
      <Stack.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
      <Stack.Screen name="AboutMeScreen" options={{ title: 'About Me' }} />
      <Stack.Screen name="AstroDetailsScreen" options={{ title: 'Astro Details' }} />
      <Stack.Screen name="BasicInfoScreen" options={{ title: 'Basic Info'}}/>
      <Stack.Screen name="CareerScreen" options={{ title: 'Career Details'}}/>
      <Stack.Screen name="EducationScreen" options={{ title: 'Education Details'}}/>
      <Stack.Screen name="FamilyScreen" options={{ title: 'Family Details'}}/>
      <Stack.Screen name="LifeAndHobbiesScreen" options={{ title: 'Hobbies Details'}}/>
      <Stack.Screen name="ReligiousBackgroundScreen" options={{ title: 'Religious Background'}}/>
      <Stack.Screen name="NotificationScreen" options={{ title: 'Religious Background'}}/>
       <Stack.Screen name="PartnerProfileScreen" options={{ title: 'Partner Profile'}}/>

    </Stack>
  );
}
