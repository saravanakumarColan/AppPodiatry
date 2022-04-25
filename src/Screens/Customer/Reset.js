
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, AsyncStorage } from 'react-native';
import { FontFamily, fontSize } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import LogButton from './../../Shared/Form/LoginBtn';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import CButton from '../../Shared/Form/CButton';
import { resetPassword, resetUserData } from '../../service/GetDataService';
import WelcomeCard from '../../Shared/Components/WelcomeCard';
import MyProfile from '../MyAccount/MyProfile';
import Login from './../Customer/Login';

const { width, height } = Dimensions.get('window');
export default class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            userEmail: '',
            error: false,
            isValid: false,
            status: '',
            message: ''
        }
    }

    componentDidMount() {
        this.getUserLogo();
        //this._resetPass();
    }

    resetUserSubmit = async (values) => {
        var resetVal = {
            "email": values.Email,
            "password": values.Password
        };
        var response = await resetUserData(resetVal);
    }

    getUserLogo = async () => {
        var getUserDetail = await AsyncStorage.getItem("userDetail");
        var Detail = JSON.parse(getUserDetail);
        this.setState({ logo: Detail.logo });
    }

    goBackScreen = async () => {
        this.props.navigation.navigate("Login");
    }
    _resetPass = async () => {
        var value = this.state.userEmail;
        console.log(value);
        if (value !== '') {
            console.log("not empty");
            var email = { "user": this.state.userEmail };
            //var vjson = JSON.parse(email);
            var respons = await resetPassword(email);
            console.log(email);
            console.log(respons);
            this.setState({ status: respons.status, message: respons.message, isValid: true });
        }
        else {
            console.log("empty1");
            this.setState({ error: true, isValid: false });
        }
    }
    _validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            //console.log("Email is Not Correct");
            this.setState({ userEmail: text, isValid: false })
            return false;

        }
        else {
            this.setState({ userEmail: text })
            //console.log("Email is Correct");
           // return true;
        }
    }
    render() {
        const validateInputs = yup.object({
            Email: yup.string("enter your email").required("Enter Your Email"),
            Phone: yup.string().required()
        });
        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView style={Theme.scrollView}>
                    <View style={Theme.PageContainer}>
                        {/*<WelcomeCard Title="My Profile" />*/}
                        <View style={Theme.HeaderArrow}>
                            <TouchableOpacity onPress={() => this.goBackScreen()}>
                                <Image style={[Theme.ArrowImg]} source={require('./../../Assets/Images/Icons/Left-Arrow.png')} /></TouchableOpacity>
                            <Text style={[Theme.WelcomeTitle, { color: "#fff", textTransform: "capitalize", fontSize: 18, fontFamily: FontFamily.Regular }]}>Reset Password</Text>
                            <Image style={[Theme.UserLogo]} source={{ uri: this.state.logo }} />
                        </View>
                        {/* <View style={[styles.AaccessTable]}>
                            <View style={[styles.TableList]}>
                                <View style={[styles.TableItem]}>
                                    <Text>access</Text>
                                    <Text>item</Text>
                                </View>
                            </View>
                        </View>*/}

                        <View style={[styles.LoginWrp]}>
                            {this.state.isValid &&
                                <View style={[Theme.MessageWrp]}>
                                    <View style={[Theme.MessageCol, this.state.status == 'error' ? Theme.ErrorWrp : Theme.SuccessWrp]}>
                                        {this.state.status == 'error' ?
                                            <Image style={[Theme.MessageImg, { tintColor: '#c5030c', }]} source={require('../../Assets/Images/Icons/error.png')} />
                                            : <Image style={[Theme.MessageImg, { tintColor: '#06bb14', }]} source={require('../../Assets/Images/Icons/success.png')} />
                                        }
                                        <Text style={[Theme.MessageText, { color: this.state.status == 'error' ? '#842029' : '#0f5132', fontSize: width / 100 * 5, }]}>{this.state.status}</Text>
                                        <Text style={[Theme.MessageText, { color: this.state.status == 'error' ? '#842029' : '#0f5132', fontSize: width / 100 * 4, }]}>{this.state.message}</Text>
                                    </View>
                                </View>}
                            <View style={Theme.FormWrp}>
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="User Email" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="Email" />
                                        <TextInput
                                            style={[Theme.input]}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#888"
                                            onChangeText={
                                                (e) =>
                                                    //this.setState({ userEmail: e })
                                                    this._validate(e)}
                                            value={this.state.userEmail}
                                        />


                                    </View>
                                    {this.state.error && < Text style={[Theme.TextError]} >Enter your registered email</Text>}
                                </View>
                            </View>
                            <View style={[Theme.BtnWrp, { marginTop: 40, }]}>
                                <TouchableOpacity style={[Theme.CButton, { alignContent: 'center', backgroundColor: '#1A89BE', color: '#FFF' }]}
                                    onPress={() =>this._resetPass()}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        color: '#fff', FontFamily: FontFamily.Medium, fontSize: fontSize.Large
                                    }} >Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

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
});


{/*<View style={[styles.LoginWrp]}>
    <Formik
        enableReinitialize
        initialValues={
            {
                Email: '',
                Phone:'',
                Password: '',
                RetypePassword: ''
            }
        }
        validationSchema={validateInputs}
        onSubmit={(values, actions) => {
            this.resetUserSubmit(values);
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
                        <TextInput
                            style={Theme.input}
                            placeholder="Email"
                            onChangeText={props.handleChange('Email')}
                            onBlur={props.handleBlur('Email')}
                            value={props.values.Email}                                    
                        />
                    </View>
                    <Text style={Theme.TextError} >{props.touched.Email && props.errors.Email}</Text>
                </View>
                <View style={Theme.FormGroup}>
                    <View>
                        <FormLabel Label="Phone" />
                    </View>
                    <View style={[Theme.FormInputWrp]}>
                        <FormIcon FormIcon="Phone" />
                        <TextInput
                            style={Theme.input}
                            placeholder="Phone"
                            onChangeText={props.handleChange('Phone')}
                            onBlur={props.handleBlur('Phone')}
                            value={props.values.Phone}
                        />
                    </View>
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
                <View style={Theme.FormGroup}>
                    <View>
                        <FormLabel Label="Retype-Password" />
                    </View>
                    <View style={[Theme.FormInputWrp]}>
                        <FormIcon FormIcon="Password" />
                        <TextInput
                            style={Theme.input}
                            placeholder="Password"
                            onChangeText={props.handleChange('RetypePassword')}
                            onBlur={props.handleBlur('RetypePassword')}
                            value={props.values.RetypePassword}
                        />
                    </View>
                </View>
                <View style={[Theme.BtnWrp, { marginTop: 40, }]}>
                    <Text style={[Theme.CButtonBlue]} onPress={props.handleSubmit}>SAVE</Text>
                    <CButton Title="SAVE" BackColor="blue" />
                </View>
            </View>
        )}
    </Formik>                
</View >*/}