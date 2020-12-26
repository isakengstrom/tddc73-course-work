import React, { useState, useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import PasswordValidator from '../passwordValidator/PasswordValidator';
import { defaultFieldProps, defaultForm } from './defaultForms';
import defaultCustomizations from './defaultCustomizations';

const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const initialSwitches = {
  attemptedSubmit: false,
}

const Form = ( props ) =>  {

  const [activeField, setActiveField] = useState(null);
  const [switches, setSwitches] = useState(initialSwitches);

  let fieldsInfo = {};
  let initialFields = {};

  const [field, setField] = useState(useMemo(() => {
    props.fields.map((edge, eInd) => {
      edge.map((node, nInd) => {
        fieldsInfo = {
          ...fieldsInfo,
          [eInd.toString()+nInd]: [
            node.type, 
            node.key || null,
          ] 
        }
        initialFields = {
          ...initialFields,
          [eInd.toString()+nInd]: ''
        }
      })
    });
    //console.log(fieldsInfo)
    return initialFields;
  })); 

  const confirmations = useMemo(() => {
    let initialConfirmations = {};
    
    Object.entries(fieldsInfo).map(([ field, [type, inKey]]) => {
      if(type == 'confirmation'){
        initialConfirmations = {
          ...initialConfirmations,
          [field]: {
            key: inKey,
            matches: []   
          }
        }
      }
    });

    let matchingFields = [];

    Object.entries(initialConfirmations).map(([ conf, values ]) => {
      matchingFields = [];
      Object.entries(fieldsInfo).map(([ field , [type, innerKey]]) => {        
        if(type != 'confirmation' && innerKey == values.key){
          matchingFields = matchingFields.concat(field);
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

    return initialConfirmations;
  }); 

  useEffect(() => {
    console.log('\nComponent mounting..')
    deactivateFocus();
    setField(initialFields)
    setSwitches(initialSwitches)
  }, []);

  const updateSwitch = (switchName, value) => {
    setSwitches(prevState => ({
      ...prevState,
      [switchName]: value
    }));
  };

  const updateField = (fieldName, value) => {
    setField(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const deactivateFocus = () => {
    setActiveField(null);
    Keyboard.dismiss();
  }

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

  const isReadyToSubmit = () => {
    let enable = true;
    
    Object.entries(confirmations).map(conf => {
      Object.entries(conf[1].matches).map(match => {
        if(field[conf[0]] != field[match[1]]) 
          enable = false;
      });
    });
    
    Object.entries(fieldsInfo).map(([fieldName]) => {
      if(((fieldsInfo[fieldName][0] == 'email') && !emailCheck.test(field[fieldName])) || ((fieldsInfo[fieldName][0] == 'password') && (field[fieldName].length < 8)))
        enable = false;
    });

    return enable;
  };

  const onSubmitDefault = () => {
    if(isReadyToSubmit()) {
      Keyboard.dismiss();
      setField(initialFields);
      updateSwitch('attemptedSubmit', false)
    }
    else {
      //console.log(switches.attemptedSubmit)
      updateSwitch('attemptedSubmit', true)
    }
  }; 

  const getCustomization = (customizationName, customization) => {
    if(props[customizationName] && props[customizationName][customization]) 
      return props[customizationName][customization];
   
    return defaultCustomizations[customizationName][customization];
  }

  const renderFields = () => {
    //console.log('----Initial field----')
    //console.log(fieldsInfo)
    //console.log('----State-----')
    //console.log(field)
    //console.log(confirmations);
    let fieldNumber = 0;
    return(
      <View >
        {props.fields.map((edge, eIndex) => {
          return(
            <View key={eIndex} style={styles.fieldsContainer}>
              {edge.map((node, nIndex) =>  {
                
                const getFieldFeedback = () => {
                  if(node.type == 'confirmation')
                    return getMatchFeedback();
                  else if(node.type == 'password' && node.validation)
                    return getValidator();
                  else if(node.type == 'email' && switches.attemptedSubmit)
                    return getEmailFeedback();

                  return null;
                }

                const getValidator = () => {
                  return <PasswordValidator password={field[getFieldName()] || ''}/>
                }

                const getEmailFeedback = () => {
                  return emailCheck.test(field[getFieldName()]) ? null : <Text style={styles.feedbackText}>{'Invalid email :('}</Text>
                }

                const getMatchFeedback = () => {
                  let text = null;
                  
                  if(field[getFieldName()] && !field[getFieldName()] == ''){
                    if(isFieldMatch(getFieldName(), node.caseSensitive))
                      text = "It's a match!";
                    else 
                      text = "Fields don't match :(";
                  }
                  
                  return <Text style={styles.feedbackText}>{text}</Text>
                }

                const activeStyle = () => {
                  return activeField == getFieldName() ? styles.activeField : null;
                }

                const getFieldName = () => {
                  return eIndex.toString()+nIndex;
                }

                const getFieldNumber = () => {
                  if(props.fieldNumbering) return fieldNumber + '. ';
                  return '';
                }

                const isRequired = () => {
                  if(switches.attemptedSubmit && node.isRequired) {
                    if(node.type == 'email' && !emailCheck.test(field[getFieldName()]))
                      return true;

                    else if(node.type == 'password' && field[getFieldName()].length < 8)
                      return true;
                    
                    else if(node.type == 'text' && field[getFieldName()] == '')
                      return true;

                    else if(node.type == 'confirmation'){

                      let matching = false;
                      Object.entries(confirmations[getFieldName()].matches).map(match => {
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
                return(
                  <View key={nIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{getFieldNumber()}{node.label || 'Input'}{node.isRequired ? '*' : ''}</Text>
                    <TextInput 
                      onFocus={() => setActiveField(getFieldName())}
                      style={[styles.textInput, activeStyle(), isRequired() ? styles.requiredField : null, node.styling || null]} 
                      placeholder={node.placeholder || ''}
                      value={field[getFieldName()]}
                      onChangeText={ (text) => updateField(getFieldName(), text)}
                      maxLength={node.maxLength || null}
                      keyboardType={node.keyboardType || null}
                      secureTextEntry={node.secureTextEntry || null}
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
        <TouchableOpacity 
          onPress={props.onSubmit ? props.onSubmit : onSubmitDefault} 
          //disabled={isNotReadyToSubmit()} 
          style={[styles.submitButtom, getCustomization('buttonCustomization', 'buttonStyling')]}>
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
    backgroundColor: 'white',
  },
  feedbackText: {
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
  },
  activeField: {
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  requiredField: {
    borderColor: 'red', 
    shadowColor: 'red'
  }
});