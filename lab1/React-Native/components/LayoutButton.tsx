import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class LayoutButton extends Component {
  onPressDoNothing(){
    return 0;
  }

  render(){
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.onPressDoNothing}
      >
        <Text>BUTTON</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    color: '#2d8577',
    backgroundColor: "lightgray",
    borderRadius: 4,
    minWidth: 50,
    minHeight: 35,
    padding: 10,
    margin: 20,
    marginBottom: 0,
    alignItems: 'center',
  },

});
