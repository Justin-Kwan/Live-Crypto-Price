/**
 *  grabs latest bitcoin price from remote web api
 */

var isomorphicfetch = require('isomorphic-fetch');
// test js file import
var checkSqlInput = require('./CheckSQLInput.js');

class RemoteCoinApi {

  async fetchLatestCoinPrice(callback, coinTicker) {

      const fetchUrl = this.generateUrl(coinTicker);
      var latestPrice = "";
      const response = await fetch(fetchUrl);
      const json = await response.json();

      latestPrice = parseFloat(json.RAW[coinTicker].USD.PRICE);

      if(callback) {
        callback(latestPrice);
      }

  };

  // generates fetch url based on coin ticker
  generateUrl(coinTicker) {

    const fetchUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coinTicker + "&tsyms=USD";
    return fetchUrl;

  }

}

// class is exported
module.exports = RemoteCoinApi;
