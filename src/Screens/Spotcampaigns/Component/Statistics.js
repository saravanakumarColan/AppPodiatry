
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../../Assets/Styles/Theme';
import SpotBarChart from './BarChart';
import HistogramSorted from './HistogramSorted';
import { FontFamily, Colors, fontSize } from '../../../Assets/Constants/fontsAndColors';
import { getSpotCampaignsData } from '../../../service/GetDataService';
import { parse } from 'url';

/*import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';*/


export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daily_stats: [],
            topicOverall: [],
            overall: [],
            total: [],
            total1: [],
            banners: [],
            color: [
                {
                    id: 1,
                    color: '#5c6cf8'
                },
                {
                    id: 2,
                    color: '#789bf5'
                },
                {
                    id: 3,
                    color: '#b197fb'
                },
                {
                    id: 4,
                    color: '#71cfa2'
                },
                {
                    id: 5,
                    color: '#858585'
                },
                {
                    id: 6,
                    color: '#f3a9ad'
                },
                {
                    id: 7,
                    color: '#f85c8b'
                },
                {
                    id: 8,
                    color: '#f57878'
                },
                {
                    id: 9,
                    color: '#927ede'
                },
                {
                    id: 10,
                    color: '#70ddff'
                }
            ]
        }
    }



    componentDidMount() {
        this.loadApiData();
    }
    loadApiData = async () => {
        var data = await getSpotCampaignsData();
        console.log('getSpotCampaignsData');
        console.log(data.topic_overall);

        this.setState({ topicOverall: data?.topic_overall?.topics, overall: data.campaign_overall, total: data.total })

        console.log('overall');
        console.log(this.state.topicOverall);
    }


    HistogramSortedList = (hdata) => {
        console.log('topicData ----- 0');
        //var data = this.props.DataStatistics;
        var topicData = hdata; //.topic_overall.topics; //data.topic_overall.topics;
        console.log(topicData);
        console.log('topicData ----- 1');


        /*return this.state.topicOverall.map((data) => {*/
        return topicData.map((data) => {
            let width = data.value;
            let bwidth = data.percentage + "%"; //parseFloat(data.percentage); ;  
            let colorid = Math.floor(Math.random() * 10) + 1;


            console.log('colorid');
            console.log(colorid);
            let color = this.state.color.filter(s => s.id === colorid)[0].color;
            console.log('color');
            console.log(bwidth);

            var getPercentage = data.percentage;
            console.log('getPercentage');
            console.log(getPercentage);
            var roundOfPercentage = parseFloat(data.percentage);
            console.log(roundOfPercentage);

            return (
                <View style={[styles.ProgressbarItem]} key={data.key}>
                    {/*<text style={{ backgroundcolor: 'red', width: 100 }}>{data.value}</text>*/}
                    <View style={[styles.ProgressbarText]}>
                        <Text style={[styles.ProgressbarVal]}>{data.title}</Text>
                        <Text style={[styles.ProgressbarVal]}>{data.value}</Text>
                        <Text style={[styles.ProgressbarVal]}>({roundOfPercentage})</Text>
                    </View>
                    <View style={[styles.ProgressbarBg, {
                        width: bwidth, //height: 40,
                        backgroundColor: color
                    }]}>
                    </View>
                    {/*<Text style={{ colors: "#888" }}>f{data.percentage}</Text>*/}
                    {/*<view style={styles.Progressbarbg}></view>*/}
                </View>
            )
        });

    }




    campaignOverall = (cData) => {
        let overallData = cData;
        var overall = overallData.campaign_overall;

        console.log('get overall');
        console.log(overallData);

        return overallData.map((data) => {
            return (
                <View style={Theme.CallsItem} key={data.key}>
                    <View style={[styles.LeftCol]}>
                        <Text style={[styles.Topic]}>{data.topic}:</Text>
                        <Text style={[styles.Title]}>{data.title}</Text>
                    </View>
                    <Text style={[styles.RightCol]}>{data.value}</Text>
                </View>
            );
        });
    };


    render() {

        let hisData = this.props.DataStatistics;
        let total = this.state.total;
        let overall = this.state.overall;


        let HisList = this.props.topics;
        console.log('HisList 1');
        console.log(HisList.length);
        ////HisList.length = 0;               
        if (HisList.length > 0) {
            console.log('not empty');// I am empty
        } else {
            console.log('empty'); // I am not empty
        }

        return (
            <View>
                {HisList?.length > 0 &&
                    <View style={[styles.HistogramSorted]}>


                        <View style={[styles.HistogramHeader]}>
                            <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: fontSize.lightMedium }}>Histogram Sorted</Text>
                        </View>

                        {/*{this.HistogramSortedList()}*/}
                        {/*{hisData.length > 0 && <HistogramSortedList hdata={hisData} />}*/}
                        {/*{HisList.length > 0 && this.HistogramSortedList(hisData)}*/}
                        {HisList?.length > 0 ? ( // add a ?. to check if variable is null
                            this.HistogramSortedList(HisList)
                        ) : (
                            <Text style={{ display: 'none', color: "#888", fontSize: fontSize.Medium, textAlign: 'center', paddingVertical: 10 }}>
                                No Data
                            </Text>
                        )}

                    </View>
                }
                {/*<HistogramSorted />*/}
                {/** Campaign **/}
                {overall?.length > 0 &&
                    <View style={[Theme.CallDurationWrp, { marginTop: 10, marginBottom: 10 }]}>
                        <View style={Theme.DurationHeader}>
                            <Text style={{ fontFamily: FontFamily.Regular, flex: 0.8, color: "#fff" }}>Campaign</Text>
                            <Text style={{ fontFamily: FontFamily.Regular, flex: 0.2, color: "#fff", textAlign: "left" }}>Clicks</Text>
                        </View>
                        <View style={[Theme.CallDurationList]}>
                            <View style={[styles.CallList]}>
                                {overall?.length > 0 ? (this.campaignOverall(overall)) : (<Text style={{ color: "#888", fontSize: fontSize.Medium }}>
                                    No Data
                                </Text>)}
                            </View>

                        </View>
                        <View style={[Theme.CallDurationFooter]}>
                            <Text style={[Theme.ChartFooterText, { fontFamily: FontFamily.Bold, flex: 0.8, color: "#fff" }]}>Total</Text>
                            <Text style={[Theme.ChartFooterText, { fontFamily: FontFamily.Bold, flex: 0.2, color: "#fff", textAlign: "left" }]}>{total} </Text>

                        </View>
                    </View>
                }
                {/** Campaign **/}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
    HistogramHeader: {
        //flex:0.2,
        width: '100%',
        marginBottom: 15,
    },
    Title: {
        fontFamily: FontFamily.Regular,
        color: Colors.Histogram_Title,
        fontSize: fontSize.Large_50,
    },
    HistogramSorted: {
        width: '95%',
        alignSelf: "center",
        backgroundColor: '#fff',
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 5,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.10,
        elevation: 4,
    },
    Progressbar: {
        backgroundColor: 'red',
        width: '100%',
        //flex:1,
    },
    ProgressbarItem: {
        backgroundColor: '#E7E7E7',
        position: "relative",
        justifyContent: "center",
        //width: '100%',
        marginBottom: 8,
    },
    ProgressbarText: {
        //position: "absolute",
        //backgroundColor: '#888',
        zIndex: 1,
        //height: 40,
        // width: '40%',
        flexDirection: "row",
        justifyContent: "flex-start",
        textAlignVertical: "center",
        fontFamily: FontFamily.Regular,
        fontSize: fontSize.Medium,
        color: '#000',
        padding: 5,
        flexWrap: "wrap",
        zIndex: 1,
    },
    ProgressbarVal: {
        fontFamily: FontFamily.Regular,
        fontSize: fontSize.Medium,
        paddingRight: 5,
    },
    ProgressbarBg: {
        position: "absolute",
        //backgroundColor: '#888',        
        //height: 50,
        top: 0,
        left: 0,
        height: '100%',
    },
    LeftCol: {
        flex: 0.8,
        //width: '100%',
        //backgroundColor: '#888',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    RightCol: {
        flex: 0.2,
        //width: '30%',
        //backgroundColor: '#ccc',
        paddingLeft: 10,
    },
    Topic: {
        //flex:0.4,
        fontFamily: FontFamily.SemiBold,
        fontSize: 14,
    },
    Title: {
        //flex: 0.6,
        paddingLeft: 5,
        fontSize: 14,
    },
    FontBold: {
        fontFamily: FontFamily.Bold,
    },
});
