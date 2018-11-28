import { combineReducers } from "redux";
import accountReducer from "../screens/Account/reducer";
import loc from "./location"
import singleProductReducer from "./singleproduct"
import wishlistReducer from "./wishlist"
import cartReducer from "./cart"



export default combineReducers({
  accountReducer,         
  loc,
  singleProductReducer,
  wishlistReducer,
  cartReducer,

});