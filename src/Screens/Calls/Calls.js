
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button, Touchable, TouchableOpacity, AsyncStorage } from 'react-native';
import { getCallsData } from '../../service/GetDataService';
import Theme from './../../Assets/Styles/Theme';
import { Colors, BorderRadius, FontFamily, fontSize } from './../../Assets/Constants/fontsAndColors';
import CallsLineChart from './Component/LineChart';
//import BarChart from './Component/BarChart';
import CallsBarChart from './Component/BarChart';
import LineChartCommon from './../../Shared/Components/LineChartCommon';





const { width, height } = Dimensions.get('window');
export default class Calls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            combinedData: [],
            dailyData: [],
            combinedDataTotal: [],

            setRange: '',

            array: [
                {
                    key: '1',
                    title: 'example title 1',
                    subtitle: 'example subtitle 1',
                },
                {
                    key: '2',
                    title: 'example title 2',
                    subtitle: 'example subtitle 2',
                },
                {
                    key: '3',
                    title: 'example title 3',
                    subtitle: 'example subtitle 3',
                },
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
        /*this._defaultRange();*/
    }

    //loadApiData = async() => {
    //    var dat = await getCallsData();
    //    console.log("api data");
    //    this.setState({ combinedData: dat.combined, dailyData: dat.daily });
    //}

    loadApiData = async () => {

        // range value get form home
        var DefaultRangeval = await AsyncStorage.getItem('rangeVal');
        // set defaultRange
        this.setState({ setRange: DefaultRangeval });

        // get calls data
        var data = await getCallsData();
        console.log('combined Data');
        console.log(data);
        this.setState({ combinedData: data.combined, dailyData: data.daily, combinedDataTotal: data.combinedTotal });
        //console.log('daily 1');
        //console.log(this.state.dailyData);
    }

    combined = () => {
        return this.state.combinedData.map((data, index) => {
            let CallsID = index;
            let Color = this.state.Colors.filter(s => s.id === CallsID)[0].color;
            console.log('CallsID call');
            console.log(CallsID);
            console.log('Color call');
            console.log(Color);

            return (
                <View style={Theme.CallsItem} key={data.key}>
                    <View style={{
                        fontFamily: FontFamily.Regular,
                        width: '70%',
                        flexDirection: 'row',
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            width: 15,
                            height: 15,
                            marginRight: 10,
                            borderRadius: 50, backgroundColor: Color, lineHeight: 1.5
                        }}></Text>
                        <Text style={{ fontFamily: FontFamily.Regular, fontSize: width / 100 * 3.5 }}>{data.title}</Text>
                    </View>
                    <Text style={{ fontFamily: FontFamily.Regular, width: '15%', fontSize: width / 100 * 3.5  }}>{data.value}</Text>
                    <Text style={{ fontFamily: FontFamily.Regular, width: '15%', fontSize: width / 100 * 3.5 , textAlign: "left" }}>{data.rate}</Text>
                </View>
            );
        });
    };


    _defaultRange = async () => {
        console.log('defaultRange 1');
        // range value get form home
        var val = await AsyncStorage.getItem('rangeVal');
        console.log(val);

        // set defaultRange
        this.setState({ setRange: val });
        //console.log('defaultRange');
        //console.log(defaultRange);
        //console.log(this.state.setRange);

        /*this.loadApiData();*/

        console.log('ChartdailyData');
        console.log(this.state.combinedData);

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
        console.log('==============');
        console.log(getVal);
        console.log('after set range');
        console.log(this.state.dailyData);

    }


    render() {
        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView
                    horizontal={false}
                    //contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
                    //showsHorizontalScrollIndicator={false} // to hide scroll bar
                    //horizontal={true}
                    style={Theme.scrollView}>
                    <View style={styles.PageContainer}>

                        {/*Range tabs */}
                        {/* <View style={[styles.RangeWrp]}>
                            <TouchableOpacity style={[styles.RangeBg]}
                                onPress={() => this._setRange('30')}
                            >
                                <Text style={[styles.RangeBtn, this.state.setRange == '30' && styles.RangeBtnActive]}>30 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.RangeBg]}
                                onPress={() => this._setRange('60')}
                            >
                                <Text style={[styles.RangeBtn, this.state.setRange == '60' && styles.RangeBtnActive]}>60 Days</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.RangeBg]}
                                onPress={() => this._setRange('90')}
                            >
                                <Text style={[styles.RangeBtn, this.state.setRange == '90' && styles.RangeBtnActive]}>90 Days</Text>
                            </TouchableOpacity>
                            
                        </View>*/}
                        {/*End Range tabs */}

                        {/* <View style={[Theme.ChartWrp]}>
                            <LineChartCommon Range={this.state.setRange} ChartData={this.state.dailyData} />
                        </View> */}
                        {/*<CallsLineChart /> */}

                        <CallsBarChart ChartData={this.state.combinedData} />
                        {/*<View style={[Theme.ChartWrp]}>
                            <Image style={styles.CallsChartImg} source={require('./../../Assets/Images/Img1.png')} />
                        </View>
                        <View style={[Theme.ChartWrp]}>
                            <Image style={styles.CallsChartImg} source={require('./../../Assets/Images/Img1.png')} />
                        </View>*/}
                        <View style={[Theme.CallDurationWrp, { marginBottom: 10 }]}>
                            <View style={Theme.DurationHeader}>
                                <Text style={{ fontFamily: FontFamily.Regular, width: '70%', color: "#fff" }}>Call Duration</Text>
                                <Text style={{ fontFamily: FontFamily.Regular, width: '30%', color: "#fff" }}>Calls</Text>
                            </View>
                            <View style={[Theme.CallDurationList]}>
                                <View style={[styles.CallList]}>{this.combined()}</View>
                            </View>
                            <View style={[Theme.CallDurationFooter]}>
                                <Text style={[Theme.ChartFooterText, { fontFamily: FontFamily.SemiBold, width: '70%', color: "#fff" }]}>Total</Text>
                                <Text style={[Theme.ChartFooterText, { fontFamily: FontFamily.SemiBold, width: '15%', color: "#fff" }]}>{this.state.combinedDataTotal}</Text>
                                <Text style={[Theme.ChartFooterText, { fontFamily: FontFamily.SemiBold, width: '15%', color: "#fff", textAlign: "left" }]}>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
    CallsDot: {
        width: 20,
        height: 20,
        borderRadius: 50,
    },
    CallsChart: {},
    CallsChartImg: {
        width: "100%",
        height: 140,
    },

    /*RangeWrp*/
    RangeWrp: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    RangeBg: {
        //backgroundColor: '#ccc',        
        //borderRadius: 5,
        width: '25%',
    },
    RangeBtn: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7e8387',
        borderRadius: 10,
        fontSize: fontSize.Small,
        fontFamily: FontFamily.Regular,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    RangeBtnActive: {
        color: '#fff',
        backgroundColor: '#F96E64'
    },
});
