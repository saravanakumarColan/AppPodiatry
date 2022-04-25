
import React, { Component, useState } from 'react';
import { ScrollView,Platform,View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, Pressable, Dimensions } from 'react-native';
import { fontSize, Colors, FontFamily, BorderRadius } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import LogButton from './../../Shared/Form/LoginBtn';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import { postDeviceInfoData, postLoginData, postregisterData } from '../../service/GetDataService';

import HomeNavigation from './../../Router/Navigation';
import RegisterRequest from '../Customer/RegisterRequestAccess';

import BottomTabs from './../../Router/Tabs';
import Reset from './../Customer/Reset';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/*const firebase = RNFirebase.initializeApp(configurationOptions)*/

// RecaptchaForm
//import RecaptchaForm from './ReCaptcha';
import GoogleReCaptcha from 'rn-google-recaptcha-v2';
const siteKey = '6LdKloUeAAAAAJs6OqwhGxQU5p0qSGVU1WiyIt81';
const baseUrl = 'https://podiatrycontentconnection.com/';

const { width, height } = Dimensions.get('window');
export default class Registration extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            recaptchaToken:'',
            isVerified:false,
            recaptchaViewHeight: 90 ,//initial default height
            modalVisible: false,
            loginVal: [
                {
                    "username": "jmtestkit@m",
                    "password": "hgfdg%43Tr$%"
                }
            ],
            isVisible: false,
            message:'',
            Submessage:'',
            messageGreen: true,
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
        console.log("Registration");
        var loginVal = {
            "first_name": values.FirstName,
            "last_name": values.LastName,
            "mail_address": values.Email,
            "contact_number": values.Contact,
            "password": values.Password,
            "password_repeat": values.ConfirmPassword
        };
        console.log(loginVal);
        //debugger;
        var response = await postregisterData(loginVal);
        console.log("response register");
        console.log(response.success);
        let regiSuccess = response.success;
        let regiMessage = response.message;
        //Alert(response);
        if (regiSuccess === true) {
            console.log("Login true");
            this.props.navigation.navigate("RegisterRequest");
            // this.setState({ messageGreen: true});
            // this.setState({message: 'Your request has been received. A team-member will be contacting you within 24 hours to complete the registration process. Thank you.', 
            // Submessage:' If you have any questions in the meantime, feel free to give us a call at (718) 475-9449.'});
            //this.setState({isVisible:true});
            // setTimeout(() => {
            //     this.setState({isVisible:false});
            //     this.props.navigation.navigate("Login");
            //     }, 16000);
           
        }
        else {
            console.log(regiMessage);
            this.setState({ messageGreen: false})
            this.setState({message: regiMessage});
            this.setState({isVisible:true});
        }
    }

    _closeModal = () => {
        this.setState({ isVisible: false });
    }
    goBackScreen = async () => {
        this.props.navigation.navigate("Login");
    }

    onRecaptchaEvent = event => {
        if (event && event.nativeEvent.data) {
            const data = decodeURIComponent(
                decodeURIComponent(event.nativeEvent.data),
            );
            if (data.startsWith('CONTENT_PARAMS:')) {
                let params = JSON.parse(data.substring(15));
                let recaptchaViewHeight = params.visibility === 'visible' ? params.height : 90;
                this.setState({ recaptchaViewHeight });
            } else if (['cancel', 'error', 'expired'].includes(data)) {
                return;
            } else {
                console.log('Verified code from Google', data);
                this.setState({ recaptchaToken: data });
            }
        }
    };

    onChangeRecaptcha(value) {
        console.log("test");
    }

    render() {
        const validateInputs = yup.object({
            //UserName: yup.string("enter your email").email("Invalid email address.").required("Enter Your Email"),
            //.email("Valid email pls")
            
            
            FirstName: yup.string().required("First name can not be empty"),
            LastName: yup.string().required("Last name can not be empty"),
            Email: yup.string().email("Please enter valid email").required('Email Address is Required'),
            
            Contact: yup.string().min(11, ({ min }) => `Contact number must be valid`).max(11, 'Contact number must be valid').required("Contact number can not be empty"),
            Password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password can not be empty'),
            //yup.string().required("Password can not be empty"),
           ConfirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
           //ConfirmPassword1: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password can not be empty'),
           //recaptcha: yup.string('ReCaptcha is required').required(),
        });
        const handleReset = (resetForm) => {
            if (window.confirm('Reset?')) {
                resetForm();
            }
        };

        const { modalVisible } = this.state;

        const { recaptchaViewHeight } = this.state;

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >
            <KeyboardAwareScrollView 
                // style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false} >
                     {/*<WelcomeCard Title="My Profile" />*/}
                     <View style={Theme.HeaderArrow}>
                            <TouchableOpacity onPress={() => this.goBackScreen()}>
                                <Image style={[Theme.ArrowImg]} source={require('./../../Assets/Images/Icons/Left-Arrow.png')} /></TouchableOpacity>
                            <Text style={[Theme.WelcomeTitle, { color: "#fff", textTransform: "capitalize", fontSize: 18, fontFamily: FontFamily.Regular }]}>Sign Up</Text>
                            <Image style={[Theme.UserLogo]} source={{ uri: this.state.logo }} />
                        </View>
            <View style={[styles.LoginWrp]}>

                {/* <View style={styles.LoginLogoWrp}>
                    <Image style={styles.loginLogo} source={require('../../Assets/Images/Logo.png')} />
                </View> */}
                <View style={styles.LoginTitle}>
                    <Text style={styles.LogoText}>Register </Text>
                </View>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            FirstName:'test',
                            LastName:'test name',
                            Email: 'test1@gmail.com', 
                            Contact:'12345678989',
                            Password: '12345678',
                            ConfirmPassword:'12345678',
                            /*UserName: 'jmtestkit@m', Password: 'hgfdg%43Tr$%'*/
                        }
                    }
                    
                    validationSchema={validateInputs}
                    onSubmit={(values, actions) => {
                        console.log('recaptcha check');
                        let reCaptchData =  this.state.recaptchaToken;
                        if(reCaptchData == false){
                            console.log('recaptcha 1');
                            this.setState({isVerified:true});
                        }
                        else{
                            console.log('recaptcha 2');
                            this.setState({isVerified:false});
                            this.loginClick(values);
                        }
                        
                        
                    }}
                >
                    {(props) => (
                        <View style={Theme.FormWrp}>
                            <View style={Theme.FormGroup}>
                                <View>
                                    <FormLabel Label="First Name" />
                                </View>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="User" />
                                    <TextInput
                                        style={Theme.input}
                                        placeholder="Enter your first name"
                                        placeholderTextColor="#888"
                                        onChangeText={props.handleChange('FirstName')}
                                        onBlur={props.handleBlur('FirstName')}
                                        value={props.values.FirstName}
                                    />
                                </View>
                                <Text style={Theme.TextError} >{props.touched.FirstName &&  props.errors.FirstName}</Text>

                            </View>
                            <View style={Theme.FormGroup}>
                                <View>
                                    <FormLabel Label="Last Name" />
                                </View>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="User" />
                                    {/*<FormInput placeholder="jane@example.com1" Icon="User" />*/}
                                    <TextInput
                                        style={Theme.input}
                                        placeholder="Enter your last name"
                                        placeholderTextColor="#888"
                                        onChangeText={props.handleChange('LastName')}
                                        onBlur={props.handleBlur('LastName')}
                                        value={props.values.LastName}
                                    />
                                </View>
                                <Text style={Theme.TextError} >{props.touched.LastName && props.errors.LastName}</Text>

                            </View>
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
                                        onChangeText={props.handleChange('Email')}
                                        onBlur={props.handleBlur('Email')}
                                        value={props.values.Email}
                                    />
                                </View>
                                <Text style={Theme.TextError} >{props.touched.Email && props.errors.Email}</Text>

                            </View>
                            <View style={Theme.FormGroup}>
                                <View>
                                    <FormLabel Label="Contact Number" />
                                </View>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="Phone" />
                                    {/*<FormInput placeholder="jane@example.com1" Icon="User" />*/}
                                    <TextInput
                                        style={Theme.input}
                                        placeholder="Enter contact number"
                                        placeholderTextColor="#888"
                                        onChangeText={props.handleChange('Contact')}
                                        onBlur={props.handleBlur('Contact')}
                                        value={props.values.Contact}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <Text style={Theme.TextError} >{props.touched.Contact && props.errors.Contact}</Text>

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
                            <View style={Theme.FormGroup}>
                                <View>
                                    <FormLabel Label="Confirm Password" />
                                </View>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="Password" />
                                    <TextInput
                                        style={Theme.input}
                                        placeholder="Enter confirm your password"
                                        placeholderTextColor="#888"
                                        onChangeText={props.handleChange('ConfirmPassword')}
                                        onBlur={props.handleBlur('ConfirmPassword')}
                                        value={props.values.ConfirmPassword}
                                    />
                                </View>
                                <Text style={Theme.TextError} >{props.touched.ConfirmPassword && props.errors.ConfirmPassword}</Text>
                            </View>
                            {/** Recaptcha **/}
                            <View style={{width:'100%'}}>
                                <GoogleReCaptcha
                                //ref={this._reCaptchaRef}
                                    style={{ height: recaptchaViewHeight}}
                                    siteKey={siteKey}
                                    url={baseUrl}
                                    languageCode="en"
                                    //value={this.state.recaptchaToken}
                                    onMessage={this.onRecaptchaEvent} 
                                    // onChange={this.onChangeRecaptcha}
                                      />
                                    {this.state.isVerified && <Text style={Theme.TextError} >Google reCAPTCHA is Required</Text>}
                             </View>

                            <View style={[styles.BtnWrp, { marginTop: width / 100 * 2 }]}>
                                
                                <TouchableOpacity style={{ flex :1,width: '100%', height: height / 100 * 9 }}
                                    onPress={props.handleSubmit}>
                                    <Text style={[Theme.BtnLog, styles.BtnBlue]}>Register and Request Access</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ width: '50%', height: height / 100 * 9 }}
                                    onPress={() => this.props.navigation.navigate("Reset")}>
                                    <Text style={[Theme.BtnLog, styles.BtnWhite]}>RESET</Text>
                                </TouchableOpacity> */}

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
                                    <Text style={[styles.Text, this.state.messageGreen == true ? { color: 'green' } : {color:'#842029'}]}>{this.state.message}</Text>
                                    {/* <Text style={[styles.ModalFootertext, {color:'#5f6676'}]}>{this.state.Submessage}</Text> */}
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
                </KeyboardAwareScrollView>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    LoginWrp: {
        flex: 1,
        marginTop:width /100 * 3,
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
        marginBottom:width /100 * 5,
        fontSize: fontSize.ExLarge_2,
        color: "#000",
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
        backgroundColor:'#000',
        borderRadius:width / 100 * 12,
        overflow:'hidden',
        
    },
    BtnBlue: {
        width: '100%',
        borderTopLeftRadius: width / 100 * 12,
        borderBottomLeftRadius: width / 100 * 12,
        color: '#fff',
        backgroundColor: Colors.BtnTheme,
        lineHeight:width / 100 * 12,

    },
    BtnWhite: {
        width: '100%',
        borderTopRightRadius: width / 100 * 12,
        borderBottomRightRadius: width / 100 * 12,
        color: '#000',
        backgroundColor: '#fff',
        lineHeight:width / 100 * 12,
    },
    Text: {
        paddingTop: width / 100 * 8,
        paddingBottom: width / 100 * 1,
        fontSize: fontSize.Large,
        textAlign: 'center',
        lineHeight:fontSize.ExtraLarge,
    },
    ModalFootertext:{
        width:'100%',
        borderWidth:1,
        borderColor:'#5f6676',
        marginTop:30,
        borderRadius: 5,
        padding: width / 100 * 2,
        fontSize: fontSize.Medium,
        textAlign: 'justify',
    },

});


