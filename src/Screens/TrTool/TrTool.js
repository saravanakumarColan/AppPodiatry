
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView,StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button, CheckBox } from 'react-native';
import Theme from '../../Assets/Styles/Theme';
import WelcomeCard from '../../Shared/Components/WelcomeCard';
import Email from './Component/Email';
import SMS from './Component/SMS';
import getStatisticsData from './../../service/GetDataService';
import { accessSync } from 'fs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//const [selectedValue, setSelectedValue] = useState("java");

export default class TrTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            v1Visible: true,
            v2Visible: false,
            
        }
    }

    componentDidMount() {
        //this.loadApiData();        
    }

 

    //loadApiData = async () => {
    //    var data = await getStatisticsData();
    //    console.log('tr tool Data');
    //    console.log(data);

    //}
    
    render() {

        
        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView style={Theme.scrollView}>
                <KeyboardAwareScrollView 
                // style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false} >


                    <View style={Theme.PageContainer}>

                        <WelcomeCard Title="Tr Tool " />
                        <View style={[styles.TrToolContent]}>                            
                            <View style={[Theme.CustomTabsWrp, { marginBottom: 10 }]}>
                                <View style={Theme.CustomTabsNav}>
                                    <Text
                                        style={[Theme.CustomTabs,
                                            this.state.v1Visible && Theme.CustomTabsActive,
                                            { width: '46%' }
                                        ]}
                                        onPress={() => this.setState({ v1Visible: true, v2Visible: false })}>SMS</Text>
                                    <Text style={[Theme.CustomTabs,
                                        this.state.v2Visible && Theme.CustomTabsActive,
                                        { width: '46%' }
                                    ]}
                                        onPress={() => this.setState({ v2Visible: true, v1Visible: false })}>EMAIL</Text>
                                </View>
                                {this.state.v1Visible && <View><SMS /></View>}
                                {this.state.v2Visible && <View><Email /></View>}
                            </View>
                        </View>
                       
                        
                    </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    
    TrToolContent: {
        //flex: 0.8,
        //backgroundColor: "#000",
        padding: 20
    }

});
