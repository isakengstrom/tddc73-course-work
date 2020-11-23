import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';


//import {Picker} from '@react-native-picker/picker';

//https://www.npmjs.com/package/react-native-dropdown-picker
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import styles from './Styles.js';

const monthArray = [
    {label: 'Month', value: 'month', disabled: true},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
];

const yearArray = [
    {label: 'Year', value: 'year', disabled: true},
    {label: '2020', value: '2020'},
    {label: '2021', value: '2021'},
    {label: '2022', value: '2022'},
    {label: '2023', value: '2023'},
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
    {label: '2027', value: '2027'},
    {label: '2028', value: '2028'},
    {label: '2029', value: '2029'},
];



const InputField = (props) =>  {
    const setActivePickerField = (fieldIndex) => {
        Keyboard.dismiss();
        
        // Adds a small delay for the pickers, otherwise, the keyboard dismiss messes up the the focused item
        setTimeout(() => {
            setActiveField(fieldIndex);
        }, 5);
    }

    const setActiveField = (fieldIndex) => {
        //console.log('Active field: ' + fieldIndex);
        props.setActiveField(fieldIndex);
    }

    const isPickerOpen = (ind) => {
        if(ind == props.activeField) return true;
        return false;
    }

    const buttonPressed = () => {
        Keyboard.dismiss();
        setActiveField(0);
    }

  

    const setText = (text, ind) => {
        if(ind == 1){
            props.setCardText((prevState) => {
                return {...prevState,  number: text}
            })
        }
        else if (ind == 2){
            props.setCardText((prevState) => {
                return {...prevState,  name: text}
            })
        }
        else {
            props.setCardText((prevState) => {
                return {...prevState,  cvv: text}
            })
        }
    }




    return (
        <View style={styles.ifContainer}>
            <Text style={styles.ifText}>Card Number</Text>
            <TextInput  
                style={[styles.ifFields, props.activeField == 1 ? styles.fieldActive : null]}
                defaultValue={props.cardText.number}
                onChangeText={() => setText(props.cardText.number, 1)}
                onFocus={() => setActiveField(1)}
                onBlur={() => setActiveField(0)}
            />
            <Text style={styles.ifText}>Card Name</Text>
            <TextInput
                style={[styles.ifFields, props.activeField == 2 ? styles.fieldActive : null]}
                defaultValue={props.cardText.name}
                onChangeText={() => setText(props.cardText.name, 2)}
                onFocus={() => setActiveField(2)}
            />
            <View style={{flexDirection: "row", zIndex: 2}}>
                <View style={{flex: 2, marginEnd: 20,}}>
                    <Text style={styles.ifText}>Expiration date</Text>
                    <View style={{flexDirection: "row"}}>
                        <DropDownPicker
                            items={monthArray}
                            containerStyle={[styles.ifFields, styles.ifPickerContainer, props.activeField == 3 ? styles.fieldActive : null, {marginEnd: 10, }]}
                            style={styles.ifPicker}
                            itemStyle={{justifyContent: 'flex-start', }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            placeholder='Month'
                            isVisible={isPickerOpen(3)}
                            onOpen={() => setActivePickerField(3)}
                            onClose={() => setActivePickerField(3)}
                        />
                        <DropDownPicker
                            items={yearArray}
                            containerStyle={[styles.ifFields, styles.ifPickerContainer, props.activeField == 4 ? styles.fieldActive : null]}
                            style={styles.ifPicker}
                            itemStyle={{justifyContent: 'flex-start',}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            placeholder='Year'
                            isVisible={isPickerOpen(4)} 
                            onOpen={() => setActivePickerField(4)}
                            onClose={() => setActivePickerField(4)}
                        />
                    </View>
                </View>
                <View style={{flex: 1,}}>
                    <Text style={styles.ifText}>CVV</Text>
                    <TextInput
                        style={[styles.ifFields, props.activeField == 5 ? styles.fieldActive : null]}
                        defaultValue={props.cardText.cvv}
                        onChangeText={() => setText(props.cardText.cvv, 5)}
                        onFocus={() => setActiveField(5)}
                        onBlur={() => setActiveField(0)}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={buttonPressed} style={[styles.ifButton, {zIndex: 1, }]}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InputField;
  