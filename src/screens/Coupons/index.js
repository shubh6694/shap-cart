import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Title,
  Text,
  Button,
  Icon,
  Item,
  List,
  ListItem,
  Left,
  Right,
  Body,
  H3,
  Grid,
  Row,
  Col,
  Spinner,
  Toast
} from "native-base";

import styles from "../Home/styles";
import signedUrl from "../../SignedUrl";
import CONFIG from '../../config';

const commonStyle = require("../../theme/variables/commonStyle");
const flourImg = require("../../../assets/home-page/flour.jpg");

let perPage = CONFIG.perPage;
if(perPage % 2 !== 0) {
  perPage += 1;
}

class Coupons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryItems: [],
      isLoading: true,
      page: 1,
      loadMore: true
    };
  }

  componentDidMount() {
    this._loadProducts();
  }

  _loadProducts = () => {

    this.setState({isLoading: true});

    let page = this.state.page;
    this.setState({page: page+1});

    let filters = {
      page: page,
      per_page: perPage
    };

    let linkToApi = signedUrl("coupons", "GET", filters);
    const navigation = this.props.navigation;
    let data = [];
    fetch(linkToApi, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseData) => {
      let renderCategory = this.state.categoryItems;
      if(Object.keys(responseData).length === 0) {
        Toast.show({
          text: 'No more data to load!',
          position: 'bottom',
          buttonText: 'Okay',
          duration: 2000
        })
        this.setState({loadMore: false});
      }
      for( let i = 0; i < Object.keys(responseData).length; i++ ) {
        if(i+1 < responseData.length) {
          let item1 = responseData[i];
          let item2 = responseData[i+1];
          i++;
          renderCategory.push(
            <Grid style={{ marginTop: 12, marginLeft: 7 }} key={item1.id}>
              <Col>
                <Row>
                  <TouchableOpacity>
                    <Image source={flourImg} style={styles.foodGridImg} />
                    <View style={styles.foodGridImgIconView}>
                      
                      <Text style={styles.foodGridText}>{item1.code.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                </Row>
              </Col>
              <Col>
                <Row>
                  <TouchableOpacity>
                    <Image
                      source={flourImg}
                      style={styles.foodGridImg}
                    />
                    <View style={styles.foodGridImgIconView}>
                      <Text style={styles.foodGridText}>{item2.code.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                </Row>
              </Col>
            </Grid>
          );
        } else {
          item1 = responseData[i];
          renderCategory.push(
            <Grid style={{ marginTop: 12, marginLeft: 7 }} key={item1.id}>
              <Col>
                <Row>
                  <TouchableOpacity>
                    <Image source={flourImg} style={styles.foodGridImg} />
                    <View style={styles.foodGridImgIconView}>
                      
                      <Text style={styles.foodGridText}>{item1.code.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                </Row>
              </Col>
            </Grid>
          );
        }
      }
      this.setState({categoryItems: renderCategory}); 
    })
    .done(() => {
      this.setState({isLoading: false});
    });
  }

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Coupons</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View>
              {this.state.categoryItems}
          </View>
          {this.state.isLoading && (
            <Spinner />
          )}
          {!this.state.isLoading && this.state.loadMore && (
            <Button
              full
              transparent
              onPress={this._loadProducts}
            >
              <Text>Load More</Text>
            </Button>
          )}
        </Content>
      </Container>
    );
  }
}

export default Coupons;
