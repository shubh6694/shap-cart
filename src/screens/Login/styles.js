const React = require("react-native");
const { Dimensions, Platform } = React;
import color from "color";

const commonStyle = require("../../theme/variables/commonStyle");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default {
  container: {
    // backgroundColor: commonStyle.brandPrimary
    backgroundColor: '#ffffff'
  },
  textColor: {
    color: 'black',
  },
  topTextView: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    height: Platform.OS === "ios" ? 100 : 80,
    alignItems: "center"
  },
  topText: {
    marginTop: 25,
    fontSize: Platform.OS === "ios" ? 25 : 20,
    lineHeight: Platform.OS === "ios" ? 30 : 30,
    color: commonStyle.inverseTextColor
  },
  mapImage: {
    width: Platform.OS === "ios" ? deviceWidth / 1.5 : deviceWidth / 1.8,
    height:
      Platform.OS === "ios"
        ? 316 * deviceWidth / (506 * 1.5)
        : 316 * deviceWidth / (506 * 1.8),
    resizeMode: "contain",
    alignSelf: "center"
  },
  mainImage: {
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: "stretch",
    position: 'absolute'
  },
  infoTextView: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: "center"
  },
  infoText: {
    top: 20,
    fontSize: 25,
    textAlign: "center",
    color: commonStyle.inverseTextColor
  },
  gpsAutoBtn: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: color(commonStyle.brandPrimary).darken(0.2).hex()
  },
  otherText: {
    textAlign: "center",
    fontSize: 14,
    color: commonStyle.inverseTextColor
  },
  gpsManualBtn: {
    top: deviceHeight * 8 / 14,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  searchField:
    {
      backgroundColor: 'white',
      marginLeft: 20,
      // marginRight: 20,
      borderColor: '#808080',
      borderRadius: 5,
      borderWidth: 1.5,
      height: 60,
      borderBottomColor: 'transparent',
      fontSize: 18,
      padding: 10,
      width:'70%'
    },
  searchFieldInput: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    height: 60,
  },
  touchButtonGo: {
    marginLeft:2,
    borderRadius: 5,
    padding: 10,
    width: '20%',
    height: 60,
    // marginRight: 'auto',
    // marginLeft: 'auto',
    // marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#0087FB'
  }
};
