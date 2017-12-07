import React, { Component } from 'react';
import {AppRegistry, Text, View, StyleSheet, Navigator, TouchableHighlight} from 'react-native';


import Enterpage from './app/component/Enterpage'
import Login from './app/component/Login'
import Signup from './app/component/Signup'
import Home from './app/component/Home'
import OfferCarpool from './app/component/OfferCarpool'
import UpdateProfile from './app/component/UpdateProfile'
import List from './app/component/List'
import Carpool_sec from './app/component/Carpool_sec'
import Setting from './app/component/Setting'
import Map from './app/component/Map'
import Search from './app/component/Search'
import Offer from './app/component/Offer'
import Own_carpool from './app/component/Own_carpool'
import Reservation from './app/component/Reservation'
import Reserve_carpool from './app/component/Reserve_carpool'
import Home_carpool from './app/component/Home_carpool'

export default class Carpool_UI extends Component {

    renderScene(route,navigator){
        switch(route.id){
            case 'signup':
                return (<Signup navigator={navigator} title="signup"/>)
            case 'login':
                return (<Login navigator={navigator} title="login"/>)
            case 'enterpage':
                return (<Enterpage navigator={navigator} title="enterpage"/>)
            case 'home':
                return (<Home navigator={navigator} title="home"/>)
            case 'offercarpool':
                return (<OfferCarpool navigator={navigator} title="offercarpool"/>)
            case 'updateprofile':
                return (<UpdateProfile navigator={navigator} title="updateprofile"/>)
            case 'list':
                return (<List navigator={navigator} title="list"/>)
            case 'carpool_sec':
                return (<Carpool_sec carpool={route.carpool} navigator={navigator} title="carpool_sec" />)
            case 'Setting':
                return (<Setting  navigator={navigator} title="Setting" />)
            case 'map':
                return (<Map navigator={navigator} title="Map" />)
            case 'search':
                return (<Search navigator={navigator} title="Search" />)
            case 'offer':
                return (<Offer navigator={navigator} title="Offer" />)
            case 'own_carpool':
                return (<Own_carpool carpool={route.carpool} navigator={navigator} title="own_carpool" />)
            case 'reservation':
                return (<Reservation navigator={navigator} title="Reservation" />)
            case 'reserve_carpool':
                return (<Reserve_carpool carpool={route.carpool} navigator={navigator} title="reserve_carpool" />)
            case 'home_carpool':
                return (<Home_carpool navigator={navigator} title="home_carpool"/>)
        }
    }

    render(){
        return (
            <Navigator
                initialRoute={{id:'login'}}
                renderScene={this.renderScene}
                configureScreen={(route,routeStack) => Navigator.SceneConfigs.FloatFromBottom}
                configureScene={(route) => {
                      // TODO: This is a temp workaround as it's a special case, change ASAP..
                      if (route.id == 'offercarpool' || route.id == 'search') {
                        return Navigator.SceneConfigs.FloatFromBottom;
                      }
                      return Navigator.SceneConfigs.PushFromRight;
                    }}
                        />
                    )
                }
}
AppRegistry.registerComponent('Carpool_UI', () => Carpool_UI);
