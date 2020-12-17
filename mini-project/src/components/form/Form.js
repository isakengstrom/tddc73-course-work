import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, EdgeInsetsPropType } from 'react-native';
import PropTypes from 'prop-types';

import PasswordValidator from '../passwordValidator/PasswordValidator';

const defaultFieldProps = {
  type: 'input', 
  label: 'Input',
  placeholder: '',
  isRequired: false,
  maxLength: null,
  keyboardType: null,
  secureTextEntry: false,
  key: null,
  validation: null,
};
  
const defaultFieldPropsAll = [
  {
    type: 'input', 
    label: 'Input',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    key: null,
    validation: null,
  },
  {
    type: 'input-username', 
    label: 'Username',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    key: null,
    validation: null,
  },  
  {
    type: 'input-password', 
    label: 'Password',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    key: null,
    validation: null,
  },  
   
];

const defaultForm = [
  [{
      type: 'input-username', 
      label: 'Username', 
      placeholder: '',
      isRequired: true, 
    }],
  [{
      type: 'input-email', 
      label: 'Email', 
      placeholder: 'email@email.com',
      isRequired: true, 
    }],
  [{
      type: 'input-password-valid', 
      label: 'Password', 
      placeholder: '',
      isRequired: true, 
    }],
];

const InitialStates = {
  email: '',
  password: '',
  password2: '',
  name: '',
  user: '',
}
const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Form = ( props ) => {
  const [ state, setState ] = useState(InitialStates); 

  const updateState = (stateName, value) => {
    setState({
      ...state,
      [stateName]: value 
    });
  };

  const isNotReadyToSubmit = () => {
    if( !emailCheck.test(state.email) 
        || state.name == ''
        || (state.password.length < 8)
        || (state.password != state.password2)
        || state.user == '')
        return true;
    return false;
  };

  const onSubmitDefault = () => {
    Keyboard.dismiss();
    setState(InitialStates);
  }; 

  const getValidator = (valid, password) => {
    console.log(password);
    if(valid) return(<PasswordValidator password={String(password)}/>);
    return null;
  }

  const matchConfirm = () =>  {
    /*field.type == 'input-confirmation' ? () => updateState('confirmkey-'+field.key+'0', field.key) : null*/
    /*
    
    
    */
    return null;
  }

  const renderFields = () => {
    let currFieldState = null;
    
    return(
      <View >
        {props.fields.map((node, fieldsIndex) => {

          return(
            <View key={fieldsIndex} style={styles.fieldsContainer}>
              {node.map((field, nodeIndex) => {
                currFieldState = fieldsIndex+'.'+nodeIndex;
                //console.log(currFieldState);
                return(
                  <View key={nodeIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{field.label || defaultFieldProps['label']}:</Text>
                    <TextInput 
                      style={[styles.textInput, field.styling || null]} 
                      placeholder={field.placeholder || defaultFieldProps['placeholder']}
                      value={state[currFieldState]}
                      onChangeText={(text) => updateState((currFieldState), text)}
                      maxLength={field.maxLength || defaultFieldProps['maxLength']}
                      keyboardType={field.keyboardType || defaultFieldProps['keyboardType']}
                      secureTextEntry={field.secureTextEntry || defaultFieldProps['secureTextEntry']}
                    />
                    {getValidator(field.validation, state[currFieldState])}
                    {matchConfirm()}
                  </View>
                )
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
        {props.titleCustomization.titleText}
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
    type: PropTypes.string.isRequired,
    label: PropTypes.string, 
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    key: PropTypes.string,
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