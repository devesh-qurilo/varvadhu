import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const ProfileScreen = () => {
    const router = useRouter();

    const handleEdit = (section) => {
        console.log(`Navigate to edit ${section}`);
        router.push(`${section}`);
    };

    const handleBack = () => {
        console.log('Navigate back');
        // navigation.goBack();
    };

    const ProfileSection = ({ title, children, onEdit }) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={onEdit}
                    activeOpacity={0.7}
                >
                    <Feather name="edit" size={24} color="#D2691E" />
                    {/* <Text style={styles.editButtonText}>Edit</Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    const InfoRow = ({ label, value, isLast = false }) => (
        <View style={[styles.infoRow, isLast && styles.lastInfoRow]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />

            {/* Header */}
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.headerButton}
                        activeOpacity={0.6}
                    >
                        <Ionicons name="chevron-back" size={26} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>register - basic ...</Text>
                    <TouchableOpacity
                        style={styles.headerButton}
                        activeOpacity={0.6}
                    >
                        <Ionicons name="ellipsis-horizontal" size={26} color="#333" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Picture Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileImageOverlay}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.profileName}>Alex Johnson</Text>
                    <Text style={styles.profileSubtext}>
                        Add a photo so people can get to know you better
                    </Text>
                    {/* <TouchableOpacity
                        style={styles.addPhotoButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.addPhotoText}>Add Photo</Text>
                    </TouchableOpacity> */}



                    <View style={{ backgroundColor: '#FFF8F0', flexDirection: 'row', width: 320, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10, marginVertical: 10 }}>
                        <Text style={{ color: '#000', width: 250 }}>Verify your profile using selfie to assure others
                            you are genuine and get</Text>
                        <MaterialIcons name="verified" size={34} color="blue" />
                    </View>
                </View>

                {/* About Me Section */}
                <ProfileSection
                    title="About me"
                    onEdit={() => handleEdit('AboutMeScreen')}
                >
                    <InfoRow label="First Name" value="Alex" />
                    <InfoRow label="Last Name" value="Johnson" />
                    <InfoRow label="I am a" value="Man" />
                    <InfoRow label="Looking for" value="Woman" />
                    <InfoRow label="Country" value="United States" />
                    <InfoRow label="State" value="New York" />
                    <InfoRow label="City" value="Manhattan" isLast />
                </ProfileSection>

                {/* Personal Background Section */}
                <ProfileSection
                    title="Religious Background"
                    onEdit={() => handleEdit('ReligiousBackground')}
                >
                    <InfoRow label="Age" value="32" />
                    <InfoRow label="Height" value="6'1\" />
                    <InfoRow label="Body Type" value="Athletic" />
                    <InfoRow label="Ethnicity" value="Mixed" />
                    <InfoRow label="Religion" value="Spiritual" />
                    <InfoRow label="Politics" value="Liberal" />
                    <InfoRow label="Smoking" value="Never" />
                    <InfoRow label="Drinking" value="Socially" />
                    <InfoRow label="Children" value="None" />
                    <InfoRow label="Want Children" value="Maybe" isLast />
                </ProfileSection>

                {/* Work & Education Section */}
                <ProfileSection
                    title="Family"
                    onEdit={() => handleEdit('FamilyScreen')}
                >
                    <InfoRow label="Education Level" value="Master's Degree" />
                    <InfoRow label="Occupation" value="Product Manager" />
                    <InfoRow label="Income" value="$75,000 - $100,000" isLast />
                </ProfileSection>

                {/* Lifestyle Section */}
                <ProfileSection
                    title="Astro Details"
                    onEdit={() => handleEdit('AstroDetailsScreen')}
                >
                    <InfoRow label="Languages" value="English, French" />
                    <InfoRow label="Interests" value="Art, Technology, Fitness" />
                    <InfoRow label="Hobbies" value="Photography, Yoga, Cooking" isLast />
                </ProfileSection>

                {/* Appearance Section */}
                <ProfileSection
                    title="Education"
                    onEdit={() => handleEdit('EducationScreen')}
                >
                    <InfoRow label="Hair Color" value="Dark Brown" />
                    <InfoRow label="Eye Color" value="Hazel" />
                    <InfoRow label="Best Feature" value="Eyes" isLast />
                </ProfileSection>

                {/* Health & Wellness Section */}
                <ProfileSection
                    title="Career"
                    onEdit={() => handleEdit('CareerScreen')}
                >
                    <InfoRow label="Exercise" value="5 times a week" />
                    <InfoRow label="Diet" value="Mostly healthy" />
                    <InfoRow label="Sleep Schedule" value="Night owl" isLast />
                </ProfileSection>

                {/* More Info Section */}
                <ProfileSection
                    title="Life And Hobbies"
                    onEdit={() => handleEdit('LifeAndHobbies')}
                >
                    <InfoRow label="Personality" value="Adventurous" />
                    <InfoRow label="Sense of Humor" value="Sarcastic" />
                    <InfoRow label="Communication Style" value="Open" />
                    <InfoRow label="Love Language" value="Physical Touch" />
                    <InfoRow label="Conflict Resolution" value="Talk it out" />
                    <InfoRow label="Social Habits" value="Social butterfly" />
                    <InfoRow label="Weekend Activities" value="Exploring the city" />
                    <InfoRow label="Travel" value="Love to travel" />
                    <InfoRow label="Pets" value="Cat person" />
                    <InfoRow label="Living Situation" value="Own apartment" isLast />
                </ProfileSection>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    safeArea: {
        backgroundColor: '#f9f9f9',
        marginTop:HEADER_HEIGHT_MARGIN
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e8e8e8',
    },
    headerButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: -0.2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 35,
        paddingHorizontal: 25,
        backgroundColor: '#ffffff',
        marginBottom: 12,
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        backgroundColor: '#f5f5f5',
        borderWidth: 3,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImageOverlay: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    profileSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
        paddingHorizontal: 15,
        fontWeight: '400',
    },
    addPhotoButton: {
        backgroundColor: '#D2691E',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 25,
        shadowColor: '#D2691E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    addPhotoText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.1,
    },
    section: {
        backgroundColor: '#FFF8F0',
        margin: 12,
        borderWidth: .5,
        borderColor: '#D2691E',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: -0.2,
    },
    editButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        backgroundColor: 'rgba(210, 105, 30, 0.1)',
    },
    editButtonText: {
        color: '#D2691E',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.1,
    },
    sectionContent: {
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f5f5f5',
    },
    lastInfoRow: {
        borderBottomWidth: 0,
        paddingBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        fontWeight: '400',
        letterSpacing: -0.1,
    },
    value: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
        letterSpacing: -0.1,
    },
    bottomSpacing: {
        height: 25,
    },
});

export default ProfileScreen;