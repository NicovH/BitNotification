
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Animated, ScrollView} from 'react-native';
import PushNotification from '../Notification';
import Container from '../Container';
import {TextInput, AsyncStorage, Button, ToastAndroid, View, StyleSheet} from 'react-native';

//
// import BackgroundTimer from 'react-native-background-timer';

// components
import {Avatar, BottomNavigation, Icon, ListItem, ActionButton} from '../react-native-material-ui/src';
import GraphPage from "../Button";
import CardStorage from "../Storage/Cards";
import store from "rn-object-store";
import Prompt from 'react-native-input-prompt';



const UP = 1;
const DOWN = -1;


const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class State {

    constructor() {
        this.selected = [];
        this.searchText = '';
        this.active = 'today';
        this.moveAnimated = new Animated.Value(0);
    }


}


StateFactory = (function () {
    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new State();
            }
            return instance;
        }
    };
})();


class Home extends Component {
    constructor(props) {
        super(props);
        this.offset = 0;
        this.scrollDirection = 0;
        this.state = {
            //textInput : new CardStorage() //asdlfjahsdlkajalksjdhaflksjdhfalkjs
            coinPrompt: false,
            currencyPrompt: false,
            exchangePrompt: false,
            refreshPrompt: false,
            currentCard: null,
        };
        this.textInput = new CardStorage();





        // BackgroundTimer.runBackgroundTimer(() => {
        //         PushNotification.localNotification({
        //             /* Android Only Properties */
        //             id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //             ticker: "My Notification Ticker", // (optional)
        //             autoCancel: true, // (optional) default: true
        //             largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        //             smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //             bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        //             //subText: "This...", // (optional) default: none
        //             color: "red", // (optional) default: system default
        //             vibrate: false, // (optional) default: true
        //             vibration: 0, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //             tag: 'some_tag', // (optional) add tag to message
        //             group: "group", // (optional) add group to message
        //             ongoing: false, // (optional) set whether this is an "ongoing" notification
        //             imageUrl: "https://dgr6z75qbh.execute-api.us-east-2.amazonaws.com/default/ImageTester", // (optional) set if you need to send big image notification
        //
        //             /* iOS only properties */
        //
        //             /* iOS and Android properties */
        //                             title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        //             message: "My Notification Message", // (required)
        //             playSound: false, // (optional) default: true
        //             soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //             number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //             repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        //             actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        //         });
            // },
            // 3000);
        //rest of code will be performing for iOS on background too
    }

    onAvatarPressed = (value) => {
        const {selected} = StateFactory.getInstance();

        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({selected});
    };
    onScroll = (ev) => {
        const currentOffset = ev.nativeEvent.contentOffset.y;

        const sub = this.offset - currentOffset;

        // don't care about very small moves
        if (sub > -2 && sub < 2) {
            return;
        }

        this.offset = ev.nativeEvent.contentOffset.y;

        const currentDirection = sub > 0 ? UP : DOWN;

        if (this.scrollDirection !== currentDirection) {
            this.scrollDirection = currentDirection;

            this.setState({
                bottomHidden: currentDirection === DOWN,
            });
        }
    };


    renderItem = (title, route) => {
        const searchText = StateFactory.getInstance().searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                divider
                leftElement={<Avatar text={title[0]}/>}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigation.navigate(route)}
            />

        );
    };


    // addTextInput = (coin = "BTC", currency = "USD", exchange = "CCCAGG") => {
    //     this.textInput.addCard(coin, currency, exchange);
    //     let idkWhyINeedThis = [];
    //     this.setState({idkWhyINeedThis})
    // };

    addCard = () => {
        this.textInput.addCard("ETH", "USD", "CCCAGG");
        // let idkWhyINeedThis = [];
        // this.setState({idkWhyINeedThis})
    };
    changeExchange = (key, newExchange) => {
        this.textInput.changeCardExchange(key ,newExchange);
        let idkWhyINeedThis = [];
        this.setState({idkWhyINeedThis})
    };
    changeCoin = (key, newCoin) => {
        this.textInput.changeCardCoin(key ,newCoin);
        let idkWhyINeedThis = [];
        this.setState({idkWhyINeedThis})
    };
    changeCurrency = (key, newCurrency) => {
        this.textInput.changeCardCurrency(key ,newCurrency);
        let idkWhyINeedThis = [];
        this.setState({idkWhyINeedThis})
    };

    render() {
        // AsyncStorage.setItem('cardProps1', JSON.stringify([{coin:"btc", exchange:"CCCAGGN"},{coin:"btc", exchange:"CCCAGGN"}]));
        // var yesss = AsyncStorage.getItem('cardProps1').then((response)=> JSON.parse(response));
        // var yess = {cards:this.complexCards};
        let coolarray = [{'coin':"BTC", 'currency': "USD", 'exchange':"CCCAGG"}, {'coin':"ETH", 'currency': "USD", 'exchange':"CCCAGG"}];
        // var coin = yesss._55[0].coin;
        return (
            <Container>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                >

                    {this.renderItem('Action buttons', 'actionButton')}
                    {/*<TextInput*/}
                        {/*style={{height: 40, borderColor: 'gray', borderWidth: 1}}*/}
                        {/*value = {"[Coin: "+this.coin +", Currency: "+this.currency+", exchange: "+this.exchange+"]"}*/}
                        {/*// onChangeText={(text) => {*/}
                        {/*//     this.storeValue({text})*/}
                        {/*// }}*/}
                        {/*// value={this.state.text}*/}
                        {/*onChangeText={(text) => {*/}
                            {/*this.storeValue({text})*/}
                        {/*}}*/}

                    {/*/>*/}
                    {/*<GraphPage*/}
                        {/*key={0}*/}
                        {/*coin={"ETH"}*/}
                        {/*currency={"USD"}*/}
                        {/*exchange={"CCCAGG"}*/}
                    {/*></GraphPage>*/}


                    {this.textInput.getAllCards().map((value, index) => {
                        this.myValue = value;
                        return (

                            <Container>

                                {value}
                                <ActionButton
                                    key = {index}
                                    actions={[{ icon: 'email', label: 'Coin' }, { icon: 'phone', label: 'Currency' }, { icon: 'sms', label: 'Exchange' }, { icon: 'favorite', label: 'Refresh Rate' }]}
                                    icon="settings"
                                    transition="speedDial"
                                    onPress={(text) =>{
                                        this.setState({currentCard: index});
                                        ToastAndroid.show("Home.react.js,ActionButton: "+index, ToastAndroid.SHORT);
                                        if (text === 'email') {
                                            this.setState({coinPrompt: true});
                                        } else if (text === 'phone') {
                                            this.setState({currencyPrompt: true})
                                        } else if (text === 'sms') {
                                            this.setState({exchangePrompt: true})
                                        } else if (text === 'favorite') {
                                            this.setState({refreshPrompt: true})

                                        }
                                    }}
                                />

                            </Container>);
                        return value;
                    })}
                    <Prompt
                        title="Coin Name (Only One)"
                        placeholder="BTC, ETH, LTC, DASH etc..."
                        visible={this.state.coinPrompt}
                        onCancel={() => this.setState({coinPrompt: false})}
                        onSubmit={(newCoin) => {
                            this.setState({ coinPrompt: false});
                            // this.changeCoin(this.state.currentCard, newExchange);
                            this.textInput.changeCardCoin(this.state.currentCard ,newCoin);
                        }}
                    />
                    <Prompt
                        title="Currency (Only One)"
                        placeholder="USD, EUR, GBP, etc..."
                        visible={this.state.currencyPrompt}
                        onCancel={() => this.setState({currencyPrompt: false})}
                        onSubmit={(newCurrency) => {
                            this.setState({ currencyPrompt: false});
                            // this.changeCurrency(this.state.currentCard, newCurrency);
                            this.textInput.changeCardCurrency(this.state.currentCard ,newCurrency);
                        }}
                    />
                    <Prompt
                        title="Exchange (Only One)"
                        placeholder="CCCAGG, Bitfinex, Coinbase, etc..."
                        visible={this.state.exchangePrompt}
                        onCancel={() => this.setState({exchangePrompt: false})}
                        onSubmit={(newExchange) => {
                            this.setState({ exchangePrompt: false});
                            // this.changeExchange(this.state.currentCard, newExchange);
                            this.textInput.changeCardExchange(this.state.currentCard ,newExchange);

                        }}
                    />
                    <Prompt
                        title="Refresh Rate In Minutes (Don't Include Units)"
                        placeholder="5, 10, 20, etc..."
                        visible={this.state.refreshPrompt}
                        onCancel={() => this.setState({refreshPrompt: false})}
                        onSubmit={(value) => this.setState({ refreshPrompt: false})}
                    />

                    <ActionButton
                        // onPress={() => this.addCard()}
                        onPress={() => this.textInput.addCard("ETH", "USD", "CCCAGG")}
                        icon="add"
                    />








                </ScrollView>

                <BottomNavigation
                    active={StateFactory.getInstance().active}
                    hidden={StateFactory.getInstance().bottomHidden}
                    style={{container: {position: 'absolute', bottom: 0, left: 0, right: 0}}}
                >
                    <BottomNavigation.Action
                        key="today"
                        icon={<Icon name="today"/>}
                        label="Charts"
                        onPress={() => {
                            // ToastAndroid.show("arraylength: "+yesss._55[0].coin, ToastAndroid.SHORT)
                            // ToastAndroid.show("arraylength: "+coolarray[0].coin, ToastAndroid.SHORT)
                            StateFactory.getInstance().active = 'today';
                            this.setState({active: 'today'});
                            this.props.navigation.navigate('today');

                        }

                        }
                    />

                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        label="Settings"
                        onPress={() => {
                            StateFactory.getInstance().active = 'card';
                            this.setState({active: 'settings'});
                            this.props.navigation.navigate('card');
                        }

                        }
                    />
                </BottomNavigation>
            </Container>


        );
    }
}



Home.propTypes = propTypes;

export default Home;