import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage } from 'react-native';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Left,
	Body,
	Right,
	Thumbnail,
	Text,
	Icon,
	Button,
	Toast
} from 'native-base';
import GridView from "react-native-super-grid";
import { FoodCart } from '../../helper';
import signedUrl from "../../SignedUrl";
import { updateWishlist } from './actions';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/CartAction';
import { setWishlist, setItem } from '../../actions/SingleProductAction';

const featureCartImg = require("../../../assets/home-page/featureCart.png");

const Dimensions = require('Dimensions');

const commonStyle = require("../../theme/variables/commonStyle");

class SingleProduct extends Component {

	constructor(props) {
		super(props);
		this.state = {
			item: [],
			name: '',
			similarItems: []
		};
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

	addToWishList = () => {

		const { item, isInWishList } = this.props.singleProductReducer;

		// to check or uncheck the heart Icon
		this.props.setWishlist(!isInWishList);

		FoodCart.addToWishList(item)
			.then((res) => {
				if (res === 0) {
					Toast.show({
						text: 'Added to Your Items!',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
				}
				if (res === 1) {
					Toast.show({
						text: 'Removed from Your Items',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
				}
			})
	}

	updateItemQty = (item, type) => {

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

		this.setState({ item });

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

		let data = this.state.similarItems;
		data[item.index].quantity = item.quantity;
		this.setState({ similarItems: data });
	}

	_productClick = (item) => {
		this.props.setItem(item);
	}

	render() {
		const { item, similarItems, isInWishList } = this.props.singleProductReducer;
		const heart = isInWishList ? 'ios-heart' : 'ios-heart-outline';
		const { cart } = this.props.cartReducer;
		const { address } = this.props.location;

		return (
			<Container>
				<Header style={{ backgroundColor: '#fff' }}>
					<Left>
						<Button iconLeft transparent
							onPress={() => {
								this.props.navigation.navigate("Location", { locAddress: address });
							}}
						>
							<Icon name="ios-pin" />
							<Text numberOfLines={1} style={{ fontSize: 14, color: 'black', marginLeft: 5, paddingTop: 5 }}>
								{address}</Text>
						</Button>
					</Left>
					<Right>
						<Button
							transparent
						>
							<View style={{ position: 'absolute', top: 6, right: 18, zIndex: 99 }}>
								<Text style={{ fontSize: 14, color: 'red' }}>{cart.length}</Text>
							</View>
							<Icon name="ios-basket" onPress={() => this.props.navigation.navigate("Cart")} />
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.productWrap}>
						<View>
							<Image source={{ uri: item.image }} style={{ height: 200, width: null, flex: 1 }} />
							<Icon
								name='arrow-back'
								onPress={() => this.props.navigation.goBack()}
								style={styles.backBtn}
							/>
							<Icon
								name={heart}
								onPress={this.addToWishList}
								style={styles.heartBtn}
							/>
						</View>
						<Text style={styles.title}>{item.name}</Text>
						<Text style={styles.price}>$ {item.price} /each</Text>
						<Text style={styles.desc}>{item.text}</Text>
						<View style={styles.productWrapFooter}>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<Button
									onPress={() => this.updateItemQty(item, 'minus')}
									transparent
									style={{ paddingRight: 5 }}
								>
									<Icon name="ios-remove-circle-outline" style={styles.quantityIcon} />
								</Button>
								<Text style={styles.quantityText}>
									{item.quantity}
								</Text>
								<Button
									onPress={() => this.updateItemQty(item, 'plus')}
									transparent
									style={{ paddingLeft: 5 }}
								>
									<Icon name="ios-add-circle-outline" style={styles.quantityIcon} />
								</Button>
							</View>
							<View style={{ flex: 1 }}>
								<Button
									success
									iconLeft
									style={{ backgroundColor: '#3AC824' }}
									onPress={() => this.addToCart(item)}
								>
									<Icon name="ios-cart" />
									<Text>Add to cart</Text>
								</Button>
							</View>
						</View>
					</View>

					<View style={styles.similarProductsWrap}>
						{similarItems.length !== 0 && (
							<View>
								<Text style={styles.similarTitle}>Similar Products</Text>
								<GridView
									itemDimension={10000}
									horizontal={true}
									items={similarItems}
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
												<Text style={styles.featuredPercent}>/lb</Text>
											</View>
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
													<Icon name="ios-remove-circle-outline" style={styles.quantityIcon} />
												</Button>
												<Text style={styles.quantityText}>
													{item.quantity}
												</Text>
												<Button
													onPress={() => this.updateQty(item, 'plus')}
													transparent
													style={{ paddingLeft: 5 }}
												>
													<Icon name="ios-add-circle-outline" style={styles.quantityIcon} />
												</Button>
											</View>
											<View style={styles.separator} />
											<Button
												transparent
												onPress={() => this.addToCart(item)}
											>
												<View style={styles.largeHeightSpaceView}>
													<Image style={{ height: 30 }} source={featureCartImg} />
													<Text style={styles.featuredCurrency}>Add to Cart</Text>
												</View>
											</Button>
										</View>
									)}
								/>
							</View>
						)}
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	productWrap: {
		backgroundColor: '#fff'
	},
	heartBtn: {
		position: 'absolute',
		top: 10,
		right: 10,
		color: '#2E83FB',
		backgroundColor: 'transparent'
	},
	backBtn: {
		position: 'absolute',
		top: 10,
		left: 10,
		color: '#2E83FB',
		backgroundColor: 'transparent'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 20,
		paddingBottom: 10
	},
	price: {
		color: '#2E83FB',
		fontWeight: 'bold',
		padding: 20,
		paddingTop: 0
	},
	desc: {
		fontWeight: '300',
		padding: 20,
		paddingTop: 0
	},
	productWrapFooter: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 20
	},
	quantityText: {
		padding: 10
	},
	quantityIcon: {
		color: '#579B3D'
	},
	featuredProductView: {
		width: (Dimensions.get("window").width - 30) / 2,
		height: 250,
		top: 0,
		left: 0,
		backgroundColor: commonStyle.badgeColor,
		flexDirection: "column",
		justifyContent: "center",
		borderRadius: 5,
		alignItems: "center"
	},
	featuredFoodText: {
		fontSize: commonStyle.noteM3FontSize,
		textAlign: "center"
	},
	featuredFoodImg: {
		height: 70,
		marginTop: 10,
		alignSelf: "center",
		width: 70
	},
	middleHeightSpaceView: {
		height: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	featuredCurrency: {
		fontSize: commonStyle.noteM3FontSize,
		color: "#0686fb"
	},
	featuredPercent: {
		fontSize: commonStyle.noteM1FontSize,
		width: 20,
		textAlign: "right"
	},
	featuredDetailText: {
		fontSize: commonStyle.noteS2FontSize,
		padding: 3,
		textAlign: "center"
	},
	largeHeightSpaceView: {
		height: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	separator: {
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#579B3D',
		height: 1,
		width: '100%'
	},
	similarTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 20,
		marginLeft: 20,
		marginBottom: 10
	}
});

function mapStateToProps(state) {
	return {
		singleProductReducer: state.singleProductReducer,
		wishlistReducer: state.wishlistReducer,
		cartReducer: state.cartReducer,
		location: state.loc,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setItem: (item) => dispatch(setItem(item)),
		updateCart: (item) => dispatch(updateCart(item)),
		setWishlist: (item) => dispatch(setWishlist(item))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleProduct)
