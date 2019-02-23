const expect = require('chai').expect;
const assert = require('assert');
const mysql = require('mysql');
const LatestPriceRequestHandler = require('../src/LatestPriceRequestHandler.js');

var LatestPriceRH = new LatestPriceRequestHandler;

var connection = mysql.createConnection({
 host: "localhost",
  user: "justin",
  password: "password",
  database: "db1"
});

describe('LatestPriceRequestHandler Test', function() {

  before(function(done) {
    connection.query("DELETE FROM BTC", function(err, result, fields) {
      if(err) throw err;
      done();
    });
  })

  it('pulled SQL value should equal to initial fetched value', function(done) {
    LatestPriceRH.runComponents(function(stringPrice, latestPrice) {
      assert.equal(stringPrice, latestPrice);
      done();
    }, "BTC");
  });

  //after all tests
  after(function(done) {
    connection.query("DELETE FROM BTC", function(err, result, fields) {
      if(err) throw err;
      done();
    });
  });

});
