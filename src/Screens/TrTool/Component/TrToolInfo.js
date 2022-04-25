
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import Theme from '../../../Assets/Styles/Theme';
import { fontSize, Colors, FontFamily} from '../../../Assets/Constants/fontsAndColors';



//const [selectedValue, setSelectedValue] = useState("java");

export default class TrToolInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            v1Visible: true,
            v2Visible: false
        }
    }

    //componentDidMount() {
    //    this.loadApiData();
    //}

    //loadApiData = async () => {
    //    var dat = await getCallsData();
    //    console.log("api data");
    //    this.setState({ combinedData: dat.combined, dailyData: dat.daily });
    //}

    render() {
        return (
            <View style={Theme.TrInfoWrp}>
                <Text style={{ fontFamily: FontFamily.Regular, color: '#454545', fontSize: fontSize.ExtraLarge_50, marginBottom: 10, }}>{this.props.Title}</Text>
                <Text style={{fontFamily: FontFamily.Regular, color: '#747474', fontSize: fontSize.lightMedium, color: Colors.Desc_gray, marginBottom: 15, }}>{this.props.Desc}</Text>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 0,
        backgroundColor: "#000",
    },

});
