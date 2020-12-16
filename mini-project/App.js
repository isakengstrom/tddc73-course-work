import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import Form from './Form';

const fieldNames = [
  'email', 
  'password',
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>BENNY</Text>
      <Form fields={fieldNames}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
