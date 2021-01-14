import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';

import Form from './src/components/form/Form';
import {customSignUpArray} from './src/components/customForms';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Form 
          fields={customSignUpArray}
          fieldNumbering={true}
          titleCustomization={{
            titleText: 'Sign up',
            titleStyling: {fontFamily: 'Avenir', fontWeight: '600'},
          }}
          buttonCustomization={{
            buttonText: 'SUBMIT', 
            buttonStyling: {backgroundColor: 'rgb(250, 100, 20)'}, 
            buttonTextStyling: {fontFamily: 'Avenir'},
          }}
        />
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: '5%',
  },
  formContainer: {
    width: '70%',
  },  
});
