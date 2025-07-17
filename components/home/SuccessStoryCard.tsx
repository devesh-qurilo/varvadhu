import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width / 2 - 24;

const SuccessStoryCard = ({ data }) => (
  <View style={styles.card}>
    <Image source={{ uri: data.image }} style={styles.image} />
    <Text style={styles.title}>{data.title}</Text>
    <Text style={styles.subtitle}>{data.subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
});

export default SuccessStoryCard;
