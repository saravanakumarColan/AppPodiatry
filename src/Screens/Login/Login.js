
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Modal, Alert ,Pressable} from 'react-native';
import { fontSize } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import LogButton from './../../Shared/Form/LoginBtn';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import { postLoginData } from '../../service/GetDataService'; 

import HomeNavigation from './../../Router/Navigation';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
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
            Alert.alert("Success");
            //Alert.alert(alertModalValid());
            //debugger;
            this.props.navigation.navigate("BottomTabs");
            //return <HomeNavigation />;
        }
        else {
            //Alert.alert('alertModalInvalid');
            Alert.alert("Failure");
            //this.setModalVisible(true);
        }
    }
    reSetClick = () => {
    };

    alertModalValid = () => {
        <View>
            <Text>login successful</Text>
        </View>
    };
    alertModalInvalid = () => {
        <View>
            <Text>invalid credentials</Text>
        </View>
    };

    render() {
        const validateInputs = yup.object({
            //UserName: yup.string("enter your email").email("Invalid email address.").required("Enter Your Email"),
            UserName: yup.string("enter your email").required("Enter Your Email"),
            Password: yup.string().required()
        });
        const handleReset = (resetForm) => {
            if (window.confirm('Reset?')) {
                resetForm();
            }
        };

        const { modalVisible } = this.state;

        return (
            <View style={[styles.LoginWrp]}>

                <View style={styles.LoginLogoWrp}>
                    <Image style={styles.loginLogo} source={require('../../Assets/Images/Logo.png')} />
                    {/*<Image style={styles.loginLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }} />*/}
                    <Text style={styles.LogoText}>LOGO </Text>
                </View>
                <View style={styles.LoginTitle}>
                    <Text style={styles.LogoText}>Sign In </Text>
                </View>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            UserName: '', Password: ''
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
                                        placeholder="email"
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
                                        placeholder="Password"
                                        onChangeText={props.handleChange('Password')}
                                        onBlur={props.handleBlur('Password')}
                                        value={props.values.Password}
                                    />
                                </View>
                            </View>
                            
                            <View style={[Theme.BtnWrp, { marginTop: 40 }]}>
                                {/*<LogButton Title1="SIGNIN" Title2="RESET" TItle1Click={props.handleSubmit} TItle2Click={this.reSetClick()} />*/}
                                <View style={Theme.LogButton}>
                                    <Text style={[Theme.BtnLog, Theme.BtnBlue]} onPress={props.handleSubmit}>SIGNIN</Text>
                                    <Text style={[Theme.BtnLog, Theme.BtnWhite]} onPress={() => this.props.navigation.navigate("Reset")}>RESET </Text>
                                </View>
                                {/*<Text onPress={ props.handleSubmit } >Login</Text>*/}
                            </View>
                            <View style={Theme.ForgotLink}>
                                <Text style={Theme.ForgotText}>Forgot password</Text>
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
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    LoginWrp: {
        flex: 1,
        padding: 15,
    },
    LoginLogoWrp: {
        flex: 0.3,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    LogoText: {
        fontSize: fontSize.ExLarge_2,
        color: "#000",
    },
    LoginTitle: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    loginLogo: {
        width: 50,
        height: 50,
        justifyContent: "center",
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
        marginBottom: 15,
        textAlign: "center"
    }
});


