import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Form from './src/components/formV2/FormV2';
import fieldArray from './src/components/formV2/fieldArrayV2';
import PasswordValidator from './src/components/passwordValidatorV2/PasswordValidatorV2';


const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Form 
          fields={fieldArray}
          //passwordValidator={<PasswordValidator password={state.password || ''}/>}
          titleCustomization={{
            titleText: 'SIGN UP!',
            titleStyling: {fontFamily: 'Avenir'}}}
          buttonCustomization={{
            buttonText: 'SUBMIT', 
            buttonStyling: {backgroundColor: 'rgb(250, 100, 20)'}, 
            buttonTextStyling: {fontFamily: 'Avenir'}}}
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
    justifyContent: 'center',
  },
  formContainer: {
    width: '70%',
  },  
});
