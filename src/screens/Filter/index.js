import React, { Component } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  Button,
  Icon,
  Grid,
  Col,
  CheckBox,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";
import data from "./data.js";

const commonStyle = require("../../theme/variables/commonStyle");

class Filter extends Component {
  state = {
    offerSwitchIsOn: true,
    vegSwitchIsOn: false,
    averageCost: true,
    premiumCost: false
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header style={{ flexDirection: "row" }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Text style={styles.headerText}>Dismiss</Text>
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Button transparent>
              <Text style={styles.headerText}>Filters</Text>
            </Button>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Text style={styles.headerText}>Reset</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.filterHeaderTextView}>
            <Text style={styles.filterHeaderText}>Sort by</Text>
            <View>
              <Grid>
                <Col>
                  <TouchableOpacity style={styles.colLeftBtn}>
                    <Icon active name={"star"} style={styles.colIcon} />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles.filterTypeText}>Rating</Text>
                      <Text style={styles.filterTypeSubtext}>High - Low</Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.colRightBtn}>
                    <Icon name={"timer"} style={styles.colIcon} />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles.filterTypeText}>Delivery Time</Text>
                      <Text style={styles.filterTypeSubtext}>High - Low</Text>
                    </View>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>

          <View style={styles.filterHeaderTextView}>
            <Text style={styles.filterHeaderText}>Cost for Two</Text>
            <View>
              <Grid>
                <Col>
                  <TouchableOpacity style={styles.colLeftBtn}>
                    <CheckBox
                      color={commonStyle.contentTextColor}
                      checked={this.state.averageCost}
                      style={{ marginLeft: -12, marginRight: 8 }}
                    />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles.filterTypeText}>Rs 999</Text>
                      <Text style={styles.filterTypeSubtext}>Average</Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.colRightBtn}>
                    <CheckBox
                      color="#C4C1C1"
                      checked={this.state.premiumCost}
                      style={{ marginLeft: -12, marginRight: 8 }}
                    />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles.filterTypeText}>Rs 2000</Text>
                      <Text style={styles.filterTypeSubtext}>Premium</Text>
                    </View>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>

          <View style={styles.filterHeaderTextView}>
            <Text style={styles.filterHeaderText}>Restaurants with</Text>
            <ListItem noBorder>
              <Left>
                <Text style={styles.filterTypeText}>Offers</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value =>
                    this.setState({ offerSwitchIsOn: value })}
                  value={this.state.offerSwitchIsOn}
                  onTintColor={commonStyle.toolbarDefaultBg}
                  thumbTintColor={commonStyle.brandPrimary}
                />
              </Right>
            </ListItem>
            <ListItem noBorder>
              <Left>
                <Text style={styles.filterTypeText}>Pure Veg Dishes Only</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value =>
                    this.setState({ vegSwitchIsOn: value })}
                  value={this.state.vegSwitchIsOn}
                  onTintColor={commonStyle.toolbarDefaultBg}
                  thumbTintColor={commonStyle.brandPrimary}
                />
              </Right>
            </ListItem>
          </View>

          <View style={styles.filterHeaderTextView}>
            <Text style={styles.filterHeaderText}>Quisines</Text>
            <List
              dataArray={data}
              renderRow={rowData =>
                <ListItem>
                  <Left>
                    <Text style={styles.filterTypeText}>
                      {rowData.quisine}
                    </Text>
                  </Left>

                  <Right>
                    <CheckBox
                      color={commonStyle.contentTextColor}
                      checked={rowData.quisineChecked}
                    />
                  </Right>
                </ListItem>}
            />
          </View>
        </Content>

        <Footer>
          <Button onPress={() => navigation.goBack()} style={{ elevation: 0 }}>
            <Text style={{ color: commonStyle.inverseTextColor }}>
              APPLY FILTERS
            </Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default Filter;
