/**
 * script file that fetches latest price for bat
 */

fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=USD')
    .then(function(response) {
        // json format response
        return response.json();
    })
    .then(function(Data) {

      console.log("BTC Price: " + Data.RAW.BTC.USD.PRICE);
      document.getElementById('btc$Index').textContent = "$ " + Data.RAW.BTC.USD.PRICE;
      console.log("BTC MKTCAP: " + Data.DISPLAY.BTC.USD.MKTCAP);
      document.getElementById('btcMarketCapIndex').textContent = Data.DISPLAY.BTC.USD.MKTCAP;
      console.log("BTC Supply: " + Data.RAW.LTC.USD.SUPPLY);
      document.getElementById('btcCoinSupplyIndex').textContent = Data.RAW.BTC.USD.SUPPLY + " BTC";
      console.log("BTC 24HVol: " + Data.DISPLAY.LTC.USD.TOTALVOLUME24HTO);
      document.getElementById('btcCoinVlmIndex').textContent = Data.DISPLAY.BTC.USD.TOTALVOLUME24HTO;

    });

    fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            document.getElementById('btc%Change').textContent = jsonData[0].percent_change_24h + " %";
        });
