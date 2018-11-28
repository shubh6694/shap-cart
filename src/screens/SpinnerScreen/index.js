import React, { Component } from "react";
import { View } from "react-native";
import { Spinner } from "native-base";

class SpinnerScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }
}

export default SpinnerScreen;
