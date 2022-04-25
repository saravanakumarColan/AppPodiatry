
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { BorderRadius } from '../../Assets/Constants/fontsAndColors';
//import { height } from '../../Assets/Constants/fontsAndColors';


const { width, height } = Dimensions.get("window"); 

class FormIcon extends Component {  

    render() {
        return (
            <View style={styles.FormIconWrp}>
                {this.props.FormIcon == "User" ?
                    <Image style={styles.FormIcon} source={require('../../Assets/FormIcons/User.png')} />
                    : this.props.FormIcon == "Password" ?
                        <Image style={styles.FormIcon} source={require('../../Assets/FormIcons/Password.png')} />
                        : this.props.FormIcon == "Phone" ?
                            <Image style={styles.FormIcon} source={require('../../Assets/FormIcons/Phone.png')} />
                            : this.props.FormIcon == "Email" ?
                                <Image style={styles.FormIcon} source={require('../../Assets/FormIcons/Email.png')} /> 
                                :
                            null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    FormIconWrp: {
        //flex: 0.2,
        borderRadius: BorderRadius.WelcomCard,
        borderWidth: 2,
        width: width/ 100 * 15,
        height: width / 100 * 15,
        backgroundColor: '#fff',
        padding: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 11111,
        justifyContent: 'center',


    },
    FormIcon: {
        width: width / 100 * 8,
        height: height / 100 * 5,
        alignSelf: 'center',


    },
});
export default FormIcon;

