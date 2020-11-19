import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddeefc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column",
    alignItems: "center",
  },

  ccContainer: {
    height: '20%',
    aspectRatio: 1.586/1,
    position: "absolute",
    marginTop: '10%',
    borderRadius: 10,
    zIndex: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  },
  ccImage: {
    position: "absolute",
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5, 
    elevation: 5,
  },
  ifText: {
    alignSelf: 'flex-start',
    fontSize: 10,
  },
  ifFields: {
    alignSelf: 'stretch',
    height: 40,
    borderColor: '#0055d4',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 3,
    padding: 5,
  },
  ifButton: {
    width: '100%',  
    height: 40,
    backgroundColor: '#0055d4',
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});