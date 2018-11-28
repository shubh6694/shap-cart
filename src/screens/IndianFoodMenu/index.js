import React, { Component } from "react";
import { Image, View, TouchableOpacity, AsyncStorage } from "react-native";
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
	ScrollableTab,
	Badge,
	Text,
} from "native-base";
import Breakfast from "./breakfast.js";
import Starter from "./starter.js";
import MainCourse from "./mainCourse.js";
import Desserts from "./desserts.js";
import { connect } from 'react-redux';

class IndianFoodMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			params: null,
			renderTabs: [],
		};
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({ params: params });

		// Load all the tabs
		let renderTabs = [];

		// Let the first tab be the one user selected
		let catId = params.categoryId;
		if (catId === undefined) {
			catId = null;
		}

		let prodIds = params.productIds
		if (prodIds === undefined) {
			prodIds = null
		}

		const navigation = this.props.navigation;
		renderTabs.push(
			<Tab heading={params.categoryName} key={catId}>
				<Breakfast categoryId={catId} productIds={prodIds} navigateToSingle={this.navigateToSingle}  />
			</Tab>
		);

		// Load all the other tabs
		if (catId !== null) {
			for (let i = 0; i < Object.keys(params.categoriesData).length; i++) {
				let item = params.categoriesData[i];

				// We've already listed this as the first tab
				if (item.id === params.categoryId) {
					continue;
				}

				renderTabs.push(
					<Tab heading={item.name} key={item.id}>
						<Breakfast categoryId={item.id} navigateToSingle={this.navigateToSingle} key={item.id * i} />
					</Tab>
				);
			}
		}
		this.setState({ renderTabs: renderTabs });
	}

	navigateToSingle = () => {
		this.props.navigation.navigate('SingleProduct')
	}

	render() {
		const { cart } = this.props.cart;
		return (
			<Container>
				<Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Category</Title>
					</Body>
					<Right style={{ marginRight: -10 }}>
						<Button
							style={{ marginRight: -25 }}
							transparent onPress={() => navigation.navigate('Home')}>
							<Icon name="search" />
						</Button>
						<Button transparent onPress={() => this.props.navigation.navigate("Cart")}>
							<View style={{ position: 'absolute', top: 5, right: 10, zIndex: 99 }}>
								<Text style={{ fontSize: 14, color: 'red' }}>{cart.length}</Text>
							</View>
							<Icon name="ios-basket" />
						</Button>
					</Right>
				</Header>

				<Tabs style={{backgroundColor:'#E7F6FB'}} renderTabBar={() => <ScrollableTab />}>
					{this.state.renderTabs}
				</Tabs>
			</Container>
		);
	}
}

function mapStateToProps (state) {
	return {
		cart: state.cartReducer
	};
}

export default connect(
	mapStateToProps
)(IndianFoodMenu);