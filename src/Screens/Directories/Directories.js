
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Alert, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import { fontSize, BorderRadius, FontFamily } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';
import { getDirectoriesData } from '../../service/GetDataService';
//import WelcomeCard from './../../Shared/Components/WelcomeCard';

//import { getCallsData } from '../../service/CallDataService';

const { width, height } = Dimensions.get("window");
//const [selectedValue, setSelectedValue] = useState("java");
export default class Directories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            directories:[],
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async() => {
        //var dat = await getCallsData();
        var data = await getDirectoriesData();
        console.log("api data");
        console.log(data);
        this.setState({ directories: data});
    }

    render() {
        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView style={Theme.scrollView}>
                    <View style={styles.PageContainer}>
                        <View style={[styles.bannerItem]}>
                            <Text style={[styles.bannerText, {paddingTop: 5}]}>Interactions</Text>
                            <Text style={[styles.bannerText,{paddingBottom:5}]}>{this.state.directories.amount}</Text>
                            <Image style={[styles.bannerImg]} source={{ uri: this.state.directories.logo }} />
                            {/*<Image style={[styles.bannerImg]} source={{ uri: 'https://staging.grayfish.com/images/dashboard/directories1.png' }} />*/}

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
    bannerlist: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.10,
        elevation: 4,
    },
    bannerItem: {
        backgroundColor: '#fff',
        //flex: 0.4,        
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 50,
        shadowColor: '#888',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
        
    },
    bannerImg: {
        resizeMode: "contain",
        //width: width,
        height: height,
        flex:1,
    },
    bannerText: {
        //height: 40,
        backgroundColor: '#E7B304',
        //flex: 1,
        justifyContent: "center",
        textAlign: "center",
        //paddingTop: 5,
        //paddingBottom: 5,
        color: '#fff',
        fontFamily: FontFamily.Regular,
        fontSize: 18,
    }
});
