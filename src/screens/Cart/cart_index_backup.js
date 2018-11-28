import React, { Component } from "react";
import { View, TextInput, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  List,
  ListItem,
  Grid,
  Col,
  Form,
  Item,
  Label,
  Input,
  Card,
  CardItem
} from "native-base";
import { FoodCart } from '../../helper';
import styles from "./styles";
import dataTwo from "./dataTwo.js";

const commonStyle = require("../../theme/variables/commonStyle");
const hotelImg = require("../../../assets/home-page/rajdhani.jpg");

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "Type Address Here",
      cartItems: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('cartData')
    .then((cartData) => {
      if(cartData !== null) {
        let cartData = JSON.parse(cartData);
        let cartItems = [];
        for(let i = 0; i < cartData.length; i++) {
          let rowDataOne = responseData[i];
          posts.push(
            <CardItem noBorder style={styles.gridListitem}>
              <Grid>
                <Col size={3}>
                  <Left style={{ alignSelf: "flex-start" }}>
                    <Text style={{ fontSize: 15 }}>
                      {rowDataOne.name}
                    </Text>
                  </Left>
                </Col>
                <Col size={2}>
                  <Right>
                    <View style={styles.rightColView}>
                      <Button
                        transparent
                        style={{ paddingRight: 0 }}
                        onPress={() => this.updateQty(rowDataOne, 'minus')}
                      >
                        <Icon name="ios-remove-circle-outline" />
                      </Button>
                      <Text style={styles.rightColText}>
                        {rowDataOne.quantity}
                      </Text>
                      <Button
                        transparent
                        style={{ paddingLeft: 0 }}
                        onPress={() => this.updateQty(rowDataOne, 'plus')}
                      >
                        <Icon name="ios-add-circle-outline" />
                      </Button>
                      <Text style={styles.rightColText}>
                        Rs. {rowDataOne.price}
                      </Text>
                    </View>
                  </Right>
                </Col>
              </Grid>
            </CardItem>
          );
        }
        this.setState({ cartItems });
        console.log('someData', someData);
        this.setState({ dataOne: someData });
      }
    });
  }

  updateQty = (item, type) => {

    if(item.isInCart) {
      alert("Already in cart! Please update quantity from cart");
    }

    switch(type) {

      case 'plus':
        item.quantity += 1;
        break;

      case 'minus':
        if(item.quantity === 1) {
          alert("Min quantiy is 1");
          return;
        } else {
          item.quantity -= 1;
        }
        break;

    }

    let data = this.state.dataOne;
    data[item.index].quantity = item.quantity;
    FoodCart.addToCart(item)
    .then(function(res) {
      if(res === 0) {
        alert("Added to cart!");
      }
      if(res === 1) {
        alert("Cart updated");
      }
    });
    this.setState({dataOne: data});

  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Review Order</Title>
          </Body>
          <Right />
        </Header>

        <Content enableResetScrollToCoords={false}>
          <List style={styles.list}>
            <ListItem noBorder>
              <Thumbnail square source={hotelImg} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.hotelNameText}>Rajdhani</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: commonStyle.contentTextColor
                  }}
                >
                  BTM 2nd Stage
                </Text>
              </View>
            </ListItem>
          </List>
          <View style={{ paddingBottom: 5 }} />

          <List
            style={styles.list}
            dataArray={this.state.dataOne}
            renderRow={rowDataOne =>
              <ListItem noBorder style={styles.gridListitem}>
                <Grid>
                  <Col size={3}>
                    <Left style={{ alignSelf: "flex-start" }}>
                      <Text style={{ fontSize: 15 }}>
                        {rowDataOne.name}
                      </Text>
                    </Left>
                  </Col>
                  <Col size={2}>
                    <Right>
                      <View style={styles.rightColView}>
                        <Button
                          transparent
                          style={{ paddingRight: 0 }}
                          onPress={() => this.updateQty(rowDataOne, 'minus')}
                        >
                          <Icon name="ios-remove-circle-outline" />
                        </Button>
                        <Text style={styles.rightColText}>
                          {rowDataOne.quantity}
                        </Text>
                        <Button
                          transparent
                          style={{ paddingLeft: 0 }}
                          onPress={() => this.updateQty(rowDataOne, 'plus')}
                        >
                          <Icon name="ios-add-circle-outline" />
                        </Button>
                        <Text style={styles.rightColText}>
                          Rs. {rowDataOne.price}
                        </Text>
                      </View>
                    </Right>
                  </Col>
                </Grid>
              </ListItem>}
          />
          <View style={{ paddingBottom: 5 }} />

          <List style={styles.list}>
            <ListItem noBorder>
              <Text style={{ fontSize: 15, color: commonStyle.darkTextColor }}>
                DETAILED BILL
              </Text>
            </ListItem>
          </List>
          <View style={{ paddingBottom: 5 }} />

          <List style={styles.list}>
            <ListItem noBorder>
              <Text style={{ fontSize: 15, color: commonStyle.darkTextColor }}>
                DETAILS
              </Text>
            </ListItem>
          </List>

          <View style={{ backgroundColor: "#fff" }}>
            <Form>
              <Item fixedLabel>
                <Label style={{ color: commonStyle.contentTextColor }}>
                  Email
                </Label>
                <Input />
              </Item>
              <Item fixedLabel>
                <Label style={{ color: commonStyle.contentTextColor }}>
                  Phone
                </Label>
                <Input keyboardType="numeric" />
              </Item>
              <TextInput
                style={styles.textArea}
                onChangeText={text => this.setState({ text })}
                placeholder={"Enter Address"}
                editable
                multiline
                numberOfLines={4}
              />
            </Form>
          </View>

          <View style={{ padding: 15 }}>
            <Button block>
              <Text>Proceed</Text>
            </Button>
          </View>
          <Card>
            {this.state.cartItems}
          </Card>

        </Content>
      </Container>
    );
  }
}

export default Cart;