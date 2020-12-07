import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import styles, { mainGrey } from './Styles';

export default () => {
    return(
        <View style={styles.center}>
            <ActivityIndicator size="large" color={mainGrey} />
            <Text>Loading lorem ipsum..</Text>
        </View>
    )
}