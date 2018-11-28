const React = require("react-native");
const { Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const commonStyle = require("../../theme/variables/commonStyle");

export default {
  list: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: commonStyle.lightTextColor
  },
  hotelNameText: {
    color: commonStyle.darkTextColor,
    fontWeight: "600",
    marginLeft: -20
  },
  gridListitem: {
    marginLeft: 5,
    paddingTop: 8,
    paddingBottom: 8
  },
  rightColView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rightColText: {
    fontSize: 13,
    paddingTop: 10,
    color: commonStyle.contentTextColor
  },
  textArea: {
    height: 100,
    width: deviceWidth - 30,
    backgroundColor: "rgba(0,0,0,0.1)",
    margin: 15,
    textAlignVertical: "top",
    padding: 10
  },
  priceText:{
    color: "#378afb",
    fontSize: 13,
    paddingTop: 10,
  },
  quantityText:{
    color: 'black',
    fontSize:13,
    paddingLeft:15, 
    paddingRight:15, 
    paddingTop: 13 
  },
  rightPriceText:{
    fontSize: 13,
    color:'black',
  },
  topHeaderDeliveryView:{
    flexDirection:'row', 
    backgroundColor:'#ea6320', 
    paddingTop:10, 
    paddingBottom: 10, 
    justifyContent:'center'
},
detailedBillInnertext:{
  fontSize: 10,
  color: 'black',
},
ItemTotal:{
  color: 'black',
  fontSize: 12,
}
};
