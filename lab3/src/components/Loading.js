import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import styles, { ghWhite } from './Styles';

export default ({itemType}) => {
  return(
    <View style={styles.center}>
      <ActivityIndicator size="large" color={ghWhite} />
      <Text style={{margin: 10, fontWeight: '500', color: ghWhite}}>
        Loading {itemType}..
      </Text>
    </View>
  )
}