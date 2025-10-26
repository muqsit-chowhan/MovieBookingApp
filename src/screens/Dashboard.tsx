import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Dashboard</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18, fontWeight: '500' },
});

export default DashboardScreen;
