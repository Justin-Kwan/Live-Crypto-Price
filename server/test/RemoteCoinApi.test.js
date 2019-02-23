const expect = require('chai').expect;
const assert = require('assert');
const checkSqlInput = require('../src/CheckSQLInput.js');
const RemoteCoinApi = require('../src/RemoteCoinApi.js');

var RCA = new RemoteCoinApi();

describe('Testing API Fetched Data is Valid & Numeric', function() {

  it('should return true when fetched price is passed in', async function() {

    await RCA.fetchLatestCoinPrice(function(latestPrice) {
      let result = checkSqlInput(latestPrice);

      expect(result).to.be.true;

    }, "BTC");

  });

});
