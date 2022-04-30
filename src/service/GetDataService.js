import React from 'react';
import { GetIdFetch,  LoginPostFetch, PostIdFetch, postregisterFetch, PostResetFetch } from './DataFactory';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Calls Data 
export async function getCallsData() {
    var userId = await AsyncStorage.getItem("userid");
    //var dateRange = await AsyncStorage.getItem("dateRange");
    var dateRange = await AsyncStorage.getItem("rangeVal");
    console.log('dateRange api rangeVal');
    console.log(dateRange);
    //var userId = 509;
    var res = await GetIdFetch("v1/calls/" + userId + "?range=" + dateRange );
    console.log("calls data");
    console.log(res);
    return res;
}
// Spot Campaigns
export async function getSpotCampaignsData() {
    //var userId = 509;
    var userId = await AsyncStorage.getItem("userid");    
    var dateRange = await AsyncStorage.getItem("rangeVal");
    console.log('dateRange api');
    console.log(dateRange+'===='+userId);
    var res = await GetIdFetch("v1/spot_campaigns/" + userId + "?range=" + dateRange );

    console.log("Spot Campaigns Data");
    console.log( "Spot Campaigns Data====>",res);
    return res;

}
// Google Ads
export async function getGoogleAdsData() {
    //var userId = 509;
    var userId = await AsyncStorage.getItem("userid");
    var dateRange = await AsyncStorage.getItem("rangeVal");
    var res = await GetIdFetch("v1/adwords/impressions/" + userId + "?range=" + dateRange );

    console.log("Google Ads Data");
    console.log(res);
    return res;

    //localstorage.setitem("token", res.token );
    //localstorage.setitem("userid", res.data.userid );
    //localstorage.setitem("username", res.data.username );
}
// Google Ads Visits
export async function getGoogleAdsVsitsData() {
    //var userId = 509;
    var userId = await AsyncStorage.getItem("userid");
    var dateRange = await AsyncStorage.getItem("rangeVal");
    var res = await GetIdFetch("v1/adwords/visits/" + userId + "?range=" + dateRange);

    console.log("Google Ads Visits Data");
    console.log(res);
    return res;

    //localstorage.setitem("token", res.token );
    //localstorage.setitem("userid", res.data.userid );
    //localstorage.setitem("username", res.data.username );
}
// Directories
export async function getDirectoriesData() {
    //var userId = 509;
    var userId = await AsyncStorage.getItem("userid");
    //var dateRange = await AsyncStorage.getItem("dateRange");
    var res = await GetIdFetch("v1/directories/" + userId);

    console.log("Directories Data");
    console.log(res);
    return res;
}

// statistics
export async function getStatisticsData() {

    var userId = await AsyncStorage.getItem("userid");    
    //var userId = 509;    
    var res = await GetIdFetch("v1/targeted_review/" + userId);
    console.log("api statistics Data"); 
    console.log(res);
    return res;

    //localstorage.setitem("token", res.token );
    //localstorage.setitem("userid", res.data.userid );
    //localstorage.setitem("username", res.data.username );
}
// Device Info Data
export async function postDeviceInfoData(dat) {
    var userId = await AsyncStorage.getItem("userid");
    var response = await PostIdFetch("v1/token/" + userId, dat);
    console.log("response postDeviceInfo");
    console.log(response.json());

}

// post Login
export async function postLoginData(loginVal) {
    var response = await LoginPostFetch("login_check", loginVal);
    console.log('response token ');
    var jsonValue = JSON.stringify(response.data);
    console.log(jsonValue);

    if (response === "login failed") {
        return 'f';
    }
    else {
        //var spotcampaigns_acc = 'spot_campaigns';
        //await AsyncStorage.setItem("spotcampaignsacc", spotcampaigns_acc);
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userDetail", jsonValue);
        await AsyncStorage.setItem("userid", String(response.data.userId));
        await AsyncStorage.setItem("username", response.data.username);
        await AsyncStorage.setItem("email", response.data.email);
        await AsyncStorage.setItem("firstName", response.data.firstName);
        await AsyncStorage.setItem("lastName", response.data.lastName);
        await AsyncStorage.setItem("refreshToken", response.refreshToken);
        await AsyncStorage.setItem("isLogin", 'true');


        var expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 1);
        await AsyncStorage.setItem("expirytime", String(expiryTime));

        return 's';
    }

    //var getToken = response.token;
    //console.log(getToken);

    //if (getToken != null) {
    //    console.log('true ');
    //    //Alert.alert("login Success");
    //    //debugger;
    //    localstorage.setitem("token", response.token);
    //    localstorage.setitem("userid", response.data.userid);
    //    localstorage.setitem("username", response.data.username);
    //    var loginTrue = 's';
    //    return loginTrue;
    //}
    //else {
    //    var loginFalse = 'f';
    //    return loginFalse;
    //}
}

export async function postregisterData(loginVal) {
    console.log("postregister");
    var response = await postregisterFetch("v1/register", loginVal);
    var jsonValue =  await response.json();  //JSON.stringify(response);
    
    console.log(jsonValue);
    console.log(JSON.stringify(jsonValue));
    return jsonValue;
}

export async function logoutUser() {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("userDetail", "");
    await AsyncStorage.setItem("userid", "");
    await AsyncStorage.setItem("username", "");
    await AsyncStorage.setItem("email", "");
    await AsyncStorage.setItem("firstName", "");
    await AsyncStorage.setItem("lastName", "");
    await AsyncStorage.setItem("isLogin", 'false');

}
export async function sendSMSTRData(values) { 
    var userId = await AsyncStorage.getItem("userid");
    console.log(values);
    //values = {
    //    "template_id": 5,
    //    "social_id": 7792,
    //    "type": "email",
    //    "recipients": [
    //        {
    //            "email": "test@highedgesoft.com",
    //            "first_name": "Alex",
    //            "last_name": "HES",
    //            "keep_sending": false
    //        },
    //        {
    //            "email": "test2@highedgesoft.com",
    //            "first_name": "Kate",
    //            "last_name": "Bor",
    //            "keep_sending": false
    //        }
    //    ]
    //};
    console.log("==================" + userId);
    let smsresponsive = await PostIdFetch("v1/targeted_review/send/" + userId, values)
        .then((res) => {
            console.log("parse log");
            console.log(res);
            return res.json();
        });
    console.log('send responsive');
    console.log(smsresponsive);
    return smsresponsive;
}

// email 

export async function sendEmailTRData(values) {
    var userId = await AsyncStorage.getItem("userid");
    console.log(values);    
    console.log("==================" + userId);
    let smsresponsive = await PostIdFetch("v1/targeted_review/send/" + userId, values)
        .then((res) => {
            console.log("parse log");
            console.log(res);
            return res.json();
        });
    console.log('email responsive');
    console.log(smsresponsive);
    return smsresponsive;
}
export async function resetUserData(values) {
    var responsive = await PostIdFetch("login_check", values);
    console.log('Reset responsive');
    console.log(responsive);
    return responsive;
}

// reset password 
export async function resetPassword(email) {
    var responsive = await PostResetFetch('v1/restorePassword', email)
        .then((res) => res.json());
    console.log('reset responsive');
    //let resp = responsive.json();
    console.log(responsive);
    //console.log(resp);

    return responsive;

}

export async function getUserModuleAccess(modName) {
    var accessListstr = await AsyncStorage.getItem("userDetail");
    var accessList = JSON.parse(accessListstr);
    console.log('accessList');
    console.log(accessListstr);
    console.log(accessList);

    var resp = accessList.access.filter(s => s === modName);

    if (resp.length > 0)
        return true;
    else
        return false;
}

export async function getUserAccess(access) {
    //var getAccessList = this.state.access;    

    var spotcampaigns_acc = 'spot_campaigns';
    var google_ads_acc = 'google_ads';
    var calls_acc = 'calls';
    var directories_acc = 'directories';
    var tr_email_acc = 'tr_email';
    var tr_sms_acc = 'tr_sms';

    var access = ["spot_campaigns", "google_ads", "calls", "directories", "tr_email", "tr_sms"];

    
    var spotcampaigns = access.filter(s => s === spotcampaigns_acc);
    var googleads = access.filter(s => s === google_ads_acc);
    var calls = access.filter(s => s === calls_acc);
    var directories = access.filter(s => s === directories_acc);
    var tremail = access.filter(s => s === tr_email_acc);
    var trsms = access.filter(s => s === tr_sms_acc);

    console.log('tr_sms');
    console.log(trsms);
    console.log('test d');
    //await AsyncStorage.setItem("tr_sms", String(spotcampaigns));
    //var test = await AsyncStorage.getItem("tr_sms");
    //console.log('test fgf');
    //console.log(test);  

    await AsyncStorage.setItem("spot_campaigns", spotcampaigns);
    await AsyncStorage.setItem("google_ads", googleads);
    await AsyncStorage.setItem("calls", calls);
    await AsyncStorage.setItem("directories", directories);
    await AsyncStorage.setItem("tr_email", tremail);
    await AsyncStorage.setItem("tr_sms", trsms);
   
    //console.log('getAcc');
    //console.log(getAcc);
    //var lenth = getAccessList.length;
    //let list = []
    //return test;
}
