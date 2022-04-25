
import React, { Component, useState ,useRef} from 'react';
import { ScrollView,Platform,View,Button, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, Pressable, Dimensions } from 'react-native';
import GoogleReCaptcha from 'rn-google-recaptcha-v2';
const siteKey = '6LdKloUeAAAAAJs6OqwhGxQU5p0qSGVU1WiyIt81';
const baseUrl = 'https://podiatrycontentconnection.com/';
export default class RecaptchaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recaptchaViewHeight: 90 //initial default height
        };
        
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


   

    render() {
        const { recaptchaViewHeight } = this.state;
       

        return (
           <View style={{width:'100%'}}>
               <GoogleReCaptcha
                    style={{ height: recaptchaViewHeight}}
                    siteKey={siteKey}
                    url={baseUrl}
                    languageCode="en"
                    onMessage={this.onRecaptchaEvent} />
                 
           </View>
        );
    }
}
