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
        };
        this.coin = props.coin;
        this.currency = props.currency;
        this.exchange = props.exchange;
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


        this.setState({
            isLoaded: true,
            items: await new CoinData(this.coin, this.currency, this.exchange).getHistominute("60")
            //items: await new CoinData("BTC", "USD", "CCCAGG").getPrice()
        });
    }

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
