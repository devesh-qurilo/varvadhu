import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Tabs } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const HEADER_MARGIN = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// Modern Drawer Component with optimized animations
const CustomDrawer = ({ isVisible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const isAnimating = useRef(false);

  const runAnimations = (show) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const animations = [];
    
    if (show) {
      animations.push(
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 120,
          friction: 10,
          useNativeDriver: true,
        })
      );
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      );
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 120,
          friction: 10,
          useNativeDriver: true,
        })
      );
    } else {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: -width * 0.85,
          duration: 200,
          useNativeDriver: true,
        })
      );
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      );
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start(() => {
      isAnimating.current = false;
      if (!show) {
        // Additional cleanup if needed when closing
      }
    });
  };

  React.useEffect(() => {
    if (isVisible !== undefined) {
      runAnimations(isVisible);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.overlayBackground} 
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View 
          style={[
            styles.drawer,
            {
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.drawerContainer}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// Optimized Header Component
const CustomHeader = React.memo(({ title, onDrawerPress }) => {
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={['#7D0A0A', '#16213e']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={onDrawerPress} style={styles.drawerIcon}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="menu" size={22} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationIcon} onPress={()=> router.push("/(stack)/NotificationScreen")}>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
});

// Optimized Drawer Menu Component with simplified animations
const DrawerMenu = React.memo(({ onClose }) => {
  const menuItems = [
    { icon: 'person-outline', label: 'Profile', color: '#6366f1' },
    { icon: 'heart-outline', label: 'Favorites', color: '#ec4899' },
    { icon: 'chatbubble-outline', label: 'Messages', color: '#06b6d4' },
    { icon: 'settings-outline', label: 'Settings', color: '#8b5cf6' },
    { icon: 'shield-outline', label: 'Privacy', color: '#10b981' },
    { icon: 'help-circle-outline', label: 'Help & Support', color: '#f59e0b' },
    { icon: 'log-out-outline', label: 'Sign Out', color: '#ef4444' },
  ];

  const handleItemPress = (label) => {
    console.log(`${label} pressed`);
    onClose();
  };

  return (
    <ScrollView 
      style={styles.menuContainer} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.menuContentContainer}
    >
      {/* Header Section */}
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={34} color="#64748b" />
        </TouchableOpacity>
        
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={()=>router.push("/(stack)/ProfileScreen")}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="person" size={32} color="#fff" />
            </LinearGradient>
            <View style={styles.onlineIndicator} />
          </TouchableOpacity>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@example.com</Text>
        </View>
        
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>
      
      {/* Menu Items */}
      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleItemPress(item.label)}
            activeOpacity={0.7}
          >
            <View style={[styles.menuItemIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.menuItemText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>© 2024 Your App</Text>
        </View>
      </View>
    </ScrollView>
  );
});

// Custom Tab Bar Component
const CustomTabBar = React.memo(({ state, descriptors, navigation }) => {
  const getIconName = (routeName, focused) => {
    switch (routeName) {
      case 'home': return focused ? 'home' : 'home-outline';
      case 'match': return focused ? 'people' : 'people-outline';
      case 'inbox': return focused ? 'mail' : 'mail-outline';
      case 'message': return focused ? 'chatbubble' : 'chatbubble-outline';
      default: return 'home-outline';
    }
  };

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
      style={styles.tabBar}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.tabIconContainer, isFocused && styles.activeTabContainer]}>
              <Ionicons 
                name={getIconName(route.name, isFocused)} 
                size={22} 
                color={isFocused ? '#fff' : '#64748b'} 
              />
            </View>
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
});

// Main Layout Component with debounced drawer toggles
const TabLayout = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const isDrawerBusy = useRef(false);

  const toggleDrawer = (show) => {
    if (isDrawerBusy.current) return;
    isDrawerBusy.current = true;
    setIsDrawerVisible(show);
    setTimeout(() => {
      isDrawerBusy.current = false;
    }, 300);
  };

  const openDrawer = () => toggleDrawer(true);
  const closeDrawer = () => toggleDrawer(false);

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="VarVadhu App" 
        onDrawerPress={openDrawer}
      />
      
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="home" options={{ title: 'Home', tabBarLabel: 'Home' }} />
        <Tabs.Screen name="match" options={{ title: 'Matches', tabBarLabel: 'Matches' }} />
        <Tabs.Screen name="inbox" options={{ title: 'Inbox', tabBarLabel: 'Inbox' }} />
        <Tabs.Screen name="message" options={{ title: 'Messages', tabBarLabel: 'Messages' }} />
      </Tabs>

      <CustomDrawer isVisible={isDrawerVisible} onClose={closeDrawer}>
        <DrawerMenu onClose={closeDrawer} />
      </CustomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  // Header Styles
  header: {
    zIndex: 1000,
    marginTop: HEADER_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerGradient: {
    paddingTop: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  drawerIcon: {
    width: 40,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  
  // Drawer Styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  overlayBackground: {
    flex: 1,
  },
  drawer: {
    width: Math.min(width * 0.85, 340),
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  
  // Menu Styles
  menuContainer: {
    flex: 1,
    // borderWidth:5,
    // borderColor:'red'
  },
  menuContentContainer: {
    flexGrow: 1,
    // borderWidth:5,
    // marginTop:40,
    // width:'100%'
  },
  userInfo: {
    marginTop: 80,
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#f8fafc',
    borderTopRightRadius: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  userStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  menuItems: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    flex: 1,
  },
  drawerFooter: {
    marginTop: 'auto',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  footerContent: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  footerDivider: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#cbd5e1',
    marginVertical: 4,
  },
  
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeTabContainer: {
    backgroundColor: '#7D0A0A',
    shadowColor: '#6366f1',
    borderRadius:20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#7D0A0A',
    fontWeight: '700',
  },
});

export default TabLayout;