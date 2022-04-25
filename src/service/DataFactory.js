import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = "https://staging.grayfish.com/api";
//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Mjc0NjI3ODYsImV4cCI6MTYyNzQ2OTk4Niwicm9sZXMiOlsiUk9MRV9NRU1CRVIiXSwidXNlcm5hbWUiOiJqbXRlc3RraXQifQ.UakkPhxL_bQtxR02BPMfFd9y2YEq_e-Mj9h42YwBxheYLAKZHNfrxB42Sbzoj2C89dv4Sii09Qz5HvB7yRXytsAipCtRtRkeSVm4uNttZvH0pu8Lpx7iAIpffDCI0UEWKdKWAoDeA_MySpzl9JN0twMcqOqzTMCZRCSNxrn9KHDEJkpaCZu8cKipTyqWMQLcyrT3P7xqO0pCyZ4QTDuV_NIMf_8HRGqZ-ykk-53ngI9LwndVIfFCVKgSmraBWLs9TJJCgJKCL8-tuofbXrPJ3GwFyGd2wtBH23WYthiQn_rh3hoN5a5ttG7EyDpCbvSwmYs_NFJ8vzC64rLhQk-NxdrYd-CZF6MdZNbmweHdbttFjrELu2rt-RtkS-oUV_3oKwAl5CCzl09y71s_AIvQf6Y_7ATIln750ixYGLk3siAtEqEZ0McYxV0MgRTn1VeC-YXxgytz0QUbs3VQY2KUXSBMjwgmP1DXbf3HyKIyle79tH2X3Yktsasjhswi7MUHC0puse0BTiXzuy7SdN70A3ReiKRd9whk9w_SqzVz1V7ORcRjaUPBy3qDiXvw5wR9TNtadQTXttUyZKxYM61kJsVSbEcb7C1qA92vNhAIVISz5DZ4DN8xkm2qJ-_0z8Hkf8VwEiI0bWRHQ6yayjJ9SCusRBE0BLR4FZ9gj_g4uYo";

export async function GetIdFetch(ctrl) {
    //var token1 = await AsyncStorage.getItem("token");
    var token = await AsyncStorage.getItem("token");

    if (token !== "")
        await RefreshingToken();
    //token1 = 'Bearer ' + token1;
    console.log('get method');
    //console.log(token1);

    return fetch(host + "/" + ctrl, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/JSON',
            'Accept': 'application/JSON',
            'Authorization': 'Bearer ' + token
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("s");
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.log("Erorr log");
            console.log(error.message);
            return null;
        });
};

export async function LoginPostFetch(ctrl, objData) {
    var token = await AsyncStorage.getItem("token");
    //token1 = 'Bearer ' + token1;
    console.log('post method');
    //console.log(token1);

    return fetch(host + "/" + ctrl, {
        method: 'POST',
        body: JSON.stringify(objData),
        headers: new Headers({
            'Content-Type': 'application/JSON',
            'Accept': 'application/JSON',
            'Authorization': 'Bearer ' + token
        })
    })
        .then((response) => {
            console.log("eeeeee");
            console.log(response);
            if (response.status === 401) {
                return "login failed";
            }
            return response.json();
        })
        .then((responseJson) => {
            console.log("ssss");
            console.log(responseJson);
            if (responseJson === "login failed")
                return responseJson;
            else
                return responseJson; //.data;
        })
        .catch((error) => {
            console.log("Erorr log");
            console.log(error.message);
            return null;
        });
};

export async function PostIdFetch(ctrl, objData) {
    var token = await AsyncStorage.getItem("token");
    //token1 = 'Bearer ' + token1;
    console.log('post method');
    console.log(objData);
    //console.log(token1);
    console.log(host + "/" + ctrl);

    return fetch(host + "/" + ctrl, {
        method: 'POST',
        body: JSON.stringify(objData),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    })
        .then((response) => {
            console.log("====================");
            console.log(response);
            return response;
            //response.json();
        })
        //.then((responseJson) => {
        //    console.log("s");
        //    console.log(responseJson);
        //    return responseJson;
        //})
        .catch((error) => {
            console.log("Erorr log");
            console.log(error);
            console.log(error.message);
            return null;
        });
};

export async function PostResetFetch(ctrl, objData) {
    var token = await AsyncStorage.getItem("token");
    //token1 = 'Bearer ' + token1;
    console.log('post method');
    console.log(objData);
    //console.log(token1);
    console.log(host + "/" + ctrl);

    return fetch(host + "/" + ctrl, {
        method: 'POST',
        body: JSON.stringify(objData),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            //'Authorization': 'Bearer ' + token
        })
    })
        .then((response) => {
            console.log("====================");
            console.log(response);
            return response;
            //response.json();
        })
        //.then((responseJson) => {
        //    console.log("s");
        //    console.log(responseJson);
        //    return responseJson;
        //})
        .catch((error) => {
            console.log("Erorr log");
            console.log(error);
            console.log(error.message);
            return null;
        });
};

export async function RefreshingToken() {
    var expTimeStr = await AsyncStorage.getItem("expirytime");
    var expTime = new Date(expTimeStr);

    // if (expTime > new Date())
    //     return true;

    console.log('post method');
    //console.log(token1);
    var refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log('refreshToken 1');
    console.log(refreshToken);
    return fetch(host + "/token/refresh", {
        method: 'POST',
        body: { "refreshToken": refreshToken },
        headers: new Headers({
            'Content-Type': 'application/JSON',
            'Accept': 'application/JSON'
        })
    })
        .then((response) => {
            console.log("eeeeee");
            console.log(response);
            if (response.status !== 200) {
                return "login failed";
            }
            return response.json();
        })
        .then(async(responseJson) => {
            console.log("ssss");
            console.log(responseJson);

           // await AsyncStorage.setItem("token", response.token);

            await AsyncStorage.setItem("token", responseJson.token);
            await AsyncStorage.setItem("refreshToken", responseJson.refreshToken);

            var expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours() + 1);
            await AsyncStorage.setItem("expirytime", String(expiryTime));
        })
        .catch((error) => {
            console.log("Erorr log");
            console.log(error.message);
            return null;
        });
};


export async function postregisterFetch(ctrl, objData) {
    console.log('post method');
    console.log(objData);
    //console.log(token1);
    console.log(host + "/" + ctrl);

    return fetch(host + "/" + ctrl, {
        method: 'POST',
        body: JSON.stringify(objData),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            //'Authorization': 'Bearer ' + token
        })
    })
        .then((response) => {
            console.log("====================");
            console.log("response dataFactory");
            console.log(response);
            return response;
            //response.json();
        })
        //.then((responseJson) => {
        //    console.log("s");
        //    console.log(responseJson);
        //    return responseJson;
        //})
        .catch((error) => {
            console.log("Erorr log");
            console.log(error);
            console.log(error.message);
            return null;
        });
};