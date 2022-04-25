
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { fontSize } from './../../Assets/Constants/fontsAndColors';
import FormLabel from './../../Shared/Form/FormLabel';
import Theme from './../../Assets/Styles/Theme';
import LogButton from './../../Shared/Form/LoginBtn';
import FormIcon from './../../Shared/Form/FormIcon';
import { Formik } from 'formik';
import * as yup from 'yup';
import CButton from '../../Shared/Form/CButton';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {           
        }
    }

    render() {        
        return (
            <View style={[styles.LoginWrp]}>   
                <View style={Theme.FormWrp}>
                    <View style={Theme.FormGroup}>
                        <View>
                            <FormLabel Label="Email" />
                        </View>
                        <View style={[Theme.FormInputWrp]}>
                            <FormIcon FormIcon="User" />
                            <TextInput
                                style={Theme.input}
                                placeholder="User"
                            //onChangeText={onChangeText}
                            //value={text}
                            />
                        </View>
                    </View>                    
                </View>   
                <View style={[Theme.BtnWrp, { marginTop: 40, }]}>
                    <Text style={[Theme.CButtonBlue]}>Send Email</Text>
                    {/*<CButton Title="SAVE" BackColor="blue" />*/}
                    
                </View>
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
});


