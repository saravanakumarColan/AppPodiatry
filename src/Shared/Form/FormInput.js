
import React, { Component } from 'react';
import { Image, SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import FormIcon from './FormIcon';


const { width, height } = Dimensions.get("window");
const FormInput = (props) => {
    //const [text, onChangeText] = React.useState("Useless Text");
    //const [number, onChangeNumber] = React.useState(null);

    return (
        <View style={[styles.FormInputWrp]}>            
            <FormIcon FormIcon={props.Icon}/>
            <TextInput
                style={styles.input}
            //placeholder={this.props.placeholder}
            //onChangeText={onChangeText}
            //value={text}
            />
        </View>
        
        
    );
};
const styles = StyleSheet.create({
    FormInputWrp: {        
        flexDirection: 'row',
        alignItems: 'center',
    },       
    input: {
        //width: width / 100 * 1,
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderRadius: 50,
        flex: 1,        
        backgroundColor: '#fff',
        paddingLeft:50,
    },
});
export default FormInput;

