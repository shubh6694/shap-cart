import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
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
	Footer,
	Spinner,
	Toast
} from "native-base";
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import styles from "../Home/styles";
import Account from "../Account/";
import DrawMenu from "../Home/DrawerMenu";
import signedUrl from "../../SignedUrl";
import SearchComponent from "../Search/SearchComponent";
import CONFIG from '../../config';
import { connect } from 'react-redux';

const address = "2nd Main Road, Stage 2, BTM Layout";
const search = "Search restaurant, dishes...";

let perPage = CONFIG.perPage;
if (perPage % 2 !== 0) {
	perPage += 1;
}

class Browse extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoryItems: [],
			isLoading: true,
			page: 1,
			loadMore: true
		};
	}

	componentDidMount() {
		this._loadProducts();
	}

	_loadProducts = () => {

		this.setState({ isLoading: true });

		let page = this.state.page;
		this.setState({ page: page + 1 });

		let filters = {
			page: page,
			per_page: perPage
		};

		let linkToApi = signedUrl("products/categories", "GET", filters);
		const navigation = this.props.navigation;
		let data = [];
		fetch(linkToApi, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				let renderCategory = this.state.categoryItems;
				if (Object.keys(responseData).length === 0) {
					Toast.show({
						text: 'No more data to load!',
						position: 'bottom',
						buttonText: 'Okay',
						duration: 2000
					});
					this.setState({ loadMore: false });
				}
				for (let i = 0; i < Object.keys(responseData).length; i++) {
					if (i + 1 < responseData.length) {
						let item1 = responseData[i];
						let item2 = responseData[i + 1];
						let src1 = item1.image.src;
						let src2 = item2.image.src;
						i++;
						renderCategory.push(
							<Grid style={{ marginTop: 12, marginLeft: 7 }} key={item1.id}>
								<Col>
									<Row>
										<TouchableOpacity
											onPress={() => navigation.navigate("IndianFoodMenu", { categoryId: item1.id, categoryName: item1.name, categoriesData: responseData })}
										>
											<Image source={{ uri: src1 }} style={styles.foodGridImg} />
											<View style={styles.foodGridImgIconView}>

												<Text style={styles.foodGridText}>{item1.name}</Text>
											</View>
										</TouchableOpacity>
									</Row>
								</Col>
								<Col>
									<Row>
										<TouchableOpacity
											onPress={() => navigation.navigate("IndianFoodMenu", { categoryId: item2.id, categoryName: item2.name, categoriesData: responseData })}
										>
											<Image
												source={{ uri: src2 }}
												style={styles.foodGridImg}
											/>
											<View style={styles.foodGridImgIconView}>
												<Text style={styles.foodGridText}>{item2.name}</Text>
											</View>
										</TouchableOpacity>
									</Row>
								</Col>
							</Grid>
						);
					} else {
						item1 = responseData[i];
						let src = item1.image.src;
						renderCategory.push(
							<Grid style={{ marginTop: 12, marginLeft: 7 }} key={item1.id}>
								<Col>
									<Row>
										<TouchableOpacity
											onPress={() => navigation.navigate("IndianFoodMenu", { categoryId: item1.id, categoryName: item1.name, categoriesData: responseData })}
										>
											<Image source={{ uri: src }} style={styles.foodGridImg} />
											<View style={styles.foodGridImgIconView}>

												<Text style={styles.foodGridText}>{item1.name}</Text>
											</View>
										</TouchableOpacity>
									</Row>
								</Col>
							</Grid>
						);
					}
				}
				this.setState({ categoryItems: renderCategory });
			})
			.done(() => {
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { address } = this.props.location;
		const { cart } = this.props.cart;

		return (
			<Container>
				<Header style={styles.head}>
					<Left style={{ flex: 1 }}>
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
					<View>
						{this.state.categoryItems}
					</View>
					{this.state.isLoading && (
						<Spinner />
					)}
					{!this.state.isLoading && this.state.loadMore && (
						<Button
							full
							transparent
							onPress={this._loadProducts}
						>
							<Text>Load More</Text>
						</Button>
					)}
					<View style={{ paddingBottom: 10 }} />
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.loc,
		cart: state.cartReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

const ConnectedComp = connect(
	mapStateToProps,
	mapDispatchToProps
)(Browse)

// drawer stack
const DrawerStack = DrawerNavigator({
	screen1: { screen: ConnectedComp },
},
	{
		contentComponent: DrawMenu,
		drawerWidth: 300
	})

const DrawerNavigation = StackNavigator({
	DrawerStack: { screen: DrawerStack }
}, {
		headerMode: 'none'
	})
export default DrawerNavigation;