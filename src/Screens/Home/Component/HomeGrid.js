
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import { fontSize, BorderRadius } from './../../../Assets/Constants/fontsAndColors';
import Theme from './../../../Assets/Styles/Theme';
import { request } from 'https';
import { NavigationContainer } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");
//const [selectedValue, setSelectedValue] = useState("java");
export default class HomeGrid extends Component {

    render() {
        return (
            <View >
                {this.props.Icon == "Calls" ?
                    <Image style={styles.HomeGridImg} source={require('./../Icons/Calls.png')} />
                    : this.props.Icon == "Spotcampaigns" ?
                        <Image style={styles.HomeGridImg} source={require('./../Icons/Spotcampaigns.png')} />
                        : this.props.Icon == "Googleads" ?
                            <Image style={styles.HomeGridImg} source={require('./../Icons/Googleads.png')} />
                            : this.props.Icon == "Directories" ?
                                <Image style={styles.HomeGridImg} source={require('./../Icons/Directories.png')} />
                                : null
                }
                {/*<Image source={require('./../../../Assets/Images/Icons/Calls.png')} />*/}

            </View>
            
        );
    }
}
{/*<View style={styles.HomeGridItem}>
                <View style={[styles.HomeGridIcon]}>                    
                    {this.props.Icon == "Calls" ?
                        <Image style={styles.HomeGridImg} source={require('./../Icons/Calls.png')} />
                        : this.props.Icon == "Spotcampaigns" ?
                            <Image style={styles.HomeGridImg} source={require('./../Icons/Spotcampaigns.png')} />
                            : this.props.Icon == "Googleads" ?
                                <Image style={styles.HomeGridImg} source={require('./../Icons/Googleads.png')} />
                                : this.props.Icon == "Directories" ?
                                    <Image style={styles.HomeGridImg} source={require('./../Icons/Directories.png')} />
                                    : null
                    }                    

                </View >
                <Text style={styles.HomeGridTitle} onPress={() => this.props.navigation.navigate('Calls')}>{this.props.Title}
                    
                    
                </Text>
            </View >*/}
const styles = StyleSheet.create({

    HomeGridImg: {
        width: width / 100 * 8,
        height: width / 100 * 8,
        alignSelf: 'center',

    },


});
