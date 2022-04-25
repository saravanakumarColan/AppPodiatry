
import { Dimensions, StyleSheet, Platform } from 'react-native'
const { width, height } = Dimensions.get("window");

const fontFamily = {
    Poppins_Regular: "Poppins-Light",
    Poppins_Medium:  "Poppins-Medium",
    Poppins_Bold: "Poppins-SemiBold",   
}

const fontSize = {
    verySmall_50: Platform.OS == "android" ? width / 100 * 2.4 : width / 100 * 2.4,
    veryverySmall: Platform.OS == "android" ? width / 100 * 2.6 : width / 100 * 2.6,
    verySmall: Platform.OS == "android" ? width / 100 * 2.8 : width / 100 * 2.8,
    verySmall_75: Platform.OS == "android" ? width / 100 * 3.0 : width / 100 * 3.0,
    Small: Platform.OS == "android" ? width / 100 * 3.2 : width / 100 * 3.2,
    lightMedium_50: Platform.OS == "android" ? width / 100 * 3.5 : width / 100 * 3.5,
    lightMedium: Platform.OS == "android" ? width / 100 * 3.7 : width / 100 * 3.7,
    Medium: Platform.OS == "android" ? width / 100 * 4.2 : width / 100 * 4.2,
    Large_50: Platform.OS == "android" ? width / 100 * 4.5 : width / 100 * 4.5,
    Large: Platform.OS == "android" ? width / 100 * 4.7 : width / 100 * 4.7,
    ExtraLarge_50: Platform.OS == "android" ? width / 100 * 5 : width / 100 * 5,
    ExtraLarge: Platform.OS == "android" ? width / 100 * 5.5 : width / 100 * 6,
    ExLarge_2: Platform.OS == "android" ? width / 100 * 6.5 : width / 100 *7

}
const FontFamily = {
    Light: 'Poppins-Light',
    Regular: 'Poppins-Regular',
    Medium: 'Poppins-Medium',
    Bold: 'Poppins-Bold',
    SemiBold: 'Poppins-SemiBold',
    
}

const Colors = {
    App_BG: '#000',
    F_label: '#454545',
    Link:'#1A89BE',
    BtnTheme:'#1A89BE',
    Gray_calls:'#8D8D8D',
    CallsFooter: '#1A89BE',
    CustomTabsNavBg: '#F3F3F3',
    Desc_gray:'#747474',
    Title_gray:'#454545',
    Histogram_Title: '#263238',

    Home: '#E7B304',
    Calls: '#F96E64',
    SpotCampaigns: '#3CB66F',
    GoogleAds: '#E7B304',
}

const View_Spacing = {
    VS_W1: height / 100 * 1,
    VS_W2: height / 100 * 2,
    VS_W3: height / 100 * 3,
    VS_W4: height / 100 * 4,
    VS_W5: height / 100 * 5,
    VS_W6: height / 100 * 6,
    VS_W7: height / 100 * 7,
    VS_W8: height / 100 * 8,
    VS_W9: height / 100 * 9,
    VS_W10: height / 100 * 10,
    VS_W15: height / 100 * 15,
    VS_W20: height / 100 * 20,
}
const BorderRadius = {
    WelcomCard: width / 100 * 10,    
    CardBg: width / 100 * 5,  
    ChartRadius: width / 100 * 3, 
}
const Basic_Viewdimension = {
    VD_BorderWidth: width / 100 * 0.5,
    VD_Text_BorderWidth: width / 100 * 0.3,
    VD_BorderRadius: width / 100 * 1,
    VD_TextInput: height / 100 * 7,
    VD_letterSpacing: width / 100 * 0.2,
    VD_ButtonRadius: width / 100 * 10,

    Card_Textinput: height / 100 * 8,
    Card_Distance: height / 100 * 2,

    Card_ButtonRadius: width / 100 * 1,
    Text_Marignleft: width / 100 * 4,
    Text_Marignleft_V6: width / 100 * 6,
    Text_Marignleft_V2: width / 100 * 2,
    VD_ButtonRadius: width / 100 * 3,


}

export { fontSize, fontFamily, Colors, BorderRadius, FontFamily}
