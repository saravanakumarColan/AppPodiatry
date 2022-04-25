import React, { Component, PureComponent } from 'react'
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import Login from '../Customer/Login';

const { width, height } = Dimensions.get("window");

export default class LaunchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("Login")
        }, 5000)
    }

    render() {

        return (

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
                {/* <Mystatusbar/> */}

                <Image source={require('./../../Assets/Images/Splash.jpg')}
                    style={{ width: width, height: height, resizeMode: 'cover' }} />

            </View>

        )
    }

}



