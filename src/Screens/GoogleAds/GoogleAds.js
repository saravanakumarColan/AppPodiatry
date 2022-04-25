
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import { getGoogleAdsData, getGoogleAdsVsitsData } from '../../service/GetDataService';
import AdsLineChart from './Component/LineChart';
import Theme from '../../Assets/Styles/Theme';
import { Colors, BorderRadius, FontFamily, fontSize } from '../../Assets/Constants/fontsAndColors';
import WeeklyChart from './Component/WeeklyChart';
import MonthlyChart from './Component/MonthlyChart';
import YearlyChart from './Component/YearlyChart';
import { VisitBarChart } from './Component/BarChart';

export default class GoogleAds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            impressions: [],
            tabWeekly: true,
            tabMonthly: false,
            tabYearly: false,
            AdsDaily: [],

            setRange: '',

            visitData: [],
            visitDataTotal:'',
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {

        // range value get form home
        var DefaultRangeval = await AsyncStorage.getItem('rangeVal');
        // set defaultRange
        this.setState({ setRange: DefaultRangeval });

        // get calls data
        var data = await getGoogleAdsData();        
        this.setState({ AdsDaily: data });
        console.log('this AdsDaily');
        console.log(data);

        // get Visit data 
        var Vdata = await getGoogleAdsVsitsData();
        this.setState({ visitDataTotal: Vdata[0].total });
        this.setState({ visitData: Vdata[0].daily });
        console.log('Google Ads Vsits');
        console.log("visitData");
        console.log(this.state.visitData);
        console.log("visitData total");
        console.log(this.state.visitDataTotal);
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
        return (
            <SafeAreaView style={[Theme.container]}>
                <ScrollView style={[Theme.scrollView]}>
                    <View style={[styles.PageContainer]}>
                        {/*Range tabs */}
                        {/*<View style={[styles.RangeWrp]}>
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
                        <View style={[Theme.ChartWrp]}>
                            {/*AdsLineChart*/}
                             
                            {/* <AdsLineChart data={this.state.visitData} dataOne={this.state.AdsDaily} vistiTotal={this.state.visitDataTotal} /> */}

                            {/* <View style={[styles.ChartFooter]}>
                               <Text style={[Theme.ChartFooterText]}>Website Visits</Text>
                               <Text style={[Theme.ChartFooterText]}>total</Text>
                            </View> */}
                        </View>
                    </View>


                    {/*Bar chart */}
                    <View style={[styles.TabsNav]}>
                        {/* <VisitBarChart data={this.state.AdsDaily}/>  */}
                        <WeeklyChart data={this.state.AdsDaily} VisitData={this.state.visitData}/>
                    </View>

                    {/* CustomTabsNav */}
                    {/*<view style={[styles.customtabsnav]}>*/}
                    {/*    <text*/}
                    {/*        style={[styles.customtabs, { fontfamily: fontfamily.regular },*/}
                    {/*        this.state.tabweekly && styles.customtabsactive]}*/}
                    {/*        onpress={() => this.setstate({ tabweekly: true, tabmonthly: false, tabyearly: false })}>30 days</text>*/}
                    {/*    <text style={[styles.customtabs, { fontfamily: fontfamily.regular },*/}
                    {/*    this.state.tabmonthly && styles.customtabsactive]}*/}
                    {/*        onpress={() => this.setstate({ tabmonthly: true, tabweekly: false, tabyearly: false })}>60 days</text>*/}

                    {/*    <text style={[styles.customtabs, { fontfamily: fontfamily.regular },*/}
                    {/*    this.state.tabyearly && styles.customtabsactive]}*/}
                    {/*        onpress={() => this.setstate({ tabyearly: true, tabweekly: false, tabmonthly: false })}>90 days</text>*/}
                    {/*</view>*/}



                    {/*{this.state.tabWeekly && <View style={[styles.TabsNav]}>*/}
                    {/*    <WeeklyChart data={this.state.AdsDaily} />*/}
                    {/*</View>}*/}
                    {/*{this.state.tabMonthly && <View style={[styles.TabsNav]}>*/}
                    {/*    <MonthlyChart />*/}
                    {/*</View>}*/}
                    {/*{this.state.tabYearly && <View style={[styles.TabsNav]}>*/}
                    {/*    <YearlyChart />*/}
                    {/*</View>}*/}
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
    CustomTabsNav: {
        display: "flex",
        width: '100%',
        //height: 50,
        flexDirection: "row",
        backgroundColor: Colors.CustomTabsNavBg,

        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.10,
        elevation: 4,
    },
    CustomTabs: {
        width: '33.33%',
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 14,
        backgroundColor: "#fff",
        padding: 10,

    },
    CustomTabsActive: {
        backgroundColor: "#fff",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        borderBottomColor: Colors.Link,
        borderBottomWidth: 1.5,
    },
    TabsNav: {
        padding: 20,
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
        backgroundColor: '#E7B304'
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
