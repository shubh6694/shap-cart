import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Icon, Item, Input, Grid, Row, Col, Left, Right } from "native-base";

import CONFIG from '../../config';
import signedUrl from "../../SignedUrl";

const commonStyle = require("../../theme/variables/commonStyle");
const address = "2nd Main Road, Stage 2, BTM Layout";
const search = "Search restaurant, dishes...";

export default class SearchComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			isLoading: false,
			showPopup: false,
			isSearch: true,
			productsData: []
		};
	}

	_performSearchClose = () => {
		this.setState({
			isSearch: true,
			productsData: [],
			showPopup: false,
			query: '',
		})
	}

	_performSearch = () => {

		let query = this.state.query;

		if (query.length < 3) {
			alert("Search query must have atleast 3 chars!");
			return;
		}

		if (this.state.isLoading) {
			return;
		}

		this.setState({ isLoading: true, showPopup: true, isSearch: false });

		fetch(CONFIG.searchUrl + query, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.results) {
					console.log(responseData);
					productIds = [];
					for (let i = 0; i < responseData.suggestions.length; i++) {
						productIds.push(responseData.suggestions[i].id);
					}
					this._loadProducts(productIds);
				} else {
					alert("No results found!");
					this.setState({
						isSearch: true,
						productsData: [],
						showPopup: false,
						query: '',
					});
				}

			})
			.done(() => {
				this.setState({ isLoading: false });
			});
	}

	_loadProducts = (productIds) => {


		let filters = Object;
		filters = {
			include: productIds.join()
		};

		let linkToApi = signedUrl("products", "GET", filters);

		let data = [];
		fetch(linkToApi, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {

				for (let i = 0; i < responseData.length; i++) {
					let item = responseData[i];
					let single = {
						id: item.id,
						image: item.images[0].src,
						name: item.name,
						price: item.price || 0,
						badgeDanger: false,
						badgeSuccess: true,
						quantity: 1,
						index: i,
						categories: item.categories
					}
					data.push(single);
				}
				this.setState({ productsData: data });
			})
			.done(() => {
				this.setState({ isLoading: false });
			});
	}

	handleQuery = (text) => {
		this.setState({ query: text });
		if (text.length === 0) {
			this.setState({ productsData: [] });
		}
	}

	render() {
		let styles = this.props.styles;
		const { productsData } = this.state;
		const navigation = this.props.navigation;
		return (
			<View>
				<View style={styles.subHeaderContentView}>
					<View style={styles.subHeaderInnerContentView}>
						<Icon name='ios-menu' style={styles.menuIcon} size={20} onPress={() => this.props.navigation.navigate("DrawerOpen")} />
						<Item borderType="regular" style={styles.restaurantSearchInput}>
							<Input
								style={{
									color: commonStyle.brandPrimary,
									alignSelf: "center"
								}}
								placeholder={search}
								placeholderTextColor={commonStyle.lightTextColor}
								onChangeText={(text) => this.handleQuery(text)}
								autoFocus={true}
								value={this.state.query}
							/>
						</Item>
						{this.state.isSearch ?
							<Icon
								active
								name="search"
								style={{ color: commonStyle.brandPrimary, paddingRight: 10, paddingLeft: 10, height: 40 }}
								onPress={this._performSearch}
							/> :
							<Icon
								active
								name="ios-close"
								style={{ color: commonStyle.brandPrimary, paddingRight: 10, paddingLeft: 10, height: 40 }}
								onPress={this._performSearchClose}
							/>
						}
					</View>

				</View>
				{this.state.showPopup && (
					<View style={{ backgroundColor: '#F4F8F9', top: 50, zIndex: 999, position: 'absolute', maxHeight: 150, width: "100%" }}>
						{this.state.isLoading ? <ActivityIndicator animating={this.state.isLoading} size="large" color="skyblue" /> : null}
						<ScrollView>
							<Grid style={{ paddingTop: 15, paddingBottom: 15, }}>
								{
									productsData.map((item, index) => (
										<Row key={index} style={{ paddingTop: 15, borderBottomColor: '#DBDDDE', borderBottomWidth: 1, }}>
											<Col size={80}>
												<TouchableOpacity onPress={() => navigation.navigate('SinglePro', { item: item })} >
													<Text style={{ marginLeft: 15, fontSize: 17, color: '#2D2D2E' }}>{item.name}</Text>
												</TouchableOpacity>
											</Col>
											<Col size={20}>
												<TouchableOpacity onPress={() => navigation.navigate('SinglePro', { item: item })} >
													<Text style={{ flexDirection: 'row', alignItem: 'flex-end', }}>
														<Text style={{ color: '#4B95FB' }}>${item.price}</Text>
														<Text style={{ color: 'gray', fontSize: 12 }}> / lbs</Text>
													</Text>
												</TouchableOpacity>
											</Col>
										</Row>
									))
								}
							</Grid>
						</ScrollView>
					</View>
				)}
			</View>
		);
	}
}
