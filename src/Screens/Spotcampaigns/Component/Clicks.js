
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import Theme from '../../../Assets/Styles/Theme';
import { FontFamily } from '../../../Assets/Constants/fontsAndColors';


export default class Clicks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: this.props.banners,
        } 
    }
    componentDidMount() {
        this.banners();
    }

    banners = () => {
        //var bannersList = this.props.banners;
        //this.setState({ banners: bannersList })
        //console.log('banners props');
        //console.log(bannersList);
        //console.log(this.props.banners);
        //console.log('banners var');
        //console.log(bannersList);
        console.log('banners 2');
        console.log(this.state.banners);

        return this.state.banners.map((data) => {
            return (
                <View style={[styles.bannerItem]} key={data.key}>
                    <Image style={[styles.bannerImg]} source={{ uri: data.image }} />
                    {/*<Image style={[styles.bannerImg]} source={require('./../../../Assets/Images/HomeBanner.png')} />*/}
                    <Text style={[styles.bannerText]}>{data.title}</Text>
                </View>
                )
        });
    }

    render() {
        return (

            <View style={[styles.bannerlist]}>      
                {this.banners()}               
            </View>
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
        backgroundColor: '#ccc',
        //flex: 0.4,        
        width:'47%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
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
        resizeMode: "stretch",
        width: '100%',
        height: 110,
    },
    bannerText: {
        backgroundColor: '#949494',
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        color: '#fff',
        fontFamily: FontFamily.Regular,
        fontSize: 15,
    }
});
