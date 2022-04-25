
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
import { getCallsData } from './../../service/GetDataService';
import { FontFamily, fontSize } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';
import ChartTitle from './../Components/ChartTitle';

const screenWidth = Dimensions.get("window").width;


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
export default class LineChartCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: true,
            setRange: '',

            //getGange: this.props.Range,


            //CallsDailyData: this.props.ChartData,


            combinedData: [],
            dailyData: [],

            isActive: true,


            data: {
                labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
                datasets: [
                    {
                        data: ["10", "2", "3"]
                    }
                ]
            }
        }

    }
    componentDidMount() {
       /* this.loadApiData();*/

    }




    loadApiData = async () => {

       

        //this.setState({ dailyData: lchartData });
        //console.log("Line chart data -------------------------");
        //console.log(dailyData);

        //var data = await getCallsData();
        //console.log('combined Data');
        //console.log(data);
        /*this.setState({ combinedData: data.combined, dailyData: data.daily, isDataLoad: true });*/

        //let val = //[12, 14, 14, 14, 15, 13];
        //this.state.combinedData
        //    .map(item => {
        //        return (
        //            item.rate
        //        )
        //    });
        //this.setState({ chartValue: val, isDataLoad: true });
    }



    //_defaultRange = async () => {
    //    // range value get form home
    //    var defaultRange = await AsyncStorage.getItem('rangeVal');
    //    // set defaultRange
    //    this.setState({ setRange: defaultRange });
    //    console.log('defaultRange');
    //    console.log(defaultRange);
    //    console.log(this.state.setRange);
    //}

    //_setRange = async (value) => {

    //    var rangeVal = value
    //    console.log('rageVal');
    //    console.log(rangeVal);

    //    await AsyncStorage.setItem("rangeVal", rangeVal);
    //    var getVal = await AsyncStorage.getItem("rangeVal");
    //    console.log('getVal');
    //    console.log(getVal);


    //    this.setState({ setRange: getVal });
    //    console.log(' rangevalue1');
    //    console.log(this.state.setRange);


    //    //await AsyncStorage.setItem("rangeVal", this.state.setRange);


    //    this.loadApiData();

    //}

    render() {
        console.log("Line chart data 1 -------------------------");
        var lchartData = this.props.ChartData;
        console.log(lchartData);
        console.log("Line chart data 2 -------------------------");
        
        return (
            <ScrollView>
                <View style={[styles.container]}>

                    <View style={[styles.CahrtContainer]}>
                        {/*<ChartTitle Title="Calls" Value="95 (105%)" Color="#F96E64" />*/}
                        {/*this.state.isDataLoad !== undefined &&*/}
                        {lchartData?.length > 0 ? (
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
                                    //width={screenWidth / 100 * 89} // from react-native
                                    width={900}
                                    verticalLabelRotation={30}
                                    height={280}
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
                                        paddingRight: 35,
                                        marginVertical: 8,
                                        borderRadius: 16,
                                        paddingLeft: 0,
                                    }}
                                />
                            </ScrollView>
                        ) : (
                            <Text style={{ color: "#888", fontSize: fontSize.Medium, textAlign: 'center', paddingVertical: 10 }}>
                                No Data
                            </Text>
                        )}

                        {/*{this.state.chartData1.datasets !== undefined &&}*/}
                    </View>

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center', padding: 8,
        //paddingTop: 30,
        //backgroundColor: '#ecf0f1',
    },


});
//{data={{ }
//{    //labels: ["January", "February", "March", "April", "May", "June"], }
//{    datasets: [ }
//{        { }
//{            data:// this.state.chartValue }
//{                //this.state.dailyData.map(item => { }
//{                lchartData.map(item => { }
//{                    return ( }
//{                        item.amount }
//{                    ) }
//{                }) }

//{        } }
//{    ] }
//{}} }