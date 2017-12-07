/**
 * Created by Andrew on 2017-03-28.
 */
import React, { Component } from 'react';
import {Title, Header, Thumbnail, ListItem, Body, Left, Right, Container, Content, Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';
import {AppRegistry, View, StyleSheet, Image, Navigator, KeyboardAvoidingView, StatusBar, TouchableOpacity,Keyboard} from 'react-native';

export default class SettingList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            userName: '',
            userPhone: '',
            userPass: '',
            userPrate: '',
            userOrate: ''
        }
    }

    postCarpool() {
        this.props.navigator.push({
            id: 'offercarpool'
        });
    }

    carpoolList() {
        this.props.navigator.push({
            id: 'list'
        });
    }

    updateProfile() {
        this.props.navigator.push({
            id: 'updateprofile'
        });
    }

    myOffer() {
        this.props.navigator.push({
            id: 'offer'
        });
    }

    myReserve() {
        this.props.navigator.push({
            id: 'reservation'
        });
    }

    async onLogout() {

        let response = await fetch('http://52.36.207.127:3000/logout',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

        if (response.status == 200) {
            this.props.navigator.resetTo({
                id: 'login'
            });
        }else {
            this.props.navigator.resetTo({
                id: 'login'
            });
        }

    }

    // componentDidMount() {
    //     this.fetchUserData();
    // }

    fetchUserData() {
        fetch('http://52.36.207.127:3000/profile')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userEmail: responseJson.email,
                    userName: responseJson.name,
                    userPhone: responseJson.phone,
                    userPass: responseJson.password,
                    userPrate: responseJson.passenger_rating,
                    userOrate: responseJson.offer_rating,
                });
            });
    }


    list() {
        return (
            <TouchableHighlight
                underlayColor='gray'
                onPress={this.carpoolList.bind(this)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>List</Text>
            </TouchableHighlight>
        );
    }

    post() {
        return (
            <TouchableHighlight
                underlayColor='gray'
                onPress={this.postCarpool.bind(this)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableHighlight>
        );
    }

    search() {
        return (
            <TouchableHighlight
                underlayColor='gray'
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableHighlight>
        );
    }

    render(){
        return(
            <Container style={{backgroundColor:'white'}}>
                <Header style={{backgroundColor:'gold'}}>
                    <Body>
                    <Title>Setting</Title>
                    </Body>
                </Header>

                <Content>

                    <ListItem icon onPress={this.updateProfile.bind(this)}>
                        <Left>
                            <Icon name="person" />
                        </Left>
                        <Body>
                        <Text>Profile</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>


                    <ListItem icon onPress={this.myOffer.bind(this)}>
                        <Left>
                            <Icon name="paper-plane" />
                        </Left>
                        <Body>
                        <Text>My Offer</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>

                    <ListItem icon onPress={this.myReserve.bind(this)}>
                        <Left>
                            <Icon name="paper" />
                        </Left>
                        <Body>
                        <Text>My Reservation</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>



                    <ListItem icon onPress={this.onLogout.bind(this)}>
                        <Left>
                            <Icon name="power" style={{color: 'red'}} />
                        </Left>
                        <Body>
                        <Text>Log Out</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>

                </Content>
                <Footer style={{backgroundColor:'gold'}}>
                    <FooterTab>
                        <Button onPress={() => this.props.navigator.replace({id: 'home'})}>
                            <Text>Home</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.push({id: 'search'})}>
                            <Text>Search</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.push({sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump, id: 'offercarpool'})}>
                            <Text>Post</Text>
                        </Button>
                        <Button onPress={() => this.props.navigator.replace({id: 'Setting'})}>
                            <Text>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


AppRegistry.registerComponent('Setting', () => SettingList);
