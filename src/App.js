import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";

import Login from "./screens/Login/";
import IndianFoodMenu from "./screens/IndianFoodMenu/";
import Breakfast from "./screens/IndianFoodMenu/breakfast";
import WesternFoodMenu from "./screens/WesternFoodMenu/";
import TabNavigation from "./screens/Home/tabNavigation";
import Location from "./screens/Location/";
import Favourites from "./screens/Favourites/";
import Filter from "./screens/Filter/";
import PhoneNumber from "./screens/PhoneNumber/";
// import Cart from "./screens/Cart";
import Beverage from "./screens/Beverage";
import SingleBlog from "./screens/SingleBlog";
import SingleProduct from "./screens/SingleProduct";
import SinglePro from "./screens/Search/singlePro";
import MyWebView from "./screens/MyWebView";
import About from "./screens/About";
import Coupons from "./screens/Coupons";
import Address from "./screens/Address";
import ManageAddress from "./screens/ManageAddress";
import History from "./screens/History";
import SingleOrder from "./screens/SingleOrder";
import ThankYou from "./screens/ThankYou";
import CheckOut from "./screens/CheckOut";

const App = StackNavigator(
  {
    Login: { screen: Login },
    TabNavigation: { screen: TabNavigation },
    Location: { screen: Location },
    Filter: { screen: Filter },
    IndianFoodMenu: { screen: IndianFoodMenu },
    WesternFoodMenu: { screen: WesternFoodMenu },
    Favourites: { screen: Favourites },
    PhoneNumber: { screen: PhoneNumber },
    // Cart: { screen: Cart },
    Beverage: { screen: Beverage },
    SingleBlog: { screen: SingleBlog },
    MyWebView: { screen: MyWebView },
    About: { screen: About },
    Coupons: { screen: Coupons },
    Address: { screen: Address },
    ManageAddress: { screen: ManageAddress },
    History: { screen: History },
    SingleOrder: { screen: SingleOrder },
    SingleProduct: { screen: SingleProduct },
    SinglePro: { screen: SinglePro },
    ThankYou: { screen: ThankYou },
    CheckOut: {screen: CheckOut},
    Breakfast: {screen: Breakfast}
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
