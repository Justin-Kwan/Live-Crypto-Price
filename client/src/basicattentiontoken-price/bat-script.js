/**
 * script file that fetches latest price for bat
 */

fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BAT&tsyms=USD')
    .then(function(response) {
        // json format response
        return response.json();
    })
    .then(function(Data) {

      console.log("BAT Price: " + Data.RAW.BAT.USD.PRICE);
      document.getElementById('bat$Index').textContent = "$ " + Data.RAW.BAT.USD.PRICE;
      console.log("BAT MKTCAP: " + Data.DISPLAY.BAT.USD.MKTCAP);
      document.getElementById('batMarketCapIndex').textContent = Data.DISPLAY.BAT.USD.MKTCAP;
      console.log("BAT Supply: " + Data.RAW.BAT.USD.SUPPLY);
      document.getElementById('batCoinSupplyIndex').textContent = Data.RAW.BAT.USD.SUPPLY + " BAT";
      console.log("BAT 24HVol: " + Data.DISPLAY.BAT.USD.TOTALVOLUME24HTO);
      document.getElementById('batCoinVlmIndex').textContent = Data.DISPLAY.BAT.USD.TOTALVOLUME24HTO;

    });

fetch('https://api.coinmarketcap.com/v1/ticker/basic-attention-token/')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        document.getElementById('bat%Change').textContent = jsonData[0].percent_change_24h + " %";
    });
