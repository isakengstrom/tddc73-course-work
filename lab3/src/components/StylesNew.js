import { StyleSheet } from 'react-native';

export const black = '#000000';
export const mainGrey = '#24292e';
export const lightBlue = '#21b2c7';
export const white = '#ffffff';

export const screenOptions = {
  headerStyle: {
    backgroundColor: mainGrey,
  },
  headerTintColor: white,
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: '70%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  pageDescription: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  //Results styling
  repositoryContainer: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: 'rgb(226, 233, 252)',
    borderRadius: 5,
    padding: 5,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoOwner: {
    //fontSize: ,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 5,
  },
  repoCount: {
    alignSelf: 'stretch',
    textAlign: 'right',
    fontSize: 11,
    marginTop: 5
  },

  //Picker styling
  pickerContainer: {
    height: '18%', 
    width: '100%',
    marginTop: 10,
  },
  picker: {
    height: '100%',
    width: '100%', 
    backgroundColor: '#f6f7f8',
    fontSize: 10,
  },
  
  
  
});