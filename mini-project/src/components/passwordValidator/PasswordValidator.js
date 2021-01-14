import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';
import { specialCharsCheck, numbCheck, lowerCaseCheck, upperCaseCheck } from './Checks';

//Make strength bar customizable
/*Consider the following rules, for each rules followed add a point to the 
passwords strength level (so that 0 points is the weakest, and 5 is the strongest). 
UI-patterns.com defines a strong password when it…:

Has more than 8 characters
Contains both lowercase and uppercase letters
Contains at least one numerical character
Contains special characters
Has more than 12 characters
This would result in 6 levels of password strength depending on how many of the above 
mentioned criteria are being met.*/


const PasswordValidator = ( props ) => {
  const [strength, setStrength] = useState(0); 
  
  useEffect(() => {
    let totalStrength = 0;
    
    if(props.password.length >= 8) {
      totalStrength++; 
    }
    if(props.password.length > 12) {
      totalStrength++;
    }
    if(specialCharsCheck.test(props.password)) {
      totalStrength++; 
    }
    if(numbCheck.test(props.password)) {
      totalStrength++; 
    }
    if(lowerCaseCheck.test(props.password) && upperCaseCheck.test(props.password)) {
      totalStrength++; 
    }
    
    setStrength(totalStrength);
  }, [props.password]);
  const status = () => {
    const arr = [0, 1, 2, 3, 4];  
    const colors = ['#d9543f', '#d9543f', '#f0ad4e', '#f0ad4e', '#5cb85c']    
    
    return(
      <View style={{flexDirection: 'row', marginRight: 5, alignSelf: 'flex-end'}}>
        <Text style={styles.feedbackText}>
          {(props.password.length == 0 ) ? ''
            : !(props.password.length >= 8) ? 'Too short' 
            : (strength < 2) ? 'Weak' 
            : (strength < 4) ? 'Medium' 
            : ((strength < 5) ? 'Strong' 
            : 'Very Strong')}
        </Text>
        {arr.map((circle) => (
          <View 
            key={circle} 
            style={[styles.circle, (strength > circle && props.password.length >= 8) ? {backgroundColor: colors[strength-1]} : null]}>
          </View>
        ))}
      </View>
    ); 
  }
  
  return(
    <View>
      {status()}
    </View>
  );
}

PasswordValidator.propTypes = {
  password: PropTypes.string.isRequired,
}

export default PasswordValidator;

const styles = StyleSheet.create({
  circle: {
    height: 7,
    width: 7,
    margin: 2,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  feedbackText: {
    color: 'gray',
    fontSize: 9,
    marginRight: 5,
  }
});