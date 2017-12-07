import React, { Component } from 'react';

import {AppRegistry, View, StyleSheet, Dimensions, Button} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state={
            x: {latitude: 43.469757, longitude: -80.540952}
        }
    }

    redirect(){
        this.props.navigator.pop();
    }

    render(){
        return (
            <View style={styles.container1}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 43.469757,
                        longitude: -80.540952,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker draggable
                                    coordinate={this.state.x}
                                    onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                    />
                </MapView>
                <Button
                    onPress={this.redirect.bind(this)}
                    title="Confirm"
                    style={styles.container2}
                />
            </View>
        );

    }

}
const styles = StyleSheet.create({
    container1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column'
    },
    map: {
        flex: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
    },
    container2: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});


AppRegistry.registerComponent('Map', () => Map);
