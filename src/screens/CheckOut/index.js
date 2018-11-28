import React, { Component } from 'react';
import { Image, View, Text, Dimensions, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { Container, Header, Content, Item, Input, Icon, Button, Right, Switch, Footer} from 'native-base';
export default class IconTextboxExample extends Component {
  render() {
    const flag = false;
    return (
      <Container style={{marginTop:20, backgroundColor:'white'}}>
        <Image
          source={require('./checkoutIMG.png')}
        />
        <Content>
          <Item>
            <Icon active name='ios-mail-outline' style={styles.Icon}/>
            <Text style={styles.Text}>Email</Text>
            <Input
              style={styles.inputText}
              placeholderTextColor='gray' 
              placeholder='you@email.com'/>
          </Item>

          <Item>
            <Icon active name='md-card' style={styles.Icon}/>
            <Text style={styles.Text}>Card</Text>
            <Input
              style={styles.inputText}
              placeholderTextColor='gray' 
              placeholder='you@email.com'/>
          </Item>

          <View style={{flexDirection: 'row'}}>
            <Item style={{flex:1}}>
              <Icon active name='ios-calendar-outline' style={styles.Icon}/>
              <Text style={styles.Text}>Expiry</Text>
              <Input
                style={styles.inputText}
                placeholderTextColor='gray' 
                placeholder='MM/YY'/>
            </Item>

            <Item style={{flex:1}} >
              <Icon active name='ios-lock-outline' style={styles.Icon}/>
              <Text style={styles.Text}>CVC</Text>
              <Input
                style={styles.inputText}
                placeholderTextColor='gray' 
                placeholder='123'/>
            </Item>
          </View>

            <Item>
              <Icon active name='ios-pin' style={styles.Icon}/>
              <Text style={styles.Text}>ZIP</Text>
              <Input
                style={styles.inputText}
                placeholderTextColor='gray' 
                placeholder='02101'/>
            </Item>

            <Item style={{height:52}}>
              <Icon active name='ios-person' style={styles.Icon}/>
              <Text style={styles.Text}>Remember me</Text>
              <Right>
                 <Switch
                  value={true} />
              </Right>
            </Item>
        </Content>
        <View style={{position:'absolute', bottom: 0, width: '100%' }}>
          {flag && (
            <Button
                style={{height:72, backgroundColor:'#3ac824'}}
                full
                onPress={()=>this.props.navigation.navigate('ThankYou')} >
                <Icon name="md-checkmark-circle-outline" 
                  style={{fontSize: 30}}/>
              </Button>
          )}
          {!flag && (
            <Button
                style={{height:72, backgroundColor:'#2c81fb'}}
                full
                iconLeft
                onPress={()=>this.props.navigation.navigate('ThankYou')} >
                <Icon name="md-checkmark-circle-outline" 
                  style={{fontSize: 30}}/>
                <Text style={{color:'white', fontWeight:'bold'}}>Pay $99</Text>
              </Button>
          )}
          </View>
      </Container>
    );
  }
}

const styles= StyleSheet.create({
  inputText:{
    fontSize:13,
  },
  Text:{
    marginRight: 30, 
    fontWeight:'bold',
  },
  Icon:{
    color:'#2c81fb',
    marginLeft:15,
    fontSize:18,
    marginRight:5,
  }
});