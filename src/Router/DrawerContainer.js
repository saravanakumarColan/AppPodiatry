
import React, { Component } from 'react';

import { fontSize, width, height, fontFamily, LG_BG_THEME, Basic_Viewdimension } from '../../../Asset/Constants/fontsAndColors';

import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Share, Alert, LinearGradient, AsyncStorage } from "../../../Asset/Libraries/NpmList"

import {
  DrawerContentScrollView,
  DrawerItemList, DrawerItem, DrawerContent
} from '@react-navigation/drawer';

class DisplayAnImage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      App_userID: "",
      Login_Status: ""
    };

  }

  componentDidMount() {
    AsyncStorage.getItem("UserId", (error, Token_UserId) => {
      if (Token_UserId != null) {
        this.setState({ App_userID: Token_UserId, Login_Status: "Logout" })
      } else {
        this.setState({ Login_Status: "Login" })
      }
    })
  }

  Navigation_Method(Route_Name) {

    if (Route_Name == "logout") {

      if (this.state.Login_Status == "Login") {
        this.props.navigation.navigate("Login_Screen")
      } else {
        Alert.alert(
          'Logout App..!',
          'Are you sure, you want to logout this App ?',
          [
            { text: 'YES', onPress: () => this.logOutUser() },
            { text: 'NO', style: 'cancel' },
          ],
          { cancelable: false }
        )
        return true
      }
    } else {
      this.props.navigation.navigate(Route_Name)
    }
  }

  logOutUser() {

    AsyncStorage.setItem('Access_token', "");
    AsyncStorage.setItem('UserInsuredCode', "");
    AsyncStorage.setItem('UserId', "");
    AsyncStorage.setItem('CPR_ID', "");
    AsyncStorage.setItem('FaceID_Status',"");

    this.props.navigation.navigate("Login_Screen")
  }


  render() {


    return (
      <View style={styles.container}>

        <LinearGradient colors={[LG_BG_THEME.App_button_LG_1, LG_BG_THEME.App_button_LG_1]} style={[styles.linearGradient]}>

          <View style={{ flex: 0.1, justifyContent: "center", }} />

          <View style={{ flex: 0.9, justifyContent: "center", }}>

            <DrawerContentScrollView>

              <TouchableOpacity onPress={() => this.Navigation_Method("Dashboard")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{"Home"}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.Navigation_Method("GIG_Social_Media")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{"GIG Social Media"}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.Navigation_Method("Wordings")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{"Wordings"}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.Navigation_Method("Documents")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{"Documents"}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.Navigation_Method("Privacy_Policy")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{"Privacy Policy"}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.Navigation_Method("logout")} style={styles.UC_Container}>
              <Text style={styles.UC_Text_Normal}>{this.state.Login_Status}</Text>

              </TouchableOpacity>

            </DrawerContentScrollView>

          </View>

        </LinearGradient>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor:"green",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-start"
  },
  UC_Container: {
    height: height / 100 * 7,
    justifyContent: "center",
    marginLeft: width / 100 * 3,
    marginRight: width / 100 * 3,
   // flexDirection: "row"
  },
  UC_Text_Normal: {
    fontSize: fontSize.lightMedium_50,
    color: LG_BG_THEME.WHITE_THEME,
    letterSpacing: Basic_Viewdimension.VD_letterSpacing,
    fontFamily: fontFamily.Roboto_Medium
  },
  container_LogoImagestyle: {
    width: width / 100 * 25,
    height: width / 100 * 8,
    resizeMode: "contain",
  }

});


export default (DisplayAnImage);

