//https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-15
// <ActionButton
//     onPress={() => ToastAndroid.show("api: "+ items.Data[0].close, ToastAndroid.SHORT)}
//     icon="add"
// />
import {Animated, AsyncStorage, StyleSheet} from 'react-native';
import React from 'react';
import {PropTypes} from 'prop-types';
import {AreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {Toolbar, Card, ActionButton} from '../react-native-material-ui';
import {ScrollView, View, Text, ToastAndroid, TextInput} from 'react-native';
import { LineChart,XAxis, YAxis, Grid } from 'react-native-svg-charts';

import Crawler from "../Coins/External/Crawler";
import CryptoCompareAdapter from "../Coins/External/Adapter";
import CoinData from "../Coins/External/OtherThingThatIsVeryImportant";
import PushNotification from "../Notification";

const styles = StyleSheet.create({
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 8,
    },
});





class GraphPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            custom1: [],
        };

        this.coin = props.coin;
        this.currency = props.currency;
        this.exchange = props.exchange;
        this.custom1 =  props.custom1;

        this.coinData = new CoinData(this.coin, this.currency, this.exchange);


        // this.custom2 = eval(props.custom2);
        // AsyncStorage.getItem('@MySuperStore:key').then((token) => {
        //     if (token != null) {
        //         this.setState({text: token})
        //     }
        // });

    }

    async componentDidMount(){
        // OLD WAY (Before CoinData class was made)
        // new Crawler().getRawData().then(
        //     (result) => {
        //         this.setState({
        //             isLoaded: true,
        //             items: new CryptoCompareAdapter(result).getHistoricalData()
        //         });
        //     },
        //     (error) => {
        //         this.setState({
        //             isLoaded: true,
        //             error
        //         });
        //     }
        // )

        // console.log("NICO LOOK: "+ this.custom1);
        // let fn = () => window[this.custom1];
        // console.log("NICO LOOK fn: "+ JSON.stringify(fn));
        // if (typeof fn !== "function") {
        //     this.custom1 = null;
        //     console.log('asdafsdfasdfasdfaszxvcvd')
        // }

        this.setState({
            isLoaded: true,
            items: await this.coinData.getHistominute("60"),
            // custom1: await this.coinData.eval(),
            custom1: await this.coinData.getPrice(),
            //items: await new CoinData("BTC", "USD", "CCCAGG").getPrice()
        });
    }

     createNotification = async() => {
        PushNotification.localNotification({
            /* Android Only Properties */
            id: this.key, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: await this.coinData.getChangePct24Hour()
                    +"% | Price: "+await this.coinData.getPrice()
                    +" | Vol24h: "+ await this.coinData.getTotalVolume24hCurrency()
                    +" | Supply: "+ await this.coinData.getSupply() // (required)
                    +" | MKTCAP: "+ await this.coinData.getMKTCAP()
                    +" | Low: "+ await this.coinData.getLow24Hour()
                    +" | High: "+ await this.coinData.getHigh24Hour()
                    +" | 24hChange: "+ await this.coinData.getChangeQuant24Hour(), // (optional) default: "message" prop
            //subText: "This...", // (optional) default: none
            color: "red", // (optional) default: system default
            vibrate: false, // (optional) default: true
            vibration: 0, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            imageUrl: "https://dgr6z75qbh.execute-api.us-east-2.amazonaws.com/default/ImageTester", // (optional) set if you need to send big image notification

            /* iOS only properties */

            /* iOS and Android properties */
            title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message: await this.coinData.getChangePct24Hour()
                    +"% | Price: "+await this.coinData.getPrice()
                    +" | Vol24h: "+ await this.coinData.getTotalVolume24hCurrency()
                    +" | Supply: "+ await this.coinData.getSupply() // (required)
                    +" | MKTCAP: "+ await this.coinData.getMKTCAP()
                    +" | Low: "+ await this.coinData.getLow24Hour()
                    +" | High: "+ await this.coinData.getHigh24Hour()
                    +" | 24hChange: "+ await this.coinData.getChangeQuant24Hour(),
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
            actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });

    };

    // storeValue = (value) => {
    //     this.setState(value);
    //     try {
    //         AsyncStorage.setItem('@MySuperStore:key', value.text);
    //         AsyncStorage.getItem('@MySuperStore:key').then((bitcoinName) => {
    //             this.setState({text: bitcoinName})
    //         });
    //     } catch (error) {
    //         alert(error)
    //     }
    // };

     render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <Toolbar
                // leftElement="arrow-back"
                //onLeftElementPress={() => {
                //}}
                centerElement="BitCoin Error"
            />;
        } else if (!isLoaded) {
            return <Toolbar
                //leftElement="arrow-back"
                //onLeftElementPress={() => {
                //}}
                centerElement="BitCoin loading..."
            />;
        } else {

            const contentInset = { top: 20, bottom: 20 };
            this.createNotification();
            return (
                <ScrollView
                    // keyboardShouldPersistTaps="always"
                    // keyboardDismissMode="interactive"
                    // onScroll={this.onScroll}
                >
                    {/*<TextInput*/}
                        {/*style={{height: 40, borderColor: 'gray', borderWidth: 1}}*/}
                        {/*value = {"Coin: "+this.coin +", Currency: "+this.currency+", exchange: "+this.exchange}*/}
                        {/*// onChangeText={(text) => {*/}
                        {/*//     this.storeValue({text})*/}
                        {/*// }}*/}
                        {/*// value={this.state.text}*/}
                        {/*onChangeText={(text) => {*/}
                            {/*this.storeValue({text})*/}
                        {/*}}*/}

                    {/*/>*/}
                    <Card>

                        <AreaChart
                            style={{height: 200}}
                            endpoint
                            //data={new CoinData().getOneHour()}
                            data = {items}
                            //data={new CryptoCompareAdapter(items).getInternal()}
                            contentInset={{top: 30, bottom: 30}}
                            curve={shape.curveNatural}
                            svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
                        >
                            <Grid/>
                        </AreaChart>
                        <View style={{height: 200, flexDirection: 'row'}}>
                            <YAxis
                                data = {items}
                                //data={new CryptoCompareAdapter(items).getInternal()}
                                contentInset={contentInset}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={value => `${value}`}
                            />
                            <LineChart
                                style={{flex: 1, marginLeft: 16}}
                                data = {items}
                                //data={new CryptoCompareAdapter(items).getInternal()}
                                svg={{stroke: 'rgb(134, 65, 244)'}}
                                contentInset={contentInset}
                            >
                                <Grid/>
                            </LineChart>
                        </View>
                    </Card>
                </ScrollView>

            );
        }
    }
}


export default GraphPage;