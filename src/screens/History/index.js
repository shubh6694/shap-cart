import React, { Component } from 'react';
import { View, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Body,
  Title,
  Left,
  Button,
  Spinner
} from 'native-base';
import signedUrl from "../../SignedUrl";

export default class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      noOrders: false,
      isLoading: false,
      isLoggedIn: true
    };
  }

  componentDidMount() {

    AsyncStorage.getItem('user')
    .then((value)  => {

      if(value === null) {
        this.setState({isLoggedIn: false});
        return;
      }

      this.setState({ isLoading: true });

      let user = JSON.parse(value);
      let filters = {
        customer: user.id
      }
      let linkToApi = signedUrl("orders", "GET", filters);

      fetch(linkToApi, {
        method: "GET"
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.length === 0) {
          this.setState({ noOrders: true });
        }
        this.setState({orders: responseData});
        this.setState({ isLoading: false });
      })
      .done();
    });

  }

  render() {
  
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Orders</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.state.isLoading && (
            <Spinner />
          )}
          {!this.state.isLoading && this.state.noOrders && (
            <Text style={{textAlign: 'center', fontSize: 20, marginTop: '50%'}} note> Sorry, you don't have any orders!</Text>
          )}
          {!this.state.isLoggedIn && (
            <Text style={{textAlign: 'center', fontSize: 20, marginTop: '50%'}} style={{alignSelf: 'center'}} note>You are not logged in!</Text>
          )}
          {(!this.state.noOrders || !this.state.isLoggedIn) && (
            <Card
              dataArray = {this.state.orders}
              transparent
              renderRow = {(order) => {
                return(
                  <TouchableHighlight
                    transparent
                    onPress={() => this.props.navigation.navigate('SingleOrder', {lineItems: order.line_items})}
                  >  
                    <Card>
                      <CardItem
                        header
                        style={{
                          borderBottomWidth: 1,
                          borderColor: '#d4d6d6'
                        }}
                      >
                        <Left>
                          <Text style={{ fontSize: 14}}>Order No {order.number}</Text>
                        </Left>
                        <Right>
                          <Text note>{formatDate(new Date(order.date_created))}</Text>
                        </Right>
                      </CardItem>
                      <CardItem style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <Left>
                          <Body>
                            <Text style={{ fontSize: 14}}>{order.line_items[0].name}</Text>
                            <Text note>{order.status}</Text>
                          </Body>
                        </Left>
                        <Right>
                          <Text note>Rs. {order.total}</Text>
                        </Right>
                      </CardItem>
                    </Card>
                  </TouchableHighlight>
                )
              }}
            />
          )}
        </Content>
      </Container>
    );
  }
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}