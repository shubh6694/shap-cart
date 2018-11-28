import React, { Component } from "react";
import { Image, View, Dimensions, FlatList, TouchableHighlight } from "react-native";
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import {
	Content,
	Card,
	CardItem,
	Left,
	Right,
	Badge,
	Text,
	Icon,
	Button,
	Spinner,
	Toast,
	Body,
	Thumbnail
} from "native-base";
import styles from "./styles.js";
import signedUrl from "../../SignedUrl";
import { FoodCart } from '../../helper';
import { connect } from 'react-redux';
import { setItem } from "../../actions/SingleProductAction";
import { updateCart } from '../../actions/CartAction';


const deviceHeight = Dimensions.get("window").height;

class Breakfast extends Component {

	constructor(props) {
		super(props);
		this.state = {
			productsData: [],
			page: 1,
			isLoading: false,
			noData: false,
			loadMore: true
		};
	}

	componentDidMount() {
		this._loadProducts();
	}

	_loadProducts = () => {

		this.setState({ isLoading: true });

		let filters = Object;
		if (this.props.categoryId === null) {
			filters = {
				include: this.props.productIds.join()
			};
		} else {
			filters = {
				category: this.props.categoryId
			};
		}

		filters.page = this.state.page;
		this.setState({ page: filters.page + 1 });

		let linkToApi = signedUrl("products", "GET", filters);
		console.log(linkToApi);

		let data = this.state.productsData;
		fetch(linkToApi, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);

				if (filters.page === 1 && responseData.length === 0) {
					this.setState({ noData: true });
				}

				if (responseData.length === 0 && data.length > 0) {
					Toast.show({
						text: 'No more data to load!',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
					this.setState({ loadMore: false });
				}

				for (let i = 0; i < responseData.length; i++) {
					let item = responseData[i];
					let single = {
						id: item.id,
						image: item.images[0].src,
						name: item.name,
						text: item.description.replace(/<\/?[^>]+(>|$)/g, ""),
						price: item.price || 0,
						badgeDanger: false,
						badgeSuccess: true,
						quantity: 1,
						index: i,
						categories: item.categories
					}
					data.push(single);
				}
				console.log('data', data);
				this.setState({ productsData: data });
			})
			.done(() => {
				this.setState({ isLoading: false });
			});
	}

	updateQty = (item, type) => {

		if (item.isInCart) {
			alert("Already in cart! Please update quantity from cart");
		}

		switch (type) {

			case 'plus':
				item.quantity += 1;
				break;

			case 'minus':
				if (item.quantity === 1) {
					alert("Min quantiy is 1");
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

	renderListFooter = () => {
		return (
			<View style={{ paddingBottom: 10 }}>
				{(this.state.isLoading &&
					<Spinner />
				)}
				{!this.state.isLoading && this.state.loadMore && (
					<Button
						transparent
						onPress={() => this._loadProducts()}
						full
					>
						<Text style={{ padding: 5 }}>Load More</Text>
					</Button>
				)}
			</View>
		)
	}

	_productClick = (item) => {
		this.props.setItem(item);
		this.props.navigateToSingle();
	}

	_keyExtractor = (item, index) => item.id;

	render() {
		if (this.state.noData) {
			return (
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Image
						source={require("../../../assets/indian-food/food-15.jpg")}
						style={styles.img}
					/>
					<Text style={styles.amountText}>No data to show</Text>
				</View>
			);
		} else {
			return (
				<Content padder>
					<FlatList
						data={this.state.productsData}
						extraData={this.state}
						keyExtractor={this._keyExtractor}
						ListFooterComponent={this.renderListFooter}
						renderItem={({ item }) => (
							<Card>
								<CardItem>
									<Left>
										<Thumbnail
											source={{ uri: item.image }}
											square
										/>
									</Left>
									<Body>
										<Text
											style={{ marginTop: 15, marginLeft: -30 }}
											onPress={() => this._productClick(item)}
										>
											{item.name}
										</Text>
										<View style={{ flexDirection: 'row', marginLeft: -30 }}>
											<Text style={{ color: '#438FFB', marginTop: 10 }} numberOfLines={1}>${item.price}</Text>
											{/* <Text note style={{ marginTop: 10 }} > per fl oz</Text> */}
										</View>
									</Body>
									<Right>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between"
											}}
										>
											<Button
												transparent
												style={{ paddingRight: 0, paddingTop: 5 }}
												onPress={() => this.updateQty(item, 'minus')}
											>
												<Icon style={{ color: '#509736' }} name="ios-remove-circle-outline" />
											</Button>
											<Text style={styles.quantityText}>
												{item.quantity}
											</Text>
											<Button
												transparent
												style={{ paddingLeft: 5, paddingTop: 5 }}
												onPress={() => this.updateQty(item, 'plus')}
											>
												<Icon style={{ color: '#509736' }} name="ios-add-circle-outline" />
											</Button>
										</View>
										<TouchableHighlight
											// success
											// iconLeft
											onPress={() => this.addToCart(item)}
										>
										{/* <View style={{flexDirection: 'row'}}>
											<Icon name="ios-cart"/>
											<Text style={{ fontSize: 13, paddingRight: 5  }}>Add to cart</Text>
										</View> */}
											<View style={{ backgroundColor: '#3ac824', flexDirection: 'row', padding: 10, alignItems: 'center' }}>
												<Icon name="ios-cart" style={{ color: 'white', paddingLeft: 3, paddingRight: 8}} />
												<Text style={{ fontSize: 13, paddingRight: 5, textAlign: 'center', color: 'white', }}>Add to cart</Text>
											</View>
										</TouchableHighlight>
									</Right>
								</CardItem>
							</Card>
						)}
					/>
				</Content>
			);
		}

	}
}


function mapStateToProps(state) {
	return {
		item: state.singleProductReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setItem: (item) => dispatch(setItem(item)),
		updateCart: (item) => dispatch(updateCart(item))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Breakfast)