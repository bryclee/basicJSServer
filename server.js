var express = require('express');
var app = express(); // for server: http://expressjs.com/starter/hello-world.html

var utils = require('./utils/utils.js');

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.send('index.html');
});

// Function for server to respond on get requests made to '/data' route
// Sends request to google and returns the response to the client
app.get('/data', function(request, response) {
  response.send(utils.readWebsite());
});

// Set up server on port 3000
var server = app.listen(3000, function() {
  console.log('Listening on', server.address().address, server.address().port);
});
