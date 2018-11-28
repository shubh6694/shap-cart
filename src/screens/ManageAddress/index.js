import React, { Component } from 'react';
import { Container, Header, Content, Text, Left, Icon, Button, Right, Body, Title, Label, Item, Form, Input, Toast } from 'native-base';
import signedUrl from "../../SignedUrl";

export default class ManageAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {

    const { params } = this.props.navigation.state;

    this.setState({item: params.item});
    this.setState({title: params.title});
    this.setState({userID: params.userID});
    this.setState({type: params.type})

  }

  _updateAddress = (key, value) => {

    let item = this.state.item;
    item[key] = value
    this.setState({ item });

  }

  _saveAddress = () => {

    let linkToApi = signedUrl("customers/" + this.state.userID, "PUT");

    let data = {};

    if(this.state.type === 'billing' ) {
      data.billing = this.state.item;
    } else {
      data.shipping = this.state.item;
    }

    console.log(linkToApi);
    console.log(JSON.stringify(data));
    return;

    fetch(linkToApi, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      const { params } = this.props.navigation.state;
      params.navigateBack(responseData);
      Toast.show({
        text: 'Address Saved!',
        position: 'bottom',
        buttonText: 'Okay'
      })
    })
    .done();
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
            {this.state.title !== null && (
              <Title>{this.state.title}</Title>
            )}
          </Body>
          <Right />
        </Header>
        {this.state.item !== null &&(
          <Content>
            <Form>

              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('first_name', text)}
                  value = {this.state.item.first_name}
                />
              </Item>

              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('last_name', text)}
                  value = {this.state.item.last_name}
                />
              </Item>

              <Item floatingLabel>
                <Label>Company</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('company', text)}
                  value = {this.state.item.company}
                />
              </Item>

              <Item floatingLabel>
                <Label>Address 1</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('address_1', text)}
                  value = {this.state.item.address_1}
                />
              </Item>

              <Item floatingLabel>
                <Label>Address 2</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('address_2', text)}
                  value = {this.state.item.address_2}
                />
              </Item>

              <Item floatingLabel>
                <Label>City</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('city', text)}
                  value = {this.state.item.city}
                />
              </Item>

              <Item floatingLabel>
                <Label>State</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('state', text)}
                  value = {this.state.item.state}
                />
              </Item>

              <Item floatingLabel>
                <Label>Postcode</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('postcode', text)}
                  value = {this.state.item.postcode}
                />
              </Item>

              <Item floatingLabel>
                <Label>Country</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('country', text)}
                  value = {this.state.item.country}
                />
              </Item>

              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('email', text)}
                  value = {this.state.item.email}
                />
              </Item>

              <Item floatingLabel>
                <Label>Phone</Label>
                <Input
                  onChangeText = {(text) => this._updateAddress('phone', text)}
                  value = {this.state.item.phone}
                />
              </Item>

              <Button
                full
                onPress={() => this._saveAddress()}
              >
                <Text>Save</Text>
              </Button>

            </Form>
          </Content>
        )}
      </Container>
    );
  }
}