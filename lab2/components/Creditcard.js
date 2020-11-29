import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import styles from './Styles.js';

const randNumb = Math.floor(Math.random() * 25 + 1);
const imageURI = "https://raw.githubusercontent.com/bioengstrom/tddc73-course-work/master/lab2/assets/images";
const ccBackground = {
    uri: `${imageURI}/${randNumb}.jpeg`,
};

const ccChip = {
    uri: `${imageURI}/chip.png`,
};

const ccTypes = [
    {type: 'visa', re: '^4'},
    {type: 'amex', re: '^(34|37)'},
    {type: 'mastercard', re: '^5[1-5]'},
    {type: 'discover', re: '^6011'},
    {type: 'troy', re: '^9792'},
];

const Creditcard = ({state, updateState}) => {
    
    const getCardImage = () => {
        return(ccBackground);
    }

    const getCardType = () => {
        let number = state.number;
        let ccType = 'visa'; // default type

        ccTypes.map((cc) => {
            if(number.match(new RegExp(cc.re)) != null) {
                ccType = cc.type;
                return;
            }
        });

        return ccType; 
    }

    const ccTypeImage = {
        uri: `${imageURI}/${getCardType()}.png`,
    };

    const showFront = () => {
        if(state.activeField != 5)
            return true;
        
        return false;
    }

    const setActiveStyle = (fieldInd) => {
        return(state.activeField == fieldInd ? styles.correspFieldActive : null)
    }

    const cardFront = () => {
        return(
            <View style={styles.ccFrontContainer}>
                <View style={styles.ccFrontImagesContainer}>
                    <Image style={styles.ccChip} source={ccChip} />
                    <Image style={styles.ccCardType} source={ccTypeImage} />
                </View>
                <TouchableWithoutFeedback onPress={()=>updateState('activeField', 1)}>
                    <View style={[{alignItems: "center",}, setActiveStyle(1)]}>
                        <Text style={styles.ccMainText}>
                            {state.number}
                            {('XXXX XXXX XXXX XXXX').slice(state.number.length, 19)}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.ccFrontTextContainer}>
                    <Text style={[{maxWidth: '70%'}, styles.ccOtherText, setActiveStyle(2)]}>
                        {'Card Holder\n'}
                        <Text style={styles.ccMainText}>
                            {state.name ? state.name.toUpperCase() : 'FULL NAME'}
                        </Text>
                    </Text>
                    <Text style={[{maxWidth: '30%'}, styles.ccOtherText, setActiveStyle(3), setActiveStyle(4) ]}>
                        {'Expires\n'}
                        <Text style={styles.ccMainText}>
                            {(state.month.length > 0 && state.month.length < 2) ? '0' : ''}
                            {(state.month ? state.month : 'MM') + '/'}
                            {state.year ? state.year.slice(2,4) : 'YY'}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }

    const cardBack = () => {
        return(
            <View>
                <View>
                
                </View>
                <Text style={{color: 'white'}}>BACK</Text>
            </View>
        );
    }

    return (
        <View style={styles.ccContainer}>
            <Image source={getCardImage()} style={[styles.ccImage, showFront() ? null : {transform: [{rotateY: '180deg'}]} ]} />
            {showFront() ? cardFront() : cardBack()}
        </View>
    )
}

export default Creditcard;
  