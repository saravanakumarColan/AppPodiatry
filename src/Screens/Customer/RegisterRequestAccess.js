
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { ScrollView,Platform,View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, Pressable, Dimensions } from 'react-native';
import { fontSize, Colors, FontFamily, BorderRadius } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';

const { width, height } = Dimensions.get('window');
export default class RegisterRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goBackScreen = async () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'>
                <View style={[styles.loginWrp]}>
                    {/*<WelcomeCard Title="My Profile" />*/}
                    <View style={Theme.HeaderArrow}>
                        <TouchableOpacity onPress={() => this.goBackScreen()}>
                            <Image style={[Theme.ArrowImg]} source={require('./../../Assets/Images/Icons/Left-Arrow.png')} /></TouchableOpacity>
                        <Text style={[Theme.WelcomeTitle, { color: "#fff", textTransform: "capitalize", fontSize: 18, fontFamily: FontFamily.Regular }]}>Sign Up</Text>
                        <Image style={[Theme.UserLogo]} source={{ uri: this.state.logo }} />
                    </View>
                {/* <View style={styles.LoginTitle}>
                    <Text style={styles.LogoText}>Register and Request Access </Text>
                </View> */}
                <View style={styles.Modal}>
                    <View style={[styles.MessageWrp]}>
                        <View style={styles.ImgWrp}>
                            <Image style={styles.TickImg} source={require('../../Assets/Images/Icons/Register_tick.png')}></Image>
                        </View>
                        <View style={[styles.SuccessWrp]}>                                    
                            <Text style={[styles.Text]}>Registration Successful </Text>
                            <Text style={[styles.ModalFootertext, {color:'#5f6676'}]}>Your request has been received. A team-member will be contacting you within 24 hours to complete the registration process. Thank you.</Text>
                        </View>
                        <View style={[styles.BtnWrp]}>
                                
                                <TouchableOpacity style={{ width: '100%', height: height / 100 * 9 }}
                                    onPress={() => this.props.navigation.navigate("Login")}>
                                    <Text style={[Theme.BtnLog, styles.BtnBlue]}>Go to Login</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    loginWrp:{
        flex:1,
        backgroundColor:'#fff',
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
        paddingTop: width / 100 * 10,
        marginBottom:width /100 * 5,
        fontSize: fontSize.Large,
        color: "#000",
        fontFamily: FontFamily.Regular,
    },
    LoginTitle: {
        //flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    Modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        //height: 300,
        width: '100%',
        /*borderColor: '#fff',*/
        marginTop: 0,
        marginLeft: 0,

    },
    MessageWrp: {
        width: '100%',
        marginBottom: width / 100 * 4,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width / 100 * 5,
        alignSelf: 'center',
    },
    SuccessWrp: {
        width: '100%',
        backgroundColor: '#fff',
        /*borderRadius: 5,*/
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FontFamily.Medium,
        paddingBottom: width / 100 * 5,
    },
    Text: {
        paddingTop: width / 100 * 8,
        paddingBottom: width / 100 * 1,
        fontSize: width / 100 * 6,
        textAlign: 'center',
        lineHeight:fontSize.ExtraLarge,
        color: 'green',
    },
    ModalFootertext:{
        width:'100%',
        // borderWidth:1,
        // borderColor:'#5f6676',
        //marginTop:30,
        // borderRadius: 5,
        padding: width / 100 * 2,
        fontSize: fontSize.Large,
        textAlign: 'justify',
    },
    TickImg:{
        resizeMode:'cover',
        width: width / 100 * 20,
        height: width / 100 * 20,
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
});


