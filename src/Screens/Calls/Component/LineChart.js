
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
import { FontFamily } from '../../../Assets/Constants/fontsAndColors';
import Theme from '../../../Assets/Styles/Theme';
import ChartTitle from '../../../Shared/Components/ChartTitle';


const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    //color: (opacity = 9) => `#F96E64`,
    color: (opacity = 1) => `rgba(249, 110, 100, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 15
    },
    propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#fff"
    },
};
export default class CallsLineChart extends Component {

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
                <ChartTitle Title="Calls" Value="95 (105%)" Color="#F96E64" />
                {this.state.isDataLoad &&
                    <ScrollView horizontal={true}>
                        <LineChart
                            data={{
                                //labels: ["January", "February", "March", "April", "May", "June"],
                                datasets: [
                                    {
                                        data:// this.state.chartValue
                                            this.state.dailyData.map(item => {
                                                return (
                                                    item.amount
                                                )
                                            })

                                    }
                                ]
                            }}
                            //width={screenWidth / 100 * 89} // from react-native
                            width={900}
                            verticalLabelRotation={30}
                            height={150}
                            //fromZero


                            //xLabelsOffset={10}

                            //withHorizontalLines={false}
                            //withVerticalLines={false}
                            //withHorizontalLabels={false}
                            //withInnerLines={false}
                            //withOuterLines={false}
                            //withScrollableDot={ true}



                            //yAxisLabel="$"
                            //yAxisSuffix="k"
                            //yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                //marginVertical: 0,
                                //borderRadius: 15,
                                paddingRight:35,
                                marginVertical: 8,
                                borderRadius: 16,
                                paddingLeft:0,
                            }}
                        />
                    </ScrollView>
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
        position: "relative",

        //width: 320,

        //backgroundColor: '#000',
        //overflow: "hidden"
    },
});
