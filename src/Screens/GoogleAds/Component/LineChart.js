
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
import { Colors, FontFamily, fontSize } from './../../../Assets/Constants/fontsAndColors';
import { getGoogleAdsData } from '../../../service/GetDataService';
import ChartTitle from '../../../Shared/Components/ChartTitle';
import Theme from '../../../Assets/Styles/Theme';


const screenWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(231, 179, 4, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForLabels: {
        fontSize: width / 100 * 3
    },
    style: {
        borderRadius: 15,
        margin: 0,
        padding: 0, fontSize: 20,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#fff"
    },
    // ****
    
    linejoinType: 'round',
    scrollableDotFill: '#fff',
    scrollableDotRadius: 6,
    scrollableDotStrokeColor: 'tomato',
    scrollableDotStrokeWidth: 3,
    scrollableInfoViewStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#121212',
        borderRadius: 2,
        marginTop: 25,
        marginLeft: 25,
    },
    scrollableInfoTextStyle: {
        fontSize: 10,
        color: '#C4C4C4',
        marginHorizontal: 2,
        flex: 1,
        textAlign: 'center',
    },
    scrollableInfoSize: {
        width: 30,
        height: 30,
    },
    scrollableInfoOffset: 15,
    
};
export default class SpotLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoad: false,
            AdsDaily: [],


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
        var data = await getGoogleAdsData();
        console.log('combined Data');
        console.log(data);
        this.setState({ AdsDaily: data.daily, isDataLoad: true });
        //let val = //[12, 14, 14, 14, 15, 13];
        //    this.state.AdsDaily
        //        .map(item => {
        //            return (
        //                item.amount
        //            )
        //        });
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
        console.log("Line chart data 1 -------------------------");
        var vDataTotal = this.props.vistiTotal;
        var vData = this.props.data;
        /*var visitsData = Data.daily;*/
        console.log("vistis Data");
        console.log(vData);
        var lchartData = this.props.dataOne.daily;
        console.log("ads data");
        console.log(lchartData);
       
        console.log("Line chart data 2 -------------------------");
        return (
            <ScrollView>
                <View style={[styles.container]}>
                    <View style={[styles.CahrtContainer, { width: '100%' }]}>
                        {/*<ChartTitle Title="GOOGLE Ads" Value="108 (120%)" Color="#E7B304" />*/}
                        {/*{this.state.isDataLoad &&*/}
                        {/*{vData?.length > 0 ? (<Text>test</Text>) : (<Text>not</Text>)}*/}
                        {vData?.length > 0 ? ( // add a ?. to check if variable is null
                            <ScrollView horizontal={true}>
                                <LineChart
                                    data={{
                                        labels: vData.map(item => {
                                            return (
                                                item.day
                                            )
                                        }), //["January", "February", "March", "April", "May", "June"],
                                        datasets: [
                                            {
                                                data:// this.state.chartValue
                                                    //this.state.AdsDaily.map(item => {
                                                    vData.map(item => {
                                                        return (
                                                            item.amount
                                                        )
                                                    }),
                                                legendFontSize: 1

                                            }
                                        ],
                                        color: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`, // optional
                                        strokeWidth: 2 // optional
                                    }}                                    
                                    width={1000}
                                    height={width / 100 * 60}
                                    verticalLabelRotation={30}
                                    //yAxisLabel="$"
                                    //yAxisSuffix="k"
                                    yAxisInterval={1} // optional, defaults to 1
                                    xAxisInterval={2}
                                    fromZero={true}
                                    chartConfig={chartConfig}
                                    bezier
                                    yAxisInterval={10}
                                    segments={2}
                                    style={{
                                        marginVertical: 0,
                                        borderRadius: 15,
                                        paddingRight: width / 100 * 10,
                                        paddingLeft: 0,
                                        paddingBottom: width / 100 * 4 ,
                                        //paddingTop: 0,
                                        width: '100%',
                                        //backgroundColor:'#000',
                                        
                                        fontSize: 10,
                                    }}
                                />
                            </ScrollView>
                        ) : (
                            <Text style={{ color: "#888", fontSize: fontSize.Medium, textAlign: 'center', paddingVertical: 10 }}>
                                No Data
                            </Text>
                        )}
                        <View style={[styles.ChartFooter]}>
                            <Text style={[Theme.ChartFooterText]}>Website Visits</Text>
                            <Text style={[Theme.ChartFooterText]}>{vDataTotal}</Text>
                        </View>


                        {/* {this.state.chartData1.datasets !== undefined && }*/}
                    </View>

                    {/*Range tabs */}
                    {/*<View style={[styles.RangeWrp]}>*/}
                    {/*    <TouchableOpacity style={[styles.RangeBg]}*/}
                    {/*        onPress={() => this._setRange('30')}*/}
                    {/*    >*/}
                    {/*        <Text style={[styles.RangeBtn, this.state.setRange == '30' && styles.RangeBtnActive]}>30 Days</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={[styles.RangeBg]}*/}
                    {/*        onPress={() => this._setRange('60')}*/}
                    {/*    >*/}
                    {/*        <Text style={[styles.RangeBtn, this.state.setRange == '60' && styles.RangeBtnActive]}>60 Days</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={[styles.RangeBg]}*/}
                    {/*        onPress={() => this._setRange('90')}*/}
                    {/*    >*/}
                    {/*        <Text style={[styles.RangeBtn, this.state.setRange == '90' && styles.RangeBtnActive]}>90 Days</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                    {/*End Range tabs */}
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
    //RangeWrp: {
    //    flex: 1,
    //    width: "100%",
    //    flexDirection: "row",
    //    justifyContent: 'space-around',
    //    paddingVertical: 20,
    //},
    //RangeBg: {
    //    //backgroundColor: '#ccc',        
    //    //borderRadius: 5,
    //    width: '25%',
    //},
    //RangeBtn: {
    //    textAlign: 'center',
    //    color: '#fff',
    //    backgroundColor: '#7e8387',
    //    borderRadius: 10,
    //    fontSize: fontSize.Small,
    //    fontFamily: FontFamily.Regular,
    //    paddingHorizontal: 10,
    //    paddingVertical: 5,
    //},
    //RangeBtnActive: {
    //    color: '#fff',
    //    backgroundColor: '#E7B304'
    //},
});
