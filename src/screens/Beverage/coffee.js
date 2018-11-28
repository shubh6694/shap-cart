import React, { Component } from "react";
import { Image, View, Dimensions, TouchableOpacity } from "react-native";
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
import dataCoffee from "./dataCoffee.js";
import  commonStyle from "../../theme/variables/commonStyle";
const deviceHeight = Dimensions.get("window").height;
const featureCartImg = require("../../../assets/home-page/featureCart.png");
export default class Coffee extends Component {
  render() {
    return (
      <Content padder>
        <List
          dataArray={dataCoffee}
          renderRow={dataRow =>
            /*
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
            </Card>
                  */
            <Card>
                <CardItem style={{paddingLeft: 10, height: deviceHeight / 9}}>
                    <Left>
                      <View style={styles.leftView}>
                        <View style={{padding: 5}}>
                          <Image source={dataRow.image} style={styles.foodImg} />
                        </View>  
                        <View style={styles.brandView}>
                            <Text style={{fontSize: commonStyle.noteM4FontSize}}>{dataRow.dishName}</Text>
                            <View style={{flexDirection: "row", justifyContent: "flex-start" }}>
                                 <Text style={styles.currencyText}>${dataRow.currency}</Text>
                                 <Text style={{fontSize: commonStyle.noteM2FontSize}}>per fl oz</Text>
                            </View>
                        </View>
                      </View>
                    </Left>
                    <Right>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                       >
                      <Button 
                        transparent
                        style={{ paddingRight: 5, paddingTop: 5}}
                      >
                        <Icon  name="ios-remove-circle-outline" style={{fontSize: 25, color: "#00c628"}}/>
                      </Button>
                      <Text style={styles.quantityText}>
                        {dataRow.quantity}
                      </Text>
                      <Button
                        transparent
                        style={{ paddingLeft: 5, paddingTop: 5 }}
                      >
                        <Icon name="ios-add-circle-outline" style={{fontSize: 25, color: "#00c628"}}/>
                      </Button>
                    </View>
                    <TouchableOpacity> 
                      <View style={styles.largeHeightSpaceView}>
                          <Image style={{height: 30}} source={featureCartImg}/>
                          <Text style={styles.cartText}>Add to Cart</Text>
                      </View>
                    </TouchableOpacity>
                    </Right>
                </CardItem>
            </Card>
                }
        />
        
      </Content>
    );
  }
}
