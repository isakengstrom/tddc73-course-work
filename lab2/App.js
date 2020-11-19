import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './components/Styles';
import Creditcard from './components/Creditcard';
import InputField from './components/InputField';

export default function App() {
  return (
    <View style={styles.container}>
      <Creditcard />
      <InputField />
     
      <StatusBar style="auto" />
    </View>
  );
}


