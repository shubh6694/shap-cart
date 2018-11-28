import { Image, View, Dimensions } from "react-native";
const commonStyle = require("../../theme/variables/commonStyle");
const deviceHeight = Dimensions.get("window").height;
export default {
  amountText: {
    fontSize: 13,
    paddingTop: 8,
    color: commonStyle.contentTextColor
  },
  quantityText: {
    fontSize: commonStyle.noteM4FontSize,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    color: commonStyle.contentTextColor
  },
  leftView: {
    height: deviceHeight / 9,
    flexDirection: "row",
  },
  foodImg: {
    flex: 1,
    width: 40,
    resizeMode: "stretch"
  },
  brandView: {
    //justifyContent: "center",
    marginLeft: -20, 
    padding: 10, 
    marginTop: 5,
    justifyContent: "space-between"
  },
  currencyText: {
    fontSize: commonStyle.noteM3FontSize, 
    color: "#0686fb",
    paddingRight: 5
  },
  cartText: {
    fontSize: commonStyle.noteM3FontSize, 
    color: "#fff",
    paddingRight: 10
  },
  largeHeightSpaceView: {
    height: deviceHeight / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00c628",
    marginRight: -15,
    marginBottom: 5
  },

};
