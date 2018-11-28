import React, { Component } from 'react';

import {
	Text,
	TextInput,
	View,
	Alert,
	StyleSheet,
	Image,
	ScrollView,
	Linking,
	TouchableHighlight
} from 'react-native';

import {
	Container,
	Header,
	Left,
	Right,
	Icon,
	Body,
	Button,
	Title
} from 'native-base';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

var detailsTextFontSize = (window.width >= 375 ? 16 : 15 );

import { StackNavigator } from 'react-navigation';

export default class FeedbackSupport extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Feedback & Support'
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			navigate: this.props.navigation,
			navigateParams: this.props.navigation.state.params
		};

		this._goToURL = this._goToURL.bind(this);
	}

	_goToURL(linkUrl){
		alert(linkUrl)
		Linking.canOpenURL(linkUrl).then(supported => {
			if (supported) {
				Linking.openURL(linkUrl);
			} else {
				console.log('Don\'t know how to open URI: ' + linkUrl);
			}
		});
	}

	/**
	 * Find footer dimensions
	 */
	_footerDimesions(layout){	
		const {x, y, width, height} = layout;
		this.setState({ footerHeight: height + 10 });
	}

   	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon active name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Account</Title>
					</Body>
					<Right />
				</Header>
				<View style={styles.container}>
					<ScrollView style={styles.scrollview}>
						<View>
							<Text style={[styles.descriptiveText, {marginTop: 5}]}>
								Thank you for using the Food Ordering app. If you are experiencing issues with the app or have questions or feedback, please let us know. Please send email to: <Text style={styles.boldText}>foodordering@domain.com</Text>
							</Text>
						</View>

						<View>
							<Text style={styles.branchHead}>{'\n'}Contact Information</Text>
							<Text style={styles.descriptiveText}>If you need assistance or information on how to purchase one of our products, please contact any one of our locations.</Text>
						</View>

						<View>
							<Text style={styles.branchHead}>{'\n'}Texas Branch</Text>
							<View style={[styles.row, styles.addrRow]}>
								<Image style={[styles.branchIcons, styles.branchAddr]} source={require('../../../assets/Location.png')} resizeMode='contain' />
								<Text style={[styles.branchIconsDetails, styles.branchIconsDetailsText]}>1234 Some street drive{'\n'}Some Colony, TX 1452</Text>
							</View>
							<View style={styles.row}>
								<Image style={[styles.branchIcons, styles.branchPhone]} source={require('../../../assets/Call.png')} resizeMode='contain' />
								<TouchableHighlight 
								onPress={ () => this._goToURL('tel:999-999-1234') }
								style={styles.branchIconsDetails} underlayColor='transparent'><Text style={styles.branchIconsDetailsText}>214-381-8485</Text></TouchableHighlight>
							</View>
							<View style={styles.row}>
								<Image style={[styles.branchIcons, styles.branchEmail]} source={require('../../../assets/Email.png')} resizeMode='contain' />
								<TouchableHighlight 
								onPress={ () => this._goToURL('mailto:abc@domain.com') }
								style={styles.branchIconsDetails} underlayColor='transparent'><Text style={styles.branchIconsDetailsText}>abc@domain.com</Text></TouchableHighlight>
							</View>
						</View>

						<View>
							<Text style={styles.branchHead}>{'\n'}Oklahoma Branch</Text>
							<View style={[styles.row, styles.addrRow]}>
								<Image style={[styles.branchIcons, styles.branchAddr]} source={require('../../../assets/Location.png')} resizeMode='contain' />
								<Text style={[styles.branchIconsDetails, styles.branchIconsDetailsText]}>1234 M. Jangov{'\n'}Droken Karrow, TX 12345</Text>
							</View>
							<View style={styles.row}>
								<Image style={[styles.branchIcons, styles.branchPhone]} source={require('../../../assets/Call.png')} resizeMode='contain' />
								<TouchableHighlight 
								onPress={ () => this._goToURL('tel:999-123-1231') }
								style={styles.branchIconsDetails} underlayColor='transparent'><Text style={styles.branchIconsDetailsText}>999-123-1231</Text></TouchableHighlight>
							</View>
							<View style={styles.row}>
								<Image style={[styles.branchIcons, styles.branchEmail]} source={require('../../../assets/Email.png')} resizeMode='contain' />
								<TouchableHighlight 
								onPress={ () => this._goToURL('mailto:some@domain.com') }
								style={styles.branchIconsDetails} underlayColor='transparent'><Text style={styles.branchIconsDetailsText}>some@domain.com</Text></TouchableHighlight>
							</View>
						</View>

						<View><Text>&nbsp;</Text></View>
					</ScrollView>
				</View>
			</Container>
		);
   	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
      	backgroundColor: '#ffffff'
	},
	scrollview: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15
	},
	footer: {
		width: window.width,
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#ffffff'
   	},
	boldText: {
		fontWeight: 'bold'
	},
	descriptiveText: {
		fontSize: detailsTextFontSize
	},
	row: {
		height: 24,
		flexDirection: 'row'
	},
	addrRow: {
		height: 38
	},
	branchHead: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 5
	},
	branchIcons: {
		width: 18,
		height: 18,
		marginRight: 8
	},
	branchIconsDetails: {
		
	},
	branchIconsDetailsText: {
		fontSize: detailsTextFontSize
	},
	branchAddr: {
		
	},
	branchPhone: {

	},
	branchEmail: {

	}
});