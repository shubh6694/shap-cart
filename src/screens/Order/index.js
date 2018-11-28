import React, { Component } from "react";
import { Image, View, AsyncStorage, TouchableHighlight } from "react-native";
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
import styles from "./styles";
import CONFIG from "../../config";

const emptyImg = require("../../../assets/indian-food/food-15.jpg");

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInEmail: null,
      posts: null
    };
  }

  handleOnNavigateBack = (email) => {
    this.setState({
      loggedInEmail: email
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      if(user !== null) {
        // Set user
        user = JSON.parse(user);
        this.setState({'loggedInEmail': user.email});
      }
    });

    // Fetch posts
    fetch(CONFIG.wpUrl + 'posts/?_embed&categories=36', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      let posts = [];
      for(let i = 0; i < responseData.length; i++) {
        let item = responseData[i];
        posts.push(
            <Card style={{ padding: 10 }}>
              <CardItem cardBody>
                {item._embedded['wp:featuredmedia'] !== undefined && (
                  <Image source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}} style={styles.blogImage}/>
                )}
                {item._embedded['wp:featuredmedia'] === undefined && (
                  <Image source={require("../../../assets/indian-food/food-15.jpg")} style={styles.blogImage}/>
                )}
                <View style={styles.blogTitleView} >
                  <CardItem style={{ backgroundColor: 'transparent' }}>
                    <Left>
                      <Thumbnail source={require('../../../assets/profile_user.jpg')} />
                      <Body>
                        <Text style={{color: 'white'}}>{item.user.data.display_name}</Text>
                        <Text style={{color: 'white'}} note>{timeSince(new Date(item.date))} | {item.post_views} Views</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </View>
              </CardItem>
              <CardItem cardBody>
                <Body style={{ marginTop: 20, marginBottom: 20 }}>
                  <Text>{item.title.rendered}</Text>
                  <Text
                    style={styles.excerptText}
                  >
                    {item.excerpt.rendered.substr(0, 100)}
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                  <Button
                    primary
                    small
                    style={{ marginRight: 10 }}
                    onPress={() => this.props.navigation.navigate("SingleBlog", {item: item})}
                  >
                    <Text>Read More</Text>
                  </Button>
                  <Button
                    success
                    small
                    onPress={() => this.props.navigation.navigate("Browse")}
                  >
                    <Text>Shop Ingredients</Text>
                  </Button>
              </CardItem>
            </Card>
        );
      }
      this.setState({posts: posts});
    })
    .done();

  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Recipes & Ideas</Title>
          </Body>
          <Right />
        </Header>
        {this.state.loggedInEmail === null && (

          <Content padder style={{ backgroundColor: "#fff" }}>
            <View>
              <Image source={emptyImg} style={styles.img} />
              <Text style={styles.text}>Please login first!</Text>
            </View>

              <View style={{ padding: 30 }}>
                <Button block onPress={() => navigation.navigate("PhoneNumber", {onNavigateBack: this.handleOnNavigateBack})}>
                  <Text>Login</Text>
                </Button>
              </View>
          </Content>

        )}

        {this.state.loggedInEmail !== null && (
          <Content>
            {this.state.posts}
          </Content>
        )}
      </Container>
    );
  }
}

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

export default Order;
