
import React, { Component, useState, useRef } from 'react';
import { ScrollView, Platform, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, Pressable, Dimensions } from 'react-native';
import { fontSize, Colors, FontFamily, BorderRadius, fontFamily } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import LogButton from './../../Shared/Form/LoginBtn';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import { postDeviceInfoData, postLoginData } from '../../service/GetDataService';
import CheckBox from '@react-native-community/checkbox';

import HomeNavigation from './../../Router/Navigation';


import BottomTabs from './../../Router/Tabs';
import Reset from './../Customer/Reset';
import Registration from './../Customer/Registration';

// Device info
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

/*const firebase = RNFirebase.initializeApp(configurationOptions)*/

import Recaptcha from 'react-native-recaptcha-that-works';


const { width, height } = Dimensions.get('window');
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loginVal: [
                {
                    "username": "jmtestkit@m",
                    "password": "hgfdg%43Tr$%"
                }
            ],
            isVisible: false,
            isSelected: true,
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        this._getAppInfo();
    }


    _getAppInfo = async () => {
        //var getUniqueId = DeviceInfo.getUniqueId();
        //var getVersion = DeviceInfo.getVersion();
        //var getSystemVersion = DeviceInfo.getSystemVersion();
        //var getModel = DeviceInfo.getModel();
        //var getBrand = DeviceInfo.getBrand();
        //var getManufacturer = DeviceInfo.getManufacturer();
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

        console.log('getUniqueId');

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



    loginClick = async (values) => {

        var loginVal = {
            "username": values.UserName,
            "password": values.Password
        };
        //debugger;
        var response = await postLoginData(loginVal);
        console.log("Login loginVal");
        console.log(loginVal);
        console.log("login Success");
        console.log(response);

        if (response === 's') {
            //debugger;
            console.log("Login true");
            //Alert.alert("Success");
            //Alert.alert(alertModalValid());
            //debugger;
            this.props.navigation.navigate("BottomTabs");
            //this.props.navigation.goBack("BottomTabs")
            //return <HomeNavigation />;
            this._getAppInfo();
        }
        else {
            //Alert.alert('alertModalInvalid');
            /*Alert.alert("Failure");*/
            //this.setModalVisible(true);

            this.setState({ isVisible: true });
        }
    }

    _closeModal = () => {
        this.setState({ isVisible: false });
    }


    render() {

        const validateInputs = yup.object({
            //UserName: yup.string("enter your email").email("Invalid email address.").required("Enter Your Email"),
            //.email("Valid email pls")
            UserName: yup.string("enter your email").required("Email can not be empty"),
            Password: yup.string().required("Password can not be empty")
        });
        const handleReset = (resetForm) => {
            if (window.confirm('Reset?')) {
                resetForm();
            }
        };

        const { modalVisible } = this.state;

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View style={[styles.LoginWrp]}>




                    <View style={styles.LoginLogoWrp}>
                        <Image style={styles.loginLogo} source={require('../../Assets/Images/Logo.png')} />
                        {/*<Image style={styles.loginLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }} />*/}
                        {/*<Text style={styles.LogoText}>LOGO</Text>*/}
                    </View>
                    <View style={styles.LoginTitle}>
                        <Text style={[styles.LogoMainTitle, {marginBottom:20}]}>Targeted Review Tool</Text>
                        {/* <Text style={styles.LogoText}>Sign In </Text> */}
                    </View>
                    <Formik
                        enableReinitialize
                        initialValues={
                            {
                                UserName: 'jmtestkit@m', Password: 'hgfdg%43Tr$%'
                                /*UserName: 'jmtestkit@m', Password: 'hgfdg%43Tr$%'*/
                            }
                        }
                        validationSchema={validateInputs}
                        onSubmit={(values, actions) => {
                            this.loginClick(values);
                        }}
                    >
                        {(props) => (
                            <View style={Theme.FormWrp}>
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="Email" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="User" />
                                        {/*<FormInput placeholder="jane@example.com1" Icon="User" />*/}
                                        <TextInput
                                            style={Theme.input}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#888"
                                            onChangeText={props.handleChange('UserName')}
                                            onBlur={props.handleBlur('UserName')}
                                            value={props.values.UserName}
                                        />
                                    </View>
                                    <Text style={Theme.TextError} >{props.touched.UserName && props.errors.UserName}</Text>

                                </View>
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="Password" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="Password" />
                                        <TextInput
                                            style={Theme.input}
                                            placeholder="Enter your password"
                                            placeholderTextColor="#888"
                                            onChangeText={props.handleChange('Password')}
                                            onBlur={props.handleBlur('Password')}
                                            value={props.values.Password}
                                        />
                                    </View>
                                    <Text style={Theme.TextError} >{props.touched.Password && props.errors.Password}</Text>
                                </View>
                                {/*<View style={Theme.ForgotLink}>
                                <Text style={Theme.ForgotText} onPress={() => this.props.navigation.navigate("ForgotPassword")}>Forgot password</Text>
                            </View>*/}

                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={this.state.isSelected}
                                        //onValueChange={this.state.isSelected}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.checkboxlabel}>Stay logged in</Text>
                                </View>
                                <View style={[styles.BtnWrp, { marginTop: width / 100 * 2 }]}>
                                    {/*<LogButton Title1="SIGNIN" Title2="RESET" TItle1Click={props.handleSubmit} TItle2Click={this.reSetClick()} />*/}
                                    {/* <View style={Theme.LogButton}>
                                    <TouchableOpacity style={[Theme.BtnLog, Theme.BtnBlue]} onPress={props.handleSubmit}>
                                        <Text style={{
                                            color: '#fff', FontFamily: FontFamily.Medium, fontSize: fontSize.Large
                                        }}>SIGNIN</Text>
                                    </TouchableOpacity>
                                </View>*/}
                                    {/*<Text style={[Theme.BtnLog, Theme.BtnWhite]} onPress={() => this.props.navigation.navigate("Reset")}>RESET </Text>
                                <Text onPress={ props.handleSubmit } >Login</Text>*/}

                                    <TouchableOpacity style={{ flex: 1, width: '50%', height: height / 100 * 9 }}
                                        onPress={props.handleSubmit}>
                                        <Text style={[Theme.BtnLog, styles.BtnBlue]}>SIGN IN </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '50%', height: height / 100 * 9 }}
                                        onPress={() => this.props.navigation.navigate("Reset")}>
                                        <View style={[Theme.BtnLog, styles.BtnWhite]}>
                                            <Text style={[styles.ResetText]}>RESET </Text>
                                            <Text style={[styles.ResetText]}> PASSWORD</Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>

                                <View style={[styles.SignUpWrp]}>
                                    <Text style={[styles.newCustomer]}>Not a member yet?</Text>
                                    <TouchableOpacity style={{}}
                                        onPress={() => this.props.navigation.navigate("Registration")}>
                                        <Text style={[styles.SignUpText]}>Sign Up Now</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        )}
                    </Formik>


                    <View style={[Theme.BtnWrp, { marginTop: 40 }]}>
                        {/* <LogButton Title1="SIGNIN" Title2="RESET" /> */}
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/*<Image source={require('../../Assets/Images')} />*/}
                                <Text style={styles.modalText}>Login Successful</Text>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Login Successful</Text>

                            </View>
                        </View>
                    </Modal>

                    {/*</Modal>*/}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={
                            this.state.isVisible
                        }
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        {/*All views of Modal*/}
                        <View style={Theme.Modal}>
                            <View style={[Theme.MessageWrp]}>
                                <View style={[Theme.MessageCol, Theme.SuccessWrp]}>
                                    <Text style={[styles.text, { color: '#842029' }]}>Invalid credentials</Text>
                                </View>
                                <TouchableOpacity style={[Theme.ModalCloseBtn]} onPress={() => this._closeModal()}>
                                    <Text style={[Theme.ModalCloseTxt]}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                    {/*Button will change state to true and view will re-render*/}
                    {/*<Button
                    title="Click To Open Modal"
                    onPress={() => { this.setState({ isVisible: true }) }}
                />*/}
                    {/* Modal */}

                    {/*<Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>*/}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    LoginWrp: {
        flex: 1,
        padding: width / 100 * 5,
        //backgroundColor:'#ccc',
    },
    LoginLogoWrp: {
        //flex: 0.3,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        //backgroundColor: '#888',
        marginBottom: width / 100 * 5,
    },
    LogoText: {
        paddingTop: width / 100 * 4,
        fontSize: fontSize.ExtraLarge,
        color: "#000",
        fontFamily: FontFamily.Regular,
    },
    LogoMainTitle: {
        fontSize: fontSize.ExLarge_2,
        color: Colors.Link,
        fontFamily: FontFamily.Regular,
    },
    LoginTitle: {
        //flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    loginLogo: {
        width: width / 100 * 50,
        height: width / 100 * 50,
        justifyContent: "center",
        resizeMode: 'contain',
    },
    // Modall
    centeredView: {
        backgroundColor: "#000c",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 0,
        textAlign: "center"
    },
    BtnWrp: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#000',
        borderRadius: width / 100 * 12,
        overflow: 'hidden',

    },
    BtnBlue: {
        width: '100%',
        borderTopLeftRadius: width / 100 * 12,
        borderBottomLeftRadius: width / 100 * 12,
        color: '#fff',
        backgroundColor: Colors.BtnTheme,
        lineHeight: width / 100 * 12,

    },
    BtnWhite: {
        width: '100%',
        borderTopRightRadius: width / 100 * 12,
        borderBottomRightRadius: width / 100 * 12,
        color: '#000',
        backgroundColor: '#fff',
        lineHeight: width / 100 * 12,
    },
    text: {
        paddingTop: width / 100 * 8,
        paddingBottom: width / 100 * 4,
        fontSize: fontSize.Medium,
    },
    SignUpWrp: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    SignUpText: {
        //backgroundColor:'#ccc',
        color: '#1255CC',
        fontSize: fontSize.Large,
        fontFamily: FontFamily.Regular,
        lineHeight: width / 100 * 12,
        paddingLeft: 5,
        textDecorationLine: 'underline',
    },
    newCustomer: {
        color: '#000',
        fontSize: fontSize.Large,
        fontFamily: FontFamily.Regular,
        lineHeight: width / 100 * 12,
    },
    checkboxContainer: {
        flexDirection: "row",
        paddingTop: 25,
        paddingBottom: 15,
        alignContent: "center",
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxlabel: {
        //backgroundColor: "#ccc",
        alignSelf: 'center',
        alignItems: 'center',

        paddingHorizontal: 10,
        // margin: 8,
        //fontFamily: FontFamily.Regular,
        fontSize: fontSize.Large,
        color: "#222324",
    },
    ResetText:{
        width: '100%',
        color: '#000',
        backgroundColor: '#fff',
        //lineHeight: width / 100 * 12,
        fontSize: fontSize.Large,
        textAlign:'center',

    },
});


