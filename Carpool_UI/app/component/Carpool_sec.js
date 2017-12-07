import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {Button} from 'native-base'
export default class Carpool_sec extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.carpool._id,
            creator: this.props.carpool.creator,
            //name: this.props.carpool.poster_name,
            email: this.props.carpool.poster_email,
            departure: this.props.carpool.departure,
            departureCity: this.props.carpool.departure_city,
            destination: this.props.carpool.destination,
            destinationCity: this.props.carpool.destination_city,
            phone: this.props.carpool.poster_phone,
            time: this.props.carpool.time,
            remaining_seats: this.props.carpool.remaining_seats,
            vehicle_info: this.props.carpool.vehicle_info,
            showerro: '',
            seat_needed : ''
        }
    }

    async onReserve(){
        try {
            let response = await fetch('http://52.36.207.127:3000/transaction/RequestMatch',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        carpoolID: this.state.id,
                        seatsCount: this.state.seat_needed,
                    })
                });
            let res = await response.text();
            if (response.status == 200) {
                this.setState({showerro: 'All Set'});
            }else {
                if(response.status == 401){ // this is test
                    //this.props.navigator.push({
                    //    id:'enterpage'
                    //});
                }
                let error = res;
                throw error;
            }
        }catch(error) {
            this.setState({disabled:false});
            let formErrors = JSON.parse(error);
            this.setState({showerro: 'Error:' + formErrors.message});
        }
    }

    onPress(){
        this.props.navigator.pop();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Contact email: {this.state.email}</Text>
                <Text>Contain phone: {this.state.phone}</Text>
                <Text>From: {this.state.departure}, {this.state.departureCity}</Text>
                <Text>To: {this.state.destination}, {this.state.destinationCity}</Text>
                <Text>When: {this.state.time}</Text>
                <Text>What car: {this.state.vehicle_info}</Text>
                <Text>Remaining seats: {this.state.remaining_seats}</Text>
                <TextInput style={styles.input}
                    keyboardType='numeric'
                    placeholder='Number of Passengers'
                    onChangeText={(val) => this.setState({seat_needed:val})}
                    autoCorrect={false}/>
                <Button onPress={this.onReserve.bind(this)}>
                    <Text style={{color:'white'}}>Reserve</Text>
                </Button>
                <Text style={{color:'red'}}>{this.state.showerro}</Text>
                <Button onPress={this.onPress.bind(this)}>
                    <Text style={{color:'white'}}>Go Back</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: 'gold'
    },
    input:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:10,
        color: '#FFF',
        paddingHorizontal: 10
    },
});

AppRegistry.registerComponent('Carpool_sec', () => Carpool_sec);