
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { fontSize, Colors } from './../../Assets/Constants/fontsAndColors';

//export default class CButton extends Component {
//    render() {
//        return (
//            <Text style={styles.CButton}>{props.title}</Text>
//        );
//    }
//}
//function CButton (props){
//    //let bColor = props.BackColor;
//    //let tColor = props.TextColor;
//    //let icon = props.Icon;    

//    render() {        
//        return (
//            <Text style={styles.CButton}>{props.Title}</Text>
//        );
//    }
//};




function CButton(props) {
    const tColor = props.BackColor;
    return (
        <Text style={[styles.CButton,
            tColor === "blue" ? { backgroundColor: '#1A89BE' } : { backgroundColor: '#EAE9E9', color:'#5C5C5C' }]}>{props.Title}</Text>
    );
}
const styles = StyleSheet.create({
    CButton: {
        borderRadius: 50,
        color: '#fff',        
        //backgroundColor: tColor ? "#fff" : "#ccc",
        //backgroundColor: "#000",
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
});
export default CButton;

