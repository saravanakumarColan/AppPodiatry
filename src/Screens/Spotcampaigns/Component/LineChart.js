
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Picker, Button, AsyncStorage } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FontFamily, fontSize } from './../../../Assets/Constants/fontsAndColors';
import { getCallsData, getSpotCampaignsData } from '../../../service/GetDataService';
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
        fontSize: screenWidth / 100 * 3
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

            setRange: '',

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
        this._defaultRange();
    }

    loadApiData = async () => {
        var data = await getSpotCampaignsData();
        console.log('combined Data');
        console.log(data);

        this.setState({ combinedData: data.combined, dailyData: data.daily, isDataLoad: true });

        console.log("LChart data ===================");
        console.log(this.state.dailyData);



        let val = //[12, 14, 14, 14, 15, 13];
            this.state.combinedData
                .map(item => {
                    return (
                        item.rate
                    )
                });


        //this.setState({ chartValue: val, isDataLoad: true });
    }



    _defaultRange = async () => {
        // range value get form home
        var defaultRange = await AsyncStorage.getItem('rangeVal');
        // set defaultRange
        this.setState({ setRange: defaultRange });
        console.log('defaultRange');
        console.log(defaultRange);
        console.log(this.state.setRange);
    }

    _setRange = async (value) => {

        var rangeVal = value
        console.log('rageVal');
        console.log(rangeVal);

        await AsyncStorage.setItem("rangeVal", rangeVal);
        var getVal = await AsyncStorage.getItem("rangeVal");
        console.log('getVal');
        console.log(getVal);


        this.setState({ setRange: getVal });
        console.log(' rangevalue1');
        console.log(this.state.setRange);


        //await AsyncStorage.setItem("rangeVal", this.state.setRange);


        this.loadApiData();

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


        var lchartData = this.props.ChartData;
        console.log(lchartData);



        return (
            <ScrollView>
                <View style={[styles.container]}>
                    <View style={[styles.CahrtContainer]}>

                        {/*<ChartTitle Title="Spot campaigns" Value="108 (120%)" Color="#3CB66F" />*/}
                        {lchartData.length > 0 &&
                            <ScrollView horizontal={true}>
                                <LineChart
                                    data={{
                                        labels: lchartData.map(item => {
                                            return (
                                                item.day
                                            )
                                        }),//["January", "February", "March", "April", "May", "June"],
                                        datasets: [
                                            {
                                                data:// this.state.chartValue
                                                    lchartData.map(item => {
                                                        return (
                                                            item.amount
                                                        )
                                                    })

                                            }
                                        ],
                                        color: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`, // optional
                                        strokeWidth: 2 // optional
                                    }}
                                    width={900} // from react-native
                                    height={250}
                                    verticalLabelRotation={30}
                                    //yAxisLabel="$"
                                    //yAxisSuffix="k"
                                    yAxisInterval={1} // optional, defaults to 1
                                    xAxisInterval={2}
                                    chartConfig={chartConfig}
                                    bezier

                                    fromZero={false}
                                    segments={true}
                                    style={{
                                        marginVertical: 0,
                                        borderRadius: 15,
                                        paddingRight: screenWidth / 100 * 10,
                                        paddingLeft: 0,
                                        paddingBottom: screenWidth / 100 * 4,
                                        //paddingTop: 0,
                                        width: '100%',
                                        //backgroundColor:'#000',
                                    }}

                                />
                            </ScrollView>
                        }
                        {/* {this.state.chartData1.datasets !== undefined &&
                    }*/}
                    </View>
                </View>
            </ScrollView>
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
    container: {
        flex: 1,
    },

});
