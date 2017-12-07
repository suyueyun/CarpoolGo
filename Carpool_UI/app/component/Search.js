import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, TouchableHighlight, ListView, TouchableOpacity} from 'react-native';
import {Title, Header, Thumbnail, ListItem, Body, Left, Right, Container, Content, Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';

export default class Search extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2, r) => r1 !== r2});
        this.state= {
            departure: '',
            departure_city: '',
            destination: '',
            destination_city: '',
            time: '',
            feedback:'',
            carpoolData: ds,
            showerro: '',
            show_list : false
        }
    }

    pressBack(){
        this.props.navigator.pop();
    }

     onSubmit(){
        this.setState({show_list:true});
        try {
            fetch('http://52.36.207.127:3000/carpool/search',
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
                        time: this.state.time
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        carpoolData: this.state.carpoolData.cloneWithRows(responseJson)
                    });
                });
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
        //this.componentDidMount();
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
        if(this.state.show_list) {
            this.fetchCarpoolList()
        }
    }

    onPress(carpool){
        this.props.navigator.push({
            id: 'carpool_sec',
            carpool: carpool
        });
    }

    renderRow(carpool, sectionId, rowId, highlightRow){
        return(
            <TouchableHighlight onPress={() => {this.onPress(carpool)}}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{carpool.departure_city} - {carpool.destination_city} : {carpool.time}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    request_send(){
        return (
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
            </KeyboardAvoidingView>
        );
    }

    render() {
        if(this.state.show_list){
            return(
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.carpoolData}
                        renderRow={this.renderRow.bind(this)}
                    />
                    <Button onPress={this.pressBack.bind(this)}>
                        <Text style={{color:'white'}}>Go Back</Text>
                    </Button>
                </View>
            );
        }else{
            return(
                <View style={styles.container2}>
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
                    {this.request_send()}
                    <Footer style={{backgroundColor:'red'}}>
                        <FooterTab>
                            <Button onPress={this.onSubmit.bind(this)}>
                                <Text style={{color:'white'}}>Search for Availble</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: 'gold'
    },
    container2: {
        justifyContent: 'center',
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
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
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

AppRegistry.registerComponent('Search', () => Search);