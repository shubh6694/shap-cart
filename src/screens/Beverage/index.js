import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Tabs,
  Tab,
  ScrollableTab
} from "native-base";
import Coffee from "./coffee.js";


class Beverage extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Beverage</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="heart" />
            </Button>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="   Coffee   ">
            <Coffee />
          </Tab>
          <Tab heading="     Tea     ">
            <Coffee />
          </Tab>
          <Tab heading="Juice&Nectars">
            <Coffee />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Beverage;
