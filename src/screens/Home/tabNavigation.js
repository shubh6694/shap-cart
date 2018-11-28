import React from "react";
import { Image , View} from "react-native";
import { Footer, Text, FooterTab, Button } from "native-base";
import { TabNavigator } from "react-navigation";
import { StackNavigator, DrawerNavigator } from 'react-navigation'
//import Home from "../Home/";
import Home from "../Home/";
import Cart from "../Cart/";
import Order from "../Order/";
import Account from "../Account/";
import Browse from "../Browse/";
import WishList from "../WishList";
import SingleProduct from "../SingleProduct";
import Beverage from "../Beverage/";
import styles from "./styles";
import DrawMenu from "./DrawerMenu";
// import { connect } from 'react-redux';
// import { commonFooterDisplay } from '../../actions/commonAction';


const home = require("../../../assets/footer-menu/home_inactive.png");
const carrot = require("../../../assets/footer-menu/carrot_inactive.png");
const lamp = require("../../../assets/footer-menu/lamp_inactive.png");
const item = require("../../../assets/footer-menu/item_inactive.png");
const activeHome = require("../../../assets/footer-menu/home.png");
const activeCarrot = require("../../../assets/footer-menu/carrot.png");
const activeLamp = require("../../../assets/footer-menu/lamp.png");
const activeItem = require("../../../assets/footer-menu/item.png");

// const abc = 'sss';
const TabNavigation = TabNavigator(
  {
    // DrawMenu:{screen:DrawMenu},
    Home: { screen: Home },
    Browse: { screen: Browse },
    Order: { screen: Order },
    Account: { screen: Account },
    Beverage: { screen: Beverage },
    // SingleProduct: { screen: SingleProduct },
    WishList: { screen: WishList },
    Cart: { screen: Cart },

  },
  {
    swipeEnabled:false,
    initialRouteName:'Home',
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {
      return (
        // <View>
        //   {abc == null ?
          <Footer>
          <FooterTab>
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onPress={() => props.navigation.navigate("Home")}
            >
              <Image
                source={
                  props.navigation.state.index === 0
                    ? activeHome
                    : home
                }
                style={styles.footerImg}
              />
              <Text
                style={
                  props.navigation.state.index === 0
                    ? styles.footerItemActive
                    : styles.footerItemInactive
                }
              >
                HOME
              </Text>
            </Button>
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onPress={() => props.navigation.navigate("Browse")}
            >
              <Image
                source={props.navigation.state.index === 1 ? activeCarrot : carrot}
                style={styles.footerImg}
              />
              <Text
                style={
                  props.navigation.state.index === 1
                    ? styles.footerItemActive
                    : styles.footerItemInactive
                }
              >
                BROWSE
              </Text>
            </Button>
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onPress={() => props.navigation.navigate("Order")}
            >
              <Image
                source={
                  props.navigation.state.index === 2 ? activeLamp : lamp
                }
                style={styles.footerImg}
              />
              <Text
                style={
                  props.navigation.state.index === 2
                    ? styles.footerItemActive
                    : styles.footerItemInactive
                }
              >
                RECIPE
              </Text>
            </Button>
            <Button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onPress={() => props.navigation.navigate("WishList")}
            >
              <Image
                source={
                  props.navigation.state.index === 3 ? activeItem : item
                }
                style={styles.footerImg}
              />
              <Text
                style={
                  props.navigation.state.index === 3
                    ? styles.footerItemActive
                    : styles.footerItemInactive
                }
              >
                YOURITEM
              </Text>
            </Button>
          </FooterTab>
          </Footer>
        //    : null}
        // </View>
      );
    }
  }
);

// function mapStateToProps(state) {
// 	return {
// 		commonFooterDisplayvar: state.commonReducer,
// 	}
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		commonFooterDisplay:(item) => dispatch(commonFooterDisplay(item))
// 	}
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(TabNavigation)

export default TabNavigation;
