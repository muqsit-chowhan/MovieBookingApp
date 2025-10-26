import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ZoomControls: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.sign}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.sign}>−</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ZoomControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#ffff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderColor:'#EFEFEF'
  },
  sign: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
});
