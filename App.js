import React, { Component, PureComponent, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Alert, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/Screens/Login/Login';
import Reset from './src/Screens/Login/Reset';
import Home from './src/Screens/Home/Home';
import MyProfile from './src/Screens/MyAccount/MyProfile';
import EditProfile from './src/Screens/MyAccount/EditProfile';

import Root from './src/setup'
import Calls from './src/Screens/Calls/Calls';
import Spotcampaigns from './src/Screens/Spotcampaigns/Spotcampaigns'
import GoogleAds from './src/Screens/GoogleAds/GoogleAds';
import BottomTabs from './src/Router/Tabs';
import Test from './src/test';
import LoginStackScreen from './src/Router/LoginStack';
import Statisticks from './src/Screens/Statisticks/Statisticks';
import CallsLineChart from './src/Screens/Calls/Component/LineChart';
import TrTool from './src/Screens/TrTool/TrTool';
import HomeStackScreen from "./src/Router/Stack";
import LineChartCommon from './src/Shared/Components/LineChartCommon';
// Device info
import DeviceInfo from 'react-native-device-info';
//import Tabs from './src/Router/Stack/NavigationComponent/Tabs';
import messaging from '@react-native-firebase/messaging';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
//function HomeScreen() {
//    return (
//        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//            <Text>Home Screen</Text>
//        </View>
//    );
//}

{/*<NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
                <BottomTabs />
            </NavigationContainer>*/}



           


/*export default class App extends Component {*/
function App() {



  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         /*Alert.alert('A new message arrived!', JSON.stringify(remoteMessage));*/
    //         PushNotification.localNotification({
    //             message: remoteMessage.notification.body,
    //             title: remoteMessage.notification.title,
    //             bigPictureUrl: remoteMessage.notification.android.imageUrl,
    //             smallIcon: remoteMessage.notification.android.imageUrl,
    //         });
    //     });

    //     return unsubscribe;


    //     // Check whether an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             if (remoteMessage) {
    //                 console.log(
    //                     'Notification caused app to open from quit state:',
    //                     remoteMessage.notification,
    //                 );
    //                 setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //             }
    //             setLoading(false);
    //         });

    // }, []);


    // useEffect(() => {
    //     // Get the device token
    //     messaging().getToken().then(token => {
    //         return saveTokenToDatabase(token);
    //     });

    //     // If using other push notification providers (ie Amazon SNS, etc)
    //     // you may need to get the APNs token instead for iOS:
    //     // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    //     // Listen to whether the token changes
    //     return messaging().onTokenRefresh(token => {
    //         saveTokenToDatabase(token);
    //     });
        
    // }, []);

    

    async function saveTokenToDatabase(token) {
        // Assume user is already signed in
        const Devicetoken = await messaging().getToken();
        console.log('getID');
        console.log(token1);
        const userId = auth().currentUser.uid;
        console.log('userId');
        console.log(userId);
        // Add the token to the users datastore
        var getID = await firestore().collection('users').doc(userId).update({
            tokens: firestore.FieldValue.arrayUnion(token),
        });



        var getUniqueId = DeviceInfo.getUniqueId();
        var getVersion = DeviceInfo.getVersion();
        var getSystemVersion = DeviceInfo.getSystemVersion();
        var getModel = DeviceInfo.getModel();
        var getBrand = DeviceInfo.getBrand();
        var getManufacturer = DeviceInfo.getManufacturer();

        console.log('getUniqueId');

        let dat = {
            "device_token required": Devicetoken,
            "timestamp required": "",



            "app_version": "", // app_version,
            "getUniqueId": getUniqueId, // uuid,
            "platform": "", // platform
            //"getVersion": getVersion, // app_system_version
            "getSystemVersion": getSystemVersion,
            "getModel": getModel, //model
            "getBrand": getBrand, // brand
            "getManufacturer": getManufacturer, // manufacturer

        }
        console.log("dat");
        console.log(dat);


    }

    //async function onAppBootstrap() {
    //    // Register the device with FCM
    //    await messaging().registerDeviceForRemoteMessages();

    //    // Get the token
    //    const token = await messaging().getToken();

    //    // Save the token
    //    //await postToApi('/users/1234/tokens', { token });
    //}

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <LoginStackScreen />
            </NavigationContainer>

            {/*<LineChartCommon/>*/}
        </View>

    );
    //render() {

    //    //const [text, setText] = useState('');

    //}
}

const styles = StyleSheet.create({
    container1: {
        //flex: 1,
        //padding: 0,
        //backgroundColor: '#F8F8F8',
        //backgroundColor: '#000',
    },



});

export default App;