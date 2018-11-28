import React, { Component } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import { Container, Header, Content, Icon , Left, Title, Right, Button, Body } from 'native-base';
export default class IconExample extends Component {
  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
          <Header style={{backgroundColor:'white'}}> 
            <Left>
              <Button
                transparent
                onPress = {() => this.props.navigation.goBack()}
              >
                <Icon name='arrow-back' />
              </Button>
            </Left>
          <Body>
            <Title></Title> 
          </Body>
          <Right />
        </Header>
        <Text style={{color:'black', fontSize:28, alignSelf:'center', fontWeight:"bold" }}>Thank You</Text>
        <Text style={{textAlign: 'center', marginTop: 20, color:'#6d6d6d'}}>
        Lorem Ipsum is simply dummy text of the printing industry.
        </Text>
        <Image
          source={require('./ThankYouimg.png')}
        />
        
        <View style={{alignSelf:'center'}}> 
          <Text style={{textAlign: 'center', marginBottom: 16, marginTop:16 ,fontSize: 20}}>Follow us on </Text>
          <View style={{flexDirection:'row'}}>
            
            <Icon style={styles.socialMediaIcons} name='logo-twitter' />
            <Icon style={styles.socialMediaIcons} name='logo-instagram' />
            <Icon style={styles.socialMediaIcons} name='logo-facebook' />
            <Icon style={styles.socialMediaIcons} name='logo-googleplus' />
          </View>
        </View>
      </Container>
    );
  }
}

const styles=StyleSheet.create({
  socialMediaIcons:{
    fontSize: 52,
    marginRight: 20,
    color:'#1e2029',
  },
})