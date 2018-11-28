import React, { Component } from 'react';
import { View, WebView, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Text, Right, Button, Title, Left, Icon, Body } from 'native-base';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/CartAction';

class MyWebView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			url: ''
		};
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({ url: params.url });
		console.log('url', params.url);
	}

	onMessage = event => {
		// let responseObj = JSON.parse(event.nativeEvent.data);
		// alert(responseObj)
		this.props.updateCart({});
		AsyncStorage.removeItem('cartData');
		this.props.navigation.navigate('Home');
	}
	backButtonClickFinal() {
		this.props.updateCart({});
		AsyncStorage.removeItem('cartData');
		this.props.navigation.navigate('Home');
	}
	backButtonClick() {
		Alert.alert(
			'Alert',
			'Are you sure you want to quit ? All cart data and session will destroyed.',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'OK', onPress: () => this.backButtonClickFinal() },
			],
			{ cancelable: false }
		)
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, backgroundColor: '#fff' }}>
					<Header style={{ height: '100%' }}>
						<Left>
							<Button transparent onPress={
								() => this.backButtonClick()
							}>
								<Icon active name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>Review Order</Title>
						</Body>
						<Right />
					</Header>
				</View>
				<View style={{ flex: 9 }}>
					<WebView
						source={{ uri: this.state.url }}
						style={{ flex: 1 }}
						onMessage={this.onMessage}
					/>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateCart: (item) => dispatch(updateCart(item))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyWebView);