import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Badge,
  Text,
  Icon,
  Button,
  List
} from "native-base";
import styles from "./styles.js";
import dataDesserts from "./dataDesserts.js";

const deviceHeight = Dimensions.get("window").height;

export default class Desserts extends Component {
  render() {
    return (
      <Content padder>
        <List
          dataArray={dataDesserts}
          renderRow={dataRow =>
            <Card>
              <CardItem cardBody>
                <Image
                  source={dataRow.image}
                  style={{ height: deviceHeight / 4, flex: 1 }}
                />
              </CardItem>
              <CardItem style={{ paddingBottom: 0, paddingLeft: 10 }}>
                <Left>
                  <Badge
                    danger={dataRow.badgeDanger}
                    success={dataRow.badgeSuccess}
                    style={{ height: 12, marginTop: 5 }}
                  />
                  <Text>
                    {dataRow.dishName}
                  </Text>
                </Left>
              </CardItem>
              <CardItem style={{ paddingTop: 0, paddingLeft: 3 }}>
                <Left>
                  <Text style={styles.amountText}>
                    Rs. {dataRow.amount}
                  </Text>
                </Left>
                <Right>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      transparent
                      style={{ paddingRight: 5, paddingTop: 5 }}
                    >
                      <Icon name="ios-remove-circle-outline" />
                    </Button>
                    <Text style={styles.quantityText}>
                      0{dataRow.quantity}
                    </Text>
                    <Button
                      transparent
                      style={{ paddingLeft: 5, paddingTop: 5 }}
                    >
                      <Icon name="ios-add-circle-outline" />
                    </Button>
                  </View>
                </Right>
              </CardItem>
            </Card>}
        />
      </Content>
    );
  }
}
