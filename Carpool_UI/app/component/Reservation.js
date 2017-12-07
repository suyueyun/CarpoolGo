import React, { Component } from 'react';
import {AppRegistry, Text, View, StyleSheet, KeyboardAvoidingView, Button, StatusBar, TextInput, TouchableHighlight, ListView} from 'react-native';

export default class Reservation extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2, r) => r1 !== r2});

        this.state = {
            carpoolData: ds
        }
    }

    fetchCarpoolList() {
        fetch("http://52.36.207.127:3000/transaction/MyTransaction")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    carpoolData: this.state.carpoolData.cloneWithRows(responseJson)
                });
            });
    }

    componentDidMount() {
        this.fetchCarpoolList()
    }

    onPress(carpool){
        this.props.navigator.push({
            id: 'reserve_carpool',
            carpool: carpool
        });
    }

    pressBack() {
        this.props.navigator.pop();
    }

    renderRow(carpool, sectionId, rowId, highlightRow){
        return(
            <TouchableHighlight onPress={() => {this.onPress(carpool)}}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{carpool.offer.departure_city} - {carpool.offer.destination_city} : {carpool.offer.time}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.carpoolData}
                    renderRow={this.renderRow.bind(this)}
                />
                <Button
                    color='#ecf0f1'
                    onPress={this.pressBack.bind(this)}
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
    },
    row: {
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        backgroundColor: '#f4f4f4',
        marginBottom:3
    },
    rowText: {
        flex:1
    }
});

AppRegistry.registerComponent('Reservation', () => Reservation);