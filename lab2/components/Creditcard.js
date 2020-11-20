import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import styles from './Styles.js';

const Creditcard = () => {
    return (
        <View style={styles.ccContainer}>
            <Image style={styles.ccImage} source={require("./../assets/images/1.jpeg")} />
            <Text>Creditcard</Text>
        </View>
    )
}

export default Creditcard;
  