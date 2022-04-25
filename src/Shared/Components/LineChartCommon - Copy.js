
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ScrollView} from 'react-native';
import { fontSize, FontFamily } from './.././../Assets/Styles/Theme';
import Theme from './../../Assets/Styles/Theme';

import { Chart, VerticalAxis, HorizontalAxis, Area, Line } from 'react-native-responsive-linechart';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";



const screenWidth = Dimensions.get("window").width;
export default class LineChartCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
        }
    }

    render() {
        const data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [
                {
                    data: [10, 50, 17, 40, 15],
                    color: (opacity = 1) => '#ECEFF1', // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Sales Chart"] // optional
        };
        return (
            <ScrollView>
                <View style={[styles.container]}>
                    <Text>dfdf fgfg</Text>


                    <Text>bezier </Text>

                    <View style={[styles.MainContainer]}>

                        <LineChart
                            data={{
                                labels: ["January", "February", "March", "April", "May", "June", "1", "2", "3", "4", "5", "6","1", "2", "3", "4", "5", "6"],
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100

                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width}
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                barPercentage: 0.5,
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            //gutterSize={10}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />

                        <Text style={{ fontSize: 28, textAlign: 'center' }}> Bezier LineChart in React Native </Text>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', padding: 8,
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
    },
    MainContainer: {
        borderColor: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
