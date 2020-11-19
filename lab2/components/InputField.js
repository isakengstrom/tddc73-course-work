import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from './Styles.js';

const InputField = () => {
    return (
        <View style={styles.ifContainer}>
            <Text style={styles.ifText}>Card Number</Text>
            <TextInput  
                style={styles.ifFields}
                value={'hhhh'}
            />
            <Text style={styles.ifText}>Card Name</Text>
            <TextInput
                style={styles.ifFields}
                value={'vvvvv'}
            />
            <View style={{flexDirection: "row"}}>
                <View style={{flex: 2, marginEnd: 20,}}>
                    <Text style={styles.ifText}>Expiration date</Text>
                    <View style={{flexDirection: "row"}}>
                        <TextInput
                            style={[styles.ifFields, {marginEnd: 10, flex: 1,} ]}
                            value={'exp1'}
                        />
                        <TextInput
                            style={[styles.ifFields, {flex: 1,} ]}
                            value={'exp2'}
                        />
                    </View>
                </View>
                <View style={{flex: 1,}}>
                    <Text style={styles.ifText}>CVV</Text>
                    <TextInput
                        style={styles.ifFields}
                        value={'cvv'}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.ifButton}>
                <Text>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InputField;
  