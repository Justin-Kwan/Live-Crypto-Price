/**
 *  loops through all function modules
 */

const RemoteCoinApi = require('./RemoteCoinApi.js');
const DataBaseAccessor = require('./DataBaseLayer/DataBaseAccessor.js');
// subclass imports
const BitcoinDBA = require('./DataBaseLayer/BitcoinDBA.js');
const EthereumDBA = require('./DataBaseLayer/EthereumDBA.js');
const LitecoinDBA = require('./DataBaseLayer/LitecoinDBA.js');
const NeocoinDBA = require('./DataBaseLayer/NeocoinDBA.js');
const BasicAttentionTokenDBA = require('./DataBaseLayer/BasicAttentionTokenDBA.js');

// creates instance of class
var RCA = new RemoteCoinApi();
// creates var to hold ref to instance
var DBA = null;

class LatestPriceRequestHandler {

  responseCallback(latestPrice, callback) {

    // returns function defition
    return function(stringPrice) {

      DBA.deletePriceRecordSql()
      .then(function(result) {
        console.log("Deleted? " + result);

        if(callback) {
          // runComponents callback passed in called
          callback(latestPrice, stringPrice);
        }

      })
      .catch(function(err) {
        console.log(err);
      })

    }
  }

  runComponents(callback, coinTicker) {

    let self = this;

    RCA.fetchLatestCoinPrice(function(latestPrice) {

      // checks request's passed in coin ticker
      // then dbaccessor referenced will be the subclass
      if(coinTicker == "BTC") {
        DBA = new BitcoinDBA();
      }
      else if(coinTicker == "ETH") {
        DBA = new EthereumDBA();
      }
      else if(coinTicker == "LTC") {
        DBA = new LitecoinDBA();
      }
      else if(coinTicker == "NEO") {
        DBA = new NeocoinDBA();
      }
      else if(coinTicker == "BAT") {
        DBA = new BasicAttentionTokenDBA();
      }
      else {
        // pass error msg as string back
        callback(-1, "Request Not Recognized! Invalid Coin Ticker.");
      }

      // function in arg executed first
      DBA.insertThenPullLatestPriceSql(latestPrice, self.responseCallback(latestPrice, callback));

    }, coinTicker);

  }

}

// class is exported
module.exports = LatestPriceRequestHandler;
