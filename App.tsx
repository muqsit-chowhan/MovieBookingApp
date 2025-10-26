/**
 * Movie Booking App
 * Clean TypeScript setup with SafeArea + Navigation
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent(): JSX.Element {
  // Remove the padding from here - let each screen handle its own safe area
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;