import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import ProfileCard from './ProfileCard';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const SwipeableCard = ({ profile, onSwipe, onReject, onSuperLike, onLike }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
      scale.value = withSpring(1.05);
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = interpolate(
        translateX.value,
        [-width, 0, width],
        [-30, 0, 30],
        Extrapolate.CLAMP
      );
    },
    onEnd: (event) => {
      const shouldDismiss = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      
      if (shouldDismiss) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        translateX.value = withTiming(translateX.value > 0 ? width : -width, { duration: 300 });
        translateY.value = withTiming(translateY.value + event.velocityY * 0.1, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        runOnJS(onSwipe)(profile.id, direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const nopeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.swipeableCard, animatedStyle]}>
        <ProfileCard 
          profile={profile}
          onReject={onReject}
          onSuperLike={onSuperLike}
          onLike={onLike}
        />
        
        {/* Like Overlay */}
        <Animated.View style={[styles.overlay, styles.likeOverlay, likeOverlayStyle]}>
          <View style={styles.overlayContent}>
            <Ionicons name="heart" size={60} color="#fff" />
            <Text style={styles.overlayText}>LIKE</Text>
          </View>
        </Animated.View>

        {/* Nope Overlay */}
        <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOverlayStyle]}>
          <View style={styles.overlayContent}>
            <Ionicons name="close" size={60} color="#fff" />
            <Text style={styles.overlayText}>NOPE</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  swipeableCard: {
    marginBottom: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  likeOverlay: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  nopeOverlay: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
  overlayContent: {
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
});

export default SwipeableCard;
