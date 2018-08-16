import Crawler from "../Crawler";
import CryptoCompareAdapter from "../Adapter";
import {ToastAndroid} from 'react-native';


class CoinData {
    constructor(coinName = "BTC", currency = "USD", exchange = "CCCAGG") {

        this.coinName = coinName;
        this.currency = currency;
        this.exchange = exchange;
        this.histominute=[];
        this.price = [];
        this.vol = [];
        //this.crawler = await new Crawler(this.coinName, this.exCurrency, this.exchange);

    }



    async getHistominute(numOfMinutes = "60"){
        let data = await new Crawler(this.coinName, this.currency, this.exchange).fetchRawHistominute(numOfMinutes);
        this.histominute = await new CryptoCompareAdapter(data).adaptHistoricalData();
        return this.histominute;
    }




    //async getHistohour(numOfHours = "60"){
        //     let data = await new Crawler(this.coinName, this.exCurrency, this.exchange).fetchRawHistohour(numOfHours);
        //     this.histohour = await new CryptoCompareAdapter(data).adaptHistoricalData();
        //     return this.histohour;
        // }

    // async getPrice(){
    //     let data = this.crawler.fetchRawPrice();
    //     this.price = await new CryptoCompareAdapter(data).adaptPrice(this.exCurrency);
    //     return this.price;
    // }

}

export default CoinData;