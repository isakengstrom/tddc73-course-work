import React, { useState, useMemo, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import PasswordValidator from '../passwordValidator/PasswordValidator';
import { defaultFieldProps, defaultForm } from './defaultForms';

const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Form = ( props ) =>  {

  let initialFields = { };

  const [ state, setState ] = useState(useMemo(() => {
    props.fields.map((edge, eInd) => {
      edge.map((node, nInd) => {
        initialFields = {
          ...initialFields,
          [eInd.toString()+nInd]: [node.type, '', node.key || null] 
        }
      })
    });
    
    //console.log(initialFields);
    return initialFields;
  })); 

  const confirmations = useMemo(() => {
    let initialConfirmations = {};
    
    Object.entries(initialFields).map(([ field, [type, text, inKey]]) => {
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
      Object.entries(initialFields).map(([ field , [type, text, innerKey]]) => {        
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

  const [ activeField, setActiveField] = useState('');

  const updateState = (stateName, type, text, key) => {
    setState(prevState => ({
      ...prevState,
      [stateName]: [
        type,
        text, 
        key,
      ]
    }));
  };

  const deactivateFocus = () => {
    setActiveField('');
    Keyboard.dismiss();
  }

  const isFieldMatch = (conf) => {
    let match = true;
    
    Object.entries(confirmations[conf].matches).map(entry => {
      if(state[conf][1] != state[entry[1]][1]) 
        match = false;
    });
    
    return match;
  }

  const isNotReadyToSubmit = () => {
  
    let disable = false;
    
    Object.entries(confirmations).map(conf => {
      Object.entries(conf[1].matches).map(entry => {
        //console.log(conf);
        if(state[conf[0]][1] != state[entry[1]][1]) 
          disable = true;
      });
    });
    
    Object.entries(state).map(([ _ , [type, text, __ ]]) => {
      if(((type == 'email') && !emailCheck.test(text)) || ((type == 'password') && (text.length < 8)))
        disable = true;
    });

    return disable;
  };

  const onSubmitDefault = () => {
    Keyboard.dismiss();
    setState(initialFields);
  }; 

  const renderFields = () => {
    //console.log(state);
    //console.log(confirmations);
    return(
      <View >
        {props.fields.map((edge, eIndex) => {
          return(
            <View key={eIndex} style={styles.fieldsContainer}>
              {edge.map((node, nIndex) =>  {

                const getValidator = () => {
                  //console.log(state[getFieldName()][1])
                  return((node.validation ) ? <PasswordValidator password={state[getFieldName()][1] || ''}/> : null);
                }

                const checkMatch = () => {
                  
                  let text = null;

                  if(node.type == 'confirmation'){
                    if(state[getFieldName()][1] && !state[getFieldName()][1] == ''){
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

                return(
                  <View key={nIndex} style={styles.fieldContainer}>
                    <Text style={styles.instructionText}>{node.label || 'Input'}:</Text>
                    <TextInput 
                      onFocus={() => setActiveField(getFieldName())}
                      style={[styles.textInput, activeStyle(), node.styling || null ]} 
                      placeholder={node.placeholder || 'placeholder'}
                      value={state[getFieldName()][1]}
                      onChangeText={ (text) => updateState(getFieldName(), node.type, text, node.key)}
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
    <TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
  );
}

export default Form;

// FORM PROP TYPES //
Form.propTypes = {
  onSubmit: PropTypes.func,
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