import React, { Component, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button, TouchableOpacity,Image, Dimensions } from 'react-native';
import { Colors, fontSize, BorderRadius, FontFamily } from './../Assets/Constants/fontsAndColors';
import Theme from '../Assets/Styles/Theme';
import Home from './../Screens/Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { withNavigation } from 'react-navigation';

const HomeStack = createStackNavigator();




const { width, height } = Dimensions.get('window');


export default class StackHeader extends Component {
    //function HomeStackScreen() {r
    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
            userLogo: '',
            align:'center',
        }
    }

    componentDidMount() {
        //this.loadApiData();
        //this.getUserName();
        this.useLogo();
        /*var align = this.props.Align;*/

    }


    useLogo = async () => {
        console.log('user logo === ');
        var getUserlogo = await AsyncStorage.getItem('userDetail');
        var jsonConvert = JSON.parse(getUserlogo);

        this.setState({ userLogo: jsonConvert.logo });
        console.log('1userLogo');
        console.log(this.state.userLogo);
        //await AsyncStorage.setItem('userLogo', this.state.userLogo);        
    }

    goBackScreen = async () => {
        console.log('go back');
        this.props.navigation.navigate("Login");
       // this.props.navigation.navigate("Home");
    }


    render() {
        //const tColor = props.Align;
        let title = this.props.Title;
        console.log('title');
        console.log(title);
        //const { state, navigate } = this.props.navigation; 
        return (
            <View style={styles.HeaderWrp}>
                {/* <TouchableOpacity 
                style={styles.BackIcon}>
                    <Image style={[styles.BackImg]} source={require('../Assets/Images/Icons/Left-Arrow.png')} />
                </TouchableOpacity> */}
                <View style={styles.TitleWrp}>
                    <Text style={[styles.Title, this.props.Align === 'center' ? { alignSelf: 'center' } : { alignSelf: 'flex-start' }]}>{title}</Text>
                </View>
                <View styles={[styles.UserLogoWrp]}>
                    <Image
                        style={[styles.UserLogo]}
                        source={{ uri: this.state.userLogo }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    HeaderWrp: {
       // backgroundColor: '#000',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent:'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width:width / 100 * 95,
        paddingLeft:width / 100 * 0,
    },
    BackIcon:{
        //backgroundColor: '#888',
        //width:width /100 * 3,
        height:20,
        alignItems: 'center',
        alignContent:'center',
    },
    BackImg:{
        width:width /100 * 10,
        height:width /100 * 5,
        resizeMode:'contain',
        alignItems: 'center',
        alignContent:'center',
    },
    TitleWrp: {
       // backgroundColor: '#888',
        flex: 1,
        width:width /100 * 10,
    },
    Title: {
        //backgroundColor: '#000',
        justifyContent:'center',
        width:'100%',
        alignSelf:'center',
        textAlign: 'center',    
        color: "#fff",
        textTransform: "capitalize",
        fontSize: fontSize.ExLarge_2,
        fontFamily: FontFamily.Regular,
    },
    UserLogoWrp: {
        marginRight: 20,
        //flex: 0.3,

    },
    UserLogo: {
        //backgroundColor: '#ccc',
        borderRadius: 50,
        marginRight: 20,
        width: width / 100 * 15,
        height: width / 100 * 15,
        resizeMode: 'contain',
    },
});

//export default withNavigation(StackHeader);