import React, { Component } from "react";
import { View, Platform, FlatList, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Text,
  Button,
  Icon,
  Item, 
  Input,
  Spinner
} from "native-base";
import MapView from "react-native-maps"; 
import styles from "./styles";
import { connect } from 'react-redux'
import { updateAddress }  from "./action";

const commonStyle = require("../../theme/variables/commonStyle");
let placeholderVar = "Enter Place";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchedAddressList:[],
      region: {
        latitude: 22.7196,
        longitude: 75.8577,
        latitudeDelta: 0.0950,
        longitudeDelta: 0.0450,
        place: ''
      }
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }

  componentDidMount(){
    // to get address form the home and show its map
      const { params } = this.props.navigation.state;
      if(params){
        fetch('http://maps.google.com/maps/api/geocode/json?address='+params.locAddress, {
        method: 'GET',
        })
          .then((response) => response.json())
            .then((responseData) => {
            if(responseData.results) {
                responseData.results.map((address,key)=>{
                 this.setState({
                    region: {
		                latitude: address.geometry.location.lat,
		                longitude: address.geometry.location.lng,
		                place: address.formatted_address,
		                latitudeDelta: 0.01,
		                longitudeDelta: 0.0011
                    }
                })
                placeholderVar = address.formatted_address;
              })
            }
        })
      }
  }

  getAddress = (text) =>{
    // To fetch lang and lat from given address
    fetch('http://maps.google.com/maps/api/geocode/json?address='+text, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.results) {
        // console.log('first:',responseData.results);
        let data = [];
        responseData.results.map((address,key)=>{
          let item = {};
          item['place']= address.formatted_address;
          item['lat'] = address.geometry.location.lat;
          item['lng'] = address.geometry.location.lng;
          data.push(item);
        })
        this.setState({searchedAddressList : data});
      } else {
        alert("No results found!");
      } 
    })
  }

  getMapofAddress = (lat, lng, place) => {
    this.setState({
        region: {
          latitude: lat,
          longitude: lng,
          place: place,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0011
        }
    })
    this.setState({searchedAddressList : []});
    this.props.updateAddress(place);
	const { params } = this.props.navigation.state;
	if(params !== undefined) {
		if(params.testfun !== undefined) {
			params.testfun(place);
		}
	}
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <Spinner />
        </View>
      );
    } else {
      return (
        <Container style={styles.container}>
          <View style={{ flex: 0.8 }}>
            <Header searchBar iosBarStyle="default">
              <Item
                regular
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent"
                }}
              >
                <Icon
                  active
                  name="arrow-back"
                  style={{ color: commonStyle.contentTextColor }}
                  onPress={() => this.props.navigation.goBack()}
                />
                <Icon
                  active
                  name="search"
                  style={{ color: commonStyle.contentTextColor }}
                />
                <Input
                  style={{
                    color: commonStyle.darkTextColor,
                    alignSelf: "center",
                    marginTop: Platform.OS === "ios" ? 0 : 6
                  }}
                  placeholder={placeholderVar}
                  onChangeText={(text) => this.getAddress(text)}
                />
                <Icon
                  active
                  name="close-circle"
                  style={{ color: commonStyle.contentTextColor }}
                />
              </Item>
            </Header>
          </View>

          <View style={{maxHeight:200, zIndex:999}}>
            <FlatList
            style={{backgroundColor:'#fff', maxHeight:200}}
            data={this.state.searchedAddressList}
            extraData={this.state}
            renderItem={({item}) => (
            <TouchableOpacity
                  onPress={()=> this.getMapofAddress(item.lat, item.lng, item.place)} 
              >
                <View style={{paddingLeft:5, paddingRight:5, paddingTop: 10,paddingBottom: 10, borderBottomColor: '#DBDDDE', borderBottomWidth: 1,}}>
                  <Text
                  style={{marginLeft:15,fontSize:13, color:'#2D2D2E'}}>{item.place}
                </Text>
                </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              region={this.state.region}
            />
            <View style={styles.page}>
              <Button
                block
                style={styles.btn}
                onPress={() => {
                  // this.props.navigation.navigate("Home",{item: this.state.region.place});
                  this.props.navigation.goBack();
                }}
              >
                <Text>PICK THIS LOCATION</Text>
              </Button>
            </View>
          </View>
        </Container>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    location: state.location
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateAddress: (address) => dispatch(updateAddress(address))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)