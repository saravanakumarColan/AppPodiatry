
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Alert, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TextInput, Dimensions, Picker, Button } from 'react-native';
import Theme from '../../../Assets/Styles/Theme';
import { fontSize, Colors, BorderRadius } from '../../../Assets/Constants/fontsAndColors';
import TrToolInfo from './TrToolInfo';
import FormIcon from './../../../Shared/Form/FormIcon';
import CButton from '../../../Shared/Form/CButton';
import { getStatisticsData, sendEmailTRData, sendSMSTRData } from '../../../service/GetDataService';
import CheckBox from '@react-native-community/checkbox';
import { Rating, AirbnbRating } from 'react-native-ratings';
//const [selectedValue, setSelectedValue] = useState("java");

export default class SMS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SocialMediaList: [],
            listingToggle: false,

            receiverList: [],
            receiverInfo: [
                {
                    email: '',
                    first_name: '',
                    last_name: '',
                    keep_sending: false
                }
            ],
            selectedProvider: '',
            providersSocialList: [],
            providerDetails: {},
            radioValue: 'Google',
            providerActive: true,

            status: '',
            message: '',
            isVisible: false,

            email: '',
            isActive: '',
            emailValidation: false,
            phoneErrorText: '',
        }
    }
    componentDidMount() {
        this.loadApiData();
    }

    loadApiData = async () => {

        var data = await getStatisticsData();
        console.log('sms  Data');
        console.log(data);
        this.setState({ SocialMediaList: data[0].listings })
        console.log('SocialMediaList ');
        console.log(this.state.SocialMediaList);

        console.log('setActive');

        this.handleProviderChange(this.state.radioValue);

        var getListId = this.state.providersSocialList.filter(s =>  s.IsSelected === true );
        var getSId = getListId.length > 0 ? getListId[0].SocialId : ''; //social.filter(s =>  s.IsSelected === true )[0].SocialId;
        console.log("getListId 1" + getListId);
        this.setState({ isActive: getSId });



        //console.log("test provider name" + this.state.radioValue);
        //var setActive = this.state.providersSocialList.filter(s => s.IsSelected === true)[0].SocialId;
        //this.setState({ isActive: setActive });

        this.AddAnotherNo();

         // defult set TemplateId 
         var TemplateId = getListId.length > 0 ? getListId[0].TemplateId : ''; 

         let dat = {
             "TemplateId": TemplateId, // 5,
             "SocialId": getSId, // 7792, //this.props.socialId
             "type": 'sms',
             //"recipients": this.state.receiverList
         }
         this.setState({ providerDetails : dat });


    }

    handleProviderChange = (provName) => {
        this.setState({ selectedProvider: provName });
        var social = this.state.SocialMediaList.filter(s => s.Provider === provName)[0].ProviderData;
        this.setState({ providersSocialList: social });
        //this.setState({ listingToggle: false });
        this.setState({ listingToggle: false });
        console.log("social");
        var getListId = social.filter(s =>  s.IsSelected === true );
        var getSId = social.length > 0 ? social[0].SocialId : ''; //social.filter(s =>  s.IsSelected === true )[0].SocialId;
        console.log("getListId 1" + getListId);
        this.setState({ isActive: getSId });
        // if(getListId === undefined){
        //     console.log(getListId);
        // }
        // else{
            
        //  console.log("error");
         
        // }


        
        //console.log(this.state.providersSocialList);
        //console.log(getListId);

    }


    handleInputTextChange = (newText) => {
        this.setState({ receiverInfo: { first_name: newText } })
        console.log('first_name');
        console.log(this.state.receiverInfo.first_name);
        console.log(this.state.receiverInfo);
    }

    ProviderList = () => {
        //const { value } = this.state;
        return this.state.SocialMediaList.map((data) => {
            return (
                <View style={[Theme.SocialMediaWrp]} key={data.key}>
                    <TouchableOpacity style={styles.radioCircle}
                        onPress={() => {
                            let value = data.Provider
                            this.setState({
                                radioValue: value,
                            });
                            this.handleProviderChange(data.Provider)

                        }}>
                        <View style={[Theme.SocialMediaItem, this.state.radioValue === data.Provider && styles.ActiveItem]} >
                            {this.state.radioValue === data.Provider ?
                                <Image style={Theme.RadioImg} source={require('./../../../Assets/Images/Icons/tick.png')} />
                                : <Image style={Theme.RadioImg} source={require('./../../../Assets/Images/Icons/Radio.png')} />
                            }
                            <Image style={[Theme.SocialMediaImg]}
                                source={{ uri: data.Logo }}
                            />
                            <Text style={[Theme.SocialMediaLabel]}>{data.Provider}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )
        });
    }

    SendEmail = async () => {
        console.log("==========================");
        console.log(this.state.providerDetails);
        //
        if (this.state.receiverList.filter(s => s.isPhoneValid === false).length > 0 ||
            this.state.receiverList.filter(s => s.isNameValid === false).length > 0) {
            this.setState({ phoneErrorText: 'Email and/or First Name Invalid' });
            return;
        }
        else { this.setState({ phoneErrorText: false }); }


        let dat = {
            "template_id": this.state.providerDetails.TemplateId, // 5,
            "social_id": this.state.providerDetails.SocialId, // 7792, //this.props.socialId
            "type": "email",
            "recipients": this.state.receiverList
        }
        console.log(dat);

        

        if (this.state.emailValidation == false) {
            var resp = await sendSMSTRData(dat);
        } else {
            this.setState({ emailValidation: true });
            console.log('email error');
        }


        console.log('============== resp');
        console.log('return');
        console.log(resp);

        console.log('email screen');
        console.log(resp);
        this.setState({ status: resp.status, message: resp.message });



        if (this.state.status == 'OK') {
            //Alert.alert(this.state.status);
            this.setState({ isVisible: true, receiverList: [] });
            this.AddAnotherNo();
            /*this.createThreeButtonAlert();*/
        }
        else {
            //Alert.alert(this.state.status);
            this.setState({ isVisible: false })
        }
        console.log(this.state.status);
    }
    createThreeButtonAlert = () => {
        Alert.alert(
            "",
            "Email sent successfully",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    // isToggleOn
    isToggleOn = () => {
        this.setState({ listingToggle: !this.state.listingToggle });
        //console.log(this.state.listingToggle);
    }

    AddReceiver = () => {
        //console.log('AddReceiver');
        //let { receiverList } = this.state;
        //receiverList.push(this.state.receiverInfo);
        //this.setState({ receiverList, receiverInfo: {} });
    }
    AddAnotherNo = () => {
        let { receiverList } = this.state;
        console.log('Data added ===>',receiverList.length);

        if(receiverList.length != 0){
            console.log('Data added1 ===>',receiverList[receiverList.length-1].email == '');
            if(receiverList[receiverList.length-1].email == ''){
                receiverList[receiverList.length-1].isPhoneValid = false
                receiverList[receiverList.length-1].isPhoneTouched = true
                console.log('Data added2 ===>',receiverList);
                this.setState({ receiverList });

            }else if (receiverList[receiverList.length-1].first_name == '') {
                receiverList[receiverList.length-1].isNameValid = false
                receiverList[receiverList.length-1].isNameTouched = true
                console.log('Data added2 ===>',receiverList);
                this.setState({ receiverList });
                
            }else{

        
        
                console.log('AddOnetherNo');
                // New 
                var newObj = {
                    email: '',
                    first_name: '',
                    last_name: '',
                    keep_sending: false,
                    isPhoneValid: false,
                    isNameValid: false,
                    isPhoneTouched: false,
                    isNameTouched: false,
        
                };
                console.log('newObj');
                console.log(newObj);
                receiverList.push(newObj);
                this.setState({
                    receiverList
                });
            }

        }else{

        
        
        console.log('AddOnetherNo');
        // New 
        var newObj = {
            email: '',
            first_name: '',
            last_name: '',
            keep_sending: false,
            isPhoneValid: false,
            isNameValid: false,
            isPhoneTouched: false,
            isNameTouched: false,

        };
        console.log('newObj');
        console.log(newObj);
        receiverList.push(newObj);
        this.setState({
            receiverList
        });
    }

        // Exisiting 
        //console.log(this.state.receiverInfo);
        //console.log(this.state.receiverList);


        //let { receiverList } = this.state; // let objrec = this.state.receiverList;

        //receiverList.push(this.state.receiverInfo);

        //this.setState({ receiverList, receiverInfo: {} });

        //this.setState({ receiverinfo: '' });
        //this.setState({ receiverinfo: { user_no :'', user_name:''} });
    }

    RemoveNumberList = (item) => {
        var rList = this.state.receiverList;
        //var index = rList[item];      
        //rList.splice(receiverfilter)
        if(rList.length == 1){
            this.AddAnotherNo();
            if(rList[0].email != '' && rList[0].first_name != ''){
                rList.splice(item, 1);
                this.setState({ receiverList: rList });
                return rList;
            }
            
        }else{
            rList.splice(item, 1);
            this.setState({ receiverList: rList });
            return rList;
        }
       

    }

    _selectProvider = (socId) => {
        var provDet = this.state.providersSocialList.filter(s => s.SocialId === socId)[0];
        this.setState({ providerDetails: provDet });
        this.setState
        //console.log('provDet');
        //console.log(provDet);        
        var issocId = socId;
        this.setState({ isActive: issocId });
        //console.log("socIdsocId isActive");
        //console.log(this.state.isActive);

    }

    emailValidate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ emailValidation: true })
            return false;
        }
        else {
            this.setState({ emailValidation: false })
            console.log("Email is Correct");
        }
    }

    // Validate

    _phoneValidate = (text, id) => {
        //this.state.SocialMediaList.filter(s => s.Provider === provName)[0].ProviderData;        
        console.log("list");
        var listId = id;
        console.log(listId);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let receiverList = [...this.state.receiverList]; // .filter(s => s.number === text) ;
        let receiver = receiverList[id];
        receiver.isPhoneValid = reg.test(text) === true && text.length > 0 ? true : false;
        receiver.isPhoneTouched = true;
        this.setState({ receiverList });
        let list = this.state.receiverList[id].isPhoneValid;
        console.log('email list');
        console.log(list);


        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        //let isEmailValid = reg.test(text) === true;
        //console.log('isEmailValid');
        //console.log(isEmailValid);
        //if (isEmailValid == false) {
        //    console.log("Email is not Correct 1");
        //    /*this.setState({ emailValidation: true }*/
        //    //return ;
        //}
        //else {
        //    console.log("Email is  Correct 2");
        //}



        /*let recivlist = [...this.state.receiverList];*/

        //if (list == false) {
        //    console.log("no");            
        //} else {
        //    console.log("yes");
        //}

    }
    _userValidate = (text, id) => {
        //this.state.SocialMediaList.filter(s => s.Provider === provName)[0].ProviderData;        
        console.log("list");
        var listId = id;
        console.log(listId);

        let receiverList = [...this.state.receiverList]; // .filter(s => s.number === text) ;
        let receiver = receiverList[id];
        receiver.isNameValid = text.length > 0 ? true : false;
        receiver.isNameTouched = true;
        this.setState({ receiverList });
        let list = this.state.receiverList[id].isNameValid;
        console.log(list);

        /*let recivlist = [...this.state.receiverList];*/
    };

    //emailValidate = (text) => {
    //    console.log(text);
    //    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    //    if (reg.test(text) === false) {
    //        console.log("Email is Not Correct");
    //        this.setState({ email: text })
    //        return false;
    //    }
    //    else {
    //        this.setState({ email: text })
    //        console.log("Email is Correct");
    //    }
    //}

    render() {

        return (
            <View>
                <TrToolInfo Title="Select a Review Platform"
                    Desc="Choose the platform you’d like to request a review for, then select the listing from the drop down."
                />
                {/*<View style={[Theme.CompanyList]}>
                    <View style={[Theme.ListRow]}>
                        <Text style={[Theme.ListLeft]}>Company Name:</Text>
                        <Text style={[Theme.ListRight]}>very nice practice}</Text>
                    </View>
                    <View style={[Theme.ListRow]}>
                        <Text style={[Theme.ListLeft]}>Address:</Text>
                        <Text style={[Theme.ListRight]}>4-14 Saddle River Rd STE 101, Fair Lawn, NJ 07410, USA</Text>
                    </View>
                    <View style={[Theme.ListRow]}>
                        <Text style={[Theme.ListLeft]}>Rating:</Text>
                        <Text style={[Theme.ListRight]}>Rating (Google reviews)</Text>
                    </View>
                </View>*/}

                <View style={[Theme.SocialMediaWrp]}>
                    {/* ProviderList */}
                    {this.ProviderList()}
                    {/*<View style={[Theme.SocialMediaItem]}>
                        <Image style={[Theme.SocialMediaImg]} source={require('../../../Assets/Images/Trtool/FB.png')} />
                        <Text style={[Theme.SocialMediaLabel]}>Facebook</Text>
                    </View>
                    <View style={[Theme.SocialMediaItem]}>
                        <Image style={[Theme.SocialMediaImg]} source={require('../../../Assets/Images/Trtool/Insta.png')} />
                        <Text style={[Theme.SocialMediaLabel]}>Instagram</Text>
                    </View>
                    <View style={[Theme.SocialMediaItem]}>
                        <Image style={[Theme.SocialMediaImg]} source={require('../../../Assets/Images/Trtool/IN.png')} />
                        <Text style={[Theme.SocialMediaLabel]}>Linkedin</Text>
                    </View>*/}
                </View>
                <View style={[Theme.SelecListtWrp]}>


                    {/* Select listing filter */}
                    <TouchableOpacity
                        onPress={() => this.isToggleOn()}
                    >
                        <View style={[Theme.SelectList]}>
                            <Text style={{ fontSize: fontSize.Large_50, color: Colors.Title_gray }}>Select listing</Text>
                            <View style={Theme.SelectListimg} >
                                <Image style={Theme.DownArrowImg} source={require('./../../../Assets/Images/Icons/DownArrow.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.state.listingToggle &&
                        <View style={[Theme.CompanyListWrp]}>
                            {this.state.providersSocialList.map((item) => (
                                <TouchableOpacity
                                    onPress={() => this._selectProvider(item.SocialId)}
                                >
                                    <View style={[Theme.CompanyList,
                                    this.state.isActive == item.SocialId ? { backgroundColor: '#dde8ed', borderColor: '#888', } : null]}>
                                        <View style={[Theme.ListRow]}>
                                            <Text style={[Theme.ListRight]}>{item.SocialData.company_name}</Text>
                                        </View>
                                        <View style={[Theme.ListRow]}>
                                            <Text style={[Theme.ListRight]}>{item.SocialData.link_address}</Text>
                                        </View>
                                        <View style={[Theme.ListRow]}>
                                            <Text style={[Theme.ListRight]}>
                                                Rating: {item.SocialData.rating}
                                                <Rating
                                                    type='custom'
                                                    style={{ paddingHorizontal: 5 }}
                                                    showRating={false}
                                                    fractions={1}
                                                    startingValue={item.SocialData.rating}
                                                    ratingCount={5}
                                                    imageSize={14}
                                                    isDisabled={true}
                                                    readonly={true}
                                                    ratingColor='#F1C40E'
                                                    ratingBackgroundColor='#c8c7c8'
                                                    ratingTextColor='#c8c7c8'
                                                />
                                                ({item.SocialData.review_count} reviews)</Text>
                                        </View>
                                        {this.state.isActive == item.SocialId && <View style={[Theme.listSelect]}>
                                            <Image style={Theme.listSelectImg} source={require('./../../../Assets/Images/Icons/tick.png')} />
                                        </View>}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    }

                </View>
                <TrToolInfo Title="Add Emails"
                    Desc="Enter ONE email into field below and the patients FIRST name. Another field will appear if you need to add more than one."
                />
                {/** Add another email form **/}
                {this.state.receiverList.map((item, key) => (
                    <View style={[Theme.AddEmailWrp]}>
                        <View style={[Theme.AddEmail]}>
                            <View style={[Theme.FormGroup, { width: '100%', marginBottom: 10 }]}>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="Email" />
                                    <TextInput
                                        style={[Theme.AddEmailinput]}
                                        placeholder="Email"
                                        placeholderTextColor="#000"
                                        //this.state.emailValidation == false ? {color: '#263238' } : {color: 'red'}
                                        //keyboardType='email'
                                        value={item.email}
                                        onChangeText={(e) => {
                                            /*this.emailValidate(e);*/
                                            let list = this.state.receiverList;
                                            let listIndex = key;
                                            var objval = list[key];
                                            objval["email"] = e; //.target.value;
                                            this.setState({
                                                receiverList: list
                                            });
                                            this._phoneValidate(e, listIndex);
                                            //this.emailValidate(e);
                                            //this.setState({ receiverInfo: { first_name: e.target.value } })
                                        }
                                        }
                                    />
                                </View>
                                {!item.isPhoneValid && item.isPhoneTouched &&
                                    <Text style={Theme.TextError}>Please add valid Email of recipient</Text>}
                            </View>
                            <View style={[Theme.FormGroup, { marginBottom: 0, }]}>
                                <View style={[Theme.FormInputWrp]}>
                                    <FormIcon FormIcon="User" />
                                    <TextInput
                                        value={item.first_name}
                                        onChangeText={(e) => {
                                            let list = this.state.receiverList;
                                            let listIndex = key;
                                            var objval = list[key];
                                            objval["first_name"] = e; //.target.value;
                                            this.setState({
                                                receiverList: list
                                            });
                                            this._userValidate(e, listIndex);
                                            //this.setState({ receiverInfo: { first_name: e.target.value } })
                                        }
                                        }
                                        style={Theme.AddEmailinput}
                                        placeholder="First Name"
                                        placeholderTextColor="#000"
                                    />
                                </View>
                                {!item.isNameValid && item.isNameTouched &&
                                    <Text style={Theme.TextError}>Please add first name of recipient</Text>}
                            </View>
                        </View>

                        <View style={[Theme.FromDeleteWrp]}>
                            <TouchableOpacity
                                onPress={(e) => this.RemoveNumberList(key)}
                            >
                                <Image style={[Theme.FromDeleteIcon]} source={require('../../../Assets/FormIcons/Delete.png')} />
                                <Text style={[Theme.FromDeleteText]}> Clear </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}

                {/*<View style={[Theme.AddEmailWrp]}>
                    <View style={[Theme.AddEmail]}>
                        <View style={[Theme.FormGroup], { width: 100, marginBottom: 10, }}>
                            <View style={[Theme.FormInputWrp]}>
                                <FormIcon FormIcon="Phone" />
                                <TextInput
                                    style={Theme.AddEmailinput} placeholder="Phone No."
                                    value={this.state.receiverInfo.user_no}
                                    onChangeText={(e) => {
                                        let val = this.state.receiverInfo;
                                        val["user_no"] = e; //.target.value;
                                        this.setState({
                                            receiverInfo: val
                                        });
                                        //this.setState({ receiverInfo: { first_name: e.target.value } })
                                    }
                                    }
                                />
                            </View>
                        </View>
                        <View style={[Theme.FormGroup], { marginBottom: 0, }}>
                            <View style={[Theme.FormInputWrp]}>
                                <FormIcon FormIcon="User" />
                                <TextInput
                                    value={this.state.receiverInfo.user_name}
                                    onChangeText={(e) => {
                                        let val = this.state.receiverInfo;
                                        val["user_name"] = e; //.target.value;
                                        this.setState({
                                            receiverInfo: val
                                        });
                                        //this.setState({ receiverInfo: { first_name: e.target.value } })
                                    }
                                    }
                                    style={Theme.AddEmailinput} placeholder="john" />
                            </View>
                        </View>                        
                    </View>
                    <View style={[Theme.FromDeleteWrp]}>
                        <TouchableOpacity>
                            <Image style={[Theme.FromDeleteIcon]} source={require('../../../Assets/FormIcons/Delete.png')} />
                            <Text style={[Theme.FromDeleteText]}>Delete </Text>
                        </TouchableOpacity>
                    </View>
                </View > */}
                <View style={[Theme.AddPhoneNo]}>
                    <TouchableOpacity style={Theme.AddFieldBtn}>
                        <Image style={Theme.PlushImg} source={require('./../../../Assets/Images/Icons/Plush_icon.png')} />
                        <Text style={Theme.AddMoreTxt}
                            onPress={() => this.AddAnotherNo()} >
                            Add Another Email </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={Theme.TextError} >{this.state.message}</Text>
                    {this.state.emailValidation && <Text style={[Theme.TextError, { width: "100%" }]}>Email is Not Correct</Text>}
                </View>
                <View>
                    <Text style={Theme.TextError} >{this.state.phoneErrorText}</Text>
                </View>
                <View style={[Theme.BtnWrp, { marginTop: 40, }]}>
                    <Text
                        style={[Theme.CButton, { backgroundColor: '#1A89BE', color: '#FFF' }]}
                        onPress={() => this.SendEmail()}>SEND EMAIL</Text>
                    {/** <CButton
                        Title="SEND SMS" BackColor="blue"
                        onPress={() => Alert.alert('ghgh')}
                    />*/}
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
                                <Image style={[Theme.MessageImg, { tintColor: '#0f5132' }]} source={require('../../../Assets/Images/Icons/success.png')} />
                                <Text style={[styles.text, { color: '#0f5132' }]}>Sent successfully</Text>
                            </View>
                            <TouchableOpacity style={[Theme.ModalCloseBtn]} onPress={() => { this.setState({ isVisible: false }) }}>
                                <Text style={[Theme.ModalCloseTxt]}>Close</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        padding: 0,
        backgroundColor: "#000",
    },
    ActiveItem: {
        backgroundColor: "#F3FBFF",
    },

});
