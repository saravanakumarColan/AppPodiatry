
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
import { getCallsData } from '../../../service/GetDataService';




const screenWidth = Dimensions.get('window').width;
const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 9) => `#F96E64`,
    labelColor: (opacity = 1) => `#888`,
    style: {
        borderRadius: 15
    },
}

export default class SpotBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: false,
            combinedData: [],
            dailyData: [],
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {
        var data = await getCallsData();
        console.log('combined Data');
        console.log(data);
        this.setState({ combinedData: data.combined, dailyData: data.daily, isDataLoad: true });
        //let val = //[12, 14, 14, 14, 15, 13];
        //    this.state.combinedData
        //        .map(item => {
        //            return (
        //                item.rate
        //            )
        //        });
        //this.setState({ chartValue: val, isDataLoad: true });

        console.log(
            this.state.combinedData.map(item => {
                return (
                    item.title
                )
            })
        )
    }



    render() {
        const config = {
            series: [1, 2, 3, 4, 5],
            options: {
                chart: {
                    toolbar: {
                        show: true
                    },
                }
            }
        }
        return (
            <View>
                <Text>bar </Text>
                
                {/*<ReactApexChart options={config.options} series={config.series} type="polarArea" />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
});
