import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, EdgeInsetsPropType } from 'react-native';
import PropTypes from 'prop-types';

import PasswordValidator from '../passwordValidator/PasswordValidator';
  
const defaultFieldProps = [
  {
    type: 'text', 
    label: 'Input',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },
  {
    type: 'email', 
    label: 'Email',
    placeholder: 'bob@mail.com',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },  
  {
    type: 'emailConfirmation', 
    label: 'Confirm Email',
    placeholder: 'Enter again',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },  
  {
    type: 'password', 
    label: 'Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: true,
  },
  {
    type: 'passwordConfirmation', 
    label: 'Confirm Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: null,
  },
   
];

const defaultForm = [
  [{
      type: 'text', 
      label: 'Username', 
      placeholder: '',
      isRequired: true, 
    }],
  [{
      type: 'email', 
      label: 'Email', 
      placeholder: 'email@email.com',
      isRequired: true, 
    }],
  [{
      type: 'password', 
      label: 'Password', 
      placeholder: '',
      isRequired: true, 
    }],
];

const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const Form = ( props ) =>  {
  let initialFieldText = {};

  const [ state, setState ] = useState(useMemo(() => {
    let tempName = null;
    
    props.fields.map((edge, eInd) => {
      edge.map((node, nInd) => {
        tempName = node.type;
        if(node.type == 'text') {
          tempName = node.type+eInd+nInd;
        }
        
        initialFieldText = {
          ... initialFieldText,
          [tempName]: '' 
        }

        /*
        initialFieldText = {
          ... initialFieldText,
          types: {
            ...initialFieldText.types,
            [tempName]: '',  
          } 
        }
        */
      })
    });

    return initialFieldText;
  })


  ); 
  
  const updateState = (stateName, value) => {
    setState(prevState => ({
      ...prevState,
      [stateName]: value 
    }));
  };

  const isNotReadyToSubmit = () => {
    
    if(Object.keys(state).length == 0) {
      return true;
    }
    
    let disable = false;
    Object.keys(state).map((key) => {
      if( 
        (state[key] == '') || 
        ((key == 'email') && !emailCheck.test(state[key])) || 
        ((key == 'emailConfirmation') && (state.email != state.emailConfirmation))
        || ((key == 'password') && (state[key].length < 8))
        || ((key == 'passwordConfirmation') && (state.password != state.passwordConfirmation))
      ) {
        disable = true;
      }
    });
    return disable;
  };

  const onSubmitDefault = () => {
    Keyboard.dismiss();
    setState(initialFieldText);
  }; 

  const renderFields = () => {
    console.log(state);
    return(
      <View >
        {props.fields.map((edge, eIndex) => {
          return(
            <View key={eIndex} style={styles.fieldsContainer}>
              {edge.map((node, nIndex) =>  {
                return(
                  <View key={nIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{node.label || 'Input'}:</Text>
                    <TextInput 
                      style={[styles.textInput, node.styling || null]} 
                      placeholder={node.placeholder || 'placeholder'}
                      value={state[(node.type == 'text') ? node.type+eIndex+nIndex : node.type]}
                      onChangeText={ (text) => 
                        updateState((node.type == 'text') ? node.type+eIndex+nIndex : node.type, text)}
                      maxLength={node.maxLength || null}
                      keyboardType={node.keyboardType || null}
                      secureTextEntry={node.secureTextEntry || null}
                    />
                    { 
                    //props.PasswordValidator ? props.PasswordValidator : null
                      (node.validation && node.type == 'password') ? <PasswordValidator password={state.password || ''}/> : null
                    }
                    {node.type.includes('Confirmation') 
                      ? <Text style={styles.nomatchText}>
                        { (!state[node.type] || state[node.type] == '')
                          ? null 
                          : (state[node.type.split('C')[0]] != state[node.type]) 
                            ? "Fields don't match :(" 
                            : "It's a match!" }
                      </Text>
                      : null
                    }
                  </View>
                );
              })}
            </View>
          )
        })}
      </View>
    );
  }

  return(
    <View style={styles.formContainer}>
      <Text style={[styles.title, props.titleCustomization.titleStyling || null]}>
        {props.titleCustomization.titleText || 'Form'}
      </Text>
      {renderFields()}
      <TouchableOpacity 
        onPress={props.onSubmit ? props.onSubmit : onSubmitDefault} 
        disabled={isNotReadyToSubmit()} 
        style={[styles.submitButtom, props.buttonCustomization.buttonStyling || null]}>
        <Text style={[styles.buttonText, props.buttonCustomization.buttonTextStyling || null]}>
          {props.buttonCustomization.buttonText || 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Form;

// FORM PROP TYPES //
Form.propTypes = {
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([
      'text', 'email', 'emailConfirmation', 'password', 'passwordConfirmation'
    ]).isRequired,
    value: PropTypes.string,
    label: PropTypes.string, 
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    validation: PropTypes.bool,
    styling: PropTypes.object,
  }))),
  titleCustomization: PropTypes.shape({
    titleText: PropTypes.string,
    titleStyling: PropTypes.object,
  }),
  buttonCustomization: PropTypes.shape({
    buttonText: PropTypes.string,
    buttonStyling: PropTypes.object,
    buttonTextStyling: PropTypes.object,
  }),
  passwordValidator: PropTypes.element,
}
Form.defaultProps = {
  fields: defaultForm,
}

// FORM STYLING //
const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: 5,
  },
  fieldsContainer: {
    flexDirection: 'row', 
    alignItems: 'stretch',
  },
  fieldContainer: {
    flex: 1, 
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
    fontSize: 11,
    color: 'gray',
  },
  textInput: {
    height: 30,
    padding: 3,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  nomatchText: {
    alignSelf: 'flex-end',
    fontSize: 9,
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