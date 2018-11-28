import React, { Component } from "react";
import { ActivityIndicator, Image, View, TouchableOpacity, AsyncStorage, Animated } from "react-native";
import GridView from "react-native-super-grid";
//import ImageButton from "react-native-img-button";
import {
	Container,
	Header,
	Content,
	Title,
	Text,
	Button,
	Icon,
	Item,
	Input,
	List,
	ListItem,
	Left,
	Right,
	H3,
	Grid,
	Row,
	Col,
	Thumbnail,
	Toast
} from "native-base";
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Cart from "../Cart/";
import styles from "./styles";
import data from "./data.js";
import Account from "../Account/";
import DrawMenu from "./DrawerMenu";
import SearchComponent from "../Search/SearchComponent";
import { FoodCart } from '../../helper';
import { updateCart } from '../../actions/CartAction';



const commonStyle = require("../../theme/variables/commonStyle");
const fullWidthImg = require("../../../assets/indian-food/food-1.jpg");
const foodCarnivalImg = require("../../../assets/home-page/food-carnival.jpg");
const indianFoodLogo = require("../../../assets/home-page/namaste.jpg");
const foodCarnivalLogo = require("../../../assets/home-page/food-carnival-logo.png");
const sidemenuImg = require("../../../assets/sidemenu_icon.png");
const couponImg = require("../../../assets/couponImg.png");
const featureCartImg = require("../../../assets/home-page/featureCart.png");
const search = "Search restaurant, dishes...";

import signedUrl from "../../SignedUrl";
import CONFIG from "../../config";
import { connect } from 'react-redux';
import { setItem } from "../../actions/SingleProductAction";
import { updateAddress } from "../Location/action";


class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categorieItems: null,
			productsData: null,
			address: '',
			isNavBarHidden:false,
			height: new Animated.Value(64) 
		};
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		const zipCountry = params ? params.zipCountry : null;
		const zipState = params ? params.zipState : null;
		const zipCity = params ? params.zipCity : null;
		const zipCode = params ? params.zipCode : null;
		(zipCountry !== null && zipState !==null && zipCountry !==null) ?
		this.props.updateAddress(`${zipCity}, ${zipState} ${zipCode}`) : (null)

		// To set the badge on the home page of cart items
		AsyncStorage.getItem('cartData')
			.then((value) => {
				let cartArr = value === null ? [] : JSON.parse(value);
			});

		// Get featured category IDs
		let data = [];
		fetch(CONFIG.url + 'food/v1/featured_category', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((featuredData) => {

				let termIds = [];

				for (let i = 0; i < featuredData.length; i++) {
					termIds.push(featuredData[i].term_id);
				}

				// Get featured categories
				let filters = {
					include: termIds.join()
				}

				let api = signedUrl("products/categories", "GET", filters);
				let data = [];
				fetch(api, {
					method: 'GET',
				})
					.then((response) => response.json())
					.then((responseData) => {
						for (let i = 0; i < responseData.length; i++) {
							let item = responseData[i];
							let temp = {
								id: item.id,
								text: item.name,
								image: item.image.src,
								destination: "IndianFoodMenu"
							};
							data.push(temp);

							if (data.length === 2) {
								break;
							}
						}
						this.setState({ categorieItems: data });
						this.setState({ categoriesRawResponse: responseData });
					})
					.done();
			})
			.done();

		// Fetch the featured products
		let featuredProductFilter = {
			featured: true
		};
		let featuredProductApi = signedUrl("products", "GET", featuredProductFilter);
		fetch(featuredProductApi, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((responseData) => {
				let productsData = [];
				for (let i = 0; i < responseData.length; i++) {
					let item = responseData[i];
					let single = {
						id: item.id,
						image: item.images[0].src,
						name: item.name,
						price: item.price,
						text: item.description.replace(/<\/?[^>]+(>|$)/g, ""),
						quantity: 1,
						index: i,
						categories: item.categories
					}
					productsData.push(single);
					// alert(item.description.length)
				}
				this.setState({ productsData: productsData });
			})
			.done();
	}

	updateQty = (item, type) => {

		switch (type) {

			case 'plus':
				item.quantity += 1;
				break;

			case 'minus':
				if (item.quantity === 1) {
					Toast.show({
						text: 'Min quantity is 1',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
					return;
				} else {
					item.quantity -= 1;
				}
				break;
		}

		let data = this.state.productsData;
		data[item.index].quantity = item.quantity;
		this.setState({ productsData: data });

	}

	addToCart = (item) => {
		FoodCart.addToCart(item)
			.then((response) => {
				if (response.result === 0) {
					Toast.show({
						text: 'Added to cart!',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
				}
				if (response.result === 1) {
					Toast.show({
						text: 'Cart updated!',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
				}
				this.props.updateCart(response.cart);
			});
	}

	_productClick = (item) => {
		this.props.setItem(item);
		this.props.navigation.navigate('SingleProduct')
	}


	render() {
		const navigation = this.props.navigation;
		const categorieItems = this.state.categorieItems;
		const { address } = this.props.location;
		const { cart } = this.props.cart;
		// alert(this.props.commonFooterDisplayvar.commonFooterDisplayvar)
		return (
			<Container>
				<Header style={styles.head}>
					<Left style={{ flex: 1, }}>
						<Button transparent
							onPress={() => {
								this.props.navigation.navigate("Location", { locAddress: address });
							}}
						>
							<Icon name="ios-pin" />
							<Text numberOfLines={1} style={{ fontSize: 14, color: 'black', marginLeft: 5, paddingTop: 5 }}>
								{address}</Text>
						</Button>
					</Left>
					<Right style={{ flex: 1 }}>
						<Button
							transparent
							onPress={() => navigation.navigate("Cart")}
							style={{ paddingLeft: 10 }}
						>
							<View style={{ position: 'absolute', top: 5, right: 10, zIndex: 99 }}>
								<Text style={{ fontSize: 14, color: 'red' }}>{cart.length}</Text>
							</View>
							<Icon name="ios-basket" />

						</Button>
					</Right>
				</Header>

				<SearchComponent
					styles={styles}
					navigation={this.props.navigation}
				/>

				<Content style={styles.content}>
					<View style={styles.fullWidthImgView}>
						<View style={styles.couponParentView}>
							<Grid >
								<Col style={{ width: "60%" }}>
									<Row >
										<View style={styles.couponView}>
											<Text style={styles.couponTitleText}>Coupon Saving</Text>
											<View style={styles.smallHeightSpaceView} />
											<Text style={styles.couponSubText}>Up to 40% off everyday</Text>
											<Text style={styles.couponSubText}>
												essentials
											</Text>
											<Button style={styles.shopBtn} onPress={() => this.props.navigation.navigate("Browse")}>
												<Text style={styles.shopText}>Shop Now</Text>
											</Button>
										</View>
									</Row>
								</Col>
								<Col style={{ width: "40%" }}>
									<Row >
										<View style={styles.couponIconView}>
											<View style={styles.couponCircle}>
												<Image source={couponImg} />
											</View>
										</View>
									</Row>
								</Col>
							</Grid>
						</View>
					</View>
					{categorieItems == null || this.state.productsData == null ? (<ActivityIndicator size="large" color="skyblue" />) : null}
					{categorieItems !== null && (
						<View style={styles.featuredLabelView}>
							<Text style={styles.featuredLabelText}>
								Featured Categories
	              			</Text>
						</View>
					)}
					{categorieItems !== null && (
						<GridView
							itemDimension={130}
							items={categorieItems}
							style={styles.gridView}
							renderItem={item => (
								<TouchableOpacity
									onPress={() => navigation.navigate("IndianFoodMenu", { categoryId: item.id, categoryName: item.text, categoriesData: this.state.categoriesRawResponse })}
								>
									<Image source={{ uri: item.image }} style={styles.foodGridImg} />
									<View style={styles.foodGridImgIconView}>
										<Text style={styles.foodGridText}>{item.text.substring(0, 10)}</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					)}
					{this.state.productsData !== null && (
						<View style={styles.featuredLabelView}>
							<Text style={styles.featuredLabelText}>
								Featured Products
              			</Text>
						</View>
					)}
					{this.state.productsData !== null && (
						<GridView
							itemDimension={130}
							items={this.state.productsData}
							style={styles.gridView}
							renderItem={item => (
								<View style={styles.featuredProductView}>
									<Text
										style={styles.featuredFoodText}
										onPress={() => this._productClick(item)}
									>
										{item.name}
									</Text>
									<Image style={styles.featuredFoodImg} source={{ uri: item.image }} />
									<View style={styles.middleHeightSpaceView}>
										<Text style={styles.featuredCurrency}>${item.price}</Text>
										<Text style={styles.featuredPercent}> / lbs</Text>
									</View>
									<Text style={styles.featuredDetailText}>{item.text.substring(0, 20)}</Text>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between"
										}}
									>
										<Button
											onPress={() => this.updateQty(item, 'minus')}
											transparent
											style={{ paddingRight: 5 }}
										>
											<Icon name="ios-remove-circle-outline" />
										</Button>
										<Text style={styles.quantityText}>
											{item.quantity}
										</Text>
										<Button
											onPress={() => this.updateQty(item, 'plus')}
											transparent
											style={{ paddingLeft: 5 }}
										>
											<Icon name="ios-add-circle-outline" />
										</Button>
									</View>
									<Button
										transparent
										onPress={() => this.addToCart(item)}
										style={{ height: 65, marginLeft: 'auto', marginRight: 'auto' }}
									>
										<View style={styles.largeHeightSpaceView}>
											<Image style={{ height: 30 }} source={featureCartImg} />
											<Text style={styles.featuredCurrency}>Add to Cart</Text>
										</View>
									</Button>
								</View>
							)}
						/>
					)}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.loc,
		cart: state.cartReducer,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateAddress:(item)=>dispatch(updateAddress(item)),
		setItem: (item) => dispatch(setItem(item)),
		updateCart: (item) => dispatch(updateCart(item)),
	}
}

const ConnectedHome = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

const DrawerStack = DrawerNavigator({
	screen1: { screen: ConnectedHome },
},
	{
		contentComponent: DrawMenu,
		drawerWidth: 300
	}
)

// const DrawerNavigation = StackNavigator({
// 	DrawerStack: { screen: DrawerStack }
// }, {
// 		headerMode: 'none'
// 	}
// )


export default DrawerStack;