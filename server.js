var app = require('express')(); // for server: http://expressjs.com/starter/hello-world.html
var http = require('http'); // for making requests: https://nodejs.org/api/http.html#http_http_request_options_callback

var utils = require('./utils/utils.js');

// Function for server to respond on get requests made to '/' route
// Sends request to google and returns the response to the client
app.get('/', function(request, response) {
  var pageReq = http.get('http://www.google.com', function(httpRes) {
    utils.getRequestData(httpRes, function(data) {
      response.send(data);
    });
  });
});

// Set up server on port 3000
var server = app.listen(3000, function() {
  console.log('Listening on', server.address().address, server.address().port);
});
