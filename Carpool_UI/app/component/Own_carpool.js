import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet} from 'react-native';

export default class Own_carpool extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: this.props.carpool.poster_email,
            departure: this.props.carpool.departure,
            departureCity: this.props.carpool.departure_city,
            destination: this.props.carpool.destination,
            destinationCity: this.props.carpool.destination_city,
            phone: this.props.carpool.poster_phone,
            time: this.props.carpool.time,
            remaining_seats: this.props.carpool.remaining_seats,
            vehicle_info: this.props.carpool.vehicle_info,
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
                <Button
                    color='#ecf0f1'
                    onPress={this.onPress.bind(this)}
                    title="Go Back"
                />
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
    }
});

AppRegistry.registerComponent('Own_carpool', () => Own_carpool);