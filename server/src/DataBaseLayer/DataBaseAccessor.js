/**
 *  pulls latest bitcoin price from SQL database
 */

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "justin",
  password: "password",
  database: "db1"
});

const NUM_OF_ROWS_COMPARE = 1;

class DataBaseAccessor {

  // passed in for specific coin
  constructor(coinTicker) {
    this.coinTicker = coinTicker;
  }

  deleteFirstRows(numOfRows) {

    // prevents loss of .this reference
    let self = this;

    let promise = new Promise(function(resolve, reject) {
      if(numOfRows > NUM_OF_ROWS_COMPARE) {
        connection.query("DELETE FROM " + self.coinTicker + " ORDER BY coin_id ASC LIMIT 1", function(err, results, fields) {

          if(err) {
            reject(err);
          }
          else {
            resolve(true);  // promise in now resolve with true in return
          }
        })
      }
      else {
        resolve(false);
      }
    })
  return promise;
}


getNumberOfRows() {

  let self = this;
  let promise = new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM " + self.coinTicker, function(err, results, fields) {
      if(err)
        reject(err);
      else {
        resolve(results.length);
      }
    })
  })
  return promise;
}

deletePriceRecordSql(callback) {
  // reference to current class instance in self
  let self = this;
  let promise = new Promise(function(resolve, reject) {
    // returns true from deleteFirstRows
    self.getNumberOfRows()
    .then(function(numOfRows) {
      self.deleteFirstRows(numOfRows)
      .then(function(result) {
        // goes to .then() where called
        resolve(result);
      })
    })
    .catch(errorMessage => {
      console.log(errorMessage);
    })
  })
  return promise;
}

  pullLatestPriceSql(callback) {

    connection.query("SELECT * FROM " + this.coinTicker, function (err, result, fields) {
      if(err) throw err;

      const stringPrice = Number(result[result.length-1].price).toString();
      if(callback) {
        callback(stringPrice);
      }
    });
  }

  insertLatestPriceSql(latestPrice, callback) {
    connection.query("INSERT INTO " + this.coinTicker + " (coin_ticker, price) VALUES ('" + this.coinTicker + "', '" + latestPrice + "')", function(err, result, fields) {
      if(err) throw err;

      if(callback) {
        callback();
      }
    });
  }

  insertThenPullLatestPriceSql(latestPrice, callback) {

    let self = this;

    self.insertLatestPriceSql(latestPrice, function() {
      self.pullLatestPriceSql(function(stringPrice) {
        if(callback) {
          callback(stringPrice);
        }
      });
    });
  }

}

// class is exported
module.exports = DataBaseAccessor;
