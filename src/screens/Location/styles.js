const React = require("react-native");

const { Dimensions, Platform } = React;
var {height, width} = Dimensions.get('window');

export default {
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    width: null,
    height: null
  },
  mapView: {
    flex: 8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
    height: height- 85,
    width: width,
  },
  page: {
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height - 70
        : Dimensions.get("window").height - 80,
    width: Dimensions.get("window").width,
    position: "relative",
    flex: 1
  },
  btn: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: Dimensions.get("window").width - 20
  }
};
