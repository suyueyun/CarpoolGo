import React, { PropTypes, Component } from 'react';
import {AppRegistry, View, StyleSheet, TouchableHighlight, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
//import { Container, Content, Button, Text, Label, Item, Input, Footer, FooterTab, Icon} from 'native-base';

export default class Enterpage extends Component {

    _userSignup(user) {
        this.props.navigator.push({
            id: 'signup',
            user: user
        });
    }

    _userLogin(user) {
        this.props.navigator.push({
            id: 'login',
            user: user
        });
    }


    render(user) {
        return (

            <View style={{flex: 1}}>
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
                                   onSubmitEditing={()=>this.passwordInput.focus()}
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
                                   style={styles.input}
                                   ref={(input) => this.passwordInput = input}/>
                        </Item>
                        <Button block info
                                onPress={this.onLogin.bind(this)}
                                style={{marginTop:20}}>
                            <Text>Login</Text>
                        </Button>
                        <Button transparent>
                            <Text>Register a new account here</Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>

                    <Footer>
                        <FooterTab>
                            <Button>
                                <Text>Wechat Login</Text>
                            </Button>
                            <Button>
                                <Text>Facebook Login</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
            </View>



        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'navy',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#afeeee',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
        width: 335,
        height: 40,
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center'
    }
});

AppRegistry.registerComponent('Enterpage', () => Enterpage);
