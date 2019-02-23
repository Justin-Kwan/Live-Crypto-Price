const expect = require('chai').expect;
const assert = require('assert');
const mysql = require('mysql');
const checkSqlInput = require('../src/CheckSQLInput.js');
const DataBaseAccessor = require('../src/DataBaseLayer/DataBaseAccessor.js');

var connection = mysql.createConnection({
 host: "localhost",
  user: "justin",
  password: "password",
  database: "db1"
});

// constructor, creates instance of class
var DBA = new DataBaseAccessor("BTC");

// precondition: database must be empty
describe('SQL Pull & Insert Function Tests', function() {

  before(function(done) {

    deleteAllDbRecords()
    .then(function() {
      insertMockPrice(100000000)
      .then(function() {
        done();
      })
    })

  })

  it('pullLatestPriceSql() - should equal to 100000000', function(done) {

    DBA.pullLatestPriceSql(function(stringPrice, i) {
      assert.equal(stringPrice, 100000000);
      done();
    })

  });

  it('insertLatestPriceSql() - should equal to 10.6', function(done) {
    DBA.insertLatestPriceSql(10.6, function() {
      DBA.pullLatestPriceSql(function(stringPrice) {
        assert.equal(stringPrice, 10.6);
        done();
      })
    })
  });

  it('insertLatestPriceSql() - should only insert 1 record', function(done) {
    DBA.insertLatestPriceSql(10.6, function() {
      DBA.getNumberOfRows()
      .then(function(numOfRows) {
        assert.equal(numOfRows, 1);
        done();
      })
    })
  });

  it('insertThenPullLatestPriceSql() - should only insert 1 record', function(done) {
    DBA.insertThenPullLatestPriceSql(9999.01, function(stringPrice) {
      assert.equal(stringPrice, 9999.01);
      done();
    });
  });

  afterEach(function(done) {
    deleteAllDbRecords()
    .then(function() {
      done();
    })
  })

});


function insertMockPrice(mockPrice) {
  let promise = new Promise(function(resolve, reject) {
    connection.query("INSERT INTO BTC (coin_ticker, price) VALUES ('BTC', '" + mockPrice + "')", function(err, result, fields) {
      if(err)
        reject(err);
      else {
        resolve("works!");
      }
    });
  })
  return promise; // returns rej or res
}


function deleteAllDbRecords() {
  let promise = new Promise(function(resolve, reject) {
    connection.query("DELETE FROM BTC", function(err, result, fields) {
      if(err) reject(err);
      else resolve("works!");
    });
  })
  return promise; // returns rej or res
}


// precondition: database must be filled from previous test
describe('DataBaseAccessor Tests', function() {

  before(function(done) {
    deleteAllDbRecords()
    .then(function() {
      done();
    })
  })

  beforeEach(function(done) {

    insertMockPrice(120)
    .then(function() {
      insertMockPrice(0.005)
      .then(function() {
        done();
      })
    })

  })

  it('getNumberOfRows() - get correct # of SQL rows', function() {
    return DBA.getNumberOfRows()  // autoreturn result so no need done()
    .then(function(numOfRows) {
      expect(numOfRows).to.equal(2);
    })
  });

  it('deleteFirstTwoRows() - deletes correct SQL records', function() {
    return DBA.deleteFirstRows(2)
    .then(function(result) {
      assert.equal(result, true);
    })
  });

  it('deletePriceRecordSql() - function runs with proper result', function() {
    return DBA.deletePriceRecordSql()
    .then(function(result) {
      assert.equal(result, true);
    })
  });

  // after all tests
  afterEach(function(done) {
    deleteAllDbRecords()
    .then(function() {
      done();
    })
  })

});
