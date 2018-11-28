import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity } from "react-native";
import { Container, Content, View, Button } from "native-base";
import styles from "./styles";
import color from "color";
import axios from "axios";
const commonStyle = require("../../theme/variables/commonStyle");

const main = require("../../../assets/loginpageimg.png");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textZipCode: null,
    }
  }
  stateZipCodeCheck(data) {
    const navigation = this.props.navigation;
    data !== null ?
      axios
        .get(`http://ziptasticapi.com/${data}`)
        .then(function (response) {
          if (response.data.error == undefined) {
            navigation.navigate("TabNavigation", { zipCountry: response.data.country, zipState: response.data.state, zipCity: response.data.city, zipCode: data })
          } else {
            alert(response.data.error)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      :
      alert('Please Fill Zip Code')
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./mainloginscrrenimg.png')}
              style={{ resizeMode: 'contain' }}
            />
          </View>
          <View style={styles.container}>
            {/* <Button
              block
              style={styles.searchField}
              onPress={() => navigation.navigate("TabNavigation")}
            >
              <Text style={{ color: '#808080', fontSize: 18, }}> Enter Delivery Zip Code </Text>
            </Button> */}
            <View style={{flexDirection:'row', width:'100%'}}>
              <TextInput
                style={styles.searchField}
                onChangeText={(textZipCode) => this.setState({ textZipCode })}
                value={this.state.textZipCode}
                maxLength={6}
                keyboardType='numeric'
                underlineColorAndroid={'transparent'}
                placeholder='Enter Delivery Zip Code'
              />

              {/* <Button
              style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 20 }}
              onPress={() => this.stateZipCodeCheck(this.state.textZipCode)}            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}> GO </Text>
            </Button> */}
              <TouchableOpacity
                style={styles.touchButtonGo}
                onPress={() => this.stateZipCodeCheck(this.state.textZipCode)}
              >
                <View>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' }}> OK </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <Text style={{ color: '#0087FB', textAlign: 'center', fontSize: 16, }}>Please provide your zip code and let us know your delivery area. </Text>
            </View>
          </View>


        </Content>
      </Container>
    );
  }
}

export default Login;
