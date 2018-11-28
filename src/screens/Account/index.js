import React, { Component } from "react";
import { View, Text, FlatList, AsyncStorage} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Content,
  Title,
  Body,
  Icon,
  Left,
  Button,
  Right,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
  Grid,
  Col,
} from "native-base";
import { itemsFetchData } from "../../actions";
import data from "./data.json";
import styles from "./styles";

const commonStyle = require("../../theme/variables/commonStyle");

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Type Address Here",
      loggedInEmail: null,
      loggedInName: null
    };
  }

  componentDidMount() {
    this.props.fetchData(data);
    AsyncStorage.getItem('user').then((user) => {
      if(user !== null) {
        user = JSON.parse(user);
        this.setState({'loggedInEmail': user.email, "loggedInName": user.name});
      };
    });
  }

  handleOnNavigateBack = (email) => {
    this.setState({
      loggedInEmail: email
    });
  }

  logout = () => {
    AsyncStorage.removeItem('user');
    const navigation = this.props.navigation;
    navigation.navigate("PhoneNumber", {onNavigateBack:  this.handleOnNavigateBack});
  }

  _renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <ListItem
          button
          onPress={() => this.props.navigation.navigate(item.destination, {email: this.state.loggedInEmail})}
        >
          <Left>
            <Icon
              active
              name={item.icon}
              style={{ color: commonStyle.contentTextColor }}
            />
            <Text
              style={{
                paddingLeft: 3,
                paddingTop: 3,
                color: commonStyle.darkTextColor
              }}
            >
              {item.text}
            </Text>
          </Left>
          <Right>
            <Icon active name="arrow-forward" style={{ fontSize: 20 }} />
          </Right>
        </ListItem>
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left> 
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Account</Title>
          </Body>
          <Right />
        </Header>
        {this.state.loggedInEmail === null && (
          <View style={{ padding: 30 }}>
            <Button block onPress={() => navigation.navigate("PhoneNumber", {onNavigateBack:  this.handleOnNavigateBack})}>
              <Text>Login</Text>
            </Button>
          </View>
        )}
        {this.state.loggedInEmail !== null && (
          <Content>
          <Card>
            <CardItem header>
              <Icon name="ios-paper"
                style={{fontSize: 15, }}
               />
              <Text style={{color:'black', fontSize: 14, marginLeft:-15, fontWeight:'500'}}>BASIC INFO</Text>
            </CardItem>
            <Grid>
            <Col size={2}>
            <Thumbnail
              style={{marginLeft:15, marginTop:13}}
              source={require('./profile_user.jpg')}
              />
            </Col>
            <Col size={7}>
              
              <CardItem>
                  <Text style={{fontSize: 10, marginBottom:-12, color:'#4A4A4A'}}>
                    {this.state.loggedInEmail}</Text>
                    <Icon style={{marginLeft:5, fontSize:12, color:"#A5CFFE", marginBottom:-12,}} name="md-open" />                  
              </CardItem>

              <CardItem>
                <Text style={styles.Text}>{this.state.loggedInName}</Text>
                <Icon style={{marginLeft:5, fontSize:12, color:"#A5CFFE", marginBottom:-12,}} name="md-open" />
              </CardItem>

              <CardItem>
                  {/*<Text style={{fontSize: 10, marginBottom:-12, color:'#4A4A4A'}}>(617)982-3702</Text>
                    <Icon style={{marginLeft:5, fontSize:12, color:"#A5CFFE", marginBottom:-12,}} name="md-open" />*/}
              </CardItem>  
                
             {/* <CardItem>
                             <Button 
                               style={{width: 130, height:28}}
                               onPress={()=> alert('hi')}>
                               <Text style={{color:'white', fontSize:10}}> Change Password </Text>
                             </Button>
                           </CardItem>*/}
              </Col>
              
          </Grid>
          </Card>

          {/*<Card>
                      
                      <CardItem header>
                        <Icon name="ios-pin" style={{fontSize: 17,}} />
                        <Text style={{color:'black', fontSize: 14, marginLeft:-15, fontWeight:'500'}}>MANAGE ADDRESSES</Text>
                      </CardItem>
          
                      <Grid>
                        <Col size={5}>
                        <CardItem style={{flexDirection:'column', marginTop:-7, marginLeft:-20,}}>
                            <View style={{textAlign:'left'}}>
                            <Text style={{fontSize:11, marginBottom:5, marginLeft:-90, color:'#4A4A4A'}}>KY-146</Text>
                            <Text style={{color:'#4A4A4A', fontSize:11, marginBottom:5, marginLeft:-90}}>Louisville, KY,</Text>
                            <Text style={{color:'#4A4A4A', fontSize:11, marginBottom:5, marginLeft:-90}}>KY-40222</Text>
                            </View>
                        </CardItem>
                        </Col>
          
                        <Col size={3}>
                          <Button
                            style={{width: 130, height:28, marginTop: 10}}
                            onPress={()=>alert('address')}
                          >
                          <Text style={{color:"white", fontSize:10, marginLeft:13}}>Update Address</Text>
                          </Button>
                        </Col>
          
                      </Grid>
                    </Card>
          
                    <Card style={{paddingBottom:40}}>
                      <CardItem header>
                        <Icon name="ios-card" style={{fontSize: 15,}} /> 
                        <Text style={{color:'black', fontSize: 14, marginLeft:-15, fontWeight:'500'}}>PAYMENTS</Text>
                      </CardItem>
                      <CardItem>
                        <Text style={{marginLeft:100, color:'#4A4A4A', fontSize: 12}}>Stripe Api info here</Text>
                      </CardItem>
                    </Card>
          
                    <Card style={{paddingBottom:40}}>
                      <CardItem header>
                        <Icon name="ios-pricetag-outline" style={{fontSize: 15,}} /> 
                        <Text style={{color:'black', fontSize: 14, marginLeft:-15, fontWeight:'500'}}>OFFERS</Text>
                      </CardItem>
                      <CardItem> 
                        <Text style={{marginLeft:100, color:'#4A4A4A', fontSize: 12}}>From E-Com Api</Text>
                      </CardItem>
                    </Card>
          
                    <Card>
                      <CardItem header>
                        <Icon name="ios-help-circle" style={{fontSize: 15,}} /> 
                        <Text style={{color:'black', fontSize: 14, marginLeft:-15, fontWeight:'500'}}>HELP ?</Text>
                      </CardItem>
                      <CardItem style={{flexDirection:'column'}}> 
                      
                    <View style={{textAlign:'left'}}>    
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Getting Started With Shopcart
                        </Text>
                      </View>
                        
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Who does the shopping
                        </Text>
                      </View>
                      
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Delivery hours
                        </Text>
                      </View>
                        
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Stores we deliver from
                        </Text>
                      </View>
                        
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Create your account
                        </Text>
                      </View>
          
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight: 17}}>{'\u2022'}</Text>
                        <Text style={{color: '#529CFC', paddingBottom:6}}
                          onPress={() => Linking.openURL('http://google.com')}>
                            Refer a friend and save
                        </Text>
                      </View>
                    </View>
                      </CardItem>
                    </Card>*/}

            <Button
              block
              primary
              onPress={this.logout}
              style={{margin: 12 }} >
              <Text
                style={{
                  color: 'white',
                  fontWeight: "bold"
                }}
              >
                LOGOUT
              </Text>
            </Button>
          </Content>
        )}
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.accountReducer.items,
  hasErrored: state.accountReducer.hasErrored,
  isLoading: state.accountReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(Account);
