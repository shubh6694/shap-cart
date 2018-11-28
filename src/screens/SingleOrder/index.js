import React, { Component } from 'react';
import { View } from 'react-native';
import { Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Body,
  Title,
  Left,
  Button
} from 'native-base';

export default class SingleOrder extends Component {

  componentDidMount() {
    
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Orders</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card
            dataArray = {params.lineItems}
            transparent
            renderRow = {(order) => {
              return(
                <Card>
                  <CardItem
                    header
                  >
                    <Left>
                      <Text style={{ fontSize: 14}}>Item No {order.id}</Text>
                    </Left>
                  </CardItem>
                  <CardItem style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Left>
                      <Body>
                        <Text style={{ fontSize: 14}}>{order.name}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Text note>Rs. {order.total}</Text>
                    </Right>
                  </CardItem> 
                </Card>
              )
            }}
          />
        </Content>
      </Container>
    );
  }
}

// let lineItems = [
//       {
//         "id": 315,
//         "name": "Woo Single #1",
//         "product_id": 93,
//         "variation_id": 0,
//         "quantity": 2,
//         "tax_class": "",
//         "subtotal": "6.00",
//         "subtotal_tax": "0.45",
//         "total": "6.00",
//         "total_tax": "0.45",
//         "taxes": [
//           {
//             "id": 75,
//             "total": "0.45",
//             "subtotal": "0.45"
//           }
//         ],
//         "meta_data": [],
//         "sku": "",
//         "price": 3
//       },
//       {
//         "id": 316,
//         "name": "Ship Your Idea &ndash; Color: Black, Size: M Test",
//         "product_id": 22,
//         "variation_id": 23,
//         "quantity": 1,
//         "tax_class": "",
//         "subtotal": "12.00",
//         "subtotal_tax": "0.90",
//         "total": "12.00",
//         "total_tax": "0.90",
//         "taxes": [
//           {
//             "id": 75,
//             "total": "0.9",
//             "subtotal": "0.9"
//           }
//         ],
//         "meta_data": [
//           {
//             "id": 2095,
//             "key": "pa_color",
//             "value": "black"
//           },
//           {
//             "id": 2096,
//             "key": "size",
//             "value": "M Test"
//           }
//         ],
//         "sku": "Bar3",
//         "price": 12
//       }
//     ]