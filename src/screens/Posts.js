import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  ListItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';

export default class Posts extends React.Component {
  // static navigationOptions  = {
  //   headerStyle : {
  //     backgroundColor: 'blue'
  //   },
  //   tabBarIcon: ({tintColor}) => (
  //     <Icon name = 'home' style= {{color: tintColor}} size = {30}/>
  //   )
  // }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Elon Musk about Future of Spacex</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur quis odio leo. Fusce efficitur porttitor neque,
                  accumsan cursus neque malesuada nec. Etiam et efficitur nulla,
                  accumsan condimentum magna. Nunc mauris augue, dignissim ac
                  nisl eget, dapibus vulputate sapien.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>11 Jan 2019</Text>
            </CardItem>
          </Card>

          <ListItem itemDivider />

          <Card>
            <CardItem header>
              <Text>Elon Musk about Future of Tesla</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur quis odio leo. Fusce efficitur porttitor neque,
                  accumsan cursus neque malesuada nec. Etiam et efficitur nulla,
                  accumsan condimentum magna. Nunc mauris augue, dignissim ac
                  nisl eget, dapibus vulputate sapien
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>11 Jan 2019</Text>
            </CardItem>
          </Card>

          <ListItem itemDivider />

          <Card>
            <CardItem header>
              <Text>Elon Musk about Future of Tesla</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur quis odio leo. Fusce efficitur porttitor neque,
                  accumsan cursus neque malesuada nec. Etiam et efficitur nulla,
                  accumsan condimentum magna. Nunc mauris augue, dignissim ac
                  nisl eget, dapibus vulputate sapien
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>11 Jan 2019</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 10
  }
});
