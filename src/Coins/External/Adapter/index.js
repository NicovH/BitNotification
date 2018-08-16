

class CoinDeskAdapter {
    constructor(external) {
        this.external = external;
    }

    getInternal() {
        return Object.values(this.external.bpi);
    }

}

class CryptoCompareAdapter {
    constructor(rawData) {
        this.rawData = rawData;
    }

    adaptHistoricalData() {
        var closePrices = [];
        for (var i = 0; i < this.rawData.Data.length; i++) {
            closePrices.push(this.rawData.Data[i].close)
        }
        return closePrices;

    }
    // adaptPrice(currency){
    //     return this.rawData.USD;
    // }

}

export default CryptoCompareAdapter;