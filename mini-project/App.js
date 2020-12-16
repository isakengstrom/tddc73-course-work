import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import Form from './src/components/Form';

const fieldNames = [
  {fieldType: 'email', isRequired: true, placeholder: 'email@email.com'}, 
  {fieldType: 'password'},
];

export default function App() {
  return (
    <View style={styles.container}>
      <Form 
        email={true}
        password={true}
        name={true}
        user={true}
      />
      <StatusBar style="auto"/>
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
