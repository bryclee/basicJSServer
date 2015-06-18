var express = require('express');
var app = express(); // for server: http://expressjs.com/starter/hello-world.html
var http = require('http'); // for making requests: https://nodejs.org/api/http.html#http_http_request_options_callback

var utils = require('./utils/utils.js');

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.send('index.html');
});

var websites = [
  'http://www.google.com',
  'http://finance.yahoo.com/q?s=GOOG'
];
var websiteCounter = 0;

// Function for server to respond on get requests made to '/data' route
// Sends request to google and returns the response to the client
app.get('/data', function(request, response) {
  var pageReq = http.get(websites[websiteCounter], function(httpRes) {
    utils.getRequestData(httpRes, function(data) {
      response.send(data);
    });
  });

  websiteCounter++;
  if (websiteCounter === websites.length) {
    websiteCounter = 0;
  }
});

// Set up server on port 3000
var server = app.listen(3000, function() {
  console.log('Listening on', server.address().address, server.address().port);
});
