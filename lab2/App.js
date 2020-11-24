import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import styles from './components/Styles';
import Creditcard from './components/Creditcard';
import InputField from './components/InputField';

const App = () => {
  const [state, setState] = useState({
    activeField: 0, 
    number: '', 
    name: '', 
    month: '', 
    year: '', 
    cvv: '',
  });
  
  const deactivateFocus = () => {
    updateState('activeField', 0);
    Keyboard.dismiss();
  }

  const updateState = (stateName, value) => {
    setState({
      ...state,
      [stateName]: value || '',
    });
    
    console.log("State: " + stateName + " - value: " + value);
  };


  return (
    <TouchableWithoutFeedback onPress={deactivateFocus} accessible={false}>
      <View style={styles.container}>
        <Creditcard />
        <InputField state={state} updateState={updateState} />
      
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default App;