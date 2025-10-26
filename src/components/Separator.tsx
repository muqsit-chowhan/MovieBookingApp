import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
    marginVertical: 10, 
    opacity: 0.1, 
  },
});

export default Separator;
