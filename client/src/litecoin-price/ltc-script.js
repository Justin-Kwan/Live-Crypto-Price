/**
 * script file that fetches ltc data
 */

fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,LTC,LTC&tsyms=USD')
    .then(function(response) {
        // json format response
        return response.json();
    })
    .then(function(Data) {

      console.log("LTC Price: " + Data.RAW.LTC.USD.PRICE);
      document.getElementById('ltc$Index').textContent = "$ " + Data.RAW.LTC.USD.PRICE;
      console.log("LTC MKTCAP: " + Data.DISPLAY.LTC.USD.MKTCAP);
      document.getElementById('ltcMarketCapIndex').textContent = Data.DISPLAY.LTC.USD.MKTCAP;
      console.log("LTC Supply: " + Data.RAW.LTC.USD.SUPPLY);
      document.getElementById('ltcCoinSupplyIndex').textContent = Data.RAW.LTC.USD.SUPPLY + " LTC";
      console.log("LTC 24HVol: " + Data.DISPLAY.LTC.USD.TOTALVOLUME24HTO);
      document.getElementById('ltcCoinVlmIndex').textContent = Data.DISPLAY.LTC.USD.TOTALVOLUME24HTO;

    });

fetch('https://api.coinmarketcap.com/v1/ticker/litecoin/')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        document.getElementById('ltc%Change').textContent = jsonData[0].percent_change_24h + " %";
    });
