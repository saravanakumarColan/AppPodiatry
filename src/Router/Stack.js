import React, { Component, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button, Image, Dimensions } from 'react-native';
import Calls from '../Screens/Calls/Calls';
import Test from '../test';
import Home from '../Screens/Home/Home';
import GoogleAds from '../Screens/GoogleAds/GoogleAds';
import Spotcampaigns from '../Screens/Spotcampaigns/Spotcampaigns';
import Login from '../Screens/Customer/Login';
import LaunchScreen from '../Screens/Login/Launch_Screen';
import BottomTabs from './Tabs';

import { Colors, fontSize, BorderRadius } from './../Assets/Constants/fontsAndColors';
import Theme from '../Assets/Styles/Theme';
import Directories from '../Screens/Directories/Directories';

import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeStack = createStackNavigator();

import StackHeader from './StackHeader';
import { forFade } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';

const { width, height } = Dimensions.get('window');


export default class HomeStackScreen extends Component {
    //function HomeStackScreen() {
    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
            userLogo: '',
        }
    }

    componentDidMount() {
        //this.loadApiData();
        //this.getUserName();
        this.useLogo();
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

    

    //getUserName = async () => {
    //    console.log('getUserDetail =========');
    //    var getUserDetail = await AsyncStorage.getItem("username");
    //    var Detail = JSON.parse(getUserDetail);
    //    //debugger;
    //    //this.setState({ firstName: Detail.firstName, lastName: Detail.lastName });
    //    console.log('Detail');
    //    console.log(Detail);
    //}


    render() {

        return (

  //          <Stack.Navigator>
  //  <Stack.Screen
  //    name="Scroll Rack"
  //    options={{ headerTitle: (props) => <Header /> }}
  //    component={BottomTabNavigator}
  //  />
  //</Stack.Navigator>

            <HomeStack.Navigator initialRouteName="Home" 
            screenOptions={{
                headerBackTitleVisible:false
                //headerShown: false
            }}>

                {/*<HomeStack.Screen name="Login" component={Login} />*/}
                <HomeStack.Screen name="Home" component={Home}

                    options={{
                        headerTitle: (prop) => <StackHeader Title="Dashboard" Align="center" />,
                        //title: 'Dashboard',
                        headerLeft: null,
                        //headerRight: () => (
                        //    <View styles={[styles.UserLogoWrp]}>                                
                        //        <Image
                        //            style={[styles.UserLogo]}
                        //            source={{ uri: this.state.userLogo }}
                        //        />
                        //    </View>
                        //),
                        
                      
                        headerTintColor: '#fff',
                        headerStyle: {
                            ...styles.StackHeader,
                            backgroundColor: Colors.BtnTheme,
                        },

                    }}
                />
                <HomeStack.Screen name="Calls" component={Calls}
                    options={{
                        
                        headerTintColor: '#fff',
                        headerTitle: (prop) => <StackHeader Title="Calls" Align="left" 
                        
                        />,
                        headerStyle: {
                            ...styles.StackHeader,
                            backgroundColor: Colors.Calls,
                        },
                        
                    }}
                />
                <HomeStack.Screen name="Spotcampaigns" component={Spotcampaigns}
                  screenOptions={{headerBackTitleVisible:false}}
                    options={{
                        
                        //headerLeft: null,
                        headerBackTitle: null,
                        headerTintColor: '#fff',
                        headerTitle: (prop) => <StackHeader Title="Spot Campaigns" Align="left" 
                        
                        />,
                       
                        headerStyle: {
                            ...styles.StackHeader,
                            backgroundColor: Colors.SpotCampaigns,
                        },
                    }}
                />
                <HomeStack.Screen name="GoogleAds" component={GoogleAds}
                    options={{
                        headerTintColor: '#fff',
                        headerTitle: (prop) => <StackHeader Title="Google Ads" Align="left" />,
                        headerStyle: {
                            ...styles.StackHeader,
                            backgroundColor: Colors.GoogleAds,
                        },
                    }}
                />
                <HomeStack.Screen name="Directories" component={Directories}
                    options={{
                        headerTintColor: '#fff',
                        headerTitle: (prop) => <StackHeader Title="Directories" Align="left" />,
                        headerStyle: {
                            ...styles.StackHeader,
                            backgroundColor: Colors.BtnTheme,
                        },
                    }}
                />



            </HomeStack.Navigator>

        );
    }
}

const styles = StyleSheet.create({


    StackHeader: {
        height: height / 100 * 15,
        alignSelf: "flex-start",
        paddingLeft: width / 100 * 5,
        paddingBottom: 25,
        flex: 0.2,
        justifyContent: "flex-end",
        borderBottomLeftRadius: BorderRadius.WelcomCard,
        borderBottomRightRadius: BorderRadius.WelcomCard,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 5.27,
        elevation: 6,
        fontSize: fontSize.Large,
    },
    UserLogoWrp: {
        marginRight: 20,
    },
    UserLogo: {
        //backgroundColor: '#000',
        borderRadius: 50,
        marginRight: 20,
        width: width / 100 * 15,
        height: width / 100 * 15,
        resizeMode: 'contain',
    },

});

//export default HomeStackScreen;