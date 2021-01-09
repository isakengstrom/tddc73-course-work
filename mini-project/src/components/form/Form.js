import React, { useState, useMemo, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Styles';
import PasswordValidator from '../passwordValidator/PasswordValidator';
import { defaultFieldProps, defaultForm } from './defaultForms';
import defaultCustomizations from './defaultCustomizations';

// Const used to check if an email field contains an email adress
const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Initial switches
const initialSwitches = {
  attemptedSubmit: false,
}

const Form = ( props ) =>  {
  // State managing which field is currently active 
  const [activeField, setActiveField] = useState(null);
  // State managing switches, example: If the user tried submitting
  const [switches, setSwitches] = useState(initialSwitches);

  let fieldsInfo = {}; // Additional info/settings for the fields: field type, key and isRequired
  let initialFields = {}; // An object with the initial field values
  let requiredFieldExists = false;

  // State managing the text in all the fields
  const [field, setField] = useState(useMemo(() => {
    // Map over the nested arrays in the array of fields. Each element is a row in the form 
    props.fields.map((edge, eInd) => {
      // Map over the nested objects in the each nested array. The objects in each nested array is placed on the same row
      edge.map((node, nInd) => {
        
        if(node.isRequired || defaultFieldProps[node.type].isRequired)
          requiredFieldExists = true;

        // Add the fields to the fieldsInfo object
        fieldsInfo = {
          ...fieldsInfo,
          [eInd.toString()+nInd]: {
            type: node.type, 
            key: node.key || defaultFieldProps[node.type].key,
            isRequired: node.isRequired || defaultFieldProps[node.type].isRequired,
          } 
        }

        // Add the initial values to the initialFields object
        initialFields = {
          ...initialFields,
          [eInd.toString()+nInd]: defaultFieldProps[node.type].value || '',
        }
      })
    });

    //console.log(fieldsInfo);
    return initialFields;
  })); 

  // Create an object to store the confirmation fields and their connected field(s) through the key prop.
  const confirmations = useMemo(() => {
    let initialConfirmations = {};
    
    Object.keys(fieldsInfo).map((curr) => {
      console.log(fieldsInfo[curr].key);
      if(fieldsInfo[curr].type == 'confirmation'){
        initialConfirmations = {
          ...initialConfirmations,
          [curr]: {
            key: fieldsInfo[curr].key,
            matches: []   
          }
        }
      }
    });
    //console.log(initialConfirmations);
    let matchingFields = [];

    Object.entries(initialConfirmations).map(([ conf, values ]) => {
      matchingFields = [];
      Object.keys(fieldsInfo).map((curr) => {        
        if(fieldsInfo[curr].type != 'confirmation' && fieldsInfo[curr].key == values.key){
          matchingFields = matchingFields.concat(curr);
          initialConfirmations = {
            ...initialConfirmations,
            [conf]: {
              ...values.matches,
              key: values.key,
              matches: matchingFields
            }
          }
        }
      });
    });
    //console.log(initialConfirmations);
    return initialConfirmations;
  }); 

  // Mounting function, makes sure that unwanted cache is restored  
  useEffect(() => {
    //console.log('\nComponent mounting..')
    deactivateFocus();
    setField(initialFields)
    setSwitches(initialSwitches)
  }, []);

  // Update the switch state 
  const updateSwitch = (switchName, value) => {
    setSwitches(prevState => ({
      ...prevState,
      [switchName]: value
    }));
  };

  // Update the correct field state
  const updateField = (fieldName, value) => {
    setField(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  // Deactivate focus if a field becomes inactive
  const deactivateFocus = () => {
    setActiveField(null);
    Keyboard.dismiss();
  }

  // Check if confirmation fields match their connected fields
  const isFieldMatch = (conf, caseSensitive = true) => {
    let isMatch = true;

    Object.entries(confirmations[conf].matches).map(match => {
      if(caseSensitive && (field[conf] != field[match[1]])) 
          isMatch = false;
      
      else if(field[conf].toLowerCase() != field[match[1]].toLowerCase()) 
          isMatch = false;
    });
    
    return isMatch;
  }

  // Check if the form is ready to submit
  const isReadyToSubmit = () => {
    let enable = true;
    
    Object.entries(confirmations).map(conf => {
      if(fieldsInfo[conf[0]].isRequired){
        Object.entries(conf[1].matches).map(match => {
          if(field[conf[0]] != field[match[1]]) 
            enable = false;
        });
      }
    });
    
    Object.keys(fieldsInfo).map((fieldName) => {
      if(fieldsInfo[fieldName].isRequired){
        if(fieldsInfo[fieldName].type == 'email' && !emailCheck.test(field[fieldName])) 
          enable = false;
        if((fieldsInfo[fieldName].type == 'password') && (field[fieldName].length < 8))
          enable = false;
      }
    });

    return enable;
  };

  // Handle default submit
  const onSubmitDefault = () => {
    if(isReadyToSubmit()) {
      Keyboard.dismiss();
      setField(initialFields);
      updateSwitch('attemptedSubmit', false);
    }
    else {
      updateSwitch('attemptedSubmit', true);
    }
  }; 

  // Get Customization from props if it exists, otherwise, get default customization
  const getCustomization = (customizationName, customization) => {
    if(props[customizationName] && props[customizationName][customization]) 
      return props[customizationName][customization];
   
    return defaultCustomizations[customizationName][customization];
  }

  // Render all the fields and their connected info 
  const renderFields = () => {
    let fieldNumber = 0;
    return(
      <View >
        {props.fields.map((edge, eIndex) => {
          return(
            <View key={eIndex} style={styles.fieldsContainer}>
              {edge.map((node, nIndex) =>  {
                
                // Get feedback for the user
                const getFieldFeedback = () => {
                  if(node.type == 'confirmation')
                    return getMatchFeedback();
                  else if(node.type == 'password' && node.validation)
                    return getValidator();
                  else if(node.type == 'email' && switches.attemptedSubmit)
                    return getEmailFeedback();
                  else if(node.type == 'text' && fieldsInfo[getFieldName()].isRequired && switches.attemptedSubmit)
                    return getTextFeedback();
                  return null;
                }

                // Get the PasswordValidator Component
                const getValidator = () => {
                  return <PasswordValidator password={field[getFieldName()] || ''}/>
                }

                // Get feedback for the email fields
                const getEmailFeedback = () => {
                  let text = null;

                  if(field[getFieldName()] == '')
                    if(fieldsInfo[getFieldName()].isRequired)
                      text = 'Enter a valid email';
                    else
                      return null;
                  else if(!emailCheck.test(field[getFieldName()]))
                    text = 'Invalid email :(';
                  else 
                    text = 'Email is valid!';

                  return <Text style={styles.feedbackText}>{text}</Text>
                }

                // Get feedback for the text fields
                const getTextFeedback = () => {
                  let text = null;

                  if(field[getFieldName()] == '')
                    text = 'Field is required';

                  return <Text style={styles.feedbackText}>{text}</Text>
                }

                // Get feedback for the confirmation fields
                const getMatchFeedback = () => {
                  let text = null;
                  
                  if(field[getFieldName()] && !field[getFieldName()] == ''){
                    if(isFieldMatch(getFieldName(), node.caseSensitive))
                      text = "It's a match!";
                    else 
                      text = "Fields don't match :(";
                  }
                  else if (switches.attemptedSubmit && field[getFieldName()] == '')
                    text = "Fields don't match :(";
                  
                  return <Text style={styles.feedbackText}>{text}</Text>
                }

                // Get the activeStyle if the field is active
                const activeStyle = () => {
                  return activeField == getFieldName() ? styles.activeField : null;
                }

                // Get the name of the field
                const getFieldName = () => {
                  return eIndex.toString()+nIndex;
                }

                // Get the field number if the fieldNumbering prop is true
                const getFieldNumber = () => {
                  if(props.fieldNumbering) 
                    return fieldNumber + '. ';
                }

                // Check if the field is required and if a submit has been attempted
                const isRequired = () => {
                  if(switches.attemptedSubmit && fieldsInfo[getFieldName()].isRequired) {
                    if(node.type == 'email' && !emailCheck.test(field[getFieldName()]))
                      return true;

                    else if(node.type == 'password' && field[getFieldName()].length < 8)
                      return true;
                    
                    else if(node.type == 'text' && field[getFieldName()] == '')
                      return true;

                    else if(node.type == 'confirmation'){

                      let matching = false;
                      Object.entries(confirmations[getFieldName()].matches).map(match => {
                        if(field[getFieldName()] == '')
                          matching = true;
                        if(node.caseSensitive == true){
                          if(field[getFieldName()] != field[match[1]]) 
                            matching = true;
                        }
                        else{
                          if(field[getFieldName()].toLowerCase() != field[match[1]].toLowerCase()) 
                            matching = true;
                        }
                      });
                      return matching;
                    }
                  }
                  return false;
                }

                fieldNumber++

                // Main part of the field rendering
                return(
                  <View key={nIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{getFieldNumber()}{node.label || defaultFieldProps[node.type].label}{fieldsInfo[getFieldName()].isRequired ? '*' : ''}</Text>
                    <TextInput 
                      onFocus={() => setActiveField(getFieldName())}
                      style={[styles.textInput, activeStyle(), isRequired() ? styles.requiredField : null, node.styling || null]} 
                      placeholder={node.placeholder || defaultFieldProps[node.type].placeholder}
                      value={field[getFieldName()]}
                      onChangeText={ (text) => updateField(getFieldName(), text)}
                      maxLength={node.maxLength || defaultFieldProps[node.type].maxLength}
                      keyboardType={node.keyboardType || defaultFieldProps[node.type].keyboardType}
                      secureTextEntry={node.secureTextEntry || defaultFieldProps[node.type].secureTextEntry}
                    />
                    <View>
                      {getFieldFeedback()}
                    </View>
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
    <TouchableWithoutFeedback onPress={() => deactivateFocus()}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, getCustomization('titleCustomization', 'titleStyling')]}>
          {getCustomization('titleCustomization', 'titleText')}
        </Text>
        {renderFields()}
        <Text style={{alignSelf: 'center'}}>{requiredFieldExists ? '* Required' : null}</Text>
        <TouchableOpacity 
          onPress={props.onSubmit ? props.onSubmit : onSubmitDefault} 
          style={[styles.submitButtom, getCustomization('buttonCustomization', 'buttonStyling'), isReadyToSubmit() ? null : styles.notReadyToSubmit]}>
          <Text style={[styles.buttonText, getCustomization('buttonCustomization', 'buttonTextStyling')]}>
            {getCustomization('buttonCustomization', 'buttonText')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Form;

// FORM PROP TYPES //
Form.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([
      'text', 'email', 'password', 'confirmation',
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
    key: PropTypes.string,
    caseSensitive: PropTypes.bool,
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
  fieldNumbering: PropTypes.bool,
}
Form.defaultProps = {
  fields: defaultForm,
  fieldNumbering: false,
}
