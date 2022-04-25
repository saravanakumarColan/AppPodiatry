
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { fontSize, FontFamily } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';



export default class ChartTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
        }
    }

    render() {
        return (
            <View style={[styles.LinechartTitle]}>
                <Text style={{ color: this.props.Color, fontFamily: FontFamily.Regular, fontSize: 14 }}>{this.props.Title}</Text>
                <Text style={{ color: '#303139', fontFamily: FontFamily.Regular, fontSize: 14 }}>{this.props.Value}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    LinechartTitle: {
        position: "absolute",
        top: 10,
        left: 50,
        zIndex: 111
    },

});
