module.exports = function() {
  var http = require('http'); // for making requests: https://nodejs.org/api/http.html#http_http_request_options_callback
  var fs = require('fs');

  var WEBSITE_FILE = __dirname + '/../readFile';
  var websiteData;
  fs.watch(WEBSITE_FILE, function(event, filename) {
    if (event === 'change') {
      getWebsiteData(WEBSITE_FILE);
    }
  });

  var getWebsiteData = function(file) {
    fs.readFile(file, {encoding: 'utf8'}, function(err, data) {
      if (err) {
        throw err;
      } else {
        console.log(data);
        http.get(data, function(httpResponse) {
          collectRequestData(httpResponse, function(htmlData) {
            websiteData = htmlData;
          });
        });
      }
    });
  };
  getWebsiteData(WEBSITE_FILE);

  var collectRequestData = function(httpRes, callback) {
    // Collect the data from an http response
    var data = '';
    httpRes.setEncoding('utf8');

    httpRes.on('data', function(chunk) {
      data += chunk;
    });

    httpRes.on('end', function() {
      callback(data);
    });
  };

  return {
    readWebsite: function() {
      return websiteData;
    }
  }
}();
