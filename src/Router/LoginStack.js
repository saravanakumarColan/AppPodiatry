import React, { Component, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './Tabs';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Customer/Login';
import Reset from '../Screens/Customer/Reset';
import Registration from '../Screens/Customer/Registration';
import ForgotPassword from '../Screens/Customer/ForgotPassword';
import LaunchScreen from '../Screens/Login/Launch_Screen';
import RegisterRequest from '../Screens/Customer/RegisterRequestAccess';



const LoginStack = createStackNavigator();

function  LoginStackScreen() {
    return (
        <LoginStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <LoginStack.Screen name="LaunchScreen" component={LaunchScreen} />
            <LoginStack.Screen name="Login" component={Login} />
            <LoginStack.Screen name="Reset" component={Reset} />
            <LoginStack.Screen name="Registration" component={Registration} />
            <LoginStack.Screen name="RegisterRequest" component={RegisterRequest} />
            <LoginStack.Screen name="ForgotPassword" component={ForgotPassword} />
            <LoginStack.Screen name="BottomTabs" component={BottomTabs} /> 
        </LoginStack.Navigator>
        
    );
}
export default LoginStackScreen;