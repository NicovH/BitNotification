import {AsyncStorage} from "react-native";
import GraphPage from "../../Button";
import store from 'rn-object-store';
import React, {Component} from 'react';

let storageDownloader = async() => {

};


class CardStorage {
    constructor(){
        this.complexCards = [{"coin'":"BTC", "currency": "USD", "exchange":"CCCAGG"}, {"coin":"ETH", "currency": "USD", "exchange":"CCCAGG"}, {"coin":"ETH", "currency": "USD", "exchange":"CCCAGG"}];
        //this.complexCards = [];


        // AsyncStorage.setItem("coin0", "LTC");
        // AsyncStorage.setItem("currency0", "EUR");
        // AsyncStorage.setItem("exchange0", "CCCAGG");
        // AsyncStorage.setItem("coin1", "BTC");
        // AsyncStorage.setItem("currency1", "USD");
        // AsyncStorage.setItem("exchange1", "CCCAGG");

        //AsyncStorage.setItem("cards", "[{\"coin\":\"BTC\", \"currency\": \"USD\", \"exchange\":\"CCCAGG\"}, {\"coin\":\"ETH\", \"currency\": \"USD\", \"exchange\":\"CCCAGG\"}, {\"coin\":\"ETH\", \"currency\": \"USD\", \"exchange\":\"CCCAGG\"}]");
        AsyncStorage.getItem("cards3").then((token) => {
            if (token != null) {
                console.log("debug1 token | "+token);
                console.log("debug1 parse | "+JSON.parse(token));
                console.log("debug1 complexCards - parse | "+JSON.stringify(this.complexCards));
                this.complexCards = JSON.parse(token);
                console.log("debug1 complexCards + parse | "+JSON.stringify(this.complexCards));
            }
        });
    //     done = false;
    //     for (let i = 0; i< 10; i++){
    //         let cardTemplate = {'coin':"", 'currency': "", 'exchange':""};
    //         AsyncStorage.getItem('coin'+i).then((token) => {
    //             if (token != null) {
    //                 console.log("this wont work");
    //                 console.log(token);
    //                 cardTemplate.coin = token;
    //             }
    //         });
    //         AsyncStorage.getItem('currency'+i).then((token) => {
    //             if (token != null) {
    //                 console.log(token);
    //                 cardTemplate.currency = token;
    //             }
    //         });
    //         AsyncStorage.getItem('exchange'+i).then((token) => {
    //             if (token != null) {
    //                 console.log(token);
    //                 cardTemplate.exchange = token;
    //                 this.complexCards.push(cardTemplate);
    //                 console.log("debug| in for loop: "+ JSON.stringify(this.complexCards));
    //             }else{
    //                 done = true;
    //                 console.log("debug| done became true")
    //             }
    //         });
    //         console.log("debug| index:" +i);
    //         if (done){
    //             break;
    //         }
    //     }
    //     console.log("debug| out of for loop "+ JSON.stringify(this.complexCards));
    }


    addCard(newCoin, newCurrency, newExchange){//params must be strings
        this.complexCards.push({"coin": newCoin, "currency": newCurrency, "exchange": newExchange});
        AsyncStorage.setItem("cards3", JSON.stringify(this.complexCards));

        // this.storageUploader();

    }

    changeCard(key, newCurrency, newExchange){//params must be strings except key
    this.complexCards.splice(key, 1, {"coin": newCoin, "currency": newCurrency, "exchange": newExchange});
    AsyncStorage.setItem("cards3", JSON.stringify(this.complexCards));

    // this.storageUploader();

    }
    changeCardExchange(key, newExchange){
        this.complexCards[key].Exchange = newExchange;
        AsyncStorage.setItem("cards3", JSON.stringify(this.complexCards));
    }
    changeCardCoin(key, newCoin){
        this.complexCards[key].coin = newCoin;
        AsyncStorage.setItem("cards3", JSON.stringify(this.complexCards));
    }
    changeCardCurrency(key, newCurrency){
        this.complexCards[key].currency = newCurrency;
        AsyncStorage.setItem("cards3", JSON.stringify(this.complexCards));
    }


    removeCard(index){

    }
    getAllCards(){
        let builtCards = [];
        this.complexCards.forEach(function (card, i){
            builtCards.push(<GraphPage
                key={i}
                coin={card.coin}
                currency={card.currency}
                exchange={card.exchange}
            ></GraphPage>)
        });
        return builtCards;

        //Below is the storageUploader, it is placed in getAllCards rn so that the console.log would work
        // ASK WHY card.property or this.complexCards.property or at least myarray[i].property does not return the BTC or USD or etc...
        // console.log("Hello world!");
        // let myarray = this.complexCards; // why do i have to make a redundant array??
        // this.complexCards.forEach(function (card, i){
        //     for (var property in card) {
        //         if (card.hasOwnProperty(property)) {
        //             //AsyncStorage.setItem(JSON.stringify(property), card.property);
        //             console.log("key: "+JSON.stringify(property)+" | property: "+ card.property); //<---- replace property with coin to show it working
        //         }
        //     }
        // });

    }

    getCard(index){
        return this.complexCards[index];
    }


    storageUploader(){
        // let cardArray = this.complexCards; // why do i have to make a redundant array??
        // cardArray.forEach(function (card, i){
        //     Object.keys(cardArray[i]).forEach(function (property, e){
        //         if (card.hasOwnProperty(property)) {
        //             AsyncStorage.setItem(JSON.stringify(property+i), Object.values(cardArray[i])[e%(Object.keys(cardArray[i]).length)]);
        //             console.log("storageUploader debug| key: "+JSON.stringify(property+i)+" | property: "+ Object.values(cardArray[i])[e%(Object.keys(cardArray[i]).length)]);
        //         }
        //     })
        // });

    }
}


export default CardStorage;

        // AsyncStorage.getItem('@MySuperStore:key').then((token) => {
        //     if (token != null) {
        //         this.setState({text: token})
        //     }
        // });
        //
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


