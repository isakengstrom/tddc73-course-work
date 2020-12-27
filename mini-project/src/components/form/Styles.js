import { StyleSheet } from 'react-native';

// FORM DEFAULT COLORS // 
export const mainGrey = '#6c757d';
export const mainRed = '#dc3545';
export const mainLight = '#f8f9fa';

// FORM STYLING //
export default StyleSheet.create({
    formContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      margin: 5,
    },
    fieldsContainer: {
      flexDirection: 'row', 
      alignItems: 'stretch',
    },
    fieldContainer: {
      flex: 1, 
      alignItems: 'stretch',
    },
    title: {
      margin: 5,
      fontSize: 25,
    },
    instructionText: {
      paddingLeft: 3,
      marginLeft: 5,
      marginTop: 7,
      fontSize: 11,
      color: mainGrey,
    },
    textInput: {
      height: 30,
      padding: 3,
      margin: 5,
      borderWidth: 1,
      borderColor: mainGrey,
      borderRadius: 5,
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    feedbackText: {
      alignSelf: 'flex-end',
      fontSize: 9,
      marginRight: 5,
      color: mainGrey,
    },
    submitButtom: {
      height: 40,
      width: 140,
      padding: 5,
      margin: 10,
      marginTop: 20,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: mainGrey,
      borderRadius: 5,

      shadowColor: '#000',
      shadowOffset: { width: 0.5, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
    notReadyToSubmit: {
      backgroundColor: mainGrey
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    activeField: {
      shadowColor: '#000',
      shadowOffset: { width: 0.5, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 5,
    },
    requiredField: {
      borderColor: mainRed, 
      shadowColor: mainRed,
    },
    

  });