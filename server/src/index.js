/**
 * creates node.js data server, top layer of server, passing request to
 * handlers
 */

"use strict";
const LatestPriceRequestHandler = require('./LatestPriceRequestHandler.js');
const http = require('http');
const mysql = require('mysql');

const PORT = 8080;

var LatestPriceRH = new LatestPriceRequestHandler;

function onRequest(req, res) {

  // if request made with this path, substring without ticker
  if ((req.url).substring(0, 15) === '/getLatestPrice') {

    // take substring - ticker in url
    const coinTicker = ((req.url).substring(15, 18)).toUpperCase();

    // responseText should be the latest price or error msg
    LatestPriceRH.runComponents(function(latestPrice, responseText) {

      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': "application/json",
      });

      res.end(JSON.stringify(responseText));

    }, coinTicker);

  }
  else {
    // send status code of page not found
    res.statusCode = 400;
    res.end();
  }

}

http.createServer(onRequest).listen(PORT);
console.log("Server is now running...");
