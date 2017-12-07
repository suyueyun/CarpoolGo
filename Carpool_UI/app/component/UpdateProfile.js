import React, { Component } from 'react';
import {AppRegistry, Text, View, StyleSheet, KeyboardAvoidingView, Button, StatusBar, TextInput, TouchableOpacity} from 'react-native';

export default class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state= {
            name: '',
            phone: '',
            email: '',
            password: '',
            feedback: '',
            update_name: '',
            update_phone:''
        }
    }
    onPress(){
        this.props.navigator.pop();
    }

    redirect(){
        this.props.navigator.push({
            id: 'home'
        });
    }

    fetchUserData() {
        fetch('http://52.36.207.127:3000/profile')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    email: responseJson.email,
                    name: responseJson.name,
                    phone: responseJson.phone,
                    update_name: responseJson.name,
                    update_phone: responseJson.phone,
                });
            });
    }

    componentDidMount() {
        this.fetchUserData();
    }

    async onSubmit() {
        this.setState({showProgress: true})
        try {
            let response = await fetch('http://52.36.207.127:3000/profile',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        name: this.state.update_name,
                        phone: this.state.update_phone
                    })
                });
            let res = await response.text();
            if (response.status == 200) {
                this.redirect();
                let formErrors = JSON.parse(res)
                this.setState({
                    feedback: formErrors.message
                })
            }else {
                this.setState({
                    feedback: 'modify fail'
                })
            }
        }catch(errors){

        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.container_header}>
                        <Text>Email: {this.state.email}</Text>
                        <Text>Name: {this.state.name}</Text>
                        <Text>Phone Number: {this.state.phone}</Text>
                    </View>
                    <TextInput
                        placeholder='New Name'
                        onChangeText={(val) => this.setState({update_name:val})}
                        returnKeyType='next'
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        autoCorrect={false}
                        style={styles.input}/>
                    <TextInput
                        placeholder='New Phone Number'
                        onChangeText={(val) => this.setState({update_phone:val})}
                        returnKeyType='next'
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        keyboardType='numeric'
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}/>
                    <Text style={{color: 'red',marginBottom: 20}}>{this.state.ismatch}</Text>
                    <TouchableOpacity onPress={this.onSubmit.bind(this)}
                                      style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <Text>{this.state.feedback}</Text>
                    <Button
                        color = '#ecf0f1'
                        onPress={this.onPress.bind(this)}
                        title="Go Back"
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
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
    buttonContainer: {
        backgroundColor: '#ecf0f1',
        paddingVertical: 10
    },
    buttonText:{
        textAlign: 'center',
        color: '#34495e',
        fontWeight: '700'
    },
    container_header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

AppRegistry.registerComponent('UpdateProfile', () => UpdateProfile);
