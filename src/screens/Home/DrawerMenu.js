import React, { Component, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Share } from 'react-native';
import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import {
	Grid,
	Row,
	Col,
	Thumbnail
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class DrawerMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: ''
		};
	}

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	}

	componentDidMount() {
		AsyncStorage.getItem('user')
			.then((user) => {
				if (user !== null) {
					user = JSON.parse(user);
					this.setState({ email: user.email, name: user.name });
				}
			});
	}

	shareFunction() {
		let content_share = {
			message: 'Hello World',
			title: 'How are you?'
		};

		let options_share = {};

		Share.share(content_share, options_share);
	}

	render() {
		return (
			<ScrollView style={styles.menu}>
				<Grid style={{ marginTop: 12, marginLeft: 7, marginBottom: 20 }}>
					<Col style={{ width: 70, marginRight: 20 }}>
						<Row style={{}}>
							<View style={styles.menuUserImage} >
								<Thumbnail
									style={{ marginLeft: 3, marginTop: 2 }}
									source={require('./profile_user.jpg')}
								/>
							</View>
						</Row>
					</Col>
					<Col>
						<Row>
							<View style={styles.menuUserInfo} >
								<Text style={styles.menuUserName}>
									{this.state.name}
								</Text>
								<Text style={styles.menuUserEmail}>
									{this.state.email}
								</Text>
								{/*<Text style={styles.menuUserEmail}>
									(617)982-3702
				                </Text>*/}
							</View>
						</Row>
					</Col>
				</Grid>
				<View style={styles.menuLineView} />
				<View style={styles.middleHeightSpaceView} />
				<View style={styles.menuListItem}>
					<Icon name='ios-pin' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={this.navigateToScreen('Location')}>
						Change Delivery Address
			    	</Text>
				</View>
				<View style={styles.menuListItem}>
					<Icon name='ios-pricetags' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={this.navigateToScreen("History")}>
						Your Orders
            		</Text>
				</View>
				<View style={styles.menuListItem}>
					<Icon name='md-share' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={() => this.shareFunction()}>
						Refer a friend
          		  	</Text>
				</View>
				<View style={styles.menuListItem}>
					<Icon name='md-pricetags' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={this.navigateToScreen('Coupons')}>
						Coupons
            		</Text>
				</View>
				<View style={styles.menuListItem}>
					<Icon name='md-person' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={this.navigateToScreen('Account')}>
						Your Account
            		</Text>
				</View>
				<View style={styles.menuListItem}>
					<Icon name='ios-pin' size={18} style={styles.menuItemIcon} />
					<Text style={styles.menuItemName} onPress={this.navigateToScreen('Account')}>
						Community & Forums
            		</Text>
				</View>
			</ScrollView>
		);
	}
}

export default DrawerMenu;
