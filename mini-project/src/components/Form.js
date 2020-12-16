import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import PasswordValidator from './PasswordValidator';


const InitialStates = {
  email: '',
  password: '',
  password2: '',
  name: '',
  user: '',
}
//let buttonColor = 'red';


const Form = ( props ) => {
  const [ state, setState ] = useState(InitialStates); 

  const updateState = (stateName, value) => {
    setState({
      ...state,
      [stateName]: value 
    });
  };

  //(props.buttonColor) ? buttonColor = props.buttonColor: buttonColor='blue';

  return(
    <View style={styles.formContainer}>
      <Text style={styles.title}>{props.title}</Text>
      {props.name 
        ? <View>
            <Text style={styles.instructionText}>Full name:</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder={'Firstname Lastname'}
              value={state.name}
              maxLength={50}
              onChangeText={(text) => updateState('name', text)}
            />
          </View>
        : <View/>
      }
      {props.user 
        ? <View>
            <Text style={styles.instructionText}>Username:</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder={'username'}
                value={state.user}
                maxLength={20}
                onChangeText={(text) => updateState('user', text)}
            /> 
          </View>
        : <View/>
      }
      {props.email 
        ? <View>
            <Text style={styles.instructionText}>Email address:</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder={'email@email.com'}
              value={state.email} 
              maxLength={50}
              keyboardType={'email-address'}
              onChangeText={(text) => updateState('email', text)}
            /> 
          </View>
        : <View/>
      }
      {props.password 
        ? <View>
            <Text style={styles.instructionText}>Password:</Text>
            <TextInput 
              style={styles.textInput} 
              value={state.password} 
              secureTextEntry={true}
              onChangeText={(text) => updateState('password', text)}
            /> 
            <PasswordValidator password={state.password} />
            <Text style={styles.instructionText}>Confirm password:</Text>
            <TextInput 
              style={styles.textInput} 
              value={state.password2} 
              secureTextEntry={true}
              onChangeText={(text) => updateState('password2', text)}
            /> 
            <Text style={styles.nomatchText}>
              {(state.password.length == 0) ? '' 
              : (state.password != state.password2) ? "Passwords don't match" 
              : "It's a match!"}
            </Text>
          </View>
        : <View/>
      }
      <TouchableOpacity style={styles.submitButtom}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

Form.propTypes = {
  email: PropTypes.bool,
  password: PropTypes.bool,
  name: PropTypes.bool,
  user: PropTypes.bool,
  passwordvalidator: PropTypes.bool,
  title: PropTypes.string,
  
  /*buttonColor: PropTypes.string,
  borderColor: PropTypes.string,
  inputFontSize: PropTypes.number,*/
}
Form.defaultProps = {
  email: true,
  password: true,
  name: false,
  user: false,
  passwordvalidator: false,
  title: 'Sign up',
}

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  title: {
    margin: 5,
    fontSize: 25,

  },
  instructionText: {
    paddingLeft: 3,
    marginLeft: 5,
    marginTop: 7,
    fontSize: 10,
    color: 'gray',
  },
  textInput: {
    height: 30,
    minWidth: 175,
    padding: 3,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,

  },
  nomatchText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    marginRight: 5,
    color: 'gray'
  },
  submitButtom: {
    height: 40,
    width: 140,
    padding: 5,
    margin: 10,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});