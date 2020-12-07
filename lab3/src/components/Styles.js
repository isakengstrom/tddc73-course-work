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
  }
});