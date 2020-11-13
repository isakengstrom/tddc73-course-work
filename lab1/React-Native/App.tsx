import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import LayoutButton from './components/LayoutButton';

export default class App extends Component {
  onPressDoNothing(){
    return 0;
  }
  
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{backgroundColor: "#1a574b", height: '30%', }}></View>
          <Text style={{padding: 15, fontSize: 20, color: "white"  }}>Lab 1 - React Native</Text>
        </View>
        <View style={styles.content}>
          <Image style={styles.image} source={require("./assets/pupper.png")} />

          <View style={styles.buttonContainer}>
            <LayoutButton />
            <LayoutButton />
            <LayoutButton />
            <LayoutButton />
          </View>
          
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.inputField}
              value={''}
            />
          </View>
        </View>
        
        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#2d8577',
    width: '100%',
    height: '12.5%',
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: "#ffffff",
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    marginTop: '2%',
    width: 150,
    height: 150,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    maxHeight: 130,
    maxWidth: 250,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }, 

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 40,
  },
  inputField: {
    height: 30, 
    width: '50%',
    marginLeft: 20,
    borderColor: '#cd1b60',
    borderBottomWidth: 1,
  },
});
