
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button, Touchable, TouchableOpacity, AsyncStorage } from 'react-native';
import { getSpotCampaignsData } from '../../service/GetDataService';
import Theme from '../../Assets/Styles/Theme';
//import { Tab, TabView} from 'react-native-elements';
import HistogramSorted from './Component/HistogramSorted';
import Statistics from './Component/Statistics';
import Clicks from './Component/Clicks';
import SpotLineChart from './Component/LineChart';
import { FontFamily, fontSize } from '../../Assets/Constants/fontsAndColors';




export default class Spotcampaigns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daily_stats: [],
            overall: [],
            banners: [],
            v1Visible: true,
            v2Visible: false,

            
            banners: [],

            dailyData: [],

            topicOverall: [],
            Statistics: [],
            topics:[],

            setRange: '',

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

        // get SpotCampaigns data
        var data = await getSpotCampaignsData();
        console.log('getSpotCampaignsData');
        console.log(data);
        this.setState({ topics: data.topic_overall.topics, Statistics: data, topicOverall: data.topic_overall, overall: data.campaign_overall, banners: data.banners, dailyData: data.daily, })
        console.log('Statistics data');
        console.log(this.state.Statistics);
        console.log("topics 1");
        console.log(this.state.topics);
    }

    //loadApiData = async () => {
    //    var data = await getSpotCampaignsData();
    //    console.log("Api Data for Spot Campaigns")
    //    this.setState({ daily_stats: data.daily_stats, overall: overall });
    //}


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
                <ScrollView style={Theme.scrollView} horizontal={false}>
                    <View style={styles.PageContainer}>
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
                        {/* <View style={[Theme.ChartWrp]}>
                            <SpotLineChart ChartData={this.state.dailyData} />
                            {/*<Image style={styles.CallsChartImg} source={require('./../../Assets/Images/Img1.png')} />*/}
                       {/* </View> */}
                        <View style={[Theme.CustomTabsWrp, { marginBottom: 10 }]}>
                            <View style={Theme.CustomTabsNav}>
                                <Text
                                    style={[Theme.CustomTabs, { fontFamily: FontFamily.Regular },
                                    this.state.v1Visible && Theme.CustomTabsActive,
                                    { width: '46%' }]}
                                    onPress={() => this.setState({ v1Visible: true, v2Visible: false })}>Statistics</Text>
                                <Text style={[Theme.CustomTabs, { fontFamily: FontFamily.Regular },
                                this.state.v2Visible && Theme.CustomTabsActive,
                                { width: '46%' }]} onPress={() => this.setState({ v1Visible: false, v2Visible: true })}>Examples </Text>
                            </View>
                            {this.state.v1Visible && <View><Statistics DataStatistics={this.state.Statistics} topics={this.state.topics} /></View>}
                            {this.state.v2Visible && <View><Clicks banners={this.state.banners} /></View>}
                        </View>

                        {/*<Tab value={0}>
                                <Tab.Item title="recent" />
                                <Tab.Item title="favorite" />
                                <Tab.Item title="cart" />
                            </Tab>

                            <TabView value={0} onChange={0} >
                                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                                    <Text h1>Recent</Text>
                                </TabView.Item>
                                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                                    <Text h1>Favorite</Text>
                                </TabView.Item>
                                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                                    <Text h1>Cart</Text>
                                </TabView.Item>
                            </TabView>*/}
                    </View>

                </ScrollView >
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
    CallsChartImg: {
        width: "100%",
        height: 140,
    },

    RangeWrp: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        paddingVertical: 20,
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
        backgroundColor: '#3CB66F'
    },
});
