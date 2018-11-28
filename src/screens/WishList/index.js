import React, { Component } from 'react';
import { Image, View, Dimensions, FlatList, StyleSheet, TouchableHighlight, AsyncStorage } from "react-native";
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
  Spinner,
  Toast,
  Body,
  Thumbnail,
  Container,
  Header,
  Title,
  Grid,
  Col
} from 'native-base';

const commonStyle = require("../../theme/variables/commonStyle");
import signedUrl from "../../SignedUrl";
import { FoodCart } from '../../helper';
// import { connect } from 'react-redux';

const deviceHeight = Dimensions.get("window").height;

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOne: []
    };
  }

  renderWishlist = () => {
    AsyncStorage.getItem('wishList')
      .then((cartData) => {
        if (cartData !== null) {
          let someData = JSON.parse(cartData);
          for (let i = 0; i < someData.length; i++) {
            someData[i].index = i;
          }
          this.setState({ dataOne: someData });
          // console.log("shubH: "+JSON.stringify(someData));
        }
      });
  }

  updateQty = (item, type, index) => {

    if (item.isInCart) {
      alert("Already in cart! Please update quantity from cart");
    }

    switch (type) {

      case 'plus':
        
        FoodCart.updateWishList(type, index)
          .then(function (res) {
            if (res === 0) {
              alert("Sorry due to some error currently we are not able to update quantity");
            }
            if (res === 1) {
              // alert("Inc Succ");
            }
          });

        break;

      case 'minus':
        if (item.quantity === 1) {
          //alert("Min quantiy is 1");
          //return;
          FoodCart.removeFromWishList(item)
            .then((res) => {
              let data = this.state.dataOne;
              for (let i = 0; i < data.length; i++) {
                if (data[i].id === item.id) {
                  data.splice(i, 1)
                  this.setState({ dataOne: data });
                  Toast.show({
                    text: 'Removed item from your Items!',
                    position: 'bottom',
                    buttonText: 'Okay',
                    duration: 2000
                  });
                  break;
                }
              }
              // this.updateTotal(data);
            });
          return;
        } else {
          // item.quantity -= 1;
          FoodCart.updateWishList(type, index)
            .then(function (res) {
              if (res === 0) {
                alert("Sorry due to some error currently we are not able to update quantity");
              }
              if (res === 1) {
                // alert("Inc Succ");
              }
            });
        }
        break;

    }

    let data = this.state.dataOne;
    data[item.index].quantity = item.quantity;
    this.setState({ dataOne: data });
  }

  addToCart = (item) => {
    FoodCart.addToCart(item)
      .then(function (res) {
        if (res === 0) {
          alert("Added to cart!");
        }
        if (res === 1) {
          alert("Cart updated");
        }
      });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    this.renderWishlist()
    const navigation = this.props.navigation;
    // let { item } = this.props.item;
    if (this.state.dataOne.length <= 0) {
      return (
        <View>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon
                  name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Your Items</Title>
            </Body>
            <Right />
          </Header>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.amountText}>No data to show</Text>
          </View>
        </View>
      );
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon
                  name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Your Items</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <FlatList
              data={this.state.dataOne}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              ListFooterComponent={this.renderListFooter}
              renderItem={({ item, index }) => (
                <Card>
                  <CardItem>
                    <Grid>
                      <Col size={2}>
                        <Thumbnail
                          source={{ uri: item.image }}
                          square
                        />
                      </Col>

                      <Col size={2}>
                        <Text style={{ marginTop: 0, fontSize: 15 }} numberOfLines={1}>{item.name}</Text>

                        {/* <View style={{ flexDirection: 'row' }}> */}
                          <Text style={{ color: '#438FFB', marginTop: 10, fontSize: 15 }}>${item.price}</Text>
                          {/* <Text note style={{ marginTop: 10, fontSize: 12 }} > oz</Text> */}
                        {/* </View> */}
                      </Col>

                      <Col size={2}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginLeft: -15,
                          }}
                        >
                          <Button
                            transparent
                            style={{ paddingRight: 0, paddingTop: 0 }}
                            onPress={() => this.updateQty(item, 'minus', index)}
                          >
                            <Icon style={{ color: '#509736', fontSize: 16 }} name="ios-remove-circle-outline" />
                          </Button>
                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>
                          <Button
                            transparent
                            style={{ paddingLeft: 0, paddingTop: 0 }}
                            onPress={() => this.updateQty(item, 'plus', index)}
                          >
                            <Icon style={{ color: '#509736', fontSize: 16 }} name="ios-add-circle-outline" />
                          </Button>
                        </View>
                      </Col>

                      {/* <Col size={1}>
                        <Text style={{ marginTop: 11, marginLeft: 5, color: '#9b9b9b' }}>${item.price * item.quantity}</Text>
                      </Col> */}

                      <Col size={3}>
                        <TouchableHighlight
                          style={{ width: 125 }}
                          onPress={() => this.addToCart(item)}
                        >
                          {/* <View style={{ backgroundColor: '#3ac824', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15, alignItems: 'center' }}>
                            <View style={{flexDirection: 'row'}}>
                              <Icon name="ios-cart" style={{ color: 'white', fontSize: 20, marginLeft: 15 }} />
                              <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', paddingRight: 10 }}>Add to cart</Text>
                            </View>
                          </View> */}
                          <View style={{ backgroundColor: '#3ac824', flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                            <Icon name="ios-cart" style={{ color: 'white',}} />
                            <Text style={{ fontSize: 13, paddingRight: 5, textAlign: 'center', color: 'white', }}>Add to cart</Text>
                          </View>
                        </TouchableHighlight>
                      </Col>
                    </Grid>
                  </CardItem>
                </Card>
              )}
            />
          </Content>
        </Container>
      );
    }

  }
}

const styles = StyleSheet.create({
  amountText: {
    fontSize: 13,
    marginTop: 50,
    color: commonStyle.contentTextColor
  },
  quantityText: {
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 3,
    paddingRight: 3,
    color: commonStyle.contentTextColor
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: commonStyle.lightTextColor,
    marginTop: 70,
    marginBottom: 25
  },
})

// function mapStateToProps(state) {
//   return {
//     wishlistReducer: state.wishlistReducer
//   }
// }

// export default connect(
//   mapStateToProps
// )(WishList)