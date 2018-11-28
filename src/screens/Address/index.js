import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Left, Icon, Button, Right, Body, Title } from 'native-base';

import signedUrl from "../../SignedUrl";

export default class Address extends Component {

	constructor(props) {
		super(props);
		this.state = {
			item: null
		};
	}

	componentDidMount() {

    const { params } = this.props.navigation.state;

    let filters = {
    	email: params.email
    };

    let linkToApi = signedUrl("customers", "GET", filters);

    let data = [];
    fetch(linkToApi, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseData) => {
    	console.log(responseData);
    	this.setState({item: responseData[0]});
    })
    .done();

	}

	_onNavigateBack = (item) => {
		this.setState({ item });
	}

	render() {

		let item = this.state.item;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
	          <Title>Address</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
          	<CardItem header>
          		<Text>Billing Address</Text>
          		{this.state.item !== null &&(
	          		<Button
	          			transparent
	          			onPress={() => this.props.navigation.navigate('ManageAddress', {
          					title: 'Billing Address',
          					item: this.state.item.billing,
          					userID: this.state.item.id,
          					type: 'billing',
          					navigateBack: this._onNavigateBack
          				})}
	          		>
	          			<Icon name="ios-color-wand-outline" />
	          		</Button>
	          	)}
          	</CardItem>
          	{this.state.item !== null &&(
	            <CardItem>
	            	<Body>
		            	<Text note>{item.billing.first_name} {item.billing.last_name}</Text>

									{item.billing.company !== '' &&(
										<Text note>{item.billing.company}</Text>
									)}

									{item.billing.address_1 !== '' &&(
										<Text note>{item.billing.address_1}</Text>
									)}

									{item.billing.address_2 !== '' &&(
										<Text note>{item.billing.address_2}</Text>
									)}

									{item.billing.city !== '' &&(
										<Text note>{item.billing.city}</Text>
									)}

									{item.billing.state !== '' &&(
										<Text note>{item.billing.state}</Text>
									)}

									{item.billing.postcode !== '' &&(
										<Text note>{item.billing.postcode}</Text>
									)}

									{item.billing.country !== '' &&(
										<Text note>{item.billing.country}</Text>
									)}

									{item.billing.email !== '' &&(
										<Text note>{item.billing.email}</Text>
									)}

									{item.billing.phone !== '' &&(
										<Text note>{item.billing.phone}</Text>
									)}

	            	</Body>
	            </CardItem>
        		)}
          </Card>
 
          <Card>
          	<CardItem header>
          		<Text>Shipping Address</Text>
          		{this.state.item !== null &&(
	          		<Button
	          			transparent
	          			onPress={() => this.props.navigation.navigate('ManageAddress', {
          					title: 'Shipping Address',
          					item: this.state.item.shipping,
          					userID: this.state.item.id,
          					type: 'shipping',
          					navigateBack: this._onNavigateBack
          				})}
	          		>
	          			<Icon name="ios-color-wand-outline" />
	          		</Button>
	          	)}
          	</CardItem>
          	{this.state.item !== null &&(
	            <CardItem>
	            	<Body>
		            	<Text note>{item.shipping.first_name} {item.shipping.last_name}</Text>

									{item.shipping.company !== '' &&(
										<Text note>{item.shipping.company}</Text>
									)}

									{item.shipping.address_1 !== '' &&(
										<Text note>{item.shipping.address_1}</Text>
									)}

									{item.shipping.address_2 !== '' &&(
										<Text note>{item.shipping.address_2}</Text>
									)}

									{item.shipping.city !== '' &&(
										<Text note>{item.shipping.city}</Text>
									)}

									{item.shipping.state !== '' &&(
										<Text note>{item.shipping.state}</Text>
									)}

									{item.shipping.postcode !== '' &&(
										<Text note>{item.shipping.postcode}</Text>
									)}

									{item.shipping.country !== '' &&(
										<Text note>{item.shipping.country}</Text>
									)}

									{item.shipping.email !== '' &&(
										<Text note>{item.shipping.email}</Text>
									)}

									{item.shipping.phone !== '' &&(
										<Text note>{item.shipping.phone}</Text>
									)}

	            	</Body>
	            </CardItem>
        		)}
          </Card>

        </Content>
      </Container>
    );
  }
}