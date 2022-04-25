
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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import { fontSize } from '../../../Assets/Constants/fontsAndColors';



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
const { width, height } = Dimensions.get('window');
export default class CallsBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: false,
            combinedData: [],
            dailyData: [],
            dataAttributes: [
                { fill: "cornflowerblue" },
                { fill: "tomato" },
                { fill: "orange" },
                { fill: "gold" }
            ],
            Chartdata: [
                { X: "Missed calls", calls: 2, fill: "#14C7FF" },
                { X: "< 1 minute", calls: 3, fill: "#F16F26" },
                { X: "< 2 minutes", calls: 4, fill: "#FF007A" },
                { X: "> 2 minutes", calls: 5, fill: "#569900" }
            ],
            Label: [
                { id: 0, label: "Missed calls"},
                { id: 1, label: "< 1 minute" },
                { id: 2, label: "< 2 minutes" },
                { id: 3, label: "> 2 minutes" }
            ],
            Colors: [
                { id: 0, color: '#14C7FF' },
                { id: 1, color: '#F16F26' },
                { id: 2, color: '#FF007A' },
                { id: 3, color: '#569900' }
            ]
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
        const data = [
            //{ quarter: 1, earnings: 3,fill: "cornflowerblue"  },
            { X: "Missed calls", calls: 3, fill: "#14C7FF" },
            { X: "< 1 minute", calls: 3, fill: "#F16F26" },
            { X: "< 2 minutes", calls: 4, fill: "#FF007A" },
            { X: "> 2 minutes", calls: 5, fill: "#569900" }
        ];
        var BarChart = this.props.ChartData;

        console.log('BarChart');
        console.log(BarChart);

        const your_data = BarChart.map((val, index) => {

            let barValue = parseFloat(val.value);
            //console.log('barValue');
            //console.log(barValue);
            let CallsID = index;
            //console.log('CallsID');
            //console.log(CallsID);
            
            let Color = this.state.Colors.filter(s => s.id === CallsID)[0].color;
            let XAxis = this.state.Label.filter(s => s.id === CallsID)[0].label;

            //let Color = this.state.Colors[0].color;
            //console.log('Color');
            //console.log(Color);

            // you can also pass an i- value, but that's up to you
            return { X: XAxis, calls: barValue, fill: Color };
            
        });
        return (
            <View>
                <View style={styles.VictoryChart}>

                    {BarChart?.length > 0 ? ( // add a ?. to check if variable is null
                        <VictoryChart
                            style={{ backgroundColor: '#000' }}
                            //width={screenWidth / 100 * 89}
                            height={250}
                            domainPadding={{ x: 30 }}
                            theme={VictoryTheme.material}>

                            <VictoryBar

                                data={your_data}

                                //data={[

                                //    { X: "Missed calls", calls: 3, fill: "#14C7FF" },
                                //    //{X: "Missed calls", calls: 3, fill: "#14C7FF" },
                                //    //{X: "< 1 minute", calls: 3, fill: "#F16F26" },
                                //    //{X: "< 2 minute", calls: 4, fill: "#FF007A" },
                                //    //{X: "> 2 minute", calls: 5, fill: "#569900" }
                                //]}
                                x="X"
                                y="calls"
                                barWidth={({ index }) => index * 2 + 60}
                                alignment="middle"
                                
                                style={{
                                    data: {
                                        fill: ({ datum }) => datum.fill,
                                        width: 30
                                    },
                                    labels: { padding: -20 }


                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{ axis: { stroke: "none", padding: 30 } }}
                            />
                            <VictoryAxis
                                crossAxis
                                
                                fixLabelOverlap={false}
                                style={{
                                    axis: { padding: 30 },
                                    axisLabel: {
                                        //fontFamily: "inherit",
                                        //fontWeight: 100,
                                        //letterSpacing: "1px",
                                        //stroke: "white",
                                        //fontSize: 20,
                                        //margin: "30px"
                                    },
                                    grid: { stroke: "lightgrey" },
                                    tickLabels: {
                                        //fontFamily: "inherit",
                                        //fontWeight: 100,
                                        //letterSpacing: "1px",
                                        //stroke: "#61dafb ",
                                        fontSize: width / 100 * 3,
                                        /*marginBlock: "20px"*/
                                    }
                                }}
                            />
                        </VictoryChart>
                    ) : (
                        <Text style={{ color: "#888", fontSize: fontSize.Medium, textAlign: 'center', paddingVertical: 10 }}>
                            No Data
                        </Text>
                    )}

                    
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
        marginBottom:20,
        padding:0,
    },
});


//{
//    this.state.isDataLoad &&
//    <BarChart
//        data={{
//            labels: //["January", "February", "March", "April", "May", "June"]
//                [
//                    this.state.combinedData.map(item => {
//                        return (
//                            item.title
//                        )
//                    })
//                ],
//            datasets: [
//                {
//                    //data:// this.state.chartValue
//                    //    this.state.combinedData.map(item => {
//                    //        return (
//                    //            item.rate
//                    //        )
//                    //    })
//                    data: this.state.combinedData.map(item => {
//                        return (
//                            item.rate
//                        )

//                    }),
//                    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
//                }
//            ]
//        }}

//        width={screenWidth / 100 * 89} // from react-native
//        height={180}
//        //yAxisLabel="$"
//        //yAxisSuffix="k"
//        yAxisInterval={1} // optional, defaults to 1
//        chartConfig={chartConfig}
//        //verticalLabelRotation={60}                    
//        bezier
//        style={{
//            marginVertical: 8,
//            borderRadius: 16,
//            paddingRight: 35,
//        }}
//    />
//}