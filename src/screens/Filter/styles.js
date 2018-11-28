const React = require("react-native");
const { Platform } = React;
const commonStyle = require("../../theme/variables/commonStyle");

export default {
  headerText: {
    color: commonStyle.contentTextColor,
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? 7 : 0
  },
  filterHeaderTextView: {
    padding: 10,
    backgroundColor: commonStyle.inverseTextColor,
    borderBottomWidth: 5,
    borderBottomColor: commonStyle.lightTextColor
  },
  filterHeaderText: {
    color: commonStyle.lightTextColor,
    fontSize: 14
  },
  colLeftBtn: {
    borderRightWidth: 1,
    borderRightColor: commonStyle.lightTextColor,
    flexDirection: "row",
    padding: 15
  },
  colIcon: {
    color: commonStyle.lightTextColor,
    fontSize: 20,
    marginTop: 5
  },
  filterTypeText: {
    color: commonStyle.contentTextColor,
    fontWeight: "bold"
  },
  filterTypeSubtext: {
    color: commonStyle.lightTextColor,
    fontSize: 12
  },
  colRightBtn: {
    flexDirection: "row",
    padding: 15
  }
};
