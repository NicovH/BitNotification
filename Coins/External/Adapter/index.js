

class CoinDeskAdapter {
    constructor(external) {
        this.external = external;
    }

    getInternal() {
        return Object.values(this.external.bpi);
    }

}



class CryptoCompareAdapter{
    constructor(rawData, coin, currency) {
        this.rawData = rawData;
        this.coin=coin;
        this.currency=currency;
    }

    adaptHistoricalData() {
        var closePrices = [];
        for (var i = 0; i < this.rawData.Data.length; i++) {
            closePrices.push(this.rawData.Data[i].close)
        }
        return closePrices;

    }
    adaptPrice(){
        return this.rawData.DISPLAY[this.coin][this.currency].PRICE;
    }

    adaptVolume24HourCoin(){
        return this.rawData.DISPLAY[this.coin][this.currency].VOLUME24HOUR;
    }

    adaptVolume24HourCurrency(){
        return this.rawData.DISPLAY[this.coin][this.currency].VOLUME24HOURTO;
    }

    adaptHigh24Hour(){
        return this.rawData.DISPLAY[this.coin][this.currency].HIGH24HOUR;
    }

    adaptLow24Hour(){
        return this.rawData.DISPLAY[this.coin][this.currency].LOW24HOUR;
    }

    adaptChangeQuant24Hour(){
        return this.rawData.DISPLAY[this.coin][this.currency].CHANGE24HOUR;
    }

    adaptChangePct24Hour(){
        return this.rawData.DISPLAY[this.coin][this.currency].CHANGEPCT24HOUR;
    }

    adaptSupply(){
        return this.rawData.DISPLAY[this.coin][this.currency].SUPPLY;
    }

    adaptMKTCAP(){
        return this.rawData.DISPLAY[this.coin][this.currency].MKTCAP;
    }

    adaptTotalVolume24hCoin(){
        return this.rawData.DISPLAY[this.coin][this.currency].TOTALVOLUME24H;
    }

    adaptTotalVolume24hCurrency(){
        return this.rawData.DISPLAY[this.coin][this.currency].TOTALVOLUME24HTO;
    }

}

export default CryptoCompareAdapter;