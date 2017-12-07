import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AsyncStorage,
    AlertIOS,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Navigator
} from 'react-native';

import { Container, Content, Header, Body, Title, Card, CardItem, Left, Right, Thumbnail, logo, Image,  Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';

import OfferCarpool from './OfferCarpool'
import Setting from './Setting'
import Search from './Search'
import Home_carpool from './Home_carpool'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            screen: 'Home_carpool'
        };
    }

    switchs(){
        switch(this.state.screen) {
            case 'offercarpool':
                return (<OfferCarpool navigator={navigator} title="offercarpool"/>)
            case 'search':
                return (<Search navigator={navigator} title="Search"/>)
            case 'Setting':
                return (<Setting navigator={navigator} title="Setting"/>)
            case 'Home_carpool':
                return (<Home_carpool navigator={navigator} title="Home_carpool"/>)
        }
    }

    render() {
        return (

            <Container style={{backgroundColor:'white'}}>
                <Header style={{backgroundColor:'gold'}}>
                    <Body>
                    <Title>CarpoolGo</Title>
                    </Body>
                </Header>

                <Content>
                    {this.switchs()}
                </Content>

                <Footer style={{backgroundColor:'gold'}}>
                    <FooterTab>
                        <Button onPress={() => this.props.navigator.replace({id: 'home'})}>
                            <Icon active name='home' />
                            <Text>Home</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.push({id: 'search'})}>
                            <Icon name='ios-search' />
                            <Text>Search</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.push({id: 'offercarpool'})}>
                            <Icon name='ios-send' />
                            <Text>Post</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.push({id: 'Setting'})}>
                            <Icon name='ios-settings' />
                            <Text>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        );
    }

};



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },

    container_header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_footer: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonContainer:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:10,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    buttonText:{
        textAlign: 'center',
        color: '#34495e',
        fontWeight: '700'
    },

});

AppRegistry.registerComponent('Home', () => Home);
