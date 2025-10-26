import React from 'react';
import { View, StyleSheet } from 'react-native';

export const BottomFadeShadow = () => {
  return (
    <View style={styles.overlay}>
      <View style={[styles.layer, { backgroundColor: 'rgba(0,0,0,0.4)' }]} />
      <View style={[styles.layer, { backgroundColor: 'rgba(0,0,0,0.25)' }]} />
      <View style={[styles.layer, { backgroundColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.layer, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
  layer: {
    flex: 1,
  },
});
