const React = require("react-native");
const { Dimensions, Platform } = React;

const commonStyle = require("../../theme/variables/commonStyle");

export default {
  // Style for Home
  head: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: commonStyle.inverseTextColor,
    paddingLeft: 5,
    paddingRight: 5
  },
  header: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: commonStyle.inverseTextColor,
    paddingLeft: 0,
    paddingRight: 0
  },
  title: {
    fontSize: 15,
    paddingTop: 20
  },
  content: {
    paddingBottom: 8,
    flexDirection: "column",
    // paddingLeft: 3,
    backgroundColor: "#efefef",
    opacity: 1
  },
  subHeaderContentView: {
    height: Platform.OS === "ios" ? 50 : 60,
    // backgroundColor: "#3c5040",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    marginHorizontal: -15,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: 'relative',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  subHeaderInnerContentView: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: Platform.OS === "ios" ? 5 : 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 0,
    paddingRight: 0,
  },
  restaurantSearchInput: {
    backgroundColor: commonStyle.toolbarDefaultBg,
    borderRadius: 4,
    flex: 1,
    height: 40,
    marginBottom: Platform.OS === "ios" ? 4 : 8,
    alignSelf: "center"
  },
  fullWidthImgView: {
    width: Dimensions.get("window").width + 3,
    height: Dimensions.get("window").width / 2,
    marginTop: 10,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
  },
  couponIconView: {
    width: (Dimensions.get("window").width - 20) * 3 / 8,
    height: Dimensions.get("window").width / 2 - 15,
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: "transparent",
  },
  couponCircle: {
    height: Dimensions.get("window").width / 2 - 70,
    width: Dimensions.get("window").width / 2 - 70,
    borderRadius: Dimensions.get("window").width / 2 - 70,
    backgroundColor: commonStyle.badgeColor,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponView: {
    width: (Dimensions.get("window").width - 20) * 5 / 8,
    height: Dimensions.get("window").width / 2 - 15,
    // backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
    paddingLeft: 15,
    zIndex: 0
  },
  couponParentView: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width / 2 - 15,
    backgroundColor: "#0686fb",
    borderRadius: 5,
    left: 10,
    zIndex: 0
  },
  couponTitleText: {
    textAlign: "center",
    color: commonStyle.inverseTextColor,
    fontSize: commonStyle.noteM5FontSize
  },

  couponSubText: {
    textAlign: "center",
    color: commonStyle.inverseTextColor,
    fontSize: commonStyle.noteM3FontSize
  },

  foodGridImg: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: 150,
    resizeMode: "cover",
    borderRadius: 5
  },
  foodGridImgIconView: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center"
  },
  featuredProductView: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: 250,
    top: 0,
    left: 0,
    backgroundColor: commonStyle.badgeColor,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center"
  },
  foodGridText: {
    color: commonStyle.inverseTextColor,
    fontSize: commonStyle.noteM4FontSize
  },
  cardView: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row"
  },
  restaurantFoodImg: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    borderRadius: 5
  },
  ratingsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5
  },
  ratingsIcon: {
    color: commonStyle.contentTextColor,
    fontSize: commonStyle.noteM2FontSize
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 125
  },
  hotelNameText: {
    color: commonStyle.darkTextColor,
    fontSize: commonStyle.noteM3FontSize,
    fontWeight: "bold"
  },
  timeText: {
    color: commonStyle.contentTextColor,
    fontSize: commonStyle.noteS2FontSize,
    fontWeight: "bold"
  },
  offerText: {
    color: commonStyle.contentTextColor,
    fontSize: commonStyle.noteFontSize
  },
  footerImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    alignSelf: "center"
  },
  menuIcon: {
    color: "#0087FB",
    paddingRight: 10,
    paddingLeft: 10,
    height: 40,
  },

  footerItemActive: {
    color: "#FFF",
    fontWeight: "700"
  },
  footerItemInactive: {
    color: "rgba(176,219,253,0.5)"
  },
  searchIcon: {
    color: 'white',
    paddingRight: 7,
    paddingLeft: 7,
  },
  shopBtn: {
    height: 35,
    // width: 110,
    backgroundColor: 'white',
    marginTop: 25,
    borderRadius: 3,
  },
  shopText: {
    textAlign: 'center',
    fontSize: commonStyle.noteM2FontSize,
    color: "#0686fb"
  },
  featuredLabelView: {
    height: 20,
    justifyContent: "center",
    marginLeft: 8
  },
  featuredLabelText: {
    fontSize: commonStyle.noteM3FontSize,
    fontWeight: "bold"
  },
  featuredFoodText: {
    fontSize: commonStyle.noteM3FontSize,
    textAlign: "center"
  },
  featuredFoodImg: {
    height: 70,
    marginTop: 10,
    alignSelf: "center",
    width: 70
  },
  featuredCurrency: {
    fontSize: commonStyle.noteM3FontSize,
    color: "#0686fb"
  },
  featuredPercent: {
    fontSize: commonStyle.noteM1FontSize,
    textAlign: "right"
  },
  featuredDetailText: {
    fontSize: commonStyle.noteS2FontSize,
    padding: 3,
    textAlign: "center"
  },
  quantityText: {
    fontSize: commonStyle.noteM5FontSize,
    color: commonStyle.contentTextColor,
    alignSelf: "center"
  },
  //Style for Menu
  menu: {
    flex: 1,
    backgroundColor: '#1565C0'
  },
  menuUserInfo: {
    height: 56,
    paddingTop: 10,
    marginBottom: 10,
  },
  menuUserImage: {
    width: 55,
    height: 55,
    borderRadius: 45,
    marginTop: 10,
    marginLeft: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  menuUserName: {
    color: '#fff',
    fontSize: commonStyle.noteM4FontSize,

  },
  menuItemName: {
    color: '#fff',
    fontSize: commonStyle.noteM3FontSize,
  },
  menuUserEmail: {
    color: '#fff',
    fontSize: commonStyle.noteM1FontSize,
    opacity: .8
  },
  menuUserPhone: {
    color: '#fff',
    fontSize: commonStyle.noteM1FontSize,
    opacity: .8
  },
  menuListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginBottom: 20
  },
  menuItemIcon: {
    color: "white",
    marginRight: 10,
    marginLeft: 20
  },
  menuLineView: {
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    opacity: 0.2
  },

  largeHeightSpaceView: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  middleHeightSpaceView: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  smallHeightSpaceView: {
    height: 10
  }
};
