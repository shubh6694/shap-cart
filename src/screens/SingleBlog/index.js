import React, { Component } from "react";
import { Image, View, AsyncStorage, TouchableHighlight, StyleSheet, StatusBar, Share } from "react-native";
import {
  Container,
  Header,
  Content,
  Title,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import HTMLView from 'react-native-htmlview';

import CONFIG from "../../config";

export default class SingleBlog extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	postViews: ''
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    let item = params.item;
    let linkToApi = CONFIG.url + "food/v1/post_views";
    fetch(linkToApi, {
        method: 'POST',
        body: JSON.stringify({
          id: item.id
        })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({postViews: responseData.post_views});
    })
  }

  _share = () => {
  	let content = {
  		title: 'Food Ordering App',
  		message: 'Please try this exciting App'
  	};
  	let options = {};

  	Share.share(content, options)
  }

  render() {
    const navigation = this.props.navigation;
    const { params } = this.props.navigation.state;
    let item = params.item;
    console.log(item);
    return (
		<Container style={styles.container}>
			<StatusBar barStyle = "dark-content" hidden = {false}/>
	        <Content>
	        	<View style={styles.singleTop}>
	                {item._embedded['wp:featuredmedia'] !== undefined && (
	                  <Image source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}} style={styles.blogImage}/>
	                )}
	                {item._embedded['wp:featuredmedia'] === undefined && (
	                  <Image source={require("../../../assets/indian-food/food-15.jpg")} style={styles.blogImage}/>
	                )}

					<View style={styles.singleHeader}>
						<View style={{flex: 1, alignItems: 'flex-start'}}>
							<Icon active name="arrow-back" onPress={() => navigation.goBack()} style={styles.icons}/>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Icon active name="ios-share-outline" md="md-share" onPress={() => this._share()} style={styles.icons}/>
						</View>
					</View>
					<CardItem style={{ backgroundColor: 'transparent' }}>
						<Left>
							<Thumbnail source={require('../../../assets/profile_user.jpg')} />
						<Body>
							<Text style={{color: '#000'}}>{item.user.data.display_name}</Text>
							<Text style={{color: '#000'}} note>{timeSince(new Date(item.date))} | {this.state.postViews} Views</Text>
						</Body>
						</Left>
					</CardItem>
				</View>
				<Card cardBody>
					<CardItem header>
						<Text>{item.title.rendered}</Text>
					</CardItem>
					<CardItem>
						<Body>
							<HTMLView
								value={item.content.rendered}
								stylesheet={styles}
							/>
							<View style={{flexDirection: 'row'}}>
				                <Button
				                    primary
				                    small
				                    style={{ marginRight: 10 }}
				                >
				                    <Text>Comment</Text>
				                </Button>
				                <Button
				                    success
				                    small
				                    onPress={() => this.props.navigation.navigate("Browse")}
				                >
				                    <Text>Shop Ingredients</Text>
				                </Button>
							</View>
						</Body>
					</CardItem>
				</Card>
	        </Content>
		</Container>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		// paddingTop: 20
	},
	singleTop: {
		position: 'relative',
	},
	singleHeader: {
		position: 'absolute',
		top: 0,
		left: 0,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'transparent',
		width: '100%',
		flexDirection: 'row'
	},
	icons: {
		color: '#fff'
	},
	blogImage: {
	    height: 200,
	    width: null,
	    flex: 1
    },
    p: {
    	color: '#c2c2c6'
    }
});

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}