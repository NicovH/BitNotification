import Crawler from "../Crawler";
import CryptoCompareAdapter from "../Adapter";
import {ToastAndroid} from 'react-native';





    //async getHistohour(numOfHours = "60"){
        //     let data = await new Crawler(this.coinName, this.exCurrency, this.exchange).fetchRawHistohour(numOfHours);
        //     this.histohour = await new CryptoCompareAdapter(data).adaptHistoricalData();
        //     return this.histohour;
        // }
class CoinData {
    constructor(coinName = "BTC", currency = "USD", exchange = "CCCAGG") {

        this.coinName = coinName;
        this.currency = currency;
        this.exchange = exchange;
        this.crawler = new Crawler(this.coinName, this.currency, this.exchange);
        this.histominute = [];
        this.price = [];
        this.vol = [];
        //this.crawler = await new Crawler(this.coinName, this.exCurrency, this.exchange);

    }

    async getHistominute(numOfMinutes = "60") {
        let data = await this.crawler.fetchRawHistominute(numOfMinutes);
        this.histominute = await new CryptoCompareAdapter(data).adaptHistoricalData();
        return this.histominute;
    }

    async getPrice(){
        let data = await this.crawler.fetchRawFullData();
        this.price = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptPrice();
        return this.price;
    }

    async getVolume24HourCoin(){
        let data = await this.crawler.fetchRawFullData();
        this.volume24HourCoin = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptVolume24HourCoin();
        return this.volume24HourCoin;
    }

    async getVolume24HourCurrency(){
        let data = await this.crawler.fetchRawFullData();
        this.volume24HourCurrency = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptVolume24HourCurrency();
        return this.volume24HourCurrency;
    }

    async getHigh24Hour(){
        let data = await this.crawler.fetchRawFullData();
        this.high24Hour = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptHigh24Hour();
        return this.high24Hour;
    }

    async getLow24Hour(){
        let data = await this.crawler.fetchRawFullData();
        this.low24Hour = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptLow24Hour();
        return this.low24Hour;
    }

    async getChangeQuant24Hour(){
        let data = await this.crawler.fetchRawFullData();
        this.changeQuant24Hour = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptChangeQuant24Hour();
        return this.changeQuant24Hour;
    }

    async getChangePct24Hour(){
        let data = await this.crawler.fetchRawFullData();
        this.changePct24Hour = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptChangePct24Hour();
        return this.changePct24Hour;
    }

    async getSupply(){
        let data = await this.crawler.fetchRawFullData();
        this.supply = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptSupply();
        return this.supply;
    }

    async getMKTCAP(){
        let data = await this.crawler.fetchRawFullData();
        this.MKTCAP = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptMKTCAP();
        return this.MKTCAP;
    }

    async getTotalVolume24hCoin(){
        let data = await this.crawler.fetchRawFullData();
        this.totalVolume24hCoin = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptTotalVolume24hCoin();
        return this.totalVolume24hCoin;
    }

    async getTotalVolume24hCurrency(){
        let data = await this.crawler.fetchRawFullData();
        this.totalVolume24hCurrency = await new CryptoCompareAdapter(data, this.coinName, this.currency).adaptTotalVolume24hCurrency();
        return this.totalVolume24hCurrency;
    }




}

export default CoinData;