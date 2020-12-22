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

  let fieldsInfo = { };
  let initialFields = {};

  const [field, setField] = useState(useMemo(() => {
    props.fields.map((edge, eInd) => {
      edge.map((node, nInd) => {
        fieldsInfo = {
          ...fieldsInfo,
          [eInd.toString()+nInd]: [
            node.type, 
            node.key || null
          ] 
        }
        initialFields = {
          ...initialFields,
          [eInd.toString()+nInd]: ''
        }
      })
    });
    //console.log(initialFields)
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
    console.log('Component mounted..')
    deactivateFocus();
    setField(initialFields)
    setSwitches(initialSwitches)
  }, []);

  const updateSwitch = (name, value) => {
    setSwitches(prevState => ({
      ...prevState,
      [name]: value
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

  const isFieldMatch = (conf) => {
    let fountMatch = true;
    
    Object.entries(confirmations[conf].matches).map(match => {
      if(field[conf] != field[match[1]]) 
      fountMatch = false;
    });
    
    return fountMatch;
  }

  const isReadyToSubmit = () => {
    let enable = true;
    
    Object.entries(confirmations).map(conf => {
      Object.entries(conf[1].matches).map(match => {
        if(field[conf[0]] != field[match[1]]) 
          enable = false;
      });
    });
    
    Object.entries(fieldsInfo).map(([ fieldName ]) => {
      if(((fieldsInfo[fieldName][0] == 'email') && !emailCheck.test(field[fieldName])) || ((fieldsInfo[fieldName][0] == 'password') && (field[fieldName].length < 8)))
        enable = false;
    });

    return enable;
  };

  const onSubmitDefault = () => {
    if(isReadyToSubmit()) {
      Keyboard.dismiss();
      setField(initialFields);
    }
    else {
      console.log(switches.attemptedSubmit)
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
    let fieldNumber = 0;
    return(
      <View >
        {props.fields.map((edge, eIndex) => {
          return(
            <View key={eIndex} style={styles.fieldsContainer}>
              {edge.map((node, nIndex) =>  {

                const getValidator = () => {
                  return((node.validation ) ? <PasswordValidator password={field[getFieldName()] || ''}/> : null);
                }

                const checkMatch = () => {
                  let text = null;

                  if(node.type == 'confirmation'){
                    if(field[getFieldName()] && !field[getFieldName()] == ''){
                      if(isFieldMatch(getFieldName()))
                        text = "It's a match!";
                      else 
                        text = "Fields don't match :(";
                    }
                  }
                  
                  return(
                    <View>
                      {node.type == 'confirmation' ? <Text style={styles.nomatchText}>{text}</Text> : null}
                    </View>
                  );
                }

                const activeStyle = () => {
                  return activeField == getFieldName() ? styles.activeField : null;
                }

                const getFieldName = () => {
                  return eIndex.toString()+nIndex;
                }

                const getFieldNumber = () => {
                  if(props.fieldNumbering) return  fieldNumber+ '. ';
                  return '';
                }
                fieldNumber++
                return(
                  <View key={nIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{getFieldNumber()}{node.label || 'Input'}:</Text>
                    <TextInput 
                      onFocus={() => setActiveField(getFieldName())}
                      style={[styles.textInput, activeStyle(), node.styling || null ]} 
                      placeholder={node.placeholder || ''}
                      value={field[getFieldName()]}
                      onChangeText={ (text) => updateField(getFieldName(), text)}
                      maxLength={node.maxLength || null}
                      keyboardType={node.keyboardType || null}
                      secureTextEntry={node.secureTextEntry || null}
                    />
                    {getValidator()}
                    {checkMatch()}
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
  },
  activeField: {
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});