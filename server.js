var express = require('express');
var app = express(); // for server: http://expressjs.com/starter/hello-world.html

var utils = require('./utils/utils.js');

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.send('index.html');
});

// Function for server to respond on get requests made to '/data' route
// Retrieves the currently stored website and sends it to the client
app.get('/data', function(request, response) {
  response.send(utils.readWebsite());
});

app.get('/*', function(request, response) {
  response.redirect('http://finance.yahoo.com' + request.url);
});

// Set up server on port 3000
var server = app.listen(3000, function() {
  console.log('Listening on', server.address().address, server.address().port);
});
