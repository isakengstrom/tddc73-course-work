import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './CreditcardStyles.js';

// uri to the location of the github repo where the images are stored
const imageURI = "https://raw.githubusercontent.com/bioengstrom/tddc73-course-work/master/lab2/assets/images";

// Choose one of the credit card backgrounds at random
const randNumb = Math.floor(Math.random() * 25 + 1);
const ccBackground = {
    uri: `${imageURI}/${randNumb}.jpeg`,
};

// uri for the chip displayed at the front of the card
const ccChip = {
    uri: `${imageURI}/chip.png`,
};

// Card type specifics
const ccTypes = [
    {type: 'visa', re: '^4'},
    {type: 'amex', re: '^(34|37)'},
    {type: 'mastercard', re: '^5[1-5]'},
    {type: 'discover', re: '^6011'},
    {type: 'troy', re: '^9792'},
];

const Creditcard = ({state, updateState}) => {

    const getCardType = () => {
        let number = state.number;
        let ccType = 'visa'; // default type

        // Map over the card type specifics and match it to the input to decide which card type it is.
        ccTypes.map((cc) => {
            if(number.match(new RegExp(cc.re)) != null) {
                ccType = cc.type;
                return;
            }
        });
        return ccType;
    }

    //uri for the card types
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
                    <View style={[{alignSelf: "stretch",}, setActiveStyle(1)]}>
                        <Text style={[styles.ccMainText, styles.ccCardNumberText]}>
                            {state.number}
                            {('XXXX XXXX XXXX XXXX').slice(state.number.length, 19)}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.ccFrontTextContainer}>
                    <TouchableWithoutFeedback onPress={()=>updateState('activeField', 2)}>
                        <View style={[styles.ccCardHolderContainer, setActiveStyle(2)]}>
                            <Text style={[styles.ccOtherText]} >
                                {'Card Holder\n'}
                                <Text style={styles.ccMainText}>
                                    {state.name ? state.name.toUpperCase() : 'FULL NAME'}
                                </Text>
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.ccExpirationContainer, setActiveStyle(3), setActiveStyle(4)]}>
                        <Text style={styles.ccOtherText}>Expires</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableWithoutFeedback onPress={()=>updateState('activeField', 3)}>
                                <Text style={styles.ccMainText}>
                                    {(state.month.length > 0 && state.month.length < 2) ? '0' : ''}
                                    {(state.month ? state.month : 'MM')}
                                </Text>
                            </TouchableWithoutFeedback>
                            <Text style={styles.ccMainText}>/</Text>
                            <TouchableWithoutFeedback onPress={()=>updateState('activeField', 4)}>
                                <Text style={styles.ccMainText}>
                                    {state.year ? state.year.slice(2,4) : 'YY'}
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const cardBack = () => {
        return(
            <View style={styles.ccBackContainer}>
                <View style={styles.ccMagneticStrip}></View>
                <View style={styles.ccCVVContainer}>
                  <Text style={[styles.ccOtherText, {marginEnd: 10}]}>CVV</Text>
                  <View style={styles.ccCVVField}>
                    <Text>{('*').repeat(state.cvv.length)}</Text>
                  </View>
                </View>
                <Image style={[styles.ccCardType, styles.ccCardTypeBack]} source={ccTypeImage}/>
            </View>
        );
    }

    return (
        <View style={styles.ccContainer}>
            <Image source={ccBackground} style={[styles.ccImage, showFront() ? null : styles.ccFlipped ]} />
            {showFront() ? cardFront() : cardBack()}
        </View>
    )
}

export default Creditcard;
