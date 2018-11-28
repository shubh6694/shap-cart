import React, { Component } from "react";
import { View, WebView, TextInput, AsyncStorage, FlatList } from "react-native";
import { connect } from 'react-redux';

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
	Toast
} from "native-base";
import styles from "./styles";
import dataTwo from "./dataTwo.js";
import { FoodCart } from '../../helper';
import CONFIG from '../../config';
import { updateCart } from '../../actions/CartAction';

const commonStyle = require("../../theme/variables/commonStyle");
const hotelImg = require("../../../assets/home-page/rajdhani.jpg");

class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: "Type Address Here",
			itemsTotal: 0,
			packingCharges: 1.00,
			deliveryCharges: 2.00,
			user: null
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('cartData')
			.then((cartData) => {
				if (cartData !== null) {
					let someData = JSON.parse(cartData);
					this.props.updateCart(someData);
					this.updateTotal(someData);
				}
			});

		AsyncStorage.getItem('user')
			.then((value) => {
				if(value !== null) {
					let user = JSON.parse(value);
					this.setState({ user });
				}
			})
	}

	_checkout = () => {
		// this.props.navigation.navigate("CheckOut");
		// return;
		let cartItems = [];
		const { cart } = this.props.cartReducer;
		const { user } = this.state;

		for (let i = 0; i < cart.length; i++) {
			let single = cart[i];
			cartItems.push({
				productId: single.id,
				quantity: single.quantity
			});
		}

		let order = {
			cart_data: cartItems,
			user_id: user === null ? 'na@na.com' :user.email
		};

		fetch(CONFIG.url + 'food/v1/process_checkout', {
			method: 'POST',
			body: JSON.stringify(order)
		})
			.then((response) => response.json())
			.then((responseData) => {
				this.props.navigation.navigate('MyWebView', { url: responseData.reference });
			})
			.done();
	}

	updateTotal = (someData) => {
		let itemsTotal = 0;
		for (let i = 0; i < someData.length; i++) {
			itemsTotal += someData[i].price * someData[i].quantity;
		}
		this.setState({ itemsTotal })
	}

	updateQty = (item, type) => {

		switch (type) {

			case 'plus':
				item.quantity += 1;
				break;

			case 'minus':
				if (item.quantity === 1) {
					FoodCart.removeFromCart(item)
						.then((response) => {
							this.props.updateCart(response.cart);
							Toast.show({
								text: 'Removed item from cart!',
								position: 'bottom',
								buttonText: 'Okay',
								duration: 2000
							});
							this.updateTotal(response.cart);
						});
					return;
				} else {
					item.quantity -= 1;
				}
				break;

		}

		let data = this.props.cartReducer.cart;
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === item.id) {
				data[i].quantity = item.quantity;
				this.addToCart(item);
				break;
			}
		}
		this.updateTotal(data);
	}

	addToCart = (item) => {
		FoodCart.addToCart(item);
	}

	_keyExtractor = (item, index) => item.id;

	render() {
		const navigation = this.props.navigation;
		const { cart } = this.props.cartReducer;
		const { user } = this.state;
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => navigation.goBack()}>
							<Icon active name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Your Cart</Title>
					</Body>
					<Right />
				</Header>

				<View style={styles.topHeaderDeliveryView}>
					<Text style={{ color: 'white', paddingLeft: 15, paddingTop: 5 }}>
						Next Delivery: Today, 11am - noon
                	</Text>
					<View style={{ flex: 1 }}>
						<Button
							small
							style={{ alignSelf: 'flex-end', marginRight: 10 }}
							// onPress={() => alert('free')}
						>
							<Text style={{ textAlign: 'center' }}> FREE </Text>
						</Button>
					</View>
				</View>

				<Content enableResetScrollToCoords={false}>
					{
						cart.length <= 0 && (
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 15, marginTop: 12, marginBottom: 12, color: commonStyle.contentTextColor }}>
									Your Cart is Empty !
								</Text>
							</View>
						)
					}

					{
						cart.length > 0 && (
							<View>
							<FlatList
								data={cart}
								extraData={this.state}
								style={styles.list}
								renderItem={({ item }) => (
									<View style={{ backgroundColor: '#fff', padding: 10 }}>

										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Grid>
												<Col size={3}>
													<Left style={{ alignSelf: "flex-start", flexDirection: 'row' }}>
														<Col size={3}>
															<Thumbnail
																source={{ uri: item.image }}
																square
															/>
														</Col>
														<Col size={5}>
															<Text numberOfLines={1} style={{ fontSize: 15, paddingTop: 10 }}>
																{item.name}
															</Text>
															<View style={{ flexDirection: 'row' }}>
																<Text style={styles.priceText}>
																	${item.price}
																</Text>
																{/* <Text note style={styles.rightColText} > oz</Text> */}
															</View>
														</Col>
													</Left>
												</Col>
												<Col size={3}>
													<View style={{ flexDirection: "row", marginLeft: 3, }}>
														<Button
															transparent
															style={{ paddingRight: 0, }}
															onPress={() => this.updateQty(item, 'minus')}
														>
															<Icon style={{ color: '#6ba755' }} name="ios-remove-circle-outline" />
														</Button>
														<Text style={styles.quantityText}>
															{item.quantity}
														</Text>
														<Button
															transparent
															style={{ paddingLeft: 0 }}
															onPress={() => this.updateQty(item, 'plus')}
														>
															<Icon style={{ color: '#6ba755' }} name="ios-add-circle-outline" />
														</Button>

														<Right>
															<Text style={styles.rightPriceText}>
																${item.price * item.quantity}
															</Text>
														</Right>
													</View>
												</Col>
											</Grid>
										</View>
									</View>
								)}
								keyExtractor={this._keyExtractor}
							/>
					

					<View style={{ paddingBottom: 5 }} />

					<List style={styles.list}>
						<ListItem itemHeader first>
							<Icon name="ios-paper" style={{ fontSize: 15, marginRight: 10 }} />
							<Text style={{ fontSize: 15, color: commonStyle.darkTextColor, fontWeight: "bold" }}>
								DETAILED BILL
              				</Text>
						</ListItem>

						<ListItem>
							<Left>
								<Text style={styles.ItemTotal}> Item Total(3) </Text>
							</Left>
							<Right>
								<Text style={{ fontSize: 12 }}>${this.state.itemsTotal}</Text>
							</Right>
						</ListItem>

						<ListItem>
							<Left>
								<Text style={styles.detailedBillInnertext}> Packing Charges </Text>
							</Left>
							<Right>
								<Text style={{ fontSize: 10 }}>${this.state.packingCharges}</Text>
							</Right>
						</ListItem>

						<ListItem>
							<Left>
								<Text style={styles.detailedBillInnertext}> Delivery Charges </Text>
								<Text style={{ fontSize: 10, color: "#2c81fb" }}>(Add upto $30 for free delivery)</Text>
							</Left>
							<Right>
								<Text style={{ fontSize: 10 }}>${this.state.deliveryCharges}</Text>
							</Right>
						</ListItem>

						{/* <ListItem>
							<Left>
								<Text style={styles.detailedBillInnertext}> Apply Coupon </Text>
							</Left>
							<Body>
								<Item regular style={{ marginRight: 50, marginLeft: -50 }}>
									<Input style={{ height: 25 }} />
								</Item>
							</Body>
							<Right>
								<Text style={{ fontSize: 10 }}>-$0.00</Text>
							</Right>
						</ListItem> */}

					</List>
					<List style={{ backgroundColor: 'white', marginBottom: 12 }}>
						<ListItem noBorder>
							<Grid>
								<Col size={3}>
									<Left style={{ alignSelf: "flex-start" }}>
										<Text
											style={{
												fontSize: 12,
											}}
										>
											Grand Total
                      					</Text>
									</Left>
								</Col>
								<Col size={1}>
									<Right style={{ alignSelf: "flex-end" }}>
										<Text
											style={{
												fontSize: 12,
											}}
										>
											${this.state.itemsTotal + this.state.deliveryCharges + this.state.packingCharges}
										</Text>
									</Right>
								</Col>
							</Grid>
						</ListItem>
					</List>

					{/* <List style={styles.list}>
						<ListItem itemHeader first>
							<Icon name="ios-pin" style={{ fontSize: 15, marginRight: 10 }} />
							<Text style={{ fontSize: 15, color: commonStyle.darkTextColor, fontWeight: "bold" }}>DELIVERY ADDRESS</Text>
						</ListItem>

						<ListItem>
							<View style={{ flexDirection: 'row' }}>
								<Item regular style={{ flex: 1 }}>
									<Input
										placeholderTextColor='gray'
										placeholder="02101"
										style={{ height: 20 }} />
								</Item>

								<Item regular style={{ flex: 2 }}>
									<Input
										placeholderTextColor='gray'
										placeholder="Boston"
										style={{ height: 20 }} />
								</Item>

								<Item regular style={{ flex: 1 }}>
									<Input
										placeholderTextColor='gray'
										placeholder="MA."
										style={{ height: 20 }} />
								</Item>
							</View>
						</ListItem>
						<View>
							<TextInput
								multiline={true}
								style={{ height: 90, paddingLeft: 12, paddingRight: 12, }}
								placeholder='Enter Street Address' />
						</View>
					</List> */}

					<View style={{ padding: 15 }}>
						<Button
						block
						onPress={() => this._checkout()}
						>
							<Text>Proceed</Text>
						</Button>
					</View>
				</View>
				)
			}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		cartReducer: state.cartReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateCart: (item) => dispatch(updateCart(item))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart);