import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
//import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//https://www.npmjs.com/package/react-native-dropdown-picker
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './components/Styles';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


export default App;