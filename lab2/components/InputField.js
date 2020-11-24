import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';


//import {Picker} from '@react-native-picker/picker';

//https://www.npmjs.com/package/react-native-dropdown-picker
import DropDownPicker from 'react-native-dropdown-picker';
//import Icon from 'react-native-vector-icons/Feather';

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

const InputField = ({state, updateState}) =>  {

    const setActivePickerField = (fieldIndex) => {
        Keyboard.dismiss();
        setActiveField(fieldIndex);
    }
    
    const setActiveField = (fieldInd) => {
        updateState('activeField', fieldInd);
    }
    
    const setActiveStyle = (fieldInd) => {
        return(state.activeField == fieldInd ? styles.fieldActive : null)
    }
    
    const isPickerOpen = (fieldInd) => {
        if(fieldInd == state.activeField) return true;
        return false;
    }

    const buttonPressed = () => {
        Keyboard.dismiss();
        setActiveField(0);
    }

    const updateCardInfo = (fieldInd, text) => {
        let fieldName = '';
        if(fieldInd == 1){
            fieldName = 'number';
            text = filterNumbers(text);
            text = addSpaces(text);
        }
        else if (fieldInd == 2){
            fieldName = 'name';
        }
        else {
            fieldName = 'cvv';
            text = filterNumbers(text);
        }
        
        updateState(fieldName, text);
    }

    const filterNumbers = (text) => {
        return (text.replace(/[^0-9]/g, ''));
    }

    const addSpaces = (text) => {
        let formattedText = text.split(' ').join('');
        if (formattedText.length > 0) {
            formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        
        return formattedText;
    }
    

    return (
        <View style={styles.ifContainer}>
            <Text style={styles.ifText}>Card Number</Text>
            <TextInput  
                style={[styles.ifFields, setActiveStyle(1)]}
                value={state.number}
                onChangeText={(text) => updateCardInfo(1, text)}
                onFocus={() => setActiveField(1)}
                maxLength={19}
                //keyboardType={'number-pad'}
            />
            <Text style={styles.ifText}>Card Name</Text>
            <TextInput
                style={[styles.ifFields, setActiveStyle(2)]}
                value={state.name}
                onChangeText={(text) => updateCardInfo(2, text)}
                onFocus={() => setActiveField(2)}
            />
            <View style={{flexDirection: "row", zIndex: 2}}>
                <View style={{flex: 2, marginEnd: 20,}}>
                    <Text style={styles.ifText}>Expiration date</Text>
                    <View style={{flexDirection: "row"}}>
                        <DropDownPicker
                            items={monthArray}
                            containerStyle={[styles.ifFields, styles.ifPickerContainer, setActiveStyle(3), {marginEnd: 10, }]}
                            style={styles.ifPicker}
                            itemStyle={{justifyContent: 'flex-start', }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            placeholder='Month'
                            isVisible={isPickerOpen(3)}
                            onOpen={() => setActivePickerField(3)}
                            onClose={() => setActivePickerField(3)}
                            onChangeItem={(item) => updateState('month', item.value)}
                        />
                        <DropDownPicker
                            items={yearArray}
                            containerStyle={[styles.ifFields, styles.ifPickerContainer, setActiveStyle(4)]}
                            style={styles.ifPicker}
                            itemStyle={{justifyContent: 'flex-start',}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            placeholder='Year'
                            isVisible={isPickerOpen(4)} 
                            onOpen={() => setActivePickerField(4)}
                            onClose={() => setActivePickerField(4)}
                            onChangeItem={(item) => updateState('month', item.value)}
                        />
                    </View>
                </View>
                <View style={{flex: 1,}}>
                    <Text style={styles.ifText}>CVV</Text>
                    <TextInput
                        style={[styles.ifFields, setActiveStyle(5)]}
                        value={state.cvv}
                        onChangeText={(text) => updateCardInfo(5, text)}
                        onFocus={() => setActiveField(5)}
                        maxLength={4}
                        //keyboardType={'number-pad'}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={buttonPressed} style={[styles.ifButton, {zIndex: 1, }]}>
                <Text style={{color: 'white', }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InputField;
  