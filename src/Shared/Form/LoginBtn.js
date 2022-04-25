
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { fontSize, Colors } from './../../Assets/Constants/fontsAndColors';
import Theme from '../../Assets/Styles/Theme';


class LogButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {        
        let title1 = this.props.Title1;
        let title2 = this.props.Title2;
        return (
            <View style={styles.LogButton}>
                <Text style={[styles.BtnLog, styles.BtnBlue]} onPress={() => this.props.TItle1Click } >{title1}</Text> 
                <Text style={[styles.BtnLog, styles.BtnWhite]} onPress={() => this.props.TItle2Click}>{title2}</Text>                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    LogButton: {
        justifyContent: "space-around",
        flexDirection: "row",
        //backgroundColor: '#888',
        padding: 0,
        //flex:0.5,
        justifyContent: "center",
        textAlign: "center",
        alignSelf: "center",
        alignItems: "center",
        
    },
    BtnLog: {
        flex: 0.5,
        //height: 50,
        padding:15,
        fontSize: fontSize.Large,
        fontWeight: "bold",

        justifyContent: "center",        
        textAlign: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 5.27,

        elevation: 6,
    },
    BtnBlue: {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        color: '#fff',
        backgroundColor: Colors.BtnTheme,
        
        fontSize: fontSize.Large_50,
    },
    BtnWhite: {
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        color: '#000',
        backgroundColor: '#fff',                
    }
});
export default LogButton;

