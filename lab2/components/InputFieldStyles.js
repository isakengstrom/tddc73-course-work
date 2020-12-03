import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: "row", 
  },
  flexStart: {
    justifyContent: 'flex-start',
  },

  // General Styling
  ifContainer: {
    height: '45%',
    marginTop: '35%',
    margin: 20,
    padding: 20,
    alignSelf: "stretch",
    alignContent: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  ifText: {
    alignSelf: 'flex-start',
    fontSize: 10,
  },
  ifButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  //Base styling for the inputfields containers
  ifFields: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'white',
    borderColor: '#0055d4',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 3,
    padding: 5,
  },
  //Additional styling for the picker inputfield containers
  ifPickersContainer: {
    flex: 2, 
    marginEnd: 20,
  },
  ifPickerContainer: {
    flex: 1,
    padding: 0,
  },
  ifPicker: {
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  ifPickerDropdown: {
    backgroundColor: '#fafafa', 
    borderColor: '#0055d4'
  }
});
