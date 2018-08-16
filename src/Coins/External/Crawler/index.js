
//import GraphPage from "/Users/Nicolas/crKonradCryptoNotification/src/Button";

class Crawler{
    constructor(coinName = "BTC", currency = "USD", exchange = "CCCAGG"){
        this.url = "https://min-api.cryptocompare.com/data/";
        this.coinName = coinName;
        this.exCurrency = currency;
        this.exchange = exchange;
        this.oneHour=[];
        this.price = [];
        this.vol = [];



    }

    update(){
        this.rawData = fetch(this.url+this.uri).then(res => res.json());

    }

    async fetchRawHistominute(limit){
        let uri = "histominute?fsym="+this.coinName+"&tsym="+this.exCurrency+"&limit="+limit+"&e="+this.exchange;
        let response = await fetch(this.url+uri);
        this.oneHour = await response.json();
        return this.oneHour;
        // this.rawData = fetch(this.url+this.uri).then(res => res.json());
        //return this.rawData;
    }

    // async fetchRawHistohour(limit){
    //     let uri = "histohour?fsym="+this.coinName+"&tsym="+this.exCurrency+"&limit="+limit+"&e="+this.exchange;
    //     let response = await fetch(this.url+uri);
    //     this.rawHistohour = await response.json();
    //     return this.rawHistohour;
    // }

    // async fetchRawPrice(){
    //     let uri = "price?fsym="+this.coinName+"&tsym="+this.exCurrency+"&e="+this.exchange;
    //     let response = await fetch(this.url+uri);
    //     this.price = await response.json();
    //     return this.price;
    // }
}

export default Crawler;