
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { fontSize, Colors, FontFamily } from './../../Assets/Constants/fontsAndColors';


class FormLabel extends Component {

    render() {        
        return (
            <Text style={styles.FormLabel}>{this.props.Label}</Text>
        );
    }
}
const styles = StyleSheet.create({
    FormLabel: {
        fontSize: fontSize.Medium,
        paddingLeft: 15,
        color: Colors.F_label,
        fontFamily: FontFamily.Regular,
    },
});
export default FormLabel;

