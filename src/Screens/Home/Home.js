
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Modal,StatusBar, Alert, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import { fontSize, BorderRadius } from './../../Assets/Constants/fontsAndColors';
import Theme from './../../Assets/Styles/Theme';
import WelcomeCard from './../../Shared/Components/WelcomeCard';
import HomeGrid from './Component/HomeGrid';
import { getCallsData, getUserAccess, getUserModuleAccess } from '../../service/GetDataService';
import { log } from 'util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
//const [selectedValue, setSelectedValue] = useState("java");

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //combinedData: [],
            //dailyData: [],
            selectedValue: '30',
            UserAccess: [],
            access: [
                "spot_campaigns",
                "google_ads",
                "calls",
                "directories",
                "tr_email",
                "tr_sms"
            ],
            callssAccess: true,

            isSpotCampaigns: false,
            isGoogle: false,
            isCalls: false,
            isDirectories: false,
            isEmail: false,
            isSMS: false,
            accessTest: false,
            isVisible: false,
        }
    }

    componentDidMount() {
        //    this.loadApiData();
        //this.userDetail();

        this.getModulesAccess();
        this.UserAccess();

        this.allowAccess();

        this.clearAsync();


    }
    clearAsync = async () => {
     //   await AsyncStorage.clear("dateRange");
    }
    

    getModulesAccess = async () => {
        var getSpotCampaigns = await getUserModuleAccess("spot_campaigns");
        var getGoogle = await getUserModuleAccess("google_ads");
        var getCalls = await getUserModuleAccess("calls");
        var getDirectories = await getUserModuleAccess("directories");
        var getEmail = await getUserModuleAccess("tr_email");
        var getSMS = await getUserModuleAccess("tr_sms");
        console.log('getSpotCampaigns');
        console.log(getSpotCampaigns);

        this.setState({
            isSpotCampaigns: getSpotCampaigns,
            isGoogle: getGoogle,
            isCalls: getCalls,
            isDirectories: getDirectories,
            isEmail: getEmail,
            isSms: getSMS,
        });
        console.log("isCalls");
        console.log(this.state.isCalls);
        
    }

    UserAccess = async (data) => {
        var getAccessList = this.state.access;
        console.log('getAccessList');
        console.log(getAccessList);
        var access = await AsyncStorage.getItem('tr_sms');
        console.log('=======1'+ access);

        console.log('access');

        //var getaccess = await getUserAccess();

        //var getAccessList = this.state.access;
        //console.log('getAccessList');
        //console.log(getAccessList);
        //var calls = 'calls';
        //var getAcc = getAccessList.filter(s => s === calls);
        //console.log('getAcc');
        //console.log(getAcc);
        //var lenth = getAccessList.length;
        //let list = []
        //getAccessList.forEach((data) => {
        //    console.log(
        //        list.push(<Text>{data}</Text>)
        //        )
        //})


    }

    //getUserAccess = async () => {
    //    var getAccessList = await AsyncStorage.getItem("userDetail");
    //    var AccessList = JSON.parse(getAccessList);
    //    console.log('AccessList');
    //    console.log(AccessList);
    //    this.setState({ UserAccess: AccessList });

    //}


    setDateRange = async (itemValue) => {
        var itemValue = itemValue;
        this.setState({ selectedValue: itemValue });
        //var defultDateRange = this.state.selectedValue;
        //await AsyncStorage.setItem("dateRange", defultDateRange);
    }

    allowAccess = async () => {
        console.log("calls No");
        var calls = await AsyncStorage.getItem('calls');
        if (calls == '') {
            console.log("calls yes");
            this.setState({ callssAccess: true });
        }
        else {
            console.log("calls No");
            this.setState({ callssAccess: false });
        }
    }

    gotCalls = async () => {

        var accsess = this.state.isCalls;
        if (accsess) {
            this.props.navigation.navigate('Calls')
        }
        else {
            /*Alert.alert("No Acces");*/
            this.setState({ isVisible :true});
        }
        var defultValue = this.state.selectedValue;
        //await AsyncStorage.setItem("dateRange", defultValue);
        await AsyncStorage.setItem("rangeVal", defultValue);
    }
    goSpotcampaigns = async () => {
        var accsess = this.state.isSpotCampaigns;
        if (accsess) {
            this.props.navigation.navigate('Spotcampaigns')
        } else {
            /*Alert.alert("No Acces");*/
            this.setState({ isVisible: true });
        }
        var defultValue = this.state.selectedValue;
        //await AsyncStorage.setItem("dateRange", defultValue);
        await AsyncStorage.setItem("rangeVal", defultValue);
    }
    goGoogleAds = async () => {
        var accsess = this.state.isGoogle;
        if (accsess) {
            this.props.navigation.navigate('GoogleAds')
        }
        else {
            /*Alert.alert("No Acces");*/
            this.setState({ isVisible: true });
        }
        var defultValue = this.state.selectedValue;
        //await AsyncStorage.setItem("dateRange", defultValue);
        await AsyncStorage.setItem("rangeVal", defultValue);
    }
    goDirectories = async () => {
        var accsess = this.state.isDirectories;
        if (accsess) {
            this.props.navigation.navigate('Directories')
        }
        else {
            /*Alert.alert("No Acces");*/
            this.setState({ isVisible: true });
        }
        //var defultValue = this.state.selectedValue;
        //await AsyncStorage.setItem("dateRange", defultValue);
    }

    render() {


        return (
            <SafeAreaView style={Theme.container}>
                <ScrollView style={Theme.scrollView}>
                    <View style={Theme.PageContainer}>
                        {/*<WelcomeCard />*/}
                        {/*Home Banner*/}
                        <View style={styles.HomeContent}>

                            {this.list}
                            {/* {this.state.access.map((data) => {

                                return (
                                    <Text>{data}</Text>
                                )
                            })
                            }*/}
                            <View style={[styles.HomeBannerWrp, Theme.CardBg]}>
                                <Image style={styles.HomeBanner} source={require('../../Assets/Images/HomeBanner.png')} />
                            </View>
                            {/* Date range */}
                            <View style={[styles.DateRangewrp, Theme.CardBg1]}>
                                <Text style={[styles.DateRangeLabel]} >Date Range</Text>
                                <Text style={[styles.RangePickerText]} >30 Days</Text>
                                {/*<View style={[styles.RangePicker]}>
                                    <Picker
                                        //selectedValue={this.state.selectedValue}
                                        style={{ height: 35, padding: 0, width: '100%' }}
                                        onValueChange={(item) => { this.setDateRange(item) }}
                                    //onPress={() => { this.setDateRange(item) }}
                                    >
                                        <Picker.Item label="30 Days" value="30" />
                                        <Picker.Item label="60 Days" value="60" />
                                        <Picker.Item label="90 Days" value="90" />
                                    </Picker>
                                </View>*/}

                                {/*<Picker
							//selectedValue={selectedValue}
							style={[styles.DateRange]}
							//onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
						>
							<Picker.Item label="30 days" value="30 days" />
							<Picker.Item label="60 days" value="60 days" />
						</Picker>*/}
                            </View>
                            {/* home grid */}
                            <View style={[Theme.HomeGridWrp]}>

                                <TouchableOpacity
                                    style={[Theme.HomeGridItem]}
                                    onPress={() => this.gotCalls()}>
                                    <View style={[Theme.HomeGridIcon]}>
                                        <HomeGrid Icon="Calls" />
                                    </View>
                                    <Text style={[Theme.HomeGridTitle, this.state.isCalls === false ? { backgroundColor: '#949494', opacity: 0.6 } : { backgroundColor: '#949494' }]}>Calls</Text>
                                </TouchableOpacity>

                                {/*{getUserAccess("calls") &&}*/}
                                <TouchableOpacity
                                    style={Theme.HomeGridItem}
                                    onPress={() => this.goSpotcampaigns()}>
                                    <View style={[Theme.HomeGridIcon]}>
                                        <HomeGrid Icon="Spotcampaigns" />
                                    </View>
                                    <Text style={[Theme.HomeGridTitle, this.state.isSpotCampaigns === false ? { backgroundColor: '#949494', opacity: 0.6 } : { backgroundColor: '#949494' }]}>Spot Campaigns</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Theme.HomeGridItem}
                                    onPress={() => this.goGoogleAds()}>
                                    <View style={[Theme.HomeGridIcon]}>
                                        <HomeGrid Icon="Googleads" />
                                    </View>
                                    <Text style={[Theme.HomeGridTitle, this.state.isGoogle === false ? { backgroundColor: '#949494', opacity: 0.6 } : { backgroundColor: '#949494' }]}
                                        >Google Ads</Text>
                                </TouchableOpacity>                                
                                <TouchableOpacity
                                    style={Theme.HomeGridItem}
                                    onPress={() => this.goDirectories()}>
                                    <View style={[Theme.HomeGridIcon]}>
                                        <HomeGrid Icon="Directories" />
                                    </View>
                                    <Text style={[Theme.HomeGridTitle, this.state.isDirectories === false ? { backgroundColor: '#949494', opacity: 0.6 } : { backgroundColor: '#949494' }]}>Directories</Text>
                                </TouchableOpacity>
                                
                                {/*<HomeGrid Title="Calls" Icon="Calls" page="Calls" />  
                                <HomeGrid Title="Spot Campaigns" Icon="Spotcampaigns" />
                                <HomeGrid Title="Google Ads" Icon="Googleads" />
                                <HomeGrid Title="Directories" Icon="Directories" />*/}
                            </View>
                        </View>
                        {/*</Modal>*/}
                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={
                                this.state.isVisible
                            }
                            onRequestClose={() => { console.log("Modal has been closed.") }}>
                            {/*All views of Modal*/}
                            <View style={Theme.Modal}>
                                <View style={[Theme.MessageWrp]}>
                                    <View style={[Theme.MessageCol, Theme.SuccessWrp]}>
                                        {/*<Image style={[Theme.MessageImg, { tintColor: '#0f5132' }]} source={require('../../../Assets/Images/Icons/success.png')} />*/}
                                        <Text style={[styles.AccessText]}>You Don't Have Access</Text>
                                    </View>
                                    <TouchableOpacity style={[Theme.ModalCloseBtn]} onPress={() => { this.setState({ isVisible: false }) }}>
                                        <Text style={[Theme.ModalCloseTxt]}>Close</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                        {/*End </Modal> */}
                    </View>
                </ScrollView>
            </SafeAreaView >

        );
    }
}

const styles = StyleSheet.create({


    PageContainer: {
        flex: 1,
        padding: 0,
        backgroundColor: "#000",
    },
    HomeContent: {
        flex: 0.8,
        //backgroundColor: "#fff",
        padding: 20
    },
    HomeBannerWrp: {
        width: '100%',
        flex: 0.4,
        backgroundColor: "#fff",
        marginTop: width / 100 * 5,
        alignContent: "flex-end",
        justifyContent: "center",
        alignItems: "flex-end",
        alignSelf: "flex-end",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 5.27,
        elevation: 6,
    },
    HomeBanner: {
        width: width / 100 * 90,
        height: height / 100 * 25,
        //backgroundColor: "#000",
        alignSelf: "center",
        alignContent: "flex-end",
    },
    DateRangewrp: {
        marginTop: width / 100 * 5,
        //flex: 0.2,
        width:'100%',
        //height: 0,
        backgroundColor: '#fff',
        padding: width / 100 * 2,
        borderRadius: width / 100 * 2,
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.10,
        elevation: 4,
        
    },
    DateRangeLabel: {
        alignSelf: "center",
        //justifyContent: "flex-start",
        //width: '50%',
        fontSize: fontSize.Large_50,
    },
    RangePicker: {
        alignSelf: "center",
        backgroundColor: '#EDEDED',
        width: '40%',
        borderRadius: 10,
        //height: 40,

    },
    DateRangePicker: {
        width: '50%',
        backgroundColor: '#888',
        width: 50,
        //height:50,
    },
    NoAcces: {
        backgroundColor: '#000',
        opacity: 0,
    },
    RangePickerText: {
        //width: '50%',
        backgroundColor: '#888',
        //width: 50,
        color: '#fff',
        padding: width / 100 * 1,
        fontSize: fontSize.Large,
        borderRadius: width / 100 * 2,
        overflow:'hidden',
    },
    AccessText: {
        paddingTop: width / 100 * 10,
        fontSize: fontSize.Large_50,
        color: '#1A89BE',
        
    },
});
