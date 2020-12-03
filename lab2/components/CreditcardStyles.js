import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // General Styling
  ccContainer: {
    height: '20%',
    aspectRatio: 1.586/1,
    position: "absolute",
    marginTop: '10%',
    borderRadius: 10,
    zIndex: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  ccImage: {
    position: "absolute",
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 0
  },
  ccChip: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
  ccCardType: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  ccMainText: {
    color: 'white',
    padding: 0,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 5,
    borderColor: 'white',
    overflow: 'hidden',
    fontFamily: 'Courier'
  },
  ccOtherText: {
    color: 'rgb(211, 211, 211)',
    fontSize: 11,
  },

  // Styling of front side
  ccFrontContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
  },
  ccFrontImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  ccFrontTextContainer: {
    color: 'white',
    flexDirection: 'row',
    height: 45,
  },
  correspFieldActive: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  ccCardHolderContainer: {
    justifyContent: 'center', 
    flex: 3, 
    padding: 5, 
    marginEnd: 5,
  },
  ccExpirationContainer: {
    justifyContent: 'center', 
    padding: 5,
  },
  ccCardNumberText: {
    padding: 5, 
    fontSize: 20,
  },

  // Styling of back side
  ccBackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
  },
  ccMagneticStrip: {
    height: 35,
    backgroundColor:'black'
  },
  ccCVVContainer: {
    alignItems: 'flex-end',
    margin: 10,
  },
  ccCVVField: {
    backgroundColor: 'white',
    height: 35,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  ccCardTypeBack: {
    alignSelf: 'flex-end', 
    opacity: 0.7, 
    marginEnd: 10,
  },
  ccFlipped: {
    transform: [{rotateY: '180deg'}]
  }
});
