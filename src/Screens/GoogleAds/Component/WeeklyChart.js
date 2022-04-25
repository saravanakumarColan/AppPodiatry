
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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
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

export default class WeeklyChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: false,
            combinedData: [],
            dailyData: [],
            total: [],
            //googleData: this.props.data.daily,
            googleData: [],
            dataAttributes: [
                { fill: "cornflowerblue" },
                { fill: "tomato" },
                { fill: "orange" },
                { fill: "gold" }
            ],
            Chartdata: [
                { X: "Missed calls", calls: 2, fill: "#14C7FF" },
                { X: "< 1 minute", calls: 3, fill: "#F16F26" },
                { X: "< 2 minute", calls: 4, fill: "#FF007A" },
                { X: "> 2 minute", calls: 5, fill: "#569900" }
            ],
            Label: [
                { id: 0, label: "Missed calls" },
                { id: 1, label: "< 1 minute" },
                { id: 2, label: "< 2 minute" },
                { id: 3, label: "> 2 minute" }
            ],
            Colors: [
                { id: 0, color: '#14C7FF' },
                { id: 1, color: '#F16F26' },
                { id: 2, color: '#FF007A' },
                { id: 3, color: '#569900' },
                { id: 4, color: '#F16F26' },
                { id: 5, color: '#FF007A' },
                { id: 6, color: '#569900' },
                { id: 7, color: '#F16F26' },
                { id: 8, color: '#FF007A' },
                { id: 9, color: '#569900' },
                { id: 10, color: '#F16F26' },
                { id: 11, color: '#FF007A' },
                { id: 12, color: '#569900' },
                { id: 13, color: '#F16F26' },
                { id: 14, color: '#FF007A' },
                { id: 15, color: '#569900' },
                { id: 16, color: '#F16F26' },
                { id: 17, color: '#FF007A' },
                { id: 18, color: '#569900' },
                { id: 19, color: '#F16F26' },
                { id: 20, color: '#FF007A' },
                { id: 21, color: '#569900' },
                { id: 22, color: '#F16F26' },
                { id: 23, color: '#FF007A' },
                { id: 24, color: '#569900' },
                { id: 25, color: '#F16F26' },
                { id: 26, color: '#FF007A' },
                { id: 27, color: '#569900' },
                { id: 29, color: '#F16F26' },
                { id: 30, color: '#FF007A' },
                { id: 31, color: '#569900' }
            ],
            selectedValue: '30',
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

        console.log("bar chart data 1 -------------------------");
        var total = this.props.data.total;
        var BarchartData = this.props.data.daily;
        console.log(BarchartData);
        console.log("bar chart data 2 -------------------------");

        var vistData = this.props.VisitData;
        console.log("VisitData");
        console.log(vistData);
        console.log("bar chart data 2 -------------------------");



        const data = [
            { x: "Mon", calls: 1, fill: "#14C7FF" },
            { x: "Tue", calls: 2, fill: "#14c7ff" },
            { x: "Wed", calls: 3, fill: "#f16f26" },
            { x: "Thu", calls: 4, fill: "#ff007a" },
            { x: "Fri", calls: 5, fill: "#569900" },
            { x: "Sat", calls: 6, fill: "#569900" },
            { x: "Sun", calls: 7, fill: "#569900" }
        ];
        const your_data = this.state.googleData.map((val, index) => {
        /*const your_data = BarchartData.map((val, index) => {*/
            let CallsID = index;
            let day = val.day;
            let barvalue = parseFloat(val.amount);
            let Color = this.state.Colors.filter(s => s.id === CallsID)[0].color;
            //let color = this.state.colors.filter(s => s.id === callsid)[0].color;
            //let xaxis = this.state.label.filter(s => s.id === callsid)[0].label;


            return { X: day, calls: barvalue, fill: Color };

           
            //return { X: XAxis, calls: barValue, fill: Color };

        });



        return (
            <View>
                {/*******************/}
                {/*******************/}
                
                {/*******************/}


                <View style={styles.VictoryChart}>

                    {BarchartData?.length > 0 ? ( // add a ?. to check if variable is null
                        <ScrollView horizontal={true}>
                            <VictoryChart
                                style={{ backgroundColor: '#000' }}
                                width={450}
                                height={230}
                                domainPadding={{ x: 30 }} 
                                theme={VictoryTheme.material}>

                                <VictoryBar
                                    //data={data}
                                    data={your_data}
                                    x="X"
                                    y="calls"
                                    barWidth={({ index }) => index * 2 + 50}
                                    alignment="middle"
                                    // style={{
                                    //     data: {
                                    //         fill: '#a1a4a5', fontFamily: FontFamily.Regular //#DCDEDF
                                    //     }

                                    // }}
                                    style={{
                                        data: {
                                            fill: ({ datum }) => datum.fill,
                                            width: 30
                                        },
                                        // labels: { padding: -20 }
    
    
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    style={{ axis: { stroke: "none", padding: 10 } }}
                                />
                                <VictoryAxis
                                    crossAxis

                                    style={{ axis: { padding: 10 } }}
                                />
                            </VictoryChart>

                        </ScrollView>
                    ) : (
                            <Text style={{ color: "#888", fontSize: fontSize.Medium, textAlign: 'center', paddingVertical: 10 }}>
                                No Data
                            </Text>
                    )}
                    
                    <View style={[styles.ChartFooter]}>
                        <Text style={[Theme.ChartFooterText]}>Last 30 days </Text>
                        <Text style={[Theme.ChartFooterText]}>{total}</Text>
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
