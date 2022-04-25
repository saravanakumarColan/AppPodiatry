
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSpotCampaignsData } from '../../../service/GetDataService';


export default class HistogramSorted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daily_stats: [],
            overall: [],
            banners: [],
        }
    }
    componentDidMount() {
        this.loadApiData();
    }
    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {
        var data = await getSpotCampaignsData();
        console.log("Api Data for Spot Campaigns")
        this.setState({ daily_stats: data.daily_stats, overall: overall, banners: banners });
    }
    overall = () => {
        return this.state.overall.map((data) => {
            return (
                <View key={data.key}>
                    <Text>{data.value}</Text>
                    <Text>{data.percentage}</Text>
                </View>
            );
        });
    };

    render() {
        return (
            <View>
                <Text>test</Text>
                <Text>{this.overall()}</Text></View>
        );
    }
}


const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 15,
    },
});
