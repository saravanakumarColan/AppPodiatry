
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { getCallsData, getGoogleAdsData } from '../../../service/GetDataService';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryZoomContainer } from "victory-native";
import { FontFamily, Colors, fontSize } from '../../../Assets/Constants/fontsAndColors';
import Theme from '../../../Assets/Styles/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataAttributes = [
    { fill: "cornflowerblue" },
    { fill: "tomato" },
    { fill: "orange" },
    { fill: "gold" }
];

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 9) => `#F96E64`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 15
    },
}

export default class MonthlyChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            googleData: [],
            total: [],
            selectedValue: '60',
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {

        var defultValue = this.state.selectedValue;
        await AsyncStorage.setItem("dateRange", defultValue);

        var data = await getGoogleAdsData();
        var getTotal = await getGoogleAdsData();
        this.setState({ googleData: data.daily });
        this.setState({ total: getTotal.total });
     
    }



    render() {       
        const your_data = this.state.googleData.map((val, index) => {

            let day = val.day;
            let barvalue = parseFloat(val.amount);
            //let color = this.state.colors.filter(s => s.id === callsid)[0].color;
            //let xaxis = this.state.label.filter(s => s.id === callsid)[0].label;


            return { X: day, calls: barvalue };

        });
        return (
            <View>              
                <View style={styles.VictoryChart}>
                    <VictoryChart
                        style={{ backgroundColor: '#000' }}
                        //width={screenWidth / 100 * 89}
                        height={250}
                        domainPadding={{ x: 30 }}
                        theme={VictoryTheme.material}>

                        <VictoryBar
                            //data={data}
                            data={your_data}
                            x="X"
                            y="calls"
                            barWidth={({ index }) => index * 2 + 22}
                            alignment="middle"
                            style={{
                                data: {
                                    fill: '#DCDEDF', fontFamily: FontFamily.Regular
                                }

                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ axis: { stroke: "none", padding: 30 } }}
                        />
                        <VictoryAxis
                            crossAxis

                            style={{ axis: { padding: 30 } }}
                        />
                    </VictoryChart>
                    <View style={[styles.ChartFooter]}>
                        <Text style={[Theme.ChartFooterText]}>Website Visits</Text>
                        <Text style={[Theme.ChartFooterText]}>{this.state.total}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
    VictoryChart: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        padding: 0,
    },
    ChartFooter: {
        backgroundColor: Colors.CallsFooter,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },
});
