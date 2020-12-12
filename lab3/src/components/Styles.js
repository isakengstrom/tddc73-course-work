import { StyleSheet } from 'react-native';

export const ghHeader = '#161b22';
export const ghBackground = '#06090f';
export const ghListItem = '#0d1117';
export const ghBread = '#8b949e';
export const ghWhite = '#c9d1d9';
export const ghBorder = '#30363d';

export const screenOptions = {
  headerStyle: { backgroundColor: ghHeader },
  headerTintColor: ghWhite,
}

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: '50%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: ghBackground,
  },
  pageDescription: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  //Results styling
  repoContainer: {
    minHeight: 150,
    width: '94%',
    alignSelf: 'center',
    margin: 10,
    marginBottom: 0,
    backgroundColor: ghListItem,
    borderColor: ghBorder,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ghWhite,
  },
  repoOwner: {
    //fontSize: ,
    fontStyle: 'italic',
    color: ghWhite,
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  repoDescription: {
    color: ghBread,
  },
  
  repoCount: {
    textAlign: 'right',
    fontSize: 11,
    color: ghWhite,
  },

  
  itemTop: {
    flex: 2,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  itemMiddle: {
    flex: 3,
  },
  itemBottom: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  
  countContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },  
  circle: {
    height: 14,
    width: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: ghBread, 
  },

  //Picker styling
  pickerContainer: {
    height: '30%', 
    width: '100%',
    borderTopWidth: 1,
    borderColor: ghBorder,
  },
  picker: {
    width: '100%', 
    color: ghWhite,
    backgroundColor: ghHeader,
  },
});