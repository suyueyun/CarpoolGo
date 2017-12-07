import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, KeyboardAvoidingView, Image, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import { Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: '',
            name: '',
            phone: '',
            password: '',
            verifypassword: '',
            ismatch: '',
            showerro: ''
        }
    }

    onPress(){
        this.props.navigator.pop();
    }

    onChangeText(val){
        if(val == this.state.password) {
            this.setState({
                ismatch: '',
                verifypassword : val
            });
        }else if(val == ''){
            this.setState({
                ismatch: '',
                verifypassword : ''
            });
        }else{
            this.setState({
                ismatch: 'password is NOT matched',
                verifypassword : ''
            });
        }
    }

    redirect(){
        this.props.navigator.resetTo({
            id: 'home'
        });
    }

    async onSubmit() {
        try {

            let response = await fetch('http://52.36.207.127:3000/signup',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                          name: this.state.name,
                          email: this.state.email,
                          phone: this.state.phone,
                          password: this.state.password,
                          password2: this.state.verifypassword,
                    })
                });
            let res = await response.text();
            if (response.status ==200) {
                this.redirect();
            }else {
                if(response.status == 401){ // this is test
                    //this.props.navigator.push({
                    //    id:'enterpage'
                    //});
                }
                //Handle error
                let error = res;
                throw error;
            }
        }catch(error) {
                //errors are in JSON form so we must parse them first.
                let formErrors = JSON.parse(error);
                this.setState({showerro: 'Error:' + formErrors.message});
        }
    }


    render() {
        return (

            <View style={styles.container}>
                <View style={{flex: 15, justifyContent: 'center', alignItems: 'center'}} >
                    <Image style={{width: 60, height: 60}}
                           source={require('../picture/logo.png')}
                    />
                </View>
                <KeyboardAvoidingView behavior="padding" style={{flex: 75, flexDirection: 'column', alignItems: 'stretch'}}>
                    <View style={{marginLeft:30,marginRight:30}}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={(val) => this.setState({email:val})}
                                returnKeyType='next'
                                keyboardType='email-address'
                                autoCapitalize="none"
                                autoCorrect={false}/>
                        </Item>
                        <Item floatingLabel style={{marginTop:10}}>
                            <Label>Name</Label>
                            <Input
                                onChangeText={(val) => this.setState({name:val})}
                                returnKeyType='next'
                                autoCorrect={false}/>
                        </Item>
                        <Item floatingLabel style={{marginTop:10}}>
                            <Label>Phone Number</Label>
                            <Input
                                onChangeText={(val) => this.setState({phone:val})}
                                keyboardType='phone-pad'
                                returnKeyType='next'
                                autoCorrect={false}/>
                        </Item>
                        <Item floatingLabel style={{marginTop:10}}>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(val) => this.setState({password:val})}
                                returnKeyType='next'
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}/>
                        </Item>
                        <Item floatingLabel style={{marginTop:10}}>
                            <Label>Verify Password</Label>
                            <Input
                                //onChangeText={(val) => this.setState({verifypassword:val})}
                                onChangeText={(val) => this.onChangeText(val)}
                                returnKeyType='next'
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}/>
                        </Item>
                        <Button block
                                onPress={this.onSubmit.bind(this)}
                                style={{marginTop:20, backgroundColor:'gold'}}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                        <Button block
                                onPress={() => this.props.navigator.pop()}
                                style={{marginTop:20, backgroundColor:'slategrey'}}
                        >
                            <Text>Go Back</Text>
                        </Button>
                        <Text style={{color:'red'}}>{this.state.showerro}</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
};


const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    }
});

AppRegistry.registerComponent('Signup', () => Signup);
