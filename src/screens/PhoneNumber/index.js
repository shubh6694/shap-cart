import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Title,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Item,
  Label,
  Input,
  Spinner
} from "native-base";
import styles from "./styles";
import config from "../../config";  

const commonStyle = require("../../theme/variables/commonStyle");

class PhoneNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loggedInEmail: null,
      loginScreen: true,
      forgotPasswordFlag: false,
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
        if( user !== null ) {
          this.setState({'loggedInEmail': user.email});
          const { params } = this.props.navigation.state;
          if(params !== undefined && params.onNavigateBack !== undefined) {
            params.onNavigateBack(user.email);
          }
        }
    }).done();
  }

  getUser = () => {

    const navigation = this.props.navigation;

    if(this.state.username.length < 3) {
      alert("Please enter valid username");
      return;
    }

    if(this.state.password.length < 5) {
      alert("Password should atleast 5 characters long!");
      return;
    }

    if(!validateEmail(this.state.username)) {
      alert("Invalid email");
      return;
    }

    this.setState({isLoading: true});

    let linkToApi = config.url + "food/v1/login";
    fetch(linkToApi, {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if(responseData.error === false) {
        let user = {
          email: this.state.username,
          id: responseData.user.id,
          name: responseData.user.display_name,
        };
        AsyncStorage.setItem('user', JSON.stringify(user));

        const { params } = this.props.navigation.state;
        if(params !== undefined && params.onNavigateBack !== undefined) {
          params.onNavigateBack(user.email);
        }
        navigation.goBack()
      } else {
        alert(responseData.error);
      }
      this.setState({isLoading: false});
    })
    .done();
  }

  forgotPassword = () => {

    if(this.state.username.length < 3) {
      alert("Please enter valid username");
      return;
    }

    this.setState({isLoading: true});

    let linkToApi = config.url + "food/v1/forgot_password";
    fetch(linkToApi, {
        method: 'POST',
        body: JSON.stringify({
          user_login: this.state.username,
        })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({isLoading: false});
      // alert(JSON.stringify(responseData));
      if(responseData.response === true) {
        alert("A link to reset password has been sent to your email!");
        this.setState({forgotPasswordFlag: false});
      } else {
        alert("Wrong username") 
      }
    })
    .done();    
  }

  registerUser = () => {

    const navigation = this.props.navigation;

    // Store and verify user data
    let userData = {
      email: this.state.username,
      first: this.state.first,
      last: this.state.last,
      password: this.state.password
    };

    let error = false;
    for(var item in userData) {
      if(userData[item] === undefined || userData[item].length === 0) {
        alert("Please enter " + item);
        return false;
        error = true;
      }
    }

    if(!validateEmail(userData.email)) {
      alert("Invalid email");
      return;
    }

    if(userData.password !== this.state.confirmPassword) {
      alert("Passwords did not match!");
      return;
    }

    if(error) {
      return
    }

    // Verification done! Send request to API
    this.setState({isLoading: true});

    let linkToApi = config.url + "food/v1/register";
    fetch(linkToApi, {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.userid !== undefined && responseData.userid > 0) {
        let user = {
          email: this.state.username
        };
        AsyncStorage.setItem('user', JSON.stringify(user));
        this.props.navigation.state.params.onNavigateBack(this.state.username);
        navigation.goBack()        
      } else {
        alert(JSON.stringify(responseData));
        this.setState({isLoading: false});
      }
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
            {this.state.loginScreen && (
              <Title>Login</Title>
            )}
            {!this.state.loginScreen && (
              <Title>Register</Title>
            )}
          </Body>
          <Right />
        </Header>

        {this.state.loginScreen && (
          <Content padder style={{ backgroundColor: "#fff" }}>

            {this.state.forgotPasswordFlag && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>Enter your email to get reset password link</Text>
              </View>
            )}

            {!this.state.forgotPasswordFlag && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>Please enter username & password</Text>
              </View>
            )}

            <View style={{ padding: 10 }}>
              <Item inlineLabel>
                <Input
                  onChangeText = {(text) => this.setState({username: text})}
                  placeholder = "Email"
                  keyboardType = "email-address"
                />
              </Item>
            </View>

            {!this.state.forgotPasswordFlag && (
              <View style={{ padding: 10 }}>
                <Item inlineLabel>
                  <Input
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder="Password"
                  />
                </Item>
              </View>
            )}

            {!this.state.forgotPasswordFlag && (
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <View style={{paddingBottom: 10}}>
                  <Button
                    full
                    onPress={this.getUser}
                    disabled={this.state.isLoading}
                  >
                    <Text>Login</Text>
                  </Button>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => this.setState({loginScreen: false})}
                    transparent
                  >
                    <Text>Click to register</Text>
                  </Button>
                  <Button
                    onPress={() => this.setState({forgotPasswordFlag: true})}
                    transparent
                  >
                    <Text>Forgot password</Text>
                  </Button>
                </View>
              </View>
            )}

            {this.state.forgotPasswordFlag && (
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Button
                  onPress={this.forgotPassword}
                  disabled={this.state.isLoading}
                >
                  <Text>Submit</Text>
                </Button>
              </View>
            )}

            {this.state.isLoading &&
              <Spinner />
            }
          </Content>
        )}

        {!this.state.loginScreen && (
          <Content padder style={{ backgroundColor: "#fff" }}>
            <View style={{ padding: 20 }}>
              <Item inlineLabel>
                <Input
                  onChangeText={(text) => this.setState({username: text})}
                  placeholder="Email"
                  keyboardType = "email-address"
                />
              </Item>
            </View>

            <View style={{ padding: 20 }}>
              <Item inlineLabel>
                <Input
                  onChangeText={(text) => this.setState({first: text})}
                  placeholder="First Name"
                />
              </Item>
            </View>

            <View style={{ padding: 20 }}>
              <Item inlineLabel>
                <Input
                  onChangeText={(text) => this.setState({last: text})}
                  placeholder="Last Name"
                />
              </Item>
            </View>
    
            <View style={{ padding: 20 }}>
              <Item inlineLabel>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholder="Password"
                />
              </Item>
            </View>
            <View style={{ padding: 20 }}>
              <Item inlineLabel>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({confirmPassword: text})}
                  placeholder="Confirm Password"
                />
              </Item>
            </View>

            <View style={{ flexDirection: 'row'}} >
              <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                <Button
                  onPress={this.registerUser}
                  disabled={this.state.isLoading}
                >
                  <Text>Register</Text>
                </Button>
              </View>

              <View style={{ paddingRight: 20 }}>
                <Button
                  onPress={() => this.setState({loginScreen: true})}
                  transparent
                >
                  <Text>Click to Login</Text>
                </Button>
              </View>
            </View>

            {this.state.isLoading &&
              <Spinner />
            }
          </Content>
        )}


      </Container>
    );
  }
}

function validateEmail(email) {
  var re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(email.toLowerCase());
}

export default PhoneNumber;
