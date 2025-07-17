import { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleImagePress = (index) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * CARD_WIDTH, animated: true });
  };

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.imageCarouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.imageScroll}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Image Indicators */}
      <View style={styles.imageIndicators}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator
            ]}
            onPress={() => handleImagePress(index)}
          />
        ))}
      </View>

      {/* Image Counter */}
      <View style={styles.imageCounter}>
        <Text style={styles.imageCounterText}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCarouselContainer: {
    position: 'relative',
    height: 400,
  },
  imageScroll: {
    flex: 1,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: 400,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 16,
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ImageCarousel;
