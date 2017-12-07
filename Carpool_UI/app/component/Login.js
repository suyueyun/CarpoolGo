import React, { Component } from 'react';
import { Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';
import {AppRegistry, Navigator, View, StyleSheet, Image, KeyboardAvoidingView, StatusBar, TouchableOpacity,Keyboard} from 'react-native';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            showerro: '',
            errors: [],
            disabled: false};
    }
    _onSwipeDown() {
        Keyboard.dismiss();
    }

    goSignup(){
        this.props.navigator.push({id: 'signup'});
    }

    redirect(){
        this.props.navigator.resetTo({
            id: 'home'
        });
    }

    async onLogin() {

        this.setState({
            disabled:true
        });

        try {
             let response = await fetch('http://52.36.207.127:3000/login',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    })
                });
            let res = await response.text();
            if (response.status == 200) {
                this.redirect();
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
    goHome(){
        this.props.navigator.jumpTo({id: 'signup'});
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 35, justifyContent: 'center', alignItems: 'center'}} >
                    <Image style={{width: 60, height: 60}}
                           source={require('../picture/logo.png')}
                    />
                </View>
                <KeyboardAvoidingView behavior="padding" style={{flex: 55, flexDirection: 'column', alignItems: 'stretch'}}>
                    <View style={{marginLeft:30,marginRight:30}}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={(val) => this.setState({email:val})}
                                returnKeyType='next'
                                //onSubmitEditing={()=>this.passwordInput.focus()}
                                keyboardType='email-address'
                                autoCapitalize="none"
                                autoCorrect={false}/>
                        </Item>
                        <Item floatingLabel style={{marginTop:10}}>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(val) => this.setState({password:val})}
                                returnKeyType='go'
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}/>
                        </Item>
                        <Button block warning
                                disabled={this.state.disabled}
                                onPress={this.onLogin.bind(this)}
                                style={{marginTop:20, backgroundColor:'gold'}}
                                >
                            <Text>Login</Text>
                        </Button>
                        <Button transparent
                                onPress={this.goSignup.bind(this)}
                                >
                            <Text>Register a new account here</Text>
                        </Button>
                        <Text style={{color:'red'}}>{this.state.showerro}</Text>
                    </View>
                </KeyboardAvoidingView>

                {/*<Footer>*/}
                    {/*<FooterTab>*/}
                        {/*<Button>*/}
                            {/*<Text>Wechat Login</Text>*/}
                        {/*</Button>*/}
                        {/*<Button onPress={() => this.props.navigator.jumpTo({id: 'home'})}>*/}
                            {/*<Text>Facebook Login</Text>*/}
                        {/*</Button>*/}
                    {/*</FooterTab>*/}
                {/*</Footer>*/}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container2:{
        padding: 20
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    logoContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo:{
        width:210,
        height:110
    },
    title:{
        color:'#FFF',
        marginTop:10,
        width:140,
        alignItems: 'center',
        opacity:0.9
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

AppRegistry.registerComponent('Login', () => Login);
