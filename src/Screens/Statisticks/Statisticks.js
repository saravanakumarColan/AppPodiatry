
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';

import Theme from '../../Assets/Styles/Theme';
import WelcomeCard from '../../Shared/Components/WelcomeCard';
import { Colors, fontFamily, fontSize } from '../../Assets/Constants/fontsAndColors';
import { getStatisticsData } from '../../service/GetDataService';



const { width, height } = Dimensions.get("window");
//const [selectedValue, setSelectedValue] = useState("java");

export default class Statisticks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: [],  
            statisticsTotal:[],
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {
        var data = await getStatisticsData();
        console.log("StatisticsData data ");
        console.log(data);
        this.setState({ statistics: data[0].statistics.items, statisticsTotal: data[0].statistics.total });
        console.log(" data ");
        console.log(this.state.statistics);
    }
    
    statistics = () => {
        return this.state.statistics.map((data) => {
            return (
                <View style={[Theme.StatisCardList]} key={data.key}>
                    <Text style={[styles.Statisitem, styles.CardColOne]}>{data.Provider}</Text>
                    <Text style={[styles.Statisitem, styles.CardColtwo]}>{data.ProviderData.total_sent}</Text>
                    <Text style={[styles.Statisitem, styles.CardColtwo]}>{data.ProviderData.total_opens}</Text>
                    <Text style={[styles.Statisitem, styles.CardColtwo]}>{data.ProviderData.total_clicks}</Text>
                </View>
            )
        });
    };


    render() {
        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView style={Theme.scrollView}>
                    <View style={Theme.PageContainer}>
                        <WelcomeCard Title="Statistics" />
                    </View>
                    <View style={[styles.StatisticksContent]}>
                        <View style={[Theme.StatisCardWrp]}>
                            <View style={[Theme.StatisCardHeader]}>
                                <Text style={[styles.StatisWhiteCol, styles.CardColOne]}>Platform</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>Sent</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>Opened</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>Clicks</Text>
                            </View>
                            {this.statistics()}                           
                            <View style={[Theme.StatisCardFooter]}>
                                <Text style={[styles.StatisWhiteCol, styles.CardColOne]}>Total</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>{this.state.statisticsTotal.total_sent}</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>{this.state.statisticsTotal.total_opens}</Text>
                                <Text style={[styles.StatisWhiteCol, styles.CardColtwo]}>{this.state.statisticsTotal.total_clicks}</Text>
                            </View>
                        </View>
                        {/*<View style={[Theme.StatisFooter]}>
                            <Text style={[styles.StatisFooterBtn, styles.TCurveBlue]}>Detailed Statistics</Text>
                            <Text style={[styles.StatisFooterBtn, styles.TCurveLightGray]}>View</Text>
                        </View>*/}
                    </View>

                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({

    StatisticksContent: {
        //flex: 0.8,
        //backgroundColor: "#000",
        padding: 20
    },
    StatisWhiteCol: {
        color: "#fff",
    },
    CardColOne: {
        //width: '30%',
        flex: 0.4,
    },
    CardColtwo: {
        flex: 0.2,
        justifyContent: "center",
        textAlign: "center",
    },
    StatisFooterBtn: {
        padding: 15,
        fontSize: fontSize.Large
    },
    TCurveBlue: {
        backgroundColor: Colors.BtnTheme,
        color: '#fff',
        textAlign: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    TCurveLightGray: {
        backgroundColor: '#E8E8E8',
        color: Colors.BtnTheme,
        textAlign: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

});
