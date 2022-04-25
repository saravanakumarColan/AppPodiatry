
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Colors, FontFamily, fontSize } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import CButton from './../../Shared/Form/CButton';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import { logoutUser, postLoginData } from '../../service/GetDataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeCard from '../../Shared/Components/WelcomeCard';
import Login from '../Customer/Login';
import Reset from '../Customer/Reset';


const { width, height } = Dimensions.get('window');
export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetail: [],
        }
    }

    componentDidMount() {
        this.getUserDetail();
        this.userDetail();
    }

    getUserDetail = async () => {


        //var response = await postLoginData();
        //var userId = await AsyncStorage.getItem("userid");
        //var token = await AsyncStorage.getItem("token");
        //var username = await AsyncStorage.getItem("username");
        //var email = await AsyncStorage.getItem("email");
        //var firstName = await AsyncStorage.getItem("firstName");
        //var lastName = await AsyncStorage.getItem("lastName");
        ////this.setState({});

        //console.log("responsive");
        //console.log(response);
    }

    userDetail = async () => {
        var getUserDetail = await AsyncStorage.getItem("userDetail");
        var Detail = JSON.parse(getUserDetail);
        //console.log('userDetail');
        //console.log(Detail);
        this.setState({ UserDetail: Detail });
        console.log('email');
        console.log(Detail);
        console.log(this.state.UserDetail.userId);
    }

    logOut = async () => {
        await logoutUser();
        console.log('dfdf');
        this.props.navigation.navigate("Login");
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
                        <WelcomeCard Title="My Profile" />
                        {/* <View style={[styles.AaccessTable]}>
                            <View style={[styles.TableList]}>
                                <View style={[styles.TableItem]}>
                                    <Text>access</Text>
                                    <Text>item</Text>
                                </View>
                            </View>
                        </View>*/}

                        <View style={[styles.LoginWrp]}>
                            <View style={Theme.FormWrp}>
                                {/*<View style={Theme.FormGroup}>*/}
                                {/*    <View>*/}
                                {/*        <FormLabel Label="User Name" />*/}
                                {/*    </View>*/}
                                {/*    <View style={[Theme.FormInputWrp]}>*/}
                                {/*        <FormIcon FormIcon="User" />                                 */}
                                {/*        <Text style={Theme.input}>{this.state.UserDetail.username}</Text>*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="Email" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="Email" />
                                        <Text style={styles.input}>{this.state.UserDetail.username}</Text>
                                    </View>
                                </View>
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="First Name" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="User" />
                                        <Text style={styles.input}>{this.state.UserDetail.firstName}</Text>
                                    </View>
                                </View>
                                <View style={Theme.FormGroup}>
                                    <View>
                                        <FormLabel Label="Last Name" />
                                    </View>
                                    <View style={[Theme.FormInputWrp]}>
                                        <FormIcon FormIcon="User" />
                                        <Text style={styles.input}>{this.state.UserDetail.firstName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.BtnWrp, { marginTop: 40, }]}>
                                {/*<TouchableOpacity style={{ width: '50%' }} onPress={() => this.props.navigation.navigate("Reset")}>
                                    <Text style={[Theme.BtnLog, styles.BtnBlue]} >RESET</Text>
                                </TouchableOpacity>*/}
                                <TouchableOpacity style={{ width: '100%' }} onPress={() => this.logOut()}>
                                    <Text style={[Theme.BtnLog, styles.BtnWhite]}  >LOGOUT</Text>
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
    AaccessTable: {
        width: '100%',
        justifyContent: "center",
        marginTop: 20,
        alignContent: "center",
        alignItems: "center",
    },
    TableList: {
        width: '90%',
        alignSelf: "center",
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 5.27,
        elevation: 6,


    },
    TableItem: {
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    LogOutBtn: {
        borderRadius: 50,
        color: '#000',
        backgroundColor: '#EAE9E9',
        padding: 15,
        textAlign: "center",
        fontSize: fontSize.Large,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 5.27,
        elevation: 6,
    },
    BtnWrp: {
        flexDirection: 'row',
        width: '100%',
        //backgroundColor:'#000',
    },
    BtnBlue: {
        width: '100%',
        borderTopLeftRadius: width / 100 * 8,
        borderBottomLeftRadius: width / 100 * 8,
        color: '#fff',
        backgroundColor: Colors.BtnTheme,
        fontSize: fontSize.Large_50,
    },
    BtnWhite: {
        width: '100%',
        borderRadius: width / 100 * 8,
        //borderTopRightRadius: width / 100 * 12,
        //borderBottomRightRadius: width / 100 * 12,
        color: '#000',
        backgroundColor: '#fff',
        overflow:'hidden',
        lineHeight:width / 100 * 7,
    },
    input: {
        width: width / 100 * 90,
        height: height / 100 * 6.5,
        margin: 12,
        borderWidth: 2,
        borderRadius: width / 100 * 7,
        //flex: 0.9,
        backgroundColor: '#fff',
        paddingLeft: width / 100 * 14,
        fontFamily: FontFamily.Regular,
        textAlignVertical: "center",
        color: '#263238',
        fontSize: width / 100 * 4,
        lineHeight: width / 100 * 12,
        //lineHeight:20,
        overflow:'hidden'


    },
});

//export default MyProfile;


