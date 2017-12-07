import React, { Component } from 'react';
import {AppRegistry,  View, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import {Title, Header, Thumbnail, ListItem, Body, Left, Right, Container, Content, Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';


export default class OfferCarpool extends Component {
    constructor(props){
        super(props);
        this.state= {
            departure: '',
            departure_city: '',
            destination: '',
            destination_city: '',
            time: '',
            showerro: '',
            vehicle_info: '',
            remaining_seats: '',
            feedback:'',
            useMap: false
        };

    }

    depart() {
        this.props.navigator.push({
            id: 'map'
        });
    }

    dest() {
        this.props.navigator.push({
            id: 'map'
        });
    }

    onUseMap() {
        this.setState({useMap: true});
    }

    redirect(){
        this.props.navigator.pop();
    }

    async onSubmit() {
        try {
            let error: '';
            switch(''){
                case this.state.departure:
                    error = 'departure cannot be empty';
                    throw error;
                case this.state.departure_city:
                    error = 'departure_city cannot be empty';
                    throw error;
                case this.state.destination:
                    error = 'destination cannot be empty';
                    throw error;
                case this.state.destination_city:
                    error = 'destination_city cannot be empty';
                    throw error;
                case this.state.time:
                    error = 'time cannot be empty';
                    throw error;
                case this.state.vehicle_info:
                    throw error = 'vehicle info is empty';
                case this.state.remaining_seats:
                    throw error = 'number of seats is empty'
            }
            this.setState({showerro:''})
            let response = await fetch('http://52.36.207.127:3000/carpool/newoffer',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        departure: this.state.departure,
                        departure_city: this.state.departure_city,
                        destination: this.state.destination,
                        destination_city: this.state.destination_city,
                        time: this.state.time,
                        vehicle_info: this.state.vehicle_info,
                        remaining_seats: this.state.remaining_seats,
                    })
                });
            let res = await response.text();
            if (response.status == 200) {
                let formErrors = JSON.parse(res);
                this.setState({feedback: formErrors.message});
                this.redirect();
            }else {
                error: 'connection fail'
                //let error = res;
                throw error;
            }
        }catch(error) {
            this.setState({showerro:error});
            //let formErrors = JSON.parse(error);
            //this.setState({showerro: 'Error:' + formErrors.message});
        }
    }
    render() {
        if(this.state.useMap === false)
        return (
            <View style={styles.container}>
                <Header style={{backgroundColor:'gold'}}>
                    <Left>
                        <Button transparent>
                            <Icon name='close' style={{fontSize:35}} onPress={() => this.props.navigator.pop()}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>New Post</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View style={styles.bContainer}>
                    <Button onPress={this.depart.bind(this)} style={{backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Use map for departure</Text>
                    </Button>
                    <Button onPress={this.dest.bind(this)} style={{backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Use map for destination</Text>
                    </Button>
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.BodyContainer}>
                        <TextInput
                            placeholder='Depart From(Street)'
                            onChangeText={(val) => this.setState({departure:val})}
                            returnKeyType='next'
                            autoCorrect={false}
                            style={styles.input}/>
                        <TextInput
                            placeholder='Departure City'
                            onChangeText={(val) => this.setState({departure_city:val})}
                            returnKeyType='next'
                            style={styles.input}/>
                        <TextInput
                            placeholder='Arrive At(Street)'
                            onChangeText={(val) => this.setState({destination:val})}
                            returnKeyType='next'
                            autoCorrect={false}
                            style={styles.input}/>
                        <TextInput
                            placeholder='Destination City'
                            onChangeText={(val) => this.setState({destination_city:val})}
                            returnKeyType='next'
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Date(mm/dd)'
                            onChangeText={(val) => this.setState({time:val})}
                            returnKeyType='next'
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Seats available'
                            onChangeText={(val) => this.setState({remaining_seats:val})}
                            returnKeyType='next'
                            keyboardType='numeric'
                            autoCorrect={false}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Vehicle information'
                            onChangeText={(val) => this.setState({vehicle_info:val})}
                            returnKeyType='next'
                            autoCorrect={false}
                            style={styles.input}
                        />
                        <Text style={{color:'red'}}>{this.state.showerro}</Text>
                        <Text style={{color:'green'}}>{this.state.feedback}</Text>
                </KeyboardAvoidingView>


                <Footer style={{backgroundColor:'red'}}>
                    <FooterTab>
                        <Button onPress={this.onSubmit.bind(this)}>
                            <Text style={{color:'white'}}>Submit</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    bContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    BodyContainer: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ffffff'

    },
    input:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:10,
        color: '#000000',
        paddingHorizontal: 10,
        backgroundColor: '#ffffff'
    },
    buttonContainer: {
        backgroundColor: 'limegreen',
        paddingVertical: 10
    },
    buttonText:{
        textAlign: 'center',
        color: 'darkslategray',
        fontWeight: '700'
    }
});

AppRegistry.registerComponent('OfferCarpool', () => OfferCarpool);
