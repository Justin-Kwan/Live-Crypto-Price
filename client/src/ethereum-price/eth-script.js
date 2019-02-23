/**
 * script file that fetches latest price for eth
 */

fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=USD')
    .then(function(response) {
        // json format response
        return response.json();
    })
    .then(function(Data) {
        console.log("ETH Price: " + Data.RAW.ETH.USD.PRICE);
        document.getElementById('eth$Index').textContent = "$ " + Data.RAW.ETH.USD.PRICE;
        console.log("ETH MKTCAP: " + Data.DISPLAY.ETH.USD.MKTCAP);
        document.getElementById('ethMarketCapIndex').textContent = Data.DISPLAY.ETH.USD.MKTCAP;
        console.log("ETH Supply: " + Data.RAW.ETH.USD.SUPPLY);
        document.getElementById('ethCoinSupplyIndex').textContent = Data.RAW.ETH.USD.SUPPLY + " ETH";
        console.log("ETH 24HVol: " + Data.DISPLAY.ETH.USD.TOTALVOLUME24HTO);
        document.getElementById('ethCoinVlmIndex').textContent = Data.DISPLAY.ETH.USD.TOTALVOLUME24HTO;
    });

fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        document.getElementById('eth%Change').textContent = jsonData[0].percent_change_24h + " %";
    });
