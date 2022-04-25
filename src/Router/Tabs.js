import React, { Component, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calls from './../Screens/Calls/Calls';
import Home from './../Screens/Home/Home';
import GoogleAds from './../Screens/GoogleAds/GoogleAds';
import MyProfile from '../Screens/MyAccount/MyProfile';
import HomeStackScreen from "./Stack";
import Test from '../test';
import Statisticks from './../Screens/Statisticks/Statisticks';
import TrTool from './../Screens/TrTool/TrTool';
import { fontSize, FontFamily, Colors } from '../Assets/Constants/fontsAndColors';
import Reset from '../Screens/Customer/Reset';
import Theme from '../Assets/Styles/Theme';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
const Tab = createBottomTabNavigator();


const { width, height } = Dimensions.get('window');
export default class BottomTabs extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="TrTool"
                screenOptions={{
                    tabBarStyle: { height: width / 100 * 23, },
                  }}
                tabBarOptions={{
                    showLabel: false,
                    style: {

                        ...styles.BottomTabsWrp
                    }
                }}
                style={styles.BottomTabsWrp}>
                <Tab.Screen name="TR TOOL" component={TrTool}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.BottomTabsItem, { alignContent: "center", justifyContent: "center" }]}>
                                <Image source={require('../Assets/Images/Dashboard/TRTool.png')}
                                    style={{
                                        resizeMode: "contain",
                                        tintColor: focused ? '#1A89BE': '#888',
                                        ...styles.TabsItem
                                    }}
                                />
                                <Text style={[styles.TabsLabel, { color: focused ? '#1A89BE' : '#888' }]}>TR TOOL</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen name="Statistics" component={Statisticks}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.BottomTabsItem, { alignContent: "center", justifyContent: "center" }]}>
                                <Image source={require('../Assets/Images/Dashboard/Statistics.png')}
                                    style={{
                                        resizeMode: "contain",
                                        tintColor: focused ? '#1A89BE' : '#888',
                                        ...styles.TabsItem,
                                    }}
                                />
                                <Text style={[styles.TabsLabel, { color: focused ? '#1A89BE' : '#888' }]}>TR STATS</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen name="Dashboard" component={HomeStackScreen}
                    options={{
                        headerShown: false,
                        title: 'Dashboard',
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.BottomTabsItem, { alignContent: "center", justifyContent: "center" }]}>
                                <Image source={require('../Assets/Images/Dashboard/Dashboard.png')}
                                    style={{
                                        resizeMode: "contain",
                                        tintColor: focused ? '#1A89BE' : '#888',
                                        ...styles.TabsItem,
                                    }}
                                />
                                <Text style={[styles.TabsLabel, { color: focused ? '#1A89BE' : '#888' }]}>DASHBOARD</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen name="MyProfile" component={MyProfile}
                    options={{                        
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.BottomTabsItem, { alignContent: "center", justifyContent: "center" }]}>
                                <Image source={require('../Assets/Images/Dashboard/User.png')}
                                    style={{
                                        resizeMode: "contain",
                                        tintColor: focused ? '#1A89BE' : '#888',
                                        ...styles.TabsItem,
                                    }}
                                />
                                <Text style={[styles.TabsLabel, { color: focused ? '#1A89BE' : '#888' }]}>MY PROFILE</Text>
                            </View>
                        ),                      
                    }}
                />
                {/*<Tab.Screen name="Reset" component={Reset}
                    options={{
                        tabBarVisible: false,
                    }}
                />*/}

            </Tab.Navigator >
        );
    }

}

const styles = StyleSheet.create({
    BottomTabsWrp: {
        backgroundColor: '#fff',
        //height: 40,//width / 100 * 120,
        borderTopColor: Colors.Link,
        borderColor: Colors.Link,
        borderWidth: 1,
        borderStyle: "solid",
        width:'100%',

    },
    BottomTabsItem: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: 'red',
        //borderStyle: 'solid',
        //borderWidth: 1,
        width: width / 100 * 22,
        backgroundColor:'#fff',
    },
    TabsItem: {
        alignSelf: "center",
        justifyContent: 'center',
        height: width / 100 * 7,
        //width: width / 100 * 25,
        
    },
    TabsLabel: {
        color: '#000',
        fontSize: fontSize.Small,
        fontFamily: FontFamily.Medium,
    },
});
