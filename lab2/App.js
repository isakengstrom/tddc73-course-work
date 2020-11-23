import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import styles from './components/Styles';
import Creditcard from './components/Creditcard';
import InputField from './components/InputField';

const App = () => {
  const [activeField, setActiveField] = useState(0);
  const [cardText, setCardText] = useState({number: '', name: '', cvv: ''});

  const deactivateFocus = () => {
    setActiveField(0);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={deactivateFocus} accessible={false}>
      <View style={styles.container}>
        <Creditcard />
        <InputField activeField={activeField} setActiveField={setActiveField} cardText={cardText} setCardText={setCardText} />
      
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default App;