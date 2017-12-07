import React, { Component } from 'react';
import {AppRegistry, Text, View, StyleSheet, KeyboardAvoidingView, Button, StatusBar, TextInput, TouchableHighlight, ListView} from 'react-native';

export default class Home_carpool extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2, r) => r1 !== r2});

        this.state = {
            carpoolData: ds
        }
    }

    fetchCarpoolList() {
        fetch("http://52.36.207.127:3000/carpool/list")
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

    pressBack() {
        this.props.navigator.pop();
    }

    renderRow(carpool, sectionId, rowId, highlightRow){
        return(
            <TouchableHighlight>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{carpool.departure_city} - {carpool.destination_city} : {carpool.time}</Text>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        flex: 1,

    },
    row: {
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        backgroundColor: 'gold',
        marginBottom:3
    },
    rowText: {
        flex:1
    }
});

AppRegistry.registerComponent('Home_carpool', () => Home_carpool);