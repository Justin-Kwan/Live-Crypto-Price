/**
 * script file that fetches neo data
 */

fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=NEO&tsyms=USD')
    .then(function(response) {
        // json format response
        return response.json();
    })
    .then(function(Data) {

      console.log("NEO Price: " + Data.RAW.NEO.USD.PRICE);
      document.getElementById('neo$Index').textContent = "$ " + Data.RAW.NEO.USD.PRICE;
      console.log("NEO MKTCAP: " + Data.DISPLAY.NEO.USD.MKTCAP);
      document.getElementById('neoMarketCapIndex').textContent = Data.DISPLAY.NEO.USD.MKTCAP;
      console.log("NEO Supply: " + Data.RAW.NEO.USD.SUPPLY);
      document.getElementById('neoCoinSupplyIndex').textContent = Data.RAW.NEO.USD.SUPPLY + " NEO";
      console.log("NEO 24HVol: " + Data.DISPLAY.NEO.USD.TOTALVOLUME24HTO);
      document.getElementById('neoCoinVlmIndex').textContent = Data.DISPLAY.NEO.USD.TOTALVOLUME24HTO;

    });

fetch('https://api.coinmarketcap.com/v1/ticker/neo/')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        document.getElementById('neo%Change').textContent = jsonData[0].percent_change_24h + " %";
    });
