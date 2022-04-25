
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions} from 'react-native';
import { fontSize, FontFamily } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
export default class WelcomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
            firstName: '',
            lastName: '',
            logo:''
        }
    }

    componentDidMount() {
        //this.loadApiData();
        this.getUserName();
    }

    getUserName = async () => {
        var getUserDetail = await AsyncStorage.getItem("userDetail");
        var Detail = JSON.parse(getUserDetail);
        console.log('getUserDetail dff');
        this.setState({ firstName: Detail.firstName, lastName: Detail.lastName, logo: Detail.logo });
        
        console.log('Detail 1 getLogo');
        console.log(this.state.logo);
    }


    render() {
        return (
            <View style={Theme.WelcomeCardWrp}>
                <Text style={[styles.WelcomeTitle, { color: "#fff", textTransform: "capitalize",}]}>Welcome {this.state.firstName}{this.state.lastName} </Text>
                <Image style={[styles.UserLogo]} source={{ uri: this.state.logo }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    WelcomeTitle: {
        //backgroundColor: '#000',
        alignSelf: "center",
        alignItems: "center",
        paddingLeft: width / 100 * 5,
        paddingBottom:0,
        fontSize: fontSize.Large,
        fontFamily: FontFamily.Regular,

    },
    UserLogo: {
        //backgroundColor: '#000',
        borderRadius: 50,
        marginRight: 20,
        width: width / 100 * 15,
        height: width / 100 * 15,
        resizeMode: 'contain',
    },
});
