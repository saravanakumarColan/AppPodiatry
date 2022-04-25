
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
import ChartTitle from '../../../Shared/Components/ChartTitle';


const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(60, 182, 111, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForLabels: {
        fontSize: "14"
    },
    style: {
        borderRadius: 15,
            margin: 0,
        padding: 0,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#fff"
    }
};
export default class SpotLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: false,

            combinedData: [],
            dailyData: [],
            chartValue: [], //12, 14, 15, 13, 15, 13],
            Ddata: {
                labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
                datasets: [
                    {
                        data: [50, 45, 28, 80, 99, 43],

                    }
                ]
            }
        }
    }

    componentDidMount() {
        this.loadApiData();
        //this.getChartData();
    }

    loadApiData = async () => {
        var data = await getCallsData();
        console.log('combined Data');
        console.log(data);
        this.setState({ combinedData: data.combined, dailyData: data.daily, isDataLoad: true });
        let val = //[12, 14, 14, 14, 15, 13];
            this.state.combinedData
                .map(item => {
                    return (
                        item.rate
                    )
                });
        //this.setState({ chartValue: val, isDataLoad: true });
    }

    render() {
        //const data = {
        //    labels: ["1", "2", "3", "4", "5", "6"],
        //    datasets: [
        //        {
        //            //data: this.state.combinedData.map(item => {
        //            //    return (
        //            //        item.rate

        //            //    )
        //            //}),
        //            data: [13.6, 25.38, 22.66, 38.37],

        //            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        //            strokeWidth: 2 // optional
        //        }               
        //    ],
        //    legend: ["Rainy Days"] // optional

        //};



        return (
            <View style={[styles.CahrtContainer]}>

                <ChartTitle Title="Spot campaigns" Value="108 (120%)" Color="#3CB66F" />
                {this.state.isDataLoad &&
                    <LineChart
                        data={{
                            //labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data:// this.state.chartValue
                                        this.state.combinedData.map(item => {
                                            return (
                                                item.rate
                                            )
                                        })

                                }
                        ],
                            color: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                        }}
                        width={screenWidth / 100 * 89} // from react-native
                        height={150}
                        //yAxisLabel="$"
                        //yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 0,
                            borderRadius: 15,
                            paddingRight:35,
                            paddingLeft:0,
                            //paddingTop: 0,
                            width:'100%',
                            //backgroundColor:'#000',
                        }}
                    />
                }
                {/* {this.state.chartData1.datasets !== undefined &&
                    }*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CahrtWrp: {
        //width: 360,
        //backgroundColor: '#888',
        //overflow: "hidden"

    },
    CahrtContainer: {
        width: 320,
        //backgroundColor: '#000',
        //overflow: "hidden"
    },
});
