
import React, { Component, PureComponent, useState } from 'react';
//import { BottomTabBar } from '@react-navigation/bottom-tabs';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './Tabs';
const Stack = createStackNavigator();
export default class HomeNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        return (
            <NavigationContainer >
                {/*<BottomTabs />*/}
            </NavigationContainer>
            );
    }
}