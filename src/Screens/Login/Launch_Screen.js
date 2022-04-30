import React, { Component, PureComponent } from 'react'
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet,alert, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import Login from '../Customer/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
const { width, height } = Dimensions.get("window");

export default class LaunchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount = async () => {
        var isLogin = await AsyncStorage.getItem("isLogin");
        console.log('isLogin===>',isLogin)
          setTimeout(() => {
            if(isLogin === 'true'){
                this.props.navigation.navigate("BottomTabs");
                //this._getAppInfo();


            }else{
                this.props.navigation.navigate("Login")

            }
        }, 5000)
    }
    _getAppInfo = async () => {
       
        console.log("App info");

        var Devicetoken = await messaging().getToken();
        var getdate = new Date().getTime();
        var timestamp = getdate.toString();
        var getUniqueId = DeviceInfo.getUniqueId();
        var getVersion = DeviceInfo.getVersion();
        var getSystemVersion = DeviceInfo.getSystemVersion();
        var getModel = DeviceInfo.getModel();
        var getBrand = DeviceInfo.getBrand();
        var getManufacturer = await DeviceInfo.getManufacturer();

        console.log('getUniqueId',Devicetoken);

        let dat = {
            "device_token": Devicetoken,
            "timestamp": timestamp,

            "app_version": "1.0", // app_version,
            "uuid": getUniqueId, // uuid,
            "platform": Platform.OS, // platform
            //"getVersion": getVersion, // app_system_version
            "app_system_version": getSystemVersion,
            "model": getModel, //model
            "brand": getBrand, // brand
            "manufacturer": getManufacturer, // manufacturer

        }
        console.log("dat");
        console.log(dat);

        var deviceInfo = await postDeviceInfoData(dat);
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



